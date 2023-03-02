using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Domain.Models
{
    public class RespuestaCuestionario
    {
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Participante { get; set; }

        public DateTime Fecha { get; set; }

        public int Activo { get; set; }


        public int CuestionarioId { get; set; }
        public Cuestionario? Cuestionario { get; set; }


        public List<RespuestaCuestionarioDetalle> ListCuestionarioDetalle { get; set; }

    }
}
