var cadastroEmpresaModel = require("../models/cadastroEmpresaModel");

function cadastrarEmpresa(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nomeEmpresa = req.body.nomeEmpresaServer;
  var emailEmpresa = req.body.emailEmpresaServer;
  var cnpjEmpresa = req.body.cnpjEmpresaServer;
  var telefoneEmpresa = req.body.telefoneEmpresaServer;


  // Faça as validações dos valores
  if (nomeEmpresa == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (emailEmpresa == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cnpjEmpresa == undefined) {
    res.status(400).send("Seu cnpj está undefined!");
  } else if (telefoneEmpresa == undefined) {
    res.status(400).send("O telefone da empresa está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    cadastroEmpresaModel
      .cadastrarEmpresa(nomeEmpresa, emailEmpresa, cnpjEmpresa, telefoneEmpresa)
      .then(function (resultado) {
        res.json({id: resultado.insertId});
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
  cadastrarEmpresa
};
