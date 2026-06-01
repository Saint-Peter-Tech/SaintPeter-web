var express = require("express");
var router = express.Router();

var modeloController = require("../controllers/modeloS3Controller");

router.get("/:empresa", function (req, res) {
    modeloController.buscarModeloS3Json(req, res);
});

router.get("/relatorio/:empresa", function (req, res) {
    modeloController.buscarRelatorio(req,res);
})

module.exports = router;