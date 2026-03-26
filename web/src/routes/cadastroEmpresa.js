var express = require("express");
var router = express.Router();

var cadastroEmpresaController = require("../controllers/cadastroEmpresaController")

router.post("/cadastrar", function (req, res) {
     cadastroEmpresaController.cadastrarEmpresa(req, res);
});

module.exports = router; 