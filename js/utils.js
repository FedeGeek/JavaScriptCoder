//Actualizar encabezados tabla Ppto
function update_headers() {
  for (let i = 0; i < meses.length; i++) {
    let td = document.getElementById("ppto_mes_" + i);
    if (mes_inicial.selectedIndex - 1 + i < meses.length) {
      td.innerText = meses[mes_inicial.selectedIndex - 1 + i];
      //td.setAttribute('id',meses[mes_inicial.selectedIndex -1 + i]);
    } else {
      td.innerText = meses[mes_inicial.selectedIndex - (meses.length + 1) + i];
      //td.setAttribute('id',meses[mes_inicial.selectedIndex - (meses.length + 1)]);
    }
  }
  let td = document.getElementById("totales_cuentas");
  td.innerText = "Totales";
}

/*Cargar cuentas a tabla de Ppto: La funcion itera por el manual de cuentas y por cada cuenta ingresa una fila nueva a la tabla.
Cada fila contiene el nombre de la cuenta y los campos para ingresar el saldo mensual de la cuenta, y un campo calculado con el total de la cuenta
El total se actualiza de forma automatica*/

function cargar_cuentas_ppto(cuentas) {
  const tabla = document.getElementById("body_ppto");
  cuentas.forEach((cuenta) => {
    let fila = document.createElement("tr");
    fila.setAttribute("id", cuenta.nombre_cuenta);
    let encabezado = document.createElement("td");
    encabezado.setAttribute("id", "encabezado_" + cuenta.nombre_cuenta);
    encabezado.innerText = cuenta.nombre_cuenta;
    fila.appendChild(encabezado);
    tabla.appendChild(fila);
  });
  const filas = tabla.children;
  const columnas = document.getElementById("tr_meses").children;
  for (i = 0; i < filas.length; i++) {
    let fila = filas[i];
    for (j = 1; j < columnas.length; j++) {
      let celda = document.createElement("td");
      let campo = document.createElement("input");
      if (columnas[j].id != "totales_cuentas") {
        celda.setAttribute("id", fila.id + "_" + columnas[j].id);
        campo.setAttribute("id", "saldo_" + fila.id + "_" + columnas[j].id);
        campo.setAttribute("type", "number");
        campo.setAttribute("rows", 1);
        campo.setAttribute(
          "onchange",
          'update_totals("' +
            fila.id +
            '"), ' +
            "cargar_saldos_cuentas(manual_cuentas, meses)"
        );
        campo.setAttribute("value", 0.0);
        celda.appendChild(campo);
        fila.appendChild(celda);
      } else {
        fila.appendChild(celda);
        celda.setAttribute("id", "Total_" + fila.id);
      }
    }
  }
}

function update_totals(cuenta) {
  const fila = document.getElementById(cuenta);
  const td_total = fila.lastChild;
  let saldos = [];
  function sum(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return a + b;
  }
  for (k = 1; k < fila.childElementCount - 1; k++) {
    let valor = fila.children[k].firstChild.value;
    isNaN(valor) || valor == "" ? (valor = 0) : {};
    valor = parseFloat(valor).toFixed(2);
    fila.children[k].firstChild.value = valor;
    saldos.push(valor);
  }
  td_total.innerHTML = saldos.reduce(sum);
}

//Convertir Saldos de cada cuenta a JSON
function guardar_saldos(nombreCuenta) {
  let fila = document.getElementById(nombreCuenta);
  let meses = document.getElementById("tr_meses");
  let montos = [];
  let saldos = {};
  for (let i = 1; i < fila.children.length - 1; i++) {
    montos.push(fila.children[i].firstChild.value);
  }
  for (let i = 1; i < meses.children.length - 1; i++) {
    saldos[meses.children[i].innerHTML] = montos[i - 1];
  }
  let saldosJSON = JSON.stringify(saldos);
  return saldosJSON;
}

//Guardar ppto en local Storage
function guardar_ppto(cuentas) {
  let ppto = {};
  cuentas.forEach((cuenta) => {
    let nombre_cuenta = cuenta.nombre_cuenta;
    console.log(String(nombre_cuenta));
    let saldos_cuenta = guardar_saldos(String(nombre_cuenta));
    ppto[nombre_cuenta] = saldos_cuenta;
  });
  let nombre_ppto = String(
    prompt(
      'Por favor, ingresa un nombre para el presupuesto (ej: "Ppto 2022 V_1")'
    )
  );
  let pptoJSON = JSON.stringify(ppto);
  localStorage.setItem(String(nombre_ppto), pptoJSON);
  swal(
    'El presupuesto se ha guardado en tu PC bajo el nombre de "' +
      nombre_ppto +
      '"'
  );
}

//Cargar ppto guardado
function cargar_ppto() {
  let nombre_ppto = String(
    prompt("Por favor, ingresa el nombre del presupuesto a cargar")
  );
  let ppto = localStorage.getItem(nombre_ppto);
  if (ppto == null) {
    swal(
      "El presupuesto solicitado no se encuentra almacenado, por favor, intente nuevamente"
    );
    cargar_ppto();
  } else {
    ppto = JSON.parse(ppto);
    let cuentas = Object.keys(ppto);
    let meses = Object.keys(JSON.parse(ppto[cuentas[0]]));
    const tabla = document.getElementById("body_ppto");
    document.getElementById("mes_inicial").value = meses[0];
    update_headers();
    cuentas.forEach((cuenta) => {
      let fila = document.createElement("tr");
      let encabezado = document.createElement("td");
      fila.setAttribute("id", cuenta);
      encabezado.setAttribute("id", "encabezado_" + cuenta);
      encabezado.innerText = cuenta;
      fila.appendChild(encabezado);
      tabla.appendChild(fila);
    });
    const filas = tabla.children;
    const columnas = document.getElementById("tr_meses").children;
    for (i = 0; i < filas.length; i++) {
      let saldos = JSON.parse(ppto[filas[i].firstChild.innerHTML]);
      for (j = 1; j < columnas.length; j++) {
        let celda = document.createElement("td");
        let campo = document.createElement("input");
        if (columnas[j].id != "totales_cuentas") {
          let mes = columnas[j].innerHTML;
          celda.setAttribute("id", filas[i].id + "_" + columnas[j].id);
          campo.setAttribute(
            "id",
            "saldo_" + filas[i].id + "_" + columnas[j].id
          );
          campo.setAttribute("type", "number");
          campo.setAttribute("rows", 1);
          campo.setAttribute("value", saldos[mes]);
          campo.setAttribute(
            "onchange",
            'update_totals("' +
              fila.id +
              '"), ' +
              "cargar_saldos_cuentas(manual_cuentas, meses)"
          );
          celda.appendChild(campo);
          filas[i].appendChild(celda);
        } else {
          filas[i].appendChild(celda);
          celda.setAttribute("id", "Total_" + filas[i].id);
        }
      }
      update_totals(filas[i].id);
    }
  }
}

//Cargar saldos a cuentas
function cargar_saldos_cuentas(manual_cuentas, meses) {
  for (let i = 0; i < manual_cuentas.length; i++) {
    manual_cuentas[i]._cargar_saldos(meses);
  }
}
//Generar manual de cuentas

function generar_manual_cuentas(manual_cuentas, array) {
  for (i = 0; i < array.length; i++) {
    manual_cuentas.push(array[i]);
  }
}
//Generar Flujo de caja
