using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoCoreAngular.Models;
using ProjetoCoreAngular.Repositorio;

namespace ProjetoCoreAngular.Controllers
{
    [Route("api/Estoque")]
    [ApiController]
    public class EstoqueController : ControllerBase
    {
        IEstoqueRepositorio _estoque;
        public EstoqueController(IEstoqueRepositorio estoque)
        {
            _estoque = estoque;
        }

        // api/Estoque
        [HttpGet]
        public IEnumerable<Estoque> GetEstoques()
        {
            var result = _estoque.RetornarEstoques();

            return result;
        }

        // api/Estoque/5
        [Route("{id}")]
        [HttpGet]
        public List<Produto> GetProdutoEstoque(int id)
        {
            var result = _estoque.ConsutarProdutosEmEstoque(id);

            return result;
        }

        [HttpGet]
        [Route("Remover/{idProduto}")]
        public bool Apagar(int idProduto)
        {
            var result = _estoque.RemoverEstoque(idProduto);

            return result;
        }

        // api/Estoque/Cadastrar
        [Route("Cadastrar")]
        [HttpPost]
        public bool PostEstoque(Estoque dados)
        {
            var result = _estoque.CadastrarEstoque(dados);

            return result;
        }

        // api/Estoque/AdicionarItem
        [Route("AdicionarItem")]
        [HttpPost]
        public bool AdicionaItem(EstoqueProduto dados)
        {
            var result = _estoque.AdicionarProduto(dados);

            return result;
        }

        // api/Estoque/RemoverItem
        [Route("RemoverItem")]
        [HttpPost]
        public bool RemoverItem(EstoqueProduto dados)
        {
            if(dados.IdEstoque >= 1)
                dados.IdEstoque = 0;

            var result = _estoque.RemoverProduto(dados);

            return result;
        }

    }
}
