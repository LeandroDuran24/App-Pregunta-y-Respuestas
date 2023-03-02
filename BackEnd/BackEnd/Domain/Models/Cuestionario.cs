using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Domain.Models
{
    public class Cuestionario
    {
        [Key]
        public int Id { get; set; }
       
        [Column(TypeName = "varchar(100)")]
        public string Nombre { get; set; }

        [Column(TypeName = "varchar(150)")]
        public string Descripcion { get; set; }

        public DateTime FechaCreacion { get; set; }
        public int Activo { get; set; }

        [ForeignKey("UsuarioId")]
        public int UsuarioId { get; set; }
        public Usuario? Usuario{ get; set; }


        public List<Pregunta>? listPreguntas { get; set; }

    }
}
