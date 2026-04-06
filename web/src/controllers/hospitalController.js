var hospitalModel = require("../models/hospitalModel");

function buscarHospitais(req, res) {
  hospitalModel.buscarHospitais()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarHospital(req, res) {
  var nomeHospital = req.body.nomeHospitalServer
  var cnpjHospital = req.body.cnpjServer
  var telefoneHospital = req.body.telefoneHospitalServer
  var fkEmpresa = req.body.fkEmpresaServer


  hospitalModel
    .cadastrarHospital(nomeHospital, cnpjHospital, telefoneHospital, fkEmpresa)
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

module.exports = {
  buscarHospitais,
  cadastrarHospital
};