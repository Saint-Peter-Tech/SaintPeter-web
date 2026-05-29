var express = require("express");
var router = express.Router();

var modeloController = require("../controllers/modeloS3Controller");

router.get("/:empresa", function (req, res) {
    modeloController.buscarModeloS3Json(req, res);
});

module.exports = router;