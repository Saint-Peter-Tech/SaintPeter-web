const { buscarJson } = require("../s3/conexaoS3");

async function buscarUnidadeJson(req, res) {
    try {
        const empresa = req.params.empresa;
        const hospital = req.params.hospital;
        const unidade = req.params.unidade;
        const key = `client/empresa_${empresa}/hospital_${hospital}/unidade_${unidade}/unidade.json`;

        const dados = await buscarJson(key);
        res.json(dados);
    } catch (erro) {
        console.log("Erro S3:", erro.Code, erro.message);
        if (erro.Code == 'NoSuchKey' || erro.name == 'NoSuchKey') {
            return res.json(null);
        }
        res.status(500).json({ erro: "Erro ao buscar JSON da unidade" });
    }
}

module.exports = { buscarUnidadeJson };