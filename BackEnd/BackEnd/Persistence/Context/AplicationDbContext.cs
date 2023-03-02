using BackEnd.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Persistence.Context
{
    public class AplicationDbContext :DbContext 
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pregunta> Preguntas { get; set; }
        public DbSet<Cuestionario> Cuestionarios { get; set; }

        public DbSet<Respuesta> Respuestas { get; set; }

        public DbSet<RespuestaCuestionario> RespuestasCuestionarios { get; set; }
        public DbSet<RespuestaCuestionarioDetalle> RespuestasCuestionariosDetalle { get; set; }


        public AplicationDbContext(DbContextOptions<AplicationDbContext>options ):base(options)
        {
                
        }
    }
}
