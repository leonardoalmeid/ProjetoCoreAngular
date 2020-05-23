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
    public class EstoqueRepositorio : IEstoqueRepositorio
    {
        IConfiguration _configuracao;
        public EstoqueRepositorio(IConfiguration configuracao)
        {
            _configuracao = configuracao;
        }

        public bool AdicionarProduto(EstoqueProduto dados)
        {
            var db = _Connection();
            bool retorno;

            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"UPDATE Produtos
                                       SET Estoque = @idEstoque
                                     WHERE Id = @idProduto";
                    con.Open();
                    var retornoConsulta = con.Execute(query, dados);
                    if (retornoConsulta >= 1)
                    {
                        retorno = true;
                    }
                    else
                    {
                        retorno = false;
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

            return retorno;
        }

        public bool CadastrarEstoque(Estoque estoque)
        {
            var db = _Connection();
            bool result;
            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"INSERT INTO Estoques(Nome)
                                    VALUES (@Nome)";
                    con.Open();
                    var retorno = con.Execute(query, estoque);
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

        public List<Produto> ConsutarProdutosEmEstoque(int id)
        {
            var db = _Connection();
            var paramentro = new IdProduto() { Id = id };
            List<Produto> produtos = new List<Produto>();

            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"SELECT * FROM Produtos WHERE Estoque = @id";
                    con.Open();
                    produtos = con.Query<Produto>(query,paramentro).ToList();

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

            return produtos;
        }

        public bool RemoverEstoque(int id)
        {
            var db = _Connection();
            bool result;
            var paramentro = new IdProduto() { Id = id };
            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"DELETE FROM Estoques Where Id = @id";
                    con.Open();
                    var retorno = con.Execute(query, paramentro);
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

        public bool RemoverProduto(EstoqueProduto dados)
        {
            var db = _Connection();
            bool retorno;

            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"UPDATE Produtos
                                       SET Estoque = @idEstoque
                                     WHERE Id = @idProduto";
                    con.Open();
                    var retornoConsulta = con.Execute(query, dados);
                    if (retornoConsulta >= 1)
                    {
                        retorno = true;
                    }
                    else
                    {
                        retorno = false;
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

            return retorno;
        }

        public List<Estoque> RetornarEstoques()
        {
            var db = _Connection();
            List<Estoque> estoques = new List<Estoque>();

            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"SELECT
			                            P.Id,
                                        P.Nome,
                                        (SELECT
                                            COUNT(C.Estoque)
                                        FROM
                                            Produtos C
                                        WHERE
                                            C.Estoque = P.Id ) AS Quantidade
                                    FROM
                                        Estoques P";
                    con.Open();
                    estoques = con.Query<Estoque>(query).ToList();
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

            return estoques;
        }

        private string _Connection()
        {
            var connection = _configuracao.GetSection("ConnectionStrings").GetSection("LocalHostConnection").Value;

            return connection;
        }


    }
}
