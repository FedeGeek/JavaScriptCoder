let tr_bancos = document.getElementById("bancos");
let tr_tasas = document.getElementById("tasas");
let tr_links = document.getElementById("links");
fetch("./data.json")
  .then((resp) => resp.json())
  .then((data) => {
    for (i = 0; i < data.length; i++) {
      let td_banco = document.createElement("td");
      let td_tasa = document.createElement("td");
      let td_link = document.createElement("td");
      let btn_link = document.createElement("button");
      td_banco.innerHTML = data[i].banco;
      td_tasa.innerHTML = data[i].tasa;
      btn_link.setAttribute("class", "btn btn-success");
      btn_link.innerHTML = "Generar plazo fijo";
      btn_link.setAttribute("onclick", "window.open('" + data[i].link + "')");
      td_link.appendChild(btn_link);
      tr_bancos.appendChild(td_banco);
      tr_tasas.appendChild(td_tasa);
      tr_links.appendChild(td_link);
    }
  });
