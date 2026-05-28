var express = require("express");
var router = express.Router();

var analistaController = require("../controllers/analistaController");

// router.post("/kpiMonitorIndisponivel", function (req, res) {
//     analistaController.kpiMonitorIndisponivel(req, res);
// });

router.get("/kpiMonitorIndisponivel", function (req, res) {
    analistaController.kpiMonitorIndisponivel(req, res);
});

module.exports = router;