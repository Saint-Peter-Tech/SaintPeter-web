var unidadeModel = require("../models/unidadeModel");

function cadastrarUnidade(req, res) {
    var fkHospital = req.body.fkHospitalServer
    var cep = req.body.cepServer
    var rua = req.body.ruaServer
    var numero = req.body.numeroServer
    var cidade = req.body.cidadeServer
    var unidade = req.body.unidadeServer
    var emailResponsavel = req.body.emailResponsavelServer
    var telefoneResponsavel = req.body.telefoneResponsavelServer
    var redeTotal = req.body.redeTotalServer


    unidadeModel
        .cadastrarUnidade(fkHospital, cep, rua, numero, cidade, unidade, emailResponsavel, telefoneResponsavel, redeTotal)
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

function buscarUnidades(req, res) {
  var idHospital = req.query.idHospital;

  unidadeModel.buscarUnidades(idHospital)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function unidadesPorEmpresa(req, res) {
    var fk_Empresa = req.query.fk_Empresa;

    unidadeModel.unidadesPorEmpresa(fk_Empresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    cadastrarUnidade,
    buscarUnidades,
    unidadesPorEmpresa
};
