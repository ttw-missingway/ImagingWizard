using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ImagingWizard.Models
{
    public class ImagingWizardContext : IdentityDbContext<ImagingUserModel>
    {
        private readonly IConfiguration _config;
        public ImagingWizardContext(IConfiguration config){
            _config = config;
        }
        public DbSet<InstrumentModel>? Instruments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options){
            base.OnConfiguring(options);
            options.UseNpgsql(_config["ConnectionStrings:ImagingWizardCon"]);
        }
    }
}
