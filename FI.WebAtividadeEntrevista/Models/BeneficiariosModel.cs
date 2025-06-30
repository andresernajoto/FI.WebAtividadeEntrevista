using FI.WebAtividadeEntrevista.Attributes;
using System.ComponentModel.DataAnnotations;

namespace FI.WebAtividadeEntrevista.Models
{
    public class BeneficiariosModel
    {
        public long Id { get; set; }
        
        [Required]
        public string Nome { get; set; }
        
        [Required(ErrorMessage = "CPF é obrigatório.")]
        [CpfValidator(ErrorMessage = "CPF informado é inválido.")]
        public string CPF { get; set; }
        
        public long IdCliente { get; set; }
    }
}