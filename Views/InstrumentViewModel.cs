namespace ImagingWizard.Models
{
    public class InstrumentViewModel
    {
        public int Id { get; set; }
        public string State { get; set; }
        public string County { get; set; }
        public int Book { get; set; }
        public int StartingPage { get; set;}
        public string Notes { get; set; }
        public IFormFile[]? Images { get; set; }

    }
}