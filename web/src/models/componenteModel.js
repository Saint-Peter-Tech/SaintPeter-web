var database = require("../database/config");

function buscarComponentes() {
    var instrucaoSql = `
        SELECT id_componente, nome_componente FROM componentes; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarComponentes
}