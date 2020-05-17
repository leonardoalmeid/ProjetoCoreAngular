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
    [Route("api/Usuario")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        IUsuarioRepositorio _usuario;
        public UsuarioController(IUsuarioRepositorio usuario)
        {
            _usuario = usuario;
        }

        [HttpGet]
        public IEnumerable<Usuario> Get()
        {
            var result = _usuario.ConsultarUsuarios();

            return result;
        }

        // POST: api/Usuario
        [Route("Cadastrar")]
        [HttpPost]
        public bool Post(CadastrarUsuario dados)
        {
            var result = _usuario.CadastrarUsuario(dados);

            return result;
        }
    }
}
