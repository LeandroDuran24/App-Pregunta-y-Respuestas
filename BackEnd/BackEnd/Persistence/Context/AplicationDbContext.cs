using BackEnd.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Persistence.Context
{
    public class AplicationDbContext :DbContext 
    {
        public DbSet<Usuario> Usuarios { get; set; }

        public AplicationDbContext(DbContextOptions<AplicationDbContext>options ):base(options)
        {
                
        }
    }
}
