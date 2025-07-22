var express = require("express");
var router = express.Router();

var cadastrarLivroController = require("../controllers/cadastrarLivroController");

router.get('/buscarQtdLivro',function(req, res){
    cadastrarLivroController.qtdGenero(req, res)
})

router.get('/buscandoQuantidade', function(req, res){
    
    cadastrarLivroController.buscarQuantidade(req, res);
})
router.get('/BuscarAutores', function (req, res){
    cadastrarLivroController.buscarAutores(req, res);
})

router.get('/buscandoLivros', function (req, res){
    cadastrarLivroController.buscandoLivros(req, res);
})
router.get('/buscando/:idSeleciona', function (req, res){
    const idSeleciona = req.params.idSeleciona;
    console.log(idSeleciona, 'router buscando idSeleciona')
    cadastrarLivroController.buscandoId(req, res);
})

router.put('/modificandoValores/:idSeleciona', function (req, res){
    const idSeleciona = req.params.idSeleciona;
    console.error(idSeleciona,req.params.idSeleciona, 'router de modificar valores no banco')
    cadastrarLivroController.modificandoValores(req, res);
})

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/", function (req, res) {
    cadastrarLivroController.cadastrarLivro(req, res);
})

module.exports = router;