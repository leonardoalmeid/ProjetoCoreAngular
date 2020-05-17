using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjetoCoreAngular.Models;

namespace ProjetoCoreAngular.Repositorio
{
    public interface IUsuarioRepositorio
    {
        bool CadastrarUsuario(CadastrarUsuario cadastrar);
        List<Usuario> ConsultarUsuarios();
        Usuario Get(int id);
        int Edit(CadastrarUsuario atualizar);
        int Delete(int id);
    }
}
