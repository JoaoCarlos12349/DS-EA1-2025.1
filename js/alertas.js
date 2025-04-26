$(document).ready(function () {
  $("#nomeConta").text(usuario.nome);
  loadAlertas();
});

function loadAlertas() {
  let vetor = JSON.parse(localStorage.getItem("vetor"));

  let info = vetor.find((info) => info.id == usuario.id);

  if (info.alertas.length == 0) {
    var tabela = $("#tabelaAlertas");
    var linha = $("<caption> Você não possui alertas registrados</caption>");
    tabela.append(linha);
  } else {
    info.alertas.forEach((alerta) => {
      adicionarLinha(alerta);
    });
  }
}

async function adicionarLinha(alerta) {
  var tbody = $("#tabelaAlertas").find("tbody");
  var linha = $("<tr></tr>");
  let item;

  try {
    let resp = await fetch(
      "https://api-odinline.odiloncorrea.com/produto/" + alerta.idItem
    );
    item = await resp.json();
  } catch (error) {}

  $("<td></td>").text(item.descricao).appendTo(linha);
  $("<td></td>").text(alerta.valorLimite).appendTo(linha);
  $("<td></td>")
    .text("R$" + item.valor)
    .appendTo(linha);

  tbody.append(linha);
}

function logout() {
  localStorage.removeItem("contaLogada");
  window.location.href = "../login.html";
}
