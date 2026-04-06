var database = require("../database/config");

function buscarHospitais() {
    var instrucaoSql =
        `SELECT id_hospital, nome_hospital FROM hospitais`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarHospital(nomeHospital, cnpjHospital, telefoneHospital, fkEmpresa) {
    var instrucaoSql = `
        INSERT INTO hospitais (nome_hospital, cnpj_hospital, telefone_hospital, fk_empresa) 
        VALUES ('${nomeHospital}', '${cnpjHospital}', '${telefoneHospital}', ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarHospitais,
    cadastrarHospital
};