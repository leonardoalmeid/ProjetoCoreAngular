using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjetoCoreAngular.Models
{
    public class Produto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Marca { get; set; }
        [Required]
        public string Categoria { get; set; }
        [Required]
        public string Modelo { get; set; }
        [Required]
        public string PrecoUnitario { get; set; }
        [Required]
        public int Quantidade { get; set; }
        public int Estoque { get; set; }

    }
}
