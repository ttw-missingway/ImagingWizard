using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using FightNight.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using FightNight.Services.CharacterService;

namespace FightNight.Controllers;

public class HomeController : Controller
{
    private readonly FightNightContext _context;
    private readonly ICharacterService _characterService;

    public HomeController(FightNightContext context, ICharacterService characterService)
    {
        _context = context;
        _characterService = characterService;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    public IActionResult CharacterCreation(){
        return View();
    }

    // [HttpPost]
    // public IActionResult CharacterCreation(CharacterModel model){
    //     _characterService.CreateCharacter(model);
    //     return View();
    // }

    public IActionResult Characters()
    {
        var characters = _context.Characters.Select( c => new CharacterModel {
            Handle = c.Handle,
            FirstName = c.FirstName,
            LastName = c.LastName,
            Main = c.Main
        });

        return View(characters);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
