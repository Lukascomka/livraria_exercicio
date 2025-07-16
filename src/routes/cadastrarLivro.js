var express = require("express");
var router = express.Router();

var cadastrarLivroController = require("../controllers/cadastrarLivroController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/", function (req, res) {
    cadastrarLivroController.cadastrarLivro(req, res);
})


module.exports = router;