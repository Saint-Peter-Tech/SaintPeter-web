var database = require("../database/config")

function kpiMonitorIndisponivel() {
    var instrucaoSql = `
        SELECT COUNT(id_monitor) AS quantidade
        FROM monitores 
        WHERE status_monitor = 'Inativo';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listaMonitorIndisponivel() {
    var instrucaoSql = `
        SELECT id_monitor, nome_unidade
        FROM 
        monitores JOIN unidades
        ON monitores.fk_unidade = unidades.id_unidade
        JOIN hospitais
        ON unidades.fk_hospital = hospitais.id_hospital
        WHERE status_monitor = "Inativo";
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    kpiMonitorIndisponivel,
    listaMonitorIndisponivel
};