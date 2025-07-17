var database = require("../database/config")

async function cadastrarLivro(
    nomeAutor,
    nomeLivro,
    precoVenda,
    precoCompra,
    qtdEstoque,
    genero
) {
    console.log("ACESSEI O Cadastro de livro MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
        nomeAutor,
        nomeLivro,
        precoVenda,
        precoCompra,
        qtdEstoque,
        genero);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSqlAutor = `
        insert into Autor (nome) VALUES ('${nomeAutor}');
    `; 
    console.log("Executando a instrução SQL para Autor: \n" + instrucaoSqlAutor);
    resultadoAutor = await database.executar(instrucaoSqlAutor);
       idAutor = resultadoAutor.insertId;

    var instrucaoSqlLivro = `
        insert into Livro(nome, autor, genero,FkidAutor) values('${nomeLivro}','${nomeAutor}', '${genero}',${idAutor});
    `;
    console.log("Executando a instrução SQL para Livro: \n" + instrucaoSqlLivro);
    resultadoLivro = await database.executar(instrucaoSqlLivro);
   
    idLivro = resultadoLivro.insertId;

    var instrucaoSqlEstoque = `  
        insert into Estoque(qtd_estoque, preco_compra,FkidLivro)values(${qtdEstoque},${precoCompra},${idLivro});  
    `;
    console.log("Executando a instrução SQL para Estoque: \n" + instrucaoSqlEstoque);
    resultadoEstoque = await database.executar(instrucaoSqlEstoque);
    idEstoque = resultadoEstoque.insertId;

    var instrucaoSqlVenda = `
        insert into Venda(FkidLivro, FkidEstoque,preco_venda)values(${idLivro}, ${idEstoque},${precoVenda});
    `;
    console.log("Executando a instrução SQL para Venda: \n" + instrucaoSqlVenda);
    await database.executar(instrucaoSqlVenda);
    
}


module.exports = {
    cadastrarLivro
};