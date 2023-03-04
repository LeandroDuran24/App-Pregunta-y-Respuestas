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

   

        public async Task<RespuestaCuestionario> BuscarRespuestaCuestionario(int idCuestionario, int idUsuario)
        {
            return await _respuesta.BuscarRespuestaCuestionario(idCuestionario, idUsuario);
        }

        public async Task EliminarRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
             await _respuesta.EliminarRespuestaCuestionario(respuestaCuestionario);
        }

        public async Task<int> GetIdCuestionarioByIdRespuesta(int idRespuestaCuestionario)
        {
            return await _respuesta.GetIdCuestionarioByIdRespuesta(idRespuestaCuestionario);
        }

        public async Task<List<RespuestaCuestionarioDetalle>> GetListRespuestas(int idRespuestaCuestionario)
        {
            return await _respuesta.GetListRespuestas(idRespuestaCuestionario);
        }

        public async Task<List<RespuestaCuestionario>> ListRespuestaCuestionario(int idCuestionario, int idUsuario)
        {
            return await _respuesta.ListRespuestaCuestionario(idCuestionario,idUsuario);


        }

        public async Task SaveRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
             await _respuesta.SaveRespuestaCuestionario(respuestaCuestionario); 
        }
    }
}
