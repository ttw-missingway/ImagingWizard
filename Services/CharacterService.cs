using FightNight.Models;

namespace FightNight.Services.CharacterService{
    public class CharacterService : ICharacterService{

        private readonly HttpClient _http;
        private readonly ILogger<CharacterService> _logger;
        public CharacterService(HttpClient http, ILogger<CharacterService> logger){
            _http = http;
            _logger = logger;
        }
        public List<CharacterModel> Characters { get; set; } = new List<CharacterModel>();

        // public Task GetCharacters(){

        // }

        // public Task<CharacterModel> GetSingleCharacter(int id){

        // }

        public async Task CreateCharacter(CharacterModel character){
            _logger.LogInformation($"Posted new character: {character.Handle}!");
            var result = await _http.PostAsJsonAsync("api/character", character);
            var response = await result.Content.ReadFromJsonAsync<List<CharacterModel>>();
            _logger.LogInformation($"Response: {response}!");
            Characters = response;
        }
    }
}