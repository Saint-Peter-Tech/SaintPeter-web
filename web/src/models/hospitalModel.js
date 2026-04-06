var database = require("../database/config");

function buscarHospitais() {
    var instrucaoSql = 
    `SELECT nome_hospital FROM hospitais
    where fk_empresa = ${sessionStorage.FK_EMPRESA}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarHospitais
};