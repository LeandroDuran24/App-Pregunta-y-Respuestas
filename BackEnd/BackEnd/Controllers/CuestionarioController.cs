using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using BackEnd.Services;
using BackEnd.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuestionarioController : ControllerBase
    {
        private readonly ICuestionarioService _cuestionarioService;

        public CuestionarioController(ICuestionarioService cuestionarioService)
        {
            _cuestionarioService = cuestionarioService;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody] Cuestionario cuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);

                cuestionario.FechaCreacion = DateTime.Now;
                cuestionario.Activo = 1;
                cuestionario.UsuarioId = idUsuario;

                await _cuestionarioService.CreateCuestionario(cuestionario);
                return Ok(new { message = "Cuestionario Registrado con Exito" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("GetListCuestionarioByUser")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetCuestionarioByUser()
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);
                var listCuestionario =await _cuestionarioService.GetListCuestionarioByUser(idUsuario);
                return Ok(listCuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        //[Route("GetCuestionariosByUser")]
        [HttpGet("{idCuestionario}")]
       // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get(int idCuestionario)
       {
            try
            {

                var cuestionario = await _cuestionarioService.GetCuestionario(idCuestionario);
                return Ok(cuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{idCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(int idCuestionario)
        {
            try

            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);
                var cuestionario = await _cuestionarioService.BuscarCuestionario(idCuestionario,idUsuario);

                if(cuestionario==null)
                {
                    return BadRequest(new { message = "No se encontro el cuestionario" });
                }

                await _cuestionarioService.EliminarCuestionario(cuestionario);
                return Ok(new {message = "Se ha eliminado el cuestionario"});
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("GetListCuestionarios")]
        public async Task<IActionResult> GetListCuestionarios()
        {
            try
            {
                var listCuestionario = await _cuestionarioService.GetListCuestionario();
                return Ok(listCuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


    }
}
