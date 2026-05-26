var express = require("express");
var router = express.Router();

var monitorS3Controller = require("../controllers/monitorS3Controller");

router.get("/:empresa/:hospital/:unidade/:monitor", function (req, res) {
    monitorS3Controller.buscarDadosMonitor(req, res);
});

module.exports = router;