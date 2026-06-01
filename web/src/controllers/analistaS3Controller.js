const { buscarJson } = require("../s3/conexaoS3");

const padraoVazio = {
    empresa: { id: null, nome: "Sem dados" },
    hospitaisMais5Alertas: { hoje: 0, ontem: 0, total: 0, lista: [] },
    unidadesQuedas: { unidadeTop: { nome: "Nenhuma", qtdQuedas: 0 }, ranking: [] },
    graficos: {
        heatmapQuedas: {
            "0": {
                nome: "Todas as unidades",
                turnos: ["Madrugada", "Manhã", "Tarde", "Noite"],
                dias: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
                matriz: {
                    Madrugada: [0, 0, 0, 0, 0, 0, 0],
                    "Manhã":   [0, 0, 0, 0, 0, 0, 0],
                    Tarde:     [0, 0, 0, 0, 0, 0, 0],
                    Noite:     [0, 0, 0, 0, 0, 0, 0],
                },
            },
        },
        alertasPorSemana: {
            "0": {
                nome: "Todas as unidades",
                mes: "",
                semanas: [
                    { semana: 1, label: "Semana 1", alertas: 0 },
                    { semana: 2, label: "Semana 2", alertas: 0 },
                    { semana: 3, label: "Semana 3", alertas: 0 },
                    { semana: 4, label: "Semana 4", alertas: 0 },
                ],
            },
        },
    },
};

async function buscarControleJson(req, res) {
    try {
        const empresa = req.params.empresa;
        const key = `client/empresa_${empresa}/controle.json`;
        const dados = await buscarJson(key);
        res.json(dados);
    } catch (erro) {
        if (erro.Code == "NoSuchKey" || erro.name == "NoSuchKey") {
            return res.json(padraoVazio);
        }
        res.status(500).json({ erro: "Erro ao buscar JSON do analista" });
    }
}

module.exports = { buscarControleJson };