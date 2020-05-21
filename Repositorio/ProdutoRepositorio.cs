using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using ProjetoCoreAngular.Models;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace ProjetoCoreAngular.Repositorio
{
    public class IdProduto
    {
        public int Id { get; set; }
    }

    public class ProdutoRepositorio : IProdutoRepositorio
    {
        IConfiguration _configuracao;
        public ProdutoRepositorio(IConfiguration configuracao)
        {
            _configuracao = configuracao;
        }

        private string _Connection()
        {
            var connection = _configuracao.GetSection("ConnectionStrings").GetSection("LocalHostConnection").Value;

            return connection;
        }

        public bool InserirProduto(Produto cadastrar)
        {
            var db = _Connection();
            bool result;
            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"INSERT INTO Produtos(Nome,Marca,Categoria,Modelo,PrecoUnitario,Quantidade)
                                         VALUES (@Nome,@Marca,@Categoria,@Modelo,@PrecoUnitario,@Quantidade)";
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

        public bool RemoverProduto(int id)
        {
            var db = _Connection();
            bool result;
            var paramentro = new IdProduto(){ Id = id };
            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"DELETE FROM Produtos Where Id = @id";
                    con.Open();
                    var retorno = con.Execute(query,paramentro);
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

        public bool AtualizarProduto(Produto atualizar)
        {
            var db = _Connection();
            bool result;
            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"UPDATE Produtos
                                       SET Nome = @Nome
                                          ,Marca = @Marca
                                          ,Categoria = @Categoria
                                          ,Modelo = @Modelo
                                          ,PrecoUnitario = @PrecoUnitario
                                          ,Quantidade = @Quantidade
                                     WHERE Id = @Id";
                    con.Open();
                    var retorno = con.Execute(query, atualizar);
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

        public List<Produto> RetornarProdutos()
        {
            var db = _Connection();
            List<Produto> produtos = new List<Produto>();

            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"SELECT * FROM Produtos";
                    con.Open();
                    produtos = con.Query<Produto>(query).ToList();
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

        public List<Produto> RetornarProduto(int id)
        {
            var db = _Connection();
            var paramentro = new IdProduto() { Id = id };
            List<Produto> produto = new List<Produto>();

            using (var con = new SqlConnection(db))
            {
                try
                {
                    var query = @"SELECT * FROM Produtos WHERE Id=@id";
                    con.Open();
                    produto = con.Query<Produto>(query, paramentro).ToList();
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

            return produto;
        }
    }
}
