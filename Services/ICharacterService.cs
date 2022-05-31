using FightNight.Models;

namespace FightNight.Services.CharacterService{
    public interface ICharacterService{
        List<CharacterModel> Characters { get; set; }
        Task CreateCharacter(CharacterModel character);
    }
}