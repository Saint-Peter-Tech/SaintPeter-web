const { buscarJson } = require("../s3/conexaoS3");

async function buscarMonitorJson(req, res) {
  try {
    const empresa = req.params.empresa;
    const hospital = req.params.hospital;
    const unidade = req.params.unidade;
    const monitor = req.params.monitor;

    const key = `client/empresa_${empresa}/hospital_${hospital}/unidade_${unidade}/monitor_${monitor}.json`;

    const dados = await buscarJson(key);
    res.json(dados);
  } catch (erro) {
    if (erro.Code == "NoSuchKey" || erro.name == "NoSuchKey") {
      return res.json({
        cpu: {
          usoCpuPercent: 0,
          cpuPico: 0,
        },
        ram: {
          usoRamPercent: 0,
          ramPico: 0,
        },
        disco: {
          diskUsed: 0,
          diskTotal: 0,
        },
        rede: {
          upload: 0,
          download: 0,
          trafegoTotal: 0,
        },
        limites: {
          limiteCpu: 0,
          limiteRam: 0,
          limiteDisco: 0,
          limiteRede: 0,
        },
      });
    }
    res.status(500).json({ erro: "Erro ao buscar JSON" });
  }
}

module.exports = {
  buscarMonitorJson,
};
