var express = require("express");
var router = express.Router();

var cadastroAdmController = require("../controllers/cadastroAdmController")

router.post("/cadastroAdm", function (req, res) {
     cadastroAdmController.cadastrarAdm(req, res);
});

module.exports = router;