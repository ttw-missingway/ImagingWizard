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
using ImagingWizard.Models;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ImagingWizard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class InstrumentController : ControllerBase
    {
        private readonly  IBlobService _blobService;
        private readonly IConfiguration _configuration;
        private readonly ImagingWizardContext _context;
        public InstrumentController(IConfiguration configuration, ImagingWizardContext context, IBlobService blobService)
        {
            _configuration = configuration;
            _context = context;
            _blobService = blobService;
        }

        [HttpGet]
        public async Task<ActionResult<List<InstrumentModel>>> Get(){
            return Ok(await _context.Instruments.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<InstrumentModel>>> GetInstrument(int id){
            var instrument = await _context.Instruments.FindAsync(id);
            if (instrument == null)
                return BadRequest("Instrument Not Found!");
            return Ok(instrument);
        }

        [RequestFormLimits(MultipartBodyLengthLimit = 2147483647)]
        [DisableRequestSizeLimit]
        [HttpPost]
        public async Task<ActionResult<List<InstrumentModel>>> AddInstrument([FromForm] InstrumentViewModel instrument){
            var files = instrument.Images;
            var serverModel = new InstrumentModel();
            serverModel.Images = new string[files.Count()];

            if (files[0] != null)
            {
                for(var i=0; i<files.Count(); i++){
                    var result = await _blobService.UploadFileBlobAsync(
                    "pictures",
                    files[i].OpenReadStream(),
                    files[i].ContentType,
                    files[i].FileName);

                    serverModel.Images[i] = result.ToString();
                }
            }
            serverModel.State = instrument.State;
            serverModel.County = instrument.County;
            serverModel.Book = instrument.Book;
            serverModel.StartingPage = instrument.StartingPage;
            serverModel.Notes = instrument.Notes;

            _context.Instruments.Add(serverModel);
            await _context.SaveChangesAsync();

            return Ok(await _context.Instruments.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<InstrumentModel>>> UpdateInstrument([FromForm] InstrumentModel request){
            var serverModel = new InstrumentModel();
            var instrument = await _context.Instruments.FindAsync(request.Id);
            if (instrument == null)
                return BadRequest("Character Not Found!");

            instrument.State = request.State;
            Console.WriteLine(request.State);
            instrument.County = request.County;
            Console.WriteLine(request.County);
            instrument.Book = request.Book;
            Console.WriteLine(request.Book);
            instrument.StartingPage = request.StartingPage;
            Console.WriteLine(request.StartingPage);
            instrument.Notes = request.Notes;
            Console.WriteLine(request.Notes);

            await _context.SaveChangesAsync();

            return Ok(await _context.Instruments.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<InstrumentModel>>> DeleteInstrument(int id){
            var character = await _context.Instruments.FindAsync(id);
            
            if (character == null)
                return BadRequest("Character Not Found!");

            if (character.Images[0] != null)
            {
                for(var i=0; i<character.Images.Count(); i++){
                    var trimmedImage = character.Images[i].Remove(0, 57);
                    var result = await _blobService.GetContainerClient("pictures").DeleteBlobIfExistsAsync(trimmedImage);
                }
            }

            _context.Instruments.Remove(character);
            await _context.SaveChangesAsync();

            return Ok(await _context.Instruments.ToListAsync());
        }
    }
}