using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FightNight.Models;
using Microsoft.Extensions.Configuration;
using System.Data;
using Npgsql;
using Microsoft.EntityFrameworkCore;
using FightNight.Services.BlobService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace FightNight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly  IBlobService _blobService;
        private readonly IConfiguration _configuration;
        private readonly FightNightContext _context;
        public CharacterController(IConfiguration configuration, FightNightContext context, IBlobService blobService)
        {
            _configuration = configuration;
            _context = context;
            _blobService = blobService;
        }

        // [HttpGet]
        // public JsonResult Get()
        // {
        //     string query = @"
        //         select CharId as ""Id"",
        //             CharHandle as ""Handle""
        //         from CharacterData
        //     ";

        //     DataTable table = new DataTable();
        //     string sqlDataSource = _configuration.GetConnectionString("FightNightCon");
        //     NpgsqlDataReader npgsqlReader;
        //     using (NpgsqlConnection connection = new NpgsqlConnection(sqlDataSource))
        //     {
        //         connection.Open();
        //         using(NpgsqlCommand command = new NpgsqlCommand(query, connection))
        //         {
        //             npgsqlReader = command.ExecuteReader();
        //             table.Load(npgsqlReader);

        //             npgsqlReader.Close();
        //             connection.Close();
        //         }
        //     }

        //     return new JsonResult(table);
        // }

        [HttpGet]
        public async Task<ActionResult<List<CharacterModel>>> Get(){
            return Ok(await _context.Characters.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<CharacterModel>>> AddCharacter(int id){
            var character = await _context.Characters.FindAsync(id);
            if (character == null)
                return BadRequest("Character Not Found!");
            return Ok(character);
        }

        [HttpPost, AllowAnonymous]
        public async Task<ActionResult<List<CharacterModel>>> AddCharacter([FromForm] CharacterViewModel character){

            Console.WriteLine($"Controller Heard - Posted");
            Console.WriteLine($"handle: {character.Handle}");
            Console.WriteLine($"elo: {character.ELO}");

            var files = character.Pics;
            var serverModel = new CharacterModel();
            serverModel.Pics = new string[files.Count()];

            if (files[0] != null)
            {
                for(var i=0; i<files.Count(); i++){
                    var result = await _blobService.UploadFileBlobAsync(
                    "pictures",
                    files[i].OpenReadStream(),
                    files[i].ContentType,
                    files[i].FileName);

                    serverModel.Pics[i] = result.ToString();
                }
                
            }

            serverModel.Handle = character.Handle;
            serverModel.ELO = character.ELO;
            serverModel.FirstName = character.FirstName;
            serverModel.LastName = character.LastName;
            serverModel.Main = character.Main;
            serverModel.Secondary = character.Secondary;

            _context.Characters.Add(serverModel);
            await _context.SaveChangesAsync();

            return Ok(await _context.Characters.ToListAsync());
        }

        // [HttpPost]
        // public async Task<ActionResult<List<CharacterModel>>> AddCharacter(CharacterModel character){
        //     try{
        //         file
        //         if (file != null)
        //         {
        //             var result = await _blobService.UploadFileBlobAsync(
        //                 "pictures",
        //                 file.OpenReadStream(),
        //                 file.ContentType,
        //                 file.FileName);
        //         }

                
        //     }
        // }

        [HttpPut]
        public async Task<ActionResult<List<CharacterModel>>> UpdateCharacter(CharacterModel request){
            var character = await _context.Characters.FindAsync(request.Id);
            if (character == null)
                return BadRequest("Character Not Found!");

            character.Handle = request.Handle;
            character.FirstName = request.FirstName;
            character.LastName = request.LastName;
            character.Main = request.Main;

            await _context.SaveChangesAsync();

            return Ok(await _context.Characters.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<CharacterModel>>> DeleteCharacter(int id){
            Console.WriteLine($"Controller Heard - Deleted");
            var character = await _context.Characters.FindAsync(id);
            if (character == null)
                return BadRequest("Character Not Found!");

            _context.Characters.Remove(character);
            await _context.SaveChangesAsync();

            return Ok(await _context.Characters.ToListAsync());
        }

        // [HttpPost]
        // public JsonResult Post(CharacterModel character)
        // {
        //     string query = @"
        //         insert into CharacterData(CharHandle)
        //         values (@Handle)
        //     ";

        //     DataTable table = new DataTable();
        //     string sqlDataSource = _configuration.GetConnectionString("FightNightCon");
        //     NpgsqlDataReader npgsqlReader;
        //     using (NpgsqlConnection connection = new NpgsqlConnection(sqlDataSource))
        //     {
        //         connection.Open();
        //         using(NpgsqlCommand command = new NpgsqlCommand(query, connection))
        //         {
        //             command.Parameters.AddWithValue("@Handle", character.Handle);
        //             npgsqlReader = command.ExecuteReader();
        //             table.Load(npgsqlReader);

        //             npgsqlReader.Close();
        //             connection.Close();
        //         }
        //     }

        //     return new JsonResult("added successfully!");
        // }

        // [HttpPut]
        // public JsonResult Put(CharacterModel character)
        // {
        //     string query = @"
        //         update CharacterData
        //         set CharHandle = @Handle
        //         where CharId = @Id
        //     ";

        //     DataTable table = new DataTable();
        //     string sqlDataSource = _configuration.GetConnectionString("FightNightCon");
        //     NpgsqlDataReader npgsqlReader;
        //     using (NpgsqlConnection connection = new NpgsqlConnection(sqlDataSource))
        //     {
        //         connection.Open();
        //         using(NpgsqlCommand command = new NpgsqlCommand(query, connection))
        //         {
        //             command.Parameters.AddWithValue("@Id", character.Id);
        //             command.Parameters.AddWithValue("@Handle", character.Handle);
        //             npgsqlReader = command.ExecuteReader();
        //             table.Load(npgsqlReader);

        //             npgsqlReader.Close();
        //             connection.Close();
        //         }
        //     }

        //     return new JsonResult("Updated Successfully!");
        // }

        // [HttpDelete("{id}")]
        // public JsonResult Delete(int id)
        // {
        //     string query = @"
        //         delete from CharacterData
        //         where CharId = @Id
        //     ";

        //     DataTable table = new DataTable();
        //     string sqlDataSource = _configuration.GetConnectionString("FightNightCon");
        //     NpgsqlDataReader npgsqlReader;
        //     using (NpgsqlConnection connection = new NpgsqlConnection(sqlDataSource))
        //     {
        //         connection.Open();
        //         using(NpgsqlCommand command = new NpgsqlCommand(query, connection))
        //         {
        //             command.Parameters.AddWithValue("@Id", id);
        //             npgsqlReader = command.ExecuteReader();
        //             table.Load(npgsqlReader);

        //             npgsqlReader.Close();
        //             connection.Close();
        //         }
        //     }

        //     return new JsonResult("Deleted Successfully!");
        // }
    }
}