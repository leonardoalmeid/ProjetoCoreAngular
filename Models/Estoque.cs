using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoCoreAngular.Models
{
    public class Estoque
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MinLength(1, ErrorMessage = "Campo Obrigatorio!")]
        public string Nome { get; set; }
    }
}
