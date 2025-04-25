async function verificaUsuario() {
  debugger;

  let login = $("#cLogin").val();
  let senha = $("#cSenha").val();

  try {
    let resp = await fetch(
      "https://api-odinline.odiloncorrea.com/usuario/" +
        login +
        "/" +
        senha +
        "/autenticar"
    );
    var usuario = await resp.json();

    if (usuario.id) {
      localStorage.setItem("contaLogada", JSON.stringify(usuario));

      alert("Autenticação realizada com sucesso!");
    } else {
      alert("Usuário ou senha inválidos!");
    }
  } catch (error) {}
}
