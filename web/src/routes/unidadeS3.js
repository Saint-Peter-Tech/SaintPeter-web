var express = require("express");
var router = express.Router();
var unidadeS3Controller = require("../controllers/unidadeS3Controller");

router.get("/:empresa/:hospital/:unidade", function (req, res) {
    unidadeS3Controller.buscarUnidadeJson(req, res);
});



module.exports = router;