public class CharacterViewModel
    {
        public int Id { get; set; }
        public string? Handle { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Main { get; set; }
        public string? Secondary { get; set; }
        public int? ELO { get; set;}
        public IFormFile[]? Pics { get; set; }

    }