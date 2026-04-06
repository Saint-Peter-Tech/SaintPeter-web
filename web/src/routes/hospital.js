var express = require("express");
var router = express.Router();

var hospitalController = require("../controllers/hospitalController");

router.get("/buscarHospitais", function (req, res) {
    hospitalController.buscarHospitais(req, res);
})

module.exports = router;