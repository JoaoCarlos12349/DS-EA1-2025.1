$(document).ready(function () {
  $("#nomeConta").text(usuario.nome);
  loadAlertas();
});

function loadAlertas() {
  let vetor = JSON.parse(localStorage.getItem("vetor"));

  if (vetor == null) {
    var tabela = $("#tabelaAlertas");
    var linha = $("<caption> Você não possui alertas registradas</caption>");
    tabela.append(linha);
  } else {
    let info = vetor.find((info) => info.id == usuario.id);

    if (info.compras.length == 0) {
      var tabela = $("#tabelaAlertas");
      var linha = $("<caption> Você não possui alertas registradas</caption>");
      tabela.append(linha);
    } else {
      info.compras.forEach((compra) => {
        adicionarLinha(compra);
      });
    }
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
  window.location.href = "../index.html";
}
