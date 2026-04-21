var express = require("express");
var router = express.Router();

var unidadeController = require("../controllers/unidadeController");


router.post("/cadastrar", function (req, res) {
    unidadeController.cadastrarUnidade(req, res);
})

router.get("/listarPorHospital", function (req, res) {
    unidadeController.buscarUnidades(req, res);
})

router.get("/unidadesPorEmpresa", function(req, res) {
    unidadeController.unidadesPorEmpresa(req, res);
})

module.exports = router;