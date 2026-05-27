const { buscarJson } = require("../s3/conexaoS3");

async function buscarDadosMonitor(req, res) {
  try {
    const empresa = req.params.empresa;
    const hospital = req.params.hospital;
    const unidade = req.params.unidade;
    const monitor = req.params.monitor;

    // console.log(
    //   `req.params \n EMPRESA: ${empresa}  \n HOSPITAL: ${hospital} \n UNIDADE: ${unidade} \n MONITOR: ${monitor} \n`,
    // );

    const key = `client/empresa_${empresa}/hospital_${hospital}/unidade_${unidade}/monitor_${monitor}`;

    console.log(`KEY: ${key}`);

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
        modulos: {
          bpm_status: "Inativo",
          pa_status: "Inativo",
          spo2_status: "Inativo",
          resp_status: "Inativo",
          temperatura_status: "Inativo",
          pic_status: "Inativo",
          pvc_status: "Inativo",
          ecg_status: "Inativo",
          etco2_status: "Inativo",
        },
      });
    }
    console.log("Erro ao buscar JSON");
    res.status(500).json({
        erro: erro.message,
        name: erro.name,
        stack: erro.stack
    });
  }
}

module.exports = {
  buscarDadosMonitor,
};
