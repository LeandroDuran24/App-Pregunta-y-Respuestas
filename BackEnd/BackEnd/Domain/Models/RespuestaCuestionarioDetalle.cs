using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Domain.Models
{
    public class RespuestaCuestionarioDetalle
    {
        [Key]
        public int Id { get; set; }


        [ForeignKey("RespuestaCuestionarioId")]
        public int RespuestaCuestionarioId { get; set; }
        public RespuestaCuestionario? RespuestaCuestionario { get; set; }

        public int RespuestaId { get; set; }
        public Respuesta? Respuesta { get; set; }
    }
}
