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

        // GET: api/Produto/5
        [HttpGet]
        [Route("{idProduto}")]
        public bool Apagar(int idProduto)
        {
            var result = _produto.RemoverProduto(idProduto);

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
