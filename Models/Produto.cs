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
        [Display(Description = "Campo Nome é obrigatório.")]
        public string Nome { get; set; }
        public string Marca { get; set; }
        public string Categoria { get; set; }
        public string Modelo { get; set; }
        public string PrecoUnitario { get; set; }
        public int Quantidade { get; set; }
        //public int Estoque { get; set; }

    }
}
