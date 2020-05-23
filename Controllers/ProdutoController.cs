using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ProjetoCoreAngular.Models;
using ProjetoCoreAngular.Repositorio;

namespace ProjetoCoreAngular.Controllers
{
    [Route("api/Produto")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        IProdutoRepositorio _produto;
        public ProdutoController(IProdutoRepositorio produto)
        {
            _produto = produto;
        }
        
        [HttpGet]
        public IEnumerable<Produto> ConsultarProdutos()
        {
            var produtos = _produto.RetornarProdutos();

            return produtos;
        }

        [HttpGet]
        [Route("ProdutoSemEstoque")]
        public IEnumerable<Produto> ConsultarProdutosSemEstoque()
        {
            var produtos = _produto.RetornarProdutosSemEstoque();

            return produtos;
        }

        // GET: api/Produto/5
        [HttpGet]
        [Route("Apagar/{idProduto}")]
        public bool Apagar(int idProduto)
        {
            var result = _produto.RemoverProduto(idProduto);

            return result;
        }

        [HttpGet]
        [Route("{idProduto}")]
        public List<Produto> Consultar(int idProduto)
        {
            var result = _produto.RetornarProduto(idProduto);

            return result;
        }

        [HttpPost]
        [Route("Cadastrar")]
        public bool Cadastrar(Produto dados)
        {
            var result = _produto.InserirProduto(dados);

            return result;
        }

        // PUT: api/Produto/5
        [HttpPut]
        [Route("Atualizar")]
        public bool Atualizar(Produto dados, int idProduto)
        {
            var result = _produto.AtualizarProduto(dados);

            return result;
        }
    }
}
