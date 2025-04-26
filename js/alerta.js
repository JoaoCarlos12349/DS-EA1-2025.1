
var usuario = JSON.parse(localStorage.getItem("contaLogada"));

$(document).ready(function () {
    debugger;
  monitoraAlerta();
});

function monitoraAlerta() {
    verificaAlertaP();
  var intervalId = setInterval(verificaAlertaP, 3000);
}

let item;
let valorNumerico;

async function verificaAlertaP() {
  console.log("verificado");
  var vetor = JSON.parse(localStorage.getItem("vetor"));

  var info = vetor.find((info) => info.id == usuario.id);

  for (let index = 0; index < info.alertas.length; index++) {
    await verificaAlerta(info.alertas[index]);
    if (item.valor <= valorNumerico) {
      abreModal(item);
      info.alertas.splice(index, 1);
      localStorage.setItem("vetor", JSON.stringify(vetor));
    }
  }
}

async function verificaAlerta(alerta) {
  try {
    let resp = await fetch(
      "https://api-odinline.odiloncorrea.com/produto/" + alerta.idItem
    );
    item = await resp.json();

    valorNumerico = parseFloat(
      alerta.valorLimite.replace("R$", "").replace(",", "").trim()
    );
  } catch (error) {}
}

function abreModal(item) {
  $("#corpoModal").text(
    "O item:\n " +
      item.descricao +
      "\n teve seu preço reduzido e atingiu o alerta definido"
  );
  $("#alerta").modal("show");
  $("#goCompra").attr("onclick", "goCompras()");
}

function goCompras() {
  window.location.href = "../opcoes.html";
}
