var express = require("express");
var router = express.Router();

var cadastroFuncionarioController = require("../controllers/cadastroFuncionarioController")

router.post("/cadastrar", function (req, res) {
     cadastroFuncionarioController.cadastrar(req, res);
});

module.exports = router; 