var database = require("../database/config");

function cadastrarMonitor(fkUnidade, fkEmpresa, status_monitor) {
    var instrucaoSql = `
        INSERT INTO monitores (fk_unidade, fk_empresa, status_monitor) 
        VALUES (${fkUnidade}, ${fkEmpresa}, '${status_monitor}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function vincularComponente(idMonitor, idComponente, limite) {
    var instrucaoSql = `
        INSERT INTO componente_monitor (fk_monitor, fk_componente, limite) 
        VALUES (${idMonitor}, ${idComponente}, ${limite});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarMonitor,
    vincularComponente
};