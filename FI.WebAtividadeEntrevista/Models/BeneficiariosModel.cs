namespace FI.WebAtividadeEntrevista.Models
{
    public class BeneficiariosModel
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public long IdCliente { get; set; }
    }
}