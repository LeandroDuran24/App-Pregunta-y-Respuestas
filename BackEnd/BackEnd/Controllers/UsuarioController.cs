using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using BackEnd.DTO;
using BackEnd.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioServices;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioServices = usuarioService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario usuario)
        {
            try
            {
                var validateExistence = await _usuarioServices.ValidateExistence(usuario);

                if (validateExistence)
                {
                    return BadRequest(new { message = "El usuario " + usuario.NombreUsuario + " ya existe" });
                }

                usuario.Password = Encriptar.EncriptarPassowrd(usuario.Password);/*Encripto la clave*/
                await _usuarioServices.SaveUser(usuario);

                return Ok(new { message = "Usuario Registrado con Exito" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("CambiarPassword")]
        [HttpPut]
        public async Task<IActionResult> CambiarPassword([FromBody] CambiarPasswordDTO cambiarPassword)
        {
            try
            {
                int idUsuario = 2;
                string passwordEncriptada = Encriptar.EncriptarPassowrd(cambiarPassword.passwordAnterior);
                var usuario = await _usuarioServices.ValidatePassword(idUsuario, passwordEncriptada);

                if(usuario == null)
                {
                    return BadRequest(new { message = "Password incorrecta" });
                }
                else
                {
                    usuario.Password = Encriptar.EncriptarPassowrd(cambiarPassword.nuevaPassword);
                   await _usuarioServices.UpdatePassword(usuario);
                    return Ok(new { message = "La Password fue actualizada con exito..." });
                }

               
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
