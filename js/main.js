const versionApp = 0.2
const resultados = document.getElementById('resultados');
const cabeceraResultados = document.getElementById('cabeceraResultados');
const meses = ['Enero','Febrero'/*,'Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'*/];

/*
alert('Bienvenid@ al presupuestador online, Version '+versionApp);
alert('Este programa te permite proyectar los movimientos financieros de tu emprendimiento, para visualizar con facilidad la proyección de tus ganancias, y el cashflow');
alert('Este proyecto se encuentra en estado alpha, lo que significa que aún está en proceso de desarrollo');
alert('Para empezar, vamos a asignar el saldo inicial de tu caja y los saldos mensuales de las cuentas');
*/

//Generación de cuentas
const caja = new Caja();
const ventas = new Cuenta('Ventas', true);
const cmv = new Cuenta('Costo de ventas', false);
const impuestos = new Cuenta('Impuestos', false);
const otros_ingresos = new Cuenta('Otros ingresos', true);
const sga = new Cuenta('Otros gastos', false);

const ingresos = [ventas, otros_ingresos];
const egresos = [cmv, impuestos, sga];
const manual_cuentas = [];

generar_manual_cuentas(manual_cuentas,ingresos);
generar_manual_cuentas(manual_cuentas,egresos);


caja._cargar_saldo_inicial();
console.log(caja.saldo_inicial);
cargar_saldos_cuentas(manual_cuentas,meses);

/*
alert('Ahora, el programa generará el Estado de Resultados y el flujo de caja');
*/