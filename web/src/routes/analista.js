var express = require("express");
var router = express.Router();

var analistaController = require("../controllers/analistaController");

router.get("/kpiMonitorIndisponivel", function (req, res) {
    analistaController.kpiMonitorIndisponivel(req, res);
});

router.get("/listaMonitorIndisponivel", function (req, res) {
    analistaController.listaMonitorIndisponivel(req, res);
});

module.exports = router;