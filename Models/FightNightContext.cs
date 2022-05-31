using Microsoft.EntityFrameworkCore;

namespace FightNight.Models
{

    public class FightNightContext : DbContext 
    {
        private readonly IConfiguration _config;
        public FightNightContext(IConfiguration config){
            _config = config;
        }
        public DbSet<CharacterModel>? Characters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options){
            base.OnConfiguring(options);
            options.UseNpgsql(_config["ConnectionStrings:FightNightCon"]);
        }
    }
}

