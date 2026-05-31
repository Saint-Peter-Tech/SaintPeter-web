var express = require("express");
var router = express.Router();

var modularController = require("../controllers/moduloS3Controller");

router.get("/:empresa/:modelo", function (req, res) {
    modularController.buscarModeloJson(req, res);
});

module.exports = router;