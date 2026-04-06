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


    unidadeModel
        .cadastrarUnidade(fkHospital, cep, rua, numero, cidade, unidade, emailResponsavel, telefoneResponsavel)
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
    cadastrarUnidade
};
