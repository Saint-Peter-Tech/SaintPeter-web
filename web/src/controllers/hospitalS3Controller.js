const { buscarJson } = require("../s3/conexaoS3");

async function buscarHospitalJson(req, res) {
    try {
        const empresa = req.params.empresa;
        const hospital = req.params.hospital;

        const key = `client/empresa_${empresa}/hospital_${hospital}/hospital.json`;

        const dados = await buscarJson(key);

        res.json(dados);
    } catch (erro) {
        if (erro.Code === 'NoSuchKey') {
                return res.json({
                    alertasSemanais: { totalAlertas: 0 },
                    criticos: { totalCriticos: 0 }
                });
            }
        console.log("Erro ao buscar hospital no S3:", erro);
        res.status(500).json({
            erro: "Erro ao buscar JSON do hospital no S3"
        });
    }
}

module.exports = {
    buscarHospitalJson
};