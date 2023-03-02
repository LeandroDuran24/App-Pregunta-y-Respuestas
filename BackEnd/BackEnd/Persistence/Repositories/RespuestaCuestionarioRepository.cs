using BackEnd.Domain.IRepositories;
using BackEnd.Persistence.Context;

namespace BackEnd.Persistence.Repositories
{
    public class RespuestaCuestionarioRepository :IRespuestaCuestionarioRepository
    {
        public readonly AplicationDbContext _context;
        public RespuestaCuestionarioRepository(AplicationDbContext context)
        {
            _context= context;
        }
    }
}
