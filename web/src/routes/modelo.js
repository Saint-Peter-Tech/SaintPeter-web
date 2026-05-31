var express = require("express");
var router = express.Router();

var modeloController = require("../controllers/modeloController");


router.post("/cadastrar", function (req, res) {
    modeloController.cadastrarModelo(req, res);
})

router.get("/listarModelos", function (req, res) {
    modeloController.buscarModelos(req, res);
})

router.get("/listarModelosPorNome", function (req, res) {
    modeloController.buscarModelosPorNome(req, res);
})

router.get("/buscarModelo/:idModelo", function (req, res) {
    modeloController.buscarModelo(req, res)
})

module.exports = router;