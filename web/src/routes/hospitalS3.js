var express = require("express");
var router = express.Router();

var hospitalS3Controller = require("../controllers/hospitalS3Controller");

router.get("/:empresa/:hospital", function (req, res) {
    hospitalS3Controller.buscarHospitalJson(req, res);
});

module.exports = router;