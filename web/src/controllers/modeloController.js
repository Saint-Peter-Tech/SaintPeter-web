var modeloModel = require("../models/modeloModel");

function cadastrarModelo(req, res) {
    var nomeModelo = req.body.modeloServer
    var dataLancamento = req.body.dataServer
    var descricao = req.body.descricaoServer
    var fkEmpresa = req.body.fkEmpresaServer

    modeloModel
        .cadastrarModelo(nomeModelo, dataLancamento, descricao, fkEmpresa)
        .then(function (resultado) {
            res.json({ id: resultado.insertId });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage,
            );
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarModelos(req, res) {
  var fkEmpresa = req.query.fkEmpresa
  modeloModel.buscarModelos(fkEmpresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarModelosPorNome(req, res) {
  var fkEmpresa = req.query.fkEmpresa
  modeloModel.buscarModelos(fkEmpresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarModelo(req, res) {
  var idModelo = req.params.idModelo
  modeloModel.buscarModelo(idModelo)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    cadastrarModelo,
    buscarModelos,
    buscarModelosPorNome,
    buscarModelo
};
