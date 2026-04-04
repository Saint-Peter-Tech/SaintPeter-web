var database = require("../database/config");

function buscarHospitais() {
    var instrucaoSql = 
    `SELECT id_hospital, nome_hospital FROM hospitais;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarHospitais
};