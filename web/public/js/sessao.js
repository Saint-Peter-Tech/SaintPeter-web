// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var adm = sessionStorage.FK_ADM;

    var b_usuario = document.getElementById("b_usuario");
    var be_usuario = document.getElementById("be_usuario");

    if (email != null && nome != null) {
        if (b_usuario != null) {
            b_usuario.innerHTML = nome;
        }
        if (be_usuario != null) {
            be_usuario.innerHTML = nome;
        }
    } else {
        window.location = "../login.html";
    }

    var botaoCadastrar = document.getElementById("botaoCadastrarFunc");
    if (botaoCadastrar != null && adm == "null") {
        botaoCadastrar.style.display = "block";
    }

    var botaoAddMon = document.getElementById("botaoAddMon");
    if (botaoAddMon != null && adm == "null") {
        botaoAddMon.style.display = "block";
    }

    var adicionarFuncionarioButton = document.getElementById("adicionarFuncionarioButton");
    if (adicionarFuncionarioButton != null && adm == "null") {
        adicionarFuncionarioButton.style.display = "block";
    }

    const botaoNavFuncionarios = document.getElementById("navFuncionarios");
    const botaoNavDashInicial = document.getElementById("navDashInicial");

    if (botaoNavFuncionarios != null) {
        if (adm != "null") {
            botaoNavFuncionarios.style.display = "none";
        }
    }

    if (botaoNavDashInicial != null) {
        if (adm != "null") {
            botaoNavDashInicial.href = "./dashboardAnalista.html";
        } else if (adm == "null") {
            botaoNavDashInicial.href = "./dashboardGerente.html";
        } else {
            botaoNavDashInicial.href = "./dashboardSuporteEmpresa.html";
        }
    }

    const gerenteAba = document.getElementById("gerenteAba");

    if(gerenteAba != null) {
        if (adm != "null") {
            gerenteAba.style.display = "none";
        }
    }

}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar != null) {
        divAguardar.style.display = "flex";
    }
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar != null) {
        divAguardar.style.display = "none";
    }

    var divErrosLogin = document.getElementById("div_erros_login");
    if (divErrosLogin != null && texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}