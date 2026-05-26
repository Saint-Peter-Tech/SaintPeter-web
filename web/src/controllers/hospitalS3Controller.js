
const { buscarJson } = require("../s3/conexaoS3");

async function buscarHospitalJson(req, res) {
    try {
        const empresa = req.params.empresa;
        const hospital = req.params.hospital;
        const key = `client/empresa_${empresa}/hospital_${hospital}/hospital.json`;

        const dados = await buscarJson(key);
        res.json(dados);
    } catch (erro) {
        if (erro.Code == 'NoSuchKey' || erro.name == 'NoSuchKey') {
            return res.json({
                alertasSemanais: { totalAlertas: 0 },
                criticos: { totalCriticos: 0 }
            });
        }
        res.status(500).json({ erro: "Erro ao buscar JSON" });
    }
}

module.exports = {
    buscarHospitalJson
};