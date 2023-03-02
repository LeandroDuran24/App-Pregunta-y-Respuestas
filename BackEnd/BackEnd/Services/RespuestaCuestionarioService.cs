using BackEnd.Domain.IRepositories;
using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;

namespace BackEnd.Services
{
    public class RespuestaCuestionarioService:IRespuestaCuestionarioService
    {
        private readonly IRespuestaCuestionarioRepository _respuesta;


        public RespuestaCuestionarioService(IRespuestaCuestionarioRepository respuesta)
        {
            _respuesta = respuesta;
        }

        public async Task SaveRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
             await _respuesta.SaveRespuestaCuestionario(respuestaCuestionario); 
        }
    }
}
