let tasas = [];
let bancos = document.getElementById("bancos").children;
let tr = document.getElementById("tasas");
fetch("https://jsonplaceholder.typicode.com/users")
  .then((resp) => resp.json())
  .then((data) => {
    for (i = 0; i < bancos.length - 1; i++) {
      let td = document.createElement("td");
      td.innerText =
        parseFloat(Math.abs(data[i].address.geo.lat).toFixed(2)) + "%";
      tr.appendChild(td);
    }
  });
