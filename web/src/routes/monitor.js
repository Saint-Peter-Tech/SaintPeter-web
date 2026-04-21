var express = require("express");
var router = express.Router();

var monitorController = require("../controllers/monitorController");


router.post("/cadastrarMonitor", function (req, res) {
    monitorController.cadastrarMonitor(req, res);
})


module.exports = router;