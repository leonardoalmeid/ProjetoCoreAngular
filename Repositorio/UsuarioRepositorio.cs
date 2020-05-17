using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using ProjetoCoreAngular.Models;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace ProjetoCoreAngular.Repositorio
{
    public class UsuarioRepositorio : IUsuarioRepositorio
    {
        IConfiguration _configuracao;
        public UsuarioRepositorio(IConfiguration configuracao)
        {
            _configuracao = configuracao;
        }

        private string _Connection()
        {
            var connection = _configuracao.GetSection("ConnectionStrings").GetSection("LocalHostConnection").Value;

            return connection;
        }

        public List<Usuario>ConsultarUsuarios()
        {
            var db = _Connection();
            List<Usuario> usuarios = new List<Usuario>();

            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"SELECT * FROM Usuarios";
                    con.Open();
                    usuarios = con.Query<Usuario>(query).ToList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    con.Close();
                }
            }

            return usuarios;
        }

        public bool CadastrarUsuario(CadastrarUsuario cadastrar)
        {
            var db = _Connection();
            bool result;
            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"INSERT INTO Usuarios (Nome,Cpf,Email,Telefone,Endereco,DtCadastro,Senha)
                                    VALUES (@Nome,@Cpf,@Email,@Telefone,@Endereco,GETDATE(),@Senha)";
                    con.Open();
                    var retorno = con.Execute(query, cadastrar);
                    if (retorno >= 1)
                    {
                        result = true;
                    }
                    else
                    {
                        result = false;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    con.Close();
                }
            }

            return result;
        }

        public Usuario Get(int id)
        {
            throw new NotImplementedException();
        }

        public int Edit(CadastrarUsuario atualizar)
        {
            throw new NotImplementedException();
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
