using Microsoft.AspNetCore.Identity;

namespace ImagingWizard.Models{
    public class ImagingUserModel : IdentityUser{
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}