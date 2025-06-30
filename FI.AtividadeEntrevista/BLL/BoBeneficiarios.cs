using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiarios
    {
        public long Incluir(DML.Beneficiarios beneficiario)
        {
            DAL.Beneficiarios.DaoBeneficiarios ben = new DAL.Beneficiarios.DaoBeneficiarios();
            return ben.Incluir(beneficiario);
        }

        public void Alterar(DML.Beneficiarios beneficiario)
        {
            DAL.Beneficiarios.DaoBeneficiarios ben = new DAL.Beneficiarios.DaoBeneficiarios();
            ben.Alterar(beneficiario);
        }

        public DML.Beneficiarios Consultar(long id)
        {
            DAL.Beneficiarios.DaoBeneficiarios ben = new DAL.Beneficiarios.DaoBeneficiarios();
            return ben.Consultar(id);
        }

        public void Excluir(long id)
        {
            DAL.Beneficiarios.DaoBeneficiarios ben = new DAL.Beneficiarios.DaoBeneficiarios();
            ben.Excluir(id);
        }

        public List<DML.Beneficiarios> Listar()
        {
            DAL.Beneficiarios.DaoBeneficiarios ben = new DAL.Beneficiarios.DaoBeneficiarios();
            return ben.Listar();
        }

        public List<DML.Beneficiarios> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.Beneficiarios.DaoBeneficiarios ben = new DAL.Beneficiarios.DaoBeneficiarios();
            return ben.Pesquisa(iniciarEm,  quantidade, campoOrdenacao, crescente, out qtd);
        }

        public bool VerificarExistencia(string CPF)
        {
            DAL.Beneficiarios.DaoBeneficiarios ben = new DAL.Beneficiarios.DaoBeneficiarios();
            return ben.VerificarExistencia(CPF);
        }
    }
}
