const versionApp = 0.2
const resultados = document.getElementById('resultados');
const cabeceraResultados = document.getElementById('cabeceraResultados');
const meses = ['Enero','Febrero'/*,'Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'*/];

alert('Bienvenid@ al presupuestador online, Version '+versionApp);
alert('Este programa te permite proyectar los movimientos financieros de tu emprendimiento, para visualizar con facilidad la proyección de tus ganancias, y el cashflow');
alert('Este proyecto se encuentra en estado alpha, lo que significa que aún está en proceso de desarrollo');

const caja = new Caja();
const ventas = new Cuenta('Ventas', true, 0);
const cmv = new Cuenta('Costo de ventas', false, 0);
const impuestos = new Cuenta('Impuestos', false, 0);
const sga = new Cuenta('Otros gastos', false, 0);

const manual_cuentas = [ventas, cmv, impuestos, sga];

caja._cargar_saldo_inicial();
cargar_saldos_cuentas(manual_cuentas,meses);