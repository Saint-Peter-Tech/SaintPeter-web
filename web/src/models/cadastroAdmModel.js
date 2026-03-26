var database = require("../database/config");

function cadastrarAdm(nomeAdm, emailAdm, cpfAdm, senhaAdm, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeAdm, emailAdm, cpfAdm, senhaAdm, idEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
            INSERT INTO usuarios(nome, email, senha, cpf, ativo, fk_empresa) VALUES 
            ('${nomeAdm}', '${emailAdm}', '${senhaAdm}', '${cpfAdm}', 1, ${idEmpresa});
                    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrarAdm
};