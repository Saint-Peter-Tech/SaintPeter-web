const { buscarJson, buscarArquivo } = require("../s3/conexaoS3");

async function buscarModeloS3Json(req, res) {
    try {

        const empresa = req.params.empresa;

        const key = `client/empresa_${empresa}/modelos/modelos.json`;

        const dados = await buscarJson(key);

        res.json(dados);

    } catch (erro) {
        if (erro.Code == 'NoSuchKey' || erro.name == 'NoSuchKey') {
            return res.json({
                capturas_totais: 0,

                alertas_cpu: 0,
                criticos_cpu: 0,

                alertas_ram: 0,
                criticos_ram: 0,

                alertas_rede: 0,
                criticos_rede: 0,

                cpu_acima_limite: 0,
                ram_acima_limite: 0,
                rede_acima_limite: 0,

                healthscore: 100
            });
        }
        res.status(500).json({ erro: "Erro ao buscar JSON" });
    }
}

async function buscarRelatorio(req, res) {
    try {
        const empresa = req.params.empresa;

        const key = `client/empresa_${empresa}/relatorios/relatorioModelo.pdf`;

        const arquivo = await buscarArquivo(key);

        res.setHeader("Content-Type", "application/pdf");

        res.setHeader("Content-Disposition", "attachment; filename=relatorioModelos.pdf");

        arquivo.Body.pipe(res);
    } catch (erro) {
        console.error("ERRO BACKEND:");
        console.error(erro);

        res.status(500).json({
            erro: erro.message
        });
    }

}

module.exports = {
    buscarModeloS3Json,
    buscarRelatorio
};