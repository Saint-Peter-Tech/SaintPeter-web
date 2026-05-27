var database = require("../database/config");

function cadastrarUnidade(fkHospital, cep, rua, numero, cidade, latitude, longitude, nome_unidade, email_responsavel, telefone_responsavel, rede_total) {
    var instrucaoSql = `
        INSERT INTO unidades (fk_hospital, cep, rua, numero, cidade, latitude, longitude, nome_unidade, email_responsavel, telefone_responsavel, rede_total) 
        VALUES (${fkHospital}, '${cep}', '${rua}', '${numero}', '${cidade}', ${latitude}, ${longitude}, '${nome_unidade}', '${email_responsavel}', '${telefone_responsavel}', ${rede_total});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUnidades(idHospital) {
    var instrucaoSql = `
        SELECT id_unidade, nome_unidade, latitude, longitude FROM unidades WHERE fk_hospital = ${idHospital}; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function unidadesPorEmpresa(fk_Empresa) {
    var instrucaoSql = `
        SELECT u.id_unidade, u.nome_unidade, u.latitude, u.longitude 
        FROM unidades u 
        JOIN hospitais h ON u.fk_hospital = h.id_hospital 
        WHERE h.fk_empresa = ${fk_Empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarUnidade,
    buscarUnidades,
    unidadesPorEmpresa
};