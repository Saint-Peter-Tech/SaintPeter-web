var database = require("../database/config")

// function autenticaremail(email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
//     var instrucaoSql = `
//         SELECT id_usuario, nome_usuario, email, cpf, fk_adm, fk_empresa FROM usuarios WHERE email = '${email}' AND senha = '${senha}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }


// function autenticarcpf(cpf, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cpf, senha)
//     var instrucaoSql = `
//         SELECT id_usuario, nome_usuario, email, cpf, fk_adm, fk_empresa FROM usuarios WHERE cpf = '${cpf}' AND senha = '${senha}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

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
        SELECT DISTINCT id_monitor, nome_unidade
        FROM 
        monitores JOIN empresas
        ON monitores.fk_empresa = empresas.id_empresa
        JOIN hospitais
        ON empresas.id_empresa = hospitais.fk_empresa
        JOIN unidades
        ON hospitais.id_hospital = unidades.fk_hospital
        WHERE status_monitor = "Inativo";
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    kpiMonitorIndisponivel,
    listaMonitorIndisponivel
};