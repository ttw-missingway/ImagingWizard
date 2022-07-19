using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ImagingWizard.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ImagingWizard.Controllers{
    public class AccountController : Controller{
        private readonly ILogger<AccountController> _logger;
        private readonly SignInManager<ImagingUserModel> _signInManager;
        private readonly UserManager<ImagingUserModel> _userManager;
        private readonly IConfiguration _config;

        public AccountController(ILogger<AccountController> logger, 
            SignInManager<ImagingUserModel> signInManager, 
            UserManager<ImagingUserModel> userManager,
            IConfiguration config){
                _logger = logger;
                _signInManager = signInManager;
                _userManager = userManager;
                _config = config;
        }

        public IActionResult Login(){
            if (this.User.Identity.IsAuthenticated){
                return RedirectToAction("Index", "Home");
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model){
            if (ModelState.IsValid){
                var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, false);

                if (result.Succeeded){
                    if (Request.Query.Keys.Contains("ReturnUrl")){
                        Console.WriteLine("going to return url");
                        return Redirect(Request.Query["ReturnUrl"].First());
                    }
                    else{
                        Console.WriteLine("going to instruments");
                        return RedirectToAction("Instruments", "Home");
                    }
                }
            }

            ModelState.AddModelError("", "Failed To Login");

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Logout(){
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public async Task<bool> IsLoggedIn() {
            bool isAuthenticated = User.Identity.IsAuthenticated;
            Console.WriteLine("is authenticated: " + isAuthenticated);
            return isAuthenticated;
        }

        [HttpPost]
        public async Task<IActionResult> CreateToken([FromBody] LoginViewModel model){
            if (ModelState.IsValid){
                var user = await _userManager.FindByNameAsync(model.Username);

                if (user != null){
                    var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

                    if (result.Succeeded){
                        var claims = new[]{
                            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
                        };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            _config["Token:Issuer"], 
                            _config["Token:Audience"], 
                            claims, 
                            signingCredentials: creds,
                            expires: DateTime.UtcNow.AddMinutes(60));
                        
                        return Created("", new {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo
                        });
                    }
                }
            }

            return BadRequest();
        }
    }
}