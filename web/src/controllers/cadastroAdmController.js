var cadastroAdmModel = require("../models/cadastroAdmModel");

function cadastrarAdm(req, res) {
  console.log("Body recebido:", req.body)

  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nomeAdm = req.body.nomeAdmServer;
  var emailAdm = req.body.emailAdmServer;
  var cpfAdm = req.body.cpfAdmServer;
  var senhaAdm = req.body.senhaAdmServer;
  var idEmpresa = req.body.idEmpresaServer;

  // Faça as validações dos valores
  if (nomeAdm == undefined) {
    res.status(400).send("Seu nome adm está undefined!");
  } else if (emailAdm == undefined) {
    res.status(400).send("Seu email adm está undefined!");
  } else if (cpfAdm == undefined) {
    res.status(400).send("Seu cpf adm está undefined!");
  } else if (senhaAdm == undefined) {
    res.status(400).send("Sua senha adm está undefined!");
  } else if (idEmpresa == undefined) {
    res.status(400).send("O id da empresa está undefined!");
  } else {

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
  cadastroAdmModel
    .cadastrarAdm(nomeAdm, emailAdm, cpfAdm, senhaAdm, idEmpresa)
    .then(function (resultado) {
      res.json({
        id_usuario: resultado.id_usuario,
        fk_empresa: resultado.id_empresa
      });
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
}

module.exports = {
  cadastrarAdm
};
