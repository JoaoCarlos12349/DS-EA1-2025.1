var usuario = JSON.parse(localStorage.getItem("contaLogada"));
var produtos;

class Info {
  constructor(id) {
    this.id = id;
    this.compras = [];
    this.alertas = [];
  }
}

function saveVetor() {
  var vetor = JSON.parse(localStorage.getItem("vetor"));

  if (vetor == null) {
    let vetor = [];
    localStorage.setItem("vetor", JSON.stringify(vetor));
  }

  vetor = JSON.parse(localStorage.getItem("vetor"));

  if (vetor.length === 0) {
    let info = new Info(usuario.id);
    vetor.push(info);
    localStorage.setItem("vetor", JSON.stringify(vetor));
  } else if (vetor.find((info) => info.id == usuario.id) == null) {
    let info = new Info(usuario.id);
    vetor.push(info);
    localStorage.setItem("vetor", JSON.stringify(vetor));
  }
}

$(document).ready(function () {
  $("#nomeConta").text(usuario.nome);

  loadProdutos();
  loadPreco();
  saveVetor();
});

async function loadProdutos() {
  try {
    let resp = await fetch(
      "https://api-odinline.odiloncorrea.com/produto/" +
        usuario.chave +
        "/usuario "
    );
    produtos = await resp.json();

    produtos.forEach((produto) => {
      var novaOp = $("<option />", {
        value: produto.id,
        text: produto.descricao,
      });

      $("#listProdutos").append(novaOp);
    });
  } catch (error) {}
}

function loadPreco() {
  let valor = $("#listProdutos").val();
  let produto;
  if (valor == null) {
    $("#precoAProduto").attr("placeholder", "...");
  } else {
    produto = produtos.find((produto) => produto.id == valor);
    $("#precoAProduto").attr("value", "R$" + produto.valor);
    loadRange(produto);
  }
}

function alteraModo() {
  if ($("#listOp").val() == "1") {
    $("#opDuo").attr("style", "display: flex");
    $("#opAlerta").attr("style", "display: none");
    $("#precoAProduto").removeAttr("readonly");

    $("#btnAcaoA").attr("style", "display: none");
    $("#btnAcaoC").attr("style", "display: flex");
  } else {
    $("#opDuo").attr("style", "display: flex");
    $("#opAlerta").attr("style", "display: block");

    $("#btnAcaoA").attr("style", "display: flex;");
    $("#btnAcaoC").attr("style", "display: none;");
  }
}

function loadRange(produto) {
  $("#limiteRange").attr("max", parseFloat(produto.valor) + 1000);
  $("#limiteRange").attr("value", parseFloat(produto.valor));

  $("#precoLProduto").val("R$" + parseFloat(produto.valor));
}

function atualizaRange() {
  let v = $("#limiteRange").val();

  $("#precoLProduto").val("R$" + $("#limiteRange").val());
}

function realizarCompra() {
  debugger;
  let produto = produtos.find(
    (produto) => produto.id == $("#listProdutos").val()
  );

  let item = produto;

  item.valorComprado = $("#precoAProduto").val();

  let vetor = JSON.parse(localStorage.getItem("vetor"));

  let info = vetor.find((info) => info.id == usuario.id);

  info.compras.push(item);

  localStorage.setItem("vetor", JSON.stringify(vetor));

  alert("Compra Registrada!");

  window.location.reload();
}

function logout() {
  localStorage.removeItem("contaLogada");
  window.location.href = "../login.html";
}

class Alerta {
  constructor(idItem, valorLimite) {
    this.idItem = idItem;
    this.valorLimite = valorLimite;
  }
}

function registrarAlerta() {
  let alerta = new Alerta($("#listProdutos").val(), $("#precoLProduto").val());

  let vetor = JSON.parse(localStorage.getItem("vetor"));

  let info = vetor.find((info) => info.id == usuario.id);

  info.alertas.push(alerta);

  localStorage.setItem("vetor", JSON.stringify(vetor));

  alert("Alerta registrado!");

  window.location.reload();
}


