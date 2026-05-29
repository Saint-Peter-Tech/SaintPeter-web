var express = require("express");
var router = express.Router();

var monitorController = require("../controllers/monitorController");


router.post("/cadastrarMonitor", function (req, res) {
    monitorController.cadastrarMonitor(req, res);
})

router.get("/listarNomesMonitores", function(req, res){
    monitorController.listarNomesMonitores(req, res)
})


router.get("/listarParametros", function(req, res){
    monitorController.listarParametros(req,res)
})

router.get("/statusMonitor", function(req, res){
    monitorController.statusMonitor(req, res)
})

router.get("/modeloMonitor", function(req, res){
    monitorController.modeloMonitor(req, res)
})

router.get("/descricaoManutencao", function(req, res){
    monitorController.descricaoManutencao(req,res)
})


router.put("/atualizarStatusMonitor", function(req, res){
    monitorController.atualizarStatusMonitor(req, res)
})

router.put("/atualizarLimites", function(req,res){
    monitorController.atualizarLimites(req,res)
})

router.get("/listarMonitores/:fkEmpresa", function (req, res) {
    monitorController.listarMonitores(req, res);
});

module.exports = router; 