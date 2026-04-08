var monitorModel = require("../models/monitorModel");

function cadastrarMonitor(req, res) {
    var fkUnidade = req.body.unidadeServer;
    var fkEmpresa = req.body.empresaServer;
    var componentes = req.body.componentesServer; 
    var statusMonitor = req.body.statusServer;

    monitorModel.cadastrarMonitor(fkUnidade, fkEmpresa, statusMonitor)
        .then(function (resultado) {
            var idMonitorCriado = resultado.insertId;
            for (var i = 0; i < componentes.length; i++) {
                monitorModel.vincularComponente(idMonitorCriado, componentes[i].id, componentes[i].limite);
            }
            res.status(201).send("Monitor e componentes cadastrados com sucesso!");
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrarMonitor
};