var database = require("../database/config");

function cadastrarModelo(nomeModelo, dataLancamento, descricao, fkEmpresa) {
    var instrucaoSql = `
        INSERT INTO modelos (nome, dtLancamento, descricao, fk_empresa) 
        VALUES ('${nomeModelo}', '${dataLancamento}', '${descricao}', ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarModelos(fkEmpresa) {
    var instrucaoSql = `
        SELECT id_modelo, nome, DATE_FORMAT(dtLancamento, '%d/%m/%Y') AS dtLancamento, descricao FROM modelos
        WHERE fk_empresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarModelosPorNome(fkEmpresa) {
    var instrucaoSql = `
        SELECT nome FROM modelos WHERE fk_empresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarModelo,
    buscarModelos,
    buscarModelosPorNome
}