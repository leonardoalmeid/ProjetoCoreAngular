using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoCoreAngular.Models
{
    public class CadastrarUsuario
    {
        [Key]
        [Required]
        [Display(Description ="Campo Nome é obrigatório.")]
        public string Nome { get; set; }
        [Required]
        [Display(Description = "Campo Cpf é obrigatório.")]
        [MaxLength(11,ErrorMessage ="O cpf deve conter 11 digitos, sem os caracteres especiais.")]
        public string Cpf { get; set; }
        [Required]
        [Display(Description = "Campo Nome é obrigatório.")]
        public string Email { get; set; }
        public string Telefone { get; set; }
        [Required]
        [Display(Description = "Campo Nome é obrigatório.")]
        public string Endereco { get; set; }
        public DateTime DtCadastro { get; set; }
        [Required]
        [Display(Description = "Campo Nome é obrigatório.")]
        public string Senha { get; set; }
    }
}
