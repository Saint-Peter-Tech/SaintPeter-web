var express = require("express");
var router = express.Router();

var analistaS3Controller = require("../controllers/analistaS3Controller");

router.get("/:empresa", function (req, res) {
    analistaS3Controller.buscarControleJson(req, res);
});

module.exports = router;