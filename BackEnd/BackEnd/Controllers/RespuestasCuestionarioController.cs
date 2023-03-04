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
    public class RespuestasCuestionarioController : ControllerBase
    {
        private readonly IRespuestaCuestionarioService _respuestaCuestionarioService;
        private readonly ICuestionarioService _cuestionarioService;

        public RespuestasCuestionarioController(IRespuestaCuestionarioService respuestaCuestionarioService, ICuestionarioService cuestionarioService)
        {
            _respuestaCuestionarioService = respuestaCuestionarioService;
            _cuestionarioService = cuestionarioService;
        }


        [HttpPost]
        public async Task<IActionResult>Post([FromBody]RespuestaCuestionario respuesta)
        {
            try
            {

               await _respuestaCuestionarioService.SaveRespuestaCuestionario(respuesta);
                return Ok(respuesta);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{idCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get(int idCuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);
                var listRespuestasCuestionario = await _respuestaCuestionarioService.ListRespuestaCuestionario(idCuestionario, idUsuario);
                if(listRespuestasCuestionario == null)
                {
                    return BadRequest(new {message = "Error al buscar el listado de cuestionario"});
                }

                return Ok(listRespuestasCuestionario);
                

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(int id)
        {
            try

            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);

                //metodo para obtener la respuesta del cuestionario

                var respuestaCuestionario = await _respuestaCuestionarioService.BuscarRespuestaCuestionario(id, idUsuario);

                if (respuestaCuestionario == null)
                {
                    return BadRequest(new { message = "No se encontro la respuesta del cuestionario" });
                }

                await _respuestaCuestionarioService.EliminarRespuestaCuestionario(respuestaCuestionario);
                return Ok(new { message = "La respuesta del cuestionario fue eliminada con exito" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetCuestionarioByIdRespuesta/{idRespuesta}")]

        public async Task<IActionResult> GetCuestionarioByIdRespuesta(int idRespuesta)
        {
            try
            {
                //obtener id del cuestionario dado un idRespuesta
                int idCuestionario = await _respuestaCuestionarioService.GetIdCuestionarioByIdRespuesta(idRespuesta);
                //buscamos el cuestionario
                var cuestionario = await _cuestionarioService.GetCuestionario(idCuestionario);
                //buscamos respuesta seleccionada dado un idRespuesta
                var listRespuestas = await _respuestaCuestionarioService.GetListRespuestas(idRespuesta);

                return Ok(new {cuestionarios =cuestionario,respuestas =listRespuestas});

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
