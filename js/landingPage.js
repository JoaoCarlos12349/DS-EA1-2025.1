

$(document).ready(function () {
    let usuario = JSON.parse(localStorage.getItem("contaLogada"));    
    $("#nomeConta").text(usuario.nome);
    verificaAlerta();
});

function logout() {
    localStorage.removeItem("contaLogada");
    window.location.href = "../login.html";
}
