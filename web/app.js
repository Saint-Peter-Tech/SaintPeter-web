// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var empresasRouter = require("./src/routes/empresas");
var cadastroEmpresaRouter = require("./src/routes/cadastroEmpresa");
var cadastroAdmRouter = require("./src/routes/cadastroAdm");
var cadastroFuncionarioRouter = require("./src/routes/cadastroFuncionario");
var hospitalRouter = require("./src/routes/hospital");
var hospitalS3Router = require("./src/routes/hospitalS3");
var unidadeRouter = require("./src/routes/unidade")
var monitorRouter = require("./src/routes/monitor")
var monitorS3Router = require("./src/routes/monitorS3")
var modeloRouter = require("./src/routes/modelo")
var unidadeS3Router = require("./src/routes/unidadeS3")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/empresas", empresasRouter);
app.use("/cadastroEmpresa", cadastroEmpresaRouter);
app.use("/cadastroAdm", cadastroAdmRouter);
app.use("/cadastroFuncionario", cadastroFuncionarioRouter);
app.use("/hospitalS3", hospitalS3Router);
app.use("/hospital", hospitalRouter);
app.use("/unidade", unidadeRouter);
app.use("/monitor", monitorRouter);
app.use("/monitorS3", monitorS3Router);
app.use("/modelo", modeloRouter);
app.use("/unidadeS3", unidadeS3Router)

app.listen(PORTA_APP, function () {
    console.log(`
 ## ##     ##       ####   ###  ##  #### ##           ### ##   ### ###  #### ##  ### ###  ### ##
##   ##     ##       ##      ## ##  # ## ##            ##  ##   ##  ##  # ## ##   ##  ##   ##  ##
####      ## ##      ##     # ## #    ##               ##  ##   ##        ##      ##       ##  ##
 #####    ##  ##     ##     ## ##     ##               ##  ##   ## ##     ##      ## ##    ## ##
    ###   ## ###     ##     ##  ##    ##               ## ##    ##        ##      ##       ## ##
##   ##   ##  ##     ##     ##  ##    ##               ##       ##  ##    ##      ##  ##   ##  ##
 ## ##   ###  ##    ####   ###  ##   ####             ####     ### ###   ####    ### ###  #### ## 
    \n\n\n                                                                                                 
    Acesse o caminho a seguir para visualizar .:http://${HOST_APP}:${PORTA_APP}:. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
`);
});
