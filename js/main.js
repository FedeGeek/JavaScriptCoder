const versionApp = "Alpha 0.6";
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

swal(
  "Bienvenid@ al presupuestador online, Version " + versionApp,
  "Este programa te permite proyectar los movimientos financieros de tu emprendimiento, para visualizar con facilidad la proyección de tus ganancias, y el cashflow"
);

const iVersion = document.getElementById("Version");
iVersion.innerHTML = "Version: " + versionApp;

//Asignación de meses en ppto
const mes_inicial = document.getElementById("mes_inicial");
for (let i = 0; i < meses.length; i++) {
  let option = document.createElement("option");
  let tr_meses = document.getElementById("tr_meses");
  option.innerText = meses[i];
  mes_inicial.appendChild(option);
  let td = document.createElement("td");
  td.setAttribute("id", "ppto_mes_" + i);
  tr_meses.appendChild(td);
}
const td_totales = document.createElement("td");
td_totales.setAttribute("id", "totales_cuentas");
tr_meses.appendChild(td_totales);

//Generación de cuentas
const caja = new Caja(0, 0, 0);
const ventas = new Cuenta("Ventas", true);
const cmv = new Cuenta("Costo de ventas", false);
const impuestos = new Cuenta("Impuestos", false);
const otros_ingresos = new Cuenta("Otros ingresos", true);
const sga = new Cuenta("Otros gastos", false);

const ingresos = [ventas, otros_ingresos];
const egresos = [cmv, impuestos, sga];
const manual_cuentas = [...ingresos, ...egresos];
/*
generar_manual_cuentas(manual_cuentas,ingresos);
generar_manual_cuentas(manual_cuentas,egresos);


caja._cargar_saldo_inicial();
cargar_saldos_cuentas(manual_cuentas,meses);

/*
alert('Ahora, el programa generará el Estado de Resultados y el flujo de caja');


generar_ganancia_bruta(ingresos,egresos);
generar_gastos_operativos(egresos);
generar_ibt_iat(ingresos);
*/
