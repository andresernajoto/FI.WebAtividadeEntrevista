using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace FI.WebAtividadeEntrevista.Attributes
{
    public class CpfValidatorAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null)
                return false;

            var cpf = new string(value.ToString().Where(char.IsDigit).ToArray());

            if (cpf.Length != 11 || cpf.Distinct().Count() == 1)
                return false;

            int[] multiplicador1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            var tempCpf = cpf.Substring(0, 9);
            var soma = 0;

            for (int i = 0; i < 9; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];

            var resto = soma % 11;
            var digito = resto < 2 ? 0 : 11 - resto;

            tempCpf += digito;
            soma = 0;

            for (int i = 0; i < 10; i++)
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];

            resto = soma % 11;
            digito = resto < 2 ? 0 : 11 - resto;

            return cpf.EndsWith(digito.ToString());
        }
    }
}