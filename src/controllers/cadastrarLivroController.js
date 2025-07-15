var cadastrarLivro  = require("../models/cadastrarLivroModel");



function cadastrarLivro(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeAutor = req.body.nomeAutor;
    var nomeLivro = req.body.nomeLivro;
    var precoVenda = req.body.precoVenda;
    var precoCompra = req.body.precoCompra;
    var qtdEstoque = req.body.qtdEstoque;
    var genero = req.body.genero;




    // Faça as validações dos valores
    if (nomeAutor == undefined) {
        res.status(400).send("nome autor está undefined!");
    } else if(nomeLivro == undefined){
        res.status(400).send('nome do livro esta undefined')
    }
    else if (precoVenda == undefined) {
        res.status(400).send("preco venda está undefined!");
    } else if (precoCompra == undefined) {
        res.status(400).send("Preço de compra está undefined!");
    } else if (qtdEstoque == undefined) {
        res.status(400).send("Quantidade de estoque está undefined!");
    } else if (genero == undefined){
        res.status(400).send("Seu gênero está undefined!");
    }
    else{

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        cadastrarLivro.cadastrarLivro(nomeAutor, nomeLivro, precoVenda, precoCompra, qtdEstoque, genero)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    
    cadastrarLivro
}