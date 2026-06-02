var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/autenticaremail", function (req, res) {
    usuarioController.autenticaremail(req, res);
});

router.post("/autenticarcpf", function (req, res) {
    usuarioController.autenticarcpf(req, res);
});

router.get("/listarFuncionarios", function (req, res) {
    usuarioController.listarFuncionariosPorEmpresa(req, res);
});

router.get("/buscarIdUnidade", function (req, res) {
    usuarioController.buscarIdUnidade(req, res);
});

module.exports = router;