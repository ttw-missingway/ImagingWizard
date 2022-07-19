using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace ImagingWizard.Models{
    public static class DataSeeder{
        public static async Task SeedAsync(this IHost host){
            using var scope = host.Services.CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<ImagingWizardContext>();
            using var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ImagingUserModel>>();
            context.Database.EnsureCreated();

            ImagingUserModel user = await userManager.FindByEmailAsync("tycoholloway@gmail.com");
            if (user == null){
                user = new ImagingUserModel(){
                    FirstName = "Tyco",
                    LastName = "Holloway",
                    Email = "tycoholloway@gmail.com",
                    UserName = "tycoholloway@gmail.com"
                };

                var result = await userManager.CreateAsync(user, "Q8tWjNtd2BG-6gVwh");

                if (result != IdentityResult.Success){
                    throw new InvalidOperationException("Could not create new user in seeder");
                }

                context.Add(user);
            }
        }
    }
}