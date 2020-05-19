using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoCoreAngular.Models
{
    public class EstoqueProduto
    {
        [Key]
        [Required]
        public int IdProduto { get; set; }
        [Required]
        public int IdEstoque { get; set; }
    }
}
