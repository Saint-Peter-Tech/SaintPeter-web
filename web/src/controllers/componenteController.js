var componenteModel = require("../models/componenteModel");

function buscarComponentes(req, res) {
  componenteModel.buscarComponentes()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarComponentes
};
