using BackEnd.Domain.IRepositories;
using BackEnd.Domain.Models;
using BackEnd.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Persistence.Repositories
{
    public class RespuestaCuestionarioRepository :IRespuestaCuestionarioRepository
    {
        public readonly AplicationDbContext _context;
        public RespuestaCuestionarioRepository(AplicationDbContext context)
        {
            _context= context;
        }


        public async Task<RespuestaCuestionario> BuscarRespuestaCuestionario(int idCuestionario, int idUsuario)
        {
            var listRespuestaCuestionario = await _context.RespuestasCuestionarios.Where(x => x.Id == idCuestionario && x.Cuestionario.UsuarioId == idUsuario && x.Activo == 1).FirstOrDefaultAsync();

            return listRespuestaCuestionario;
        }

        public async Task EliminarRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            respuestaCuestionario.Activo = 0;
            _context.Entry(respuestaCuestionario).State= EntityState.Modified;
        await  _context.SaveChangesAsync();
        }

        public async Task<List<RespuestaCuestionario>> ListRespuestaCuestionario(int idCuestionario, int idUsuario)
        {
            var listRespuestaCuestionario = await _context.RespuestasCuestionarios.Where(x => x.CuestionarioId == idCuestionario && x.Activo == 1 && x.Cuestionario.UsuarioId == idUsuario).OrderByDescending(x => x.Fecha).ToListAsync();

            return listRespuestaCuestionario;
        }

        public async Task SaveRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            respuestaCuestionario.Activo = 1;
            respuestaCuestionario.Fecha = DateTime.Now;
            _context.Add(respuestaCuestionario);
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetIdCuestionarioByIdRespuesta(int idRespuestaCuestionario)
        {
            var cuestionario = await _context.RespuestasCuestionarios.Where(x => x.Id == idRespuestaCuestionario && x.Activo==1).FirstOrDefaultAsync();
            return cuestionario.CuestionarioId;
        }

        public async Task<List<RespuestaCuestionarioDetalle>> GetListRespuestas(int idRespuestaCuestionario)
        {
            var listRespuestas = await _context.RespuestasCuestionariosDetalle.Where(x => x.RespuestaCuestionarioId == idRespuestaCuestionario).Select(x => new RespuestaCuestionarioDetalle { RespuestaId = x.RespuestaId }).ToListAsync();

            return listRespuestas;
        }
    }
}
