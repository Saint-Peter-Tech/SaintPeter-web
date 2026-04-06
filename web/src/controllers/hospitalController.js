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

module.exports = {
  buscarHospitais
};