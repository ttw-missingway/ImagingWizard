namespace ImagingWizard.Models
{
    public class InstrumentModel
    {
        public int Id { get; set; }
        public string State { get; set; }
        public string County { get; set; }
        public int Book { get; set; }
        public int StartingPage { get; set;}
        public string Notes { get; set; }
        public string[]? Images { get; set; }
    }
}