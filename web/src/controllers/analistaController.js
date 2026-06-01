var analistaModel = require("../models/analistaModel");

function kpiMonitorIndisponivel(req, res) {

    analistaModel.kpiMonitorIndisponivel()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listaMonitorIndisponivel(req, res) {

    analistaModel.listaMonitorIndisponivel()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    kpiMonitorIndisponivel,
    listaMonitorIndisponivel
};