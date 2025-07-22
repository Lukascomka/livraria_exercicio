var database = require("../database/config")


function buscarTodos() {
    console.log("ACESSEI O LIVRO MODEL - buscandoTodos \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n");



    var instrucaoSqlBuscarLivro = `
        select * from Livro
        left join Autor on FkidAutor = idAutor
        right join Estoque on FkidLivro = idLivro
        left join Venda on FkidEstoque = idEstoque;
        `;
    console.log("Executando a instrução SQL para buscar livros: \n" + instrucaoSqlBuscarLivro);
    database.executar(instrucaoSqlBuscarLivro);
    return database.executar(instrucaoSqlBuscarLivro);

}

// função que busca a quantidade de genero e mostra a soma
function buscarQuantidadeGenero() {
    var instrucaoSQLQuantidade = `
            select 
        Livro.genero,
        sum(Estoque.qtd_estoque) AS quantidade
            from
        Livro
            left join 
        Estoque on Livro.idLivro = Estoque.FkidLivro
            group by     
        Livro.genero
            order by 
        quantidade desc;

`;
console.log('executando a query para trazer quantidade de livros por genero');
database.executar(instrucaoSQLQuantidade);
return database.executar(instrucaoSQLQuantidade);
}




function buscarAutoresPreco() {
    var instrucaoSqlAutoresPreco = `
        select 
        	Autor.nome,
            Livro.nome,
            Venda.preco_venda
        		from
        		Livro
        		join Venda on Livro.idLivro = Venda.FkidLivro
                join Autor on Livro.FkidAutor = Autor.idAutor
                order by Venda.preco_venda desc
                limit 3;
    `;
    console.log("Executando a query para trazer os autores com maiores preço");
    database.executar(instrucaoSqlAutoresPreco);
    return database.executar(instrucaoSqlAutoresPreco);
}



function buscarQtd() {
    var instruSqlQuantidade = `
    select genero, count(*) as quantidade
        from Livro
        group by genero
        order by quantidade desc
        limit 1;
`;
    console.log("Executando a instrução SQL que busca a quantidade de valores: \n" + instruSqlQuantidade);
    database.executar(instruSqlQuantidade);
    return database.executar(instruSqlQuantidade);
}

function modificarVal(idSeleciona, novoPreco, novoEstoque) {
    novoPreco,
        novoEstoque

    var instrucaoSqlModficarValor = `
         update Estoque
    inner join Livro on Estoque.FkidLivro = Livro.idLivro
    inner join Venda on Venda.FkidEstoque = Estoque.idEstoque
    set Venda.preco_venda = ${novoPreco},
    Estoque.qtd_estoque = ${novoEstoque}
    where idLivro = ${idSeleciona};
    
    
    `;
    console.log("Executando a instrução SQL modificando valores: \n" + instrucaoSqlModficarValor);
    database.executar(instrucaoSqlModficarValor);
    return database.executar(instrucaoSqlModficarValor);
}
function buscarPeloId(idSeleciona) {

    var instrucaoSqlBuscarPeloId = `
        select * from Livro
            inner join Estoque on Estoque.FkidLivro = Livro.idLivro
            inner join Venda on Venda.FkidEstoque = Estoque.idEstoque
            where idLivro = ${idSeleciona}`;
    console.log("Executando a instrução SQL para buscar livro por id: \n " + instrucaoSqlBuscarPeloId);
    database.executar(instrucaoSqlBuscarPeloId);
    return database.executar(instrucaoSqlBuscarPeloId);
}



async function cadastrarLivro(
    nomeAutor,
    nomeLivro,
    precoVenda,
    precoCompra,
    qtdEstoque,
    genero,
    imgLink
) {
    console.log("ACESSEI O Cadastro de livro MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
        nomeAutor,
        nomeLivro,
        precoVenda,
        precoCompra,
        qtdEstoque,
        genero,
        imgLink);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSqlAutor = `
        insert into Autor (nome) VALUES ('${nomeAutor}');
    `;
    console.log("Executando a instrução SQL para Autor: \n" + instrucaoSqlAutor);
    resultadoAutor = await database.executar(instrucaoSqlAutor);
    idAutor = resultadoAutor.insertId;

    var instrucaoSqlLivro = `
        insert into Livro(nome, autor, genero,FkidAutor,sinopse) values('${nomeLivro}','${nomeAutor}', '${genero}',${idAutor}, '${imgLink}');
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
    cadastrarLivro,
    buscarTodos,
    buscarPeloId,
    modificarVal,
    buscarQtd,
    buscarAutoresPreco,
    buscarQuantidadeGenero
};