var usuarioModel = require("../models/usuarioModel");

function autenticaremail(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticaremail(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            id_usuario: resultadoAutenticar[0].id_usuario,
                            email: resultadoAutenticar[0].email,
                            nome_usuario: resultadoAutenticar[0].nome_usuario,
                            cpf: resultadoAutenticar[0].cpf,
                            fk_adm: resultadoAutenticar[0].fk_adm,
                            fk_empresa: resultadoAutenticar[0].fk_empresa
                        });

                            
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function autenticarcpf(req, res) {
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;

    if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticarcpf(cpf, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                                    res.json({
                                        id_usuario: resultadoAutenticar[0].id_usuario,
                                        email: resultadoAutenticar[0].email,
                                        nome_usuario: resultadoAutenticar[0].nome_usuario,
                                        cpf: resultadoAutenticar[0].cpf,
                                        fk_adm: resultadoAutenticar[0].fk_adm,
                                        fk_empresa: resultadoAutenticar[0].fk_empresa
                                    });
                            
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("CPF e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


module.exports = {
    autenticaremail,
    autenticarcpf
}