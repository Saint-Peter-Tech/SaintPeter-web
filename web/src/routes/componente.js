var express = require("express");
var router = express.Router();

var componenteController = require("../controllers/componenteController");

router.get("/buscarComponentes", function (req, res) {
    componenteController.buscarComponentes(req, res);
})

module.exports = router;