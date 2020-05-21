using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjetoCoreAngular.Models;

namespace ProjetoCoreAngular.Repositorio
{
    public interface IProdutoRepositorio
    {
        bool InserirProduto(Produto cadastrar);
        List<Produto> RetornarProdutos();
        List<Produto> RetornarProduto(int id);
        bool AtualizarProduto(Produto atualizar);
        bool RemoverProduto(int id);
    }
}
