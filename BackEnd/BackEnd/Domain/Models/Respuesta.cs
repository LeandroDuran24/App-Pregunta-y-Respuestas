using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Domain.Models
{
    public class Respuesta
    {

        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Descripcion { get; set; }
        [Required]
        public bool EsCorrecta { get; set; }
        
        public int PreguntaId { get; set; }
        public Pregunta? Pregunta { get; set; }


    }
}
