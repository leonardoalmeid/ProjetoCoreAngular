using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjetoCoreAngular.Models;

namespace ProjetoCoreAngular.Repositorio
{
    public interface IEstoqueRepositorio
    {
        List<Estoque> RetornarEstoques();
        List<Produto> ConsutarProdutosEmEstoque(int id);
        bool CadastrarEstoque(Estoque estoque);
        bool AdicionarProduto(EstoqueProduto dados);
        bool RemoverProduto(EstoqueProduto dados);
        bool RemoverEstoque(int id);

    }
}
