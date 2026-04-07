var database = require("../database/config");

function cadastrarUnidade(fkHospital, cep, rua, numero, cidade, nome_unidade, email_responsavel, telefone_responsavel) {
    var instrucaoSql = `
        INSERT INTO unidades (fk_hospital, cep, rua, numero, cidade, nome_unidade, email_responsavel, telefone_responsavel) 
        VALUES (${fkHospital}, '${cep}', '${rua}', '${numero}', '${cidade}', '${nome_unidade}', '${email_responsavel}', '${telefone_responsavel}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUnidades(idHospital) {
    var instrucaoSql = `
        SELECT id_unidade, nome_unidade FROM unidades WHERE fk_hospital = ${idHospital}; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarUnidade,
    buscarUnidades
}