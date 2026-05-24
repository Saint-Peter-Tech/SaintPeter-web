var monitorModel = require("../models/monitorModel");

function cadastrarMonitor(req, res) {
  var fkUnidade = req.body.unidadeServer;
  var fkEmpresa = req.body.empresaServer;
  var componentes = req.body.componentesServer;
  var statusMonitor = req.body.statusServer;
  var dtFabricacao = req.body.dtFabricacaoServer;
  var dtManutencao = req.body.dtManutencaoServer;
  var fkModelo = req.body.modeloServer;

  monitorModel
    .cadastrarMonitor(
      fkUnidade,
      fkEmpresa,
      fkModelo,
      statusMonitor,
      dtFabricacao,
      dtManutencao,
    )
    .then(function (resultado) {
      var idMonitorCriado = resultado.insertId;
      for (var i = 0; i < componentes.length; i++) {
        monitorModel.vincularComponente(
          idMonitorCriado,
          componentes[i].id,
          componentes[i].limite,
        );
      }
      res.status(201).send("Monitor e componentes cadastrados com sucesso!");
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function listarNomesMonitores(req, res) {
  var fkEmpresa = req.query.fk_empresa;
  var fkUnidade = req.query.fk_unidade;

  monitorModel
    .listarNomesMonitores(fkEmpresa, fkUnidade)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function listarParametros(req, res) {
  var idComponente = req.query.id_componente;
  var fkMonitor = req.query.id_monitor;

  monitorModel
    .listarParametros(idComponente, fkMonitor)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function statusMonitor(req, res) {
  var idMonitor = req.query.id_monitor;
  var fkEmpresa = req.query.fk_empresa;

  monitorModel
    .statusMonitor(idMonitor, fkEmpresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function modeloMonitor(req, res) {
  var idMonitor = req.query.id_monitor;

  monitorModel
    .modeloMonitor(idMonitor)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function descricaoManutencao(req, res) {
  var idMonitor = req.query.id_monitor;

  monitorModel
    .descricaoManutencao(idMonitor)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function atualizarStatusMonitor(req, res) {
  var idMonitor = req.query.id_monitor;
  var statusNovo = req.body.atualizarStatus;
  var descricaoNovo = req.body.atualizarDescricao;

  monitorModel
    .atualizarStatusMonitor(idMonitor, statusNovo, descricaoNovo)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function atualizarLimites(req, res) {
  var fkMonitor = req.query.fk_monitor;
  var CompRede = req.body.CompRede;
  var CompRam = req.body.CompRam;
  var CompCpu = req.body.CompCpu;
  var CompDisco = req.body.CompDisco;

  console.log('ESTOU NO REQ.QUERY',req.query.fkMonitor);

  monitorModel
    .atualizarLimites(fkMonitor, CompRede, CompRam, CompCpu, CompDisco)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrarMonitor,
  listarNomesMonitores,
  listarParametros,
  statusMonitor,
  modeloMonitor,
  descricaoManutencao,
  atualizarStatusMonitor,
  atualizarLimites,
};
