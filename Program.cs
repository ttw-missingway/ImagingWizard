using System.Text;
using Azure.Storage.Blobs;
using FightNight;
using FightNight.Models;
using FightNight.Services.BlobService;
using FightNight.Services.CharacterService;
using ImagingWizard.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ImagingWizardContext>(
    o => o.UseNpgsql(builder.Configuration.GetConnectionString("ImagingWizardCon"))
);
builder.Services.AddSingleton(sp => new HttpClient { BaseAddress = new Uri("https://localhost:7213") });
builder.Services.AddScoped(x => new BlobServiceClient("DefaultEndpointsProtocol=https;AccountName=fightnightstorage;AccountKey=8+X6qs3j89lAPW2eKM00nZwABJWwL08xx4H4kXuLgxZ5hfgbIlAR0VA7nwNNV8DHV869NBumtkaV+AStfZyj2g==;EndpointSuffix=core.windows.net"));
builder.Services.AddSingleton<ICharacterService, CharacterService>();
builder.Services.AddScoped<IBlobService, BlobService>();
builder.Services.Configure<FormOptions>(opt => {
    opt.MultipartBodyLengthLimit = 2147483647; //2GB
});
builder.Services.AddIdentity<ImagingUserModel, IdentityRole>(cfg => {
    cfg.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<ImagingWizardContext>();

builder.Services.AddAuthentication()
    .AddCookie()
    .AddJwtBearer(cfg => {
        cfg.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters(){
            ValidIssuer = builder.Configuration["Token:Issuer"],
            ValidAudience = builder.Configuration["Token:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:Key"]))
        };
    });

var CorsPolicy = "Cors Policy";
builder.Services.AddCors(options => {
    options.AddPolicy(name: CorsPolicy,
        policy => {
            policy.WithOrigins("https://fightnightstorage.blob.core.windows.net")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors(CorsPolicy);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.SeedAsync().Wait();

app.Run();
