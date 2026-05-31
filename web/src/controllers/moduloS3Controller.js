const { buscarJson } = require("../s3/conexaoS3");

async function buscarModeloJson(req, res) {
    try {

        const empresa = req.params.empresa;
        const modelo = req.params.modelo;

        const key = `client/empresa_${empresa}/modelos/modelo_${modelo}.json`;

        const dados = await buscarJson(key);

        res.json(dados);

    } catch (erro) {

        if (
            erro.Code == "NoSuchKey" ||
            erro.name == "NoSuchKey"
        ) {

            return res.json({
                periodo: {
                    diasCaptura: 0
                },

                kpis: {
                    moduloMaisUtilizado: "Nenhum",
                    frequenciaMaisUtilizada: 0,

                    moduloMaisCritico: "Nenhum",
                    ocorrenciasCriticas: 0,

                    estabilidadeGeral: 0,

                    metaAtual: 0,
                    meta: 80
                },

                modulos: []
            });
        }

        res.status(500).json({
            erro: "Erro ao buscar JSON do modelo"
        });
    }
}

module.exports = {
    buscarModeloJson
};