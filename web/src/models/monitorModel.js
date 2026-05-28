var database = require("../database/config");

function cadastrarMonitor(
  fkUnidade,
  fkEmpresa,
  fkModelo,
  status_monitor,
  dtFabricacao,
  dtManutencao,
) {
  var instrucaoSql = `
        INSERT INTO monitores (fk_unidade, fk_empresa, fk_modelo, dtFabricacao, dtManutencao, status_monitor) 
        VALUES (${fkUnidade}, ${fkEmpresa}, ${fkModelo}, '${dtFabricacao}', '${dtManutencao}', '${status_monitor}');
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

function listarNomesMonitores(fkEmpresa, fkUnidade) {
  var instrucaoSql = `
    select id_monitor from monitores where fk_empresa = ${fkEmpresa} and fk_unidade = ${fkUnidade};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarParametros(idComponente, fkMonitor) {
  var instrucaoSql = `
    select limite from componente_monitor where fk_monitor = ${fkMonitor} and fk_componente = ${idComponente};
    `;

  console.log("Executando a instrução SQL: \n " + instrucaoSql);
  return database.executar(instrucaoSql);
}

function statusMonitor(idMonitor, fkEmpresa) {
  var instrucaoSql = `
    select status_monitor from monitores where id_monitor = '${idMonitor}' and fk_empresa = '${fkEmpresa}';
  `;

  console.log("Executando a instrução SQL: \n " + instrucaoSql);
  return database.executar(instrucaoSql);
}

function modeloMonitor(idMonitor) {
  var instrucaoSql = `
    select modelos.nome
		  from monitores
		  join modelos 
		  on id_modelo =  fk_modelo
		  where id_monitor = ${idMonitor};
  `;

  console.log("Executando a instrução SQL: \n " + instrucaoSql);
  return database.executar(instrucaoSql);
}

function descricaoManutencao(idMonitor) {
  var instrucaoSql = `
  select descricao_manutencao from monitores where id_monitor = '${idMonitor}';
  `;
  console.log("Executando a instrução SQL: \n " + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarStatusMonitor(idMonitor, statusNovo, descricaoNovo) {
  if (descricaoNovo == "Nenhuma") {
    var instrucaoSql = `UPDATE monitores
    SET status_monitor = '${statusNovo}'
    WHERE id_monitor = '${idMonitor}';`;
  } else {
    var instrucaoSql = `UPDATE monitores
    SET descricao_manutencao = '${descricaoNovo}', status_monitor = '${statusNovo}'
    WHERE id_monitor = '${idMonitor}';`;
  }

  console.log("Executando a instrução SQL: \n " + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarLimites(fkMonitor, CompRede, CompRam, CompCpu, CompDisco) {
  /*
    1 = cpu
    2 - ram
    4 - disco
    5 - rede
  */

  var componentes = '';

  var instrucaoSql = ` UPDATE componente_monitor
		                  SET limite = CASE `;
  if (CompCpu != "") {
    instrucaoSql += `WHEN fk_componente = 1 THEN ${CompCpu} `;
    componentes += '1, ';
  }

  if (CompRam != "") {
    instrucaoSql += `WHEN fk_componente = 2 THEN ${CompRam} `;
    componentes += '2, ';
  }

  if (CompDisco != "") {
    instrucaoSql += `WHEN fk_componente = 4 THEN ${CompDisco} `;
    componentes += '4, ';
  }

  if (CompRede != "") {
    instrucaoSql += `WHEN fk_componente = 5 THEN ${CompRede} `;
    componentes += '5,';
  }

  componentes = componentes.substring(0, componentes.length - 1)

  instrucaoSql += `END
		              WHERE fk_monitor = '${fkMonitor}'
		              AND fk_componente IN (${componentes});`;


  console.log("Executando a instrução SQL: \n " + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarMonitores(fkEmpresa) {
  var instrucaoSql = `
        SELECT 
            m.id_monitor, 
            u.nome_unidade 
        FROM monitores m
        JOIN unidades u ON m.fk_unidade = u.id_unidade
        WHERE m.fk_empresa = ${fkEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrarMonitor,
  vincularComponente,
  listarNomesMonitores,
  listarParametros,
  statusMonitor,
  modeloMonitor,
  descricaoManutencao,
  atualizarStatusMonitor,
  atualizarLimites,
  listarMonitores,
};
