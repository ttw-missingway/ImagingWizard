using FightNight.Models;

namespace FightNight{
    public static class DataSeeder{
        public static void Seed(this IHost host){
            using var scope = host.Services.CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<FightNightContext>();
            context.Database.EnsureCreated();
            AddCharacters(context);
        }

        private static void AddCharacters(FightNightContext context){
            var character = context.Characters.FirstOrDefault();
            if (character != null) return;

            context.Characters.Add(new CharacterModel{
                Handle = "Queeblo",
                FirstName = "Dylan",
                LastName = "Walling",
                Main = "Mr GnW"
            });

            context.Characters.Add(new CharacterModel{
                Handle = "Plum",
                FirstName = "Tyco",
                LastName = "Holloway",
                Main = "Bomberman"
            });

            context.Characters.Add(new CharacterModel{
                Handle = "Holic",
                FirstName = "Drew",
                LastName = "Duty",
                Main = "Bowser"
            });

            context.Characters.Add(new CharacterModel{
                Handle = "Shawnzzy",
                FirstName = "Shawn",
                LastName = "Stafford",
                Main = "Ryu"
            });

            context.SaveChanges();
        }
    }
}