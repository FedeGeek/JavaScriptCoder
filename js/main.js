const versionApp = 0.1
const resultados = document.getElementById('resultados');
const cabeceraResultados = document.getElementById('cabeceraResultados');
const meses = ['Cuenta','Enero','Febrero','Marzo',/*'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'*/];
let ingresos = [];
let egresos = [];
alert('Bienvenid@ al presupuestador online, Version '+versionApp);
alert('Este programa te permite proyectar los movimientos financieros de tu emprendimiento, para visualizar con facilidad la proyección de tus ganancias, y el cashflow');
alert('Este proyecto se encuentra en estado alpha, lo que significa que aún está en proceso de desarrollo');
/*
let  desfase = 0;
let confirmacionDesfase = confirm('Por defecto, la aplicación comienza el año fiscal en Enero, si quieres cambiarlo, haz clik en "Aceptar", de lo contrario, has click en "Cancelar"');
if(confirmacionDesfase==true){
    desfase = +prompt(' por favor indica el número de mes en el cual deseas iniciar tu año fiscal');
    while(isNaN(desfase)==true){
        alert('No has ingresado un mes válido, por favor ingresa un valor del 1 al 12 para indicar el mes');
    }
}
*/
/*
let presetCuentas = confirm('¿Quieres usar el plan de cuentas predefinido de la aplicación? (Es la opción recomendada para la mayoría de los ususarios');

let ingresos = presetCuentas==true
?['Ventas','Intereses ganados','Otros resultados']
:ingresos=[];
alert('El primer paso es definir los nombres de las cuentas de ingresos, por ejemplo "ventas de servicios", "Ventas", "Otros ingresos", etc.');
do {
    ingresos.push(prompt('Por favor, define un nombre para la cuenta de ingresos'))
    let otroIngreso = confirm('¿Quieres agregar otra cuenta de ingresos?');
} while (otroIngreso == true);
*/
// Cuentas por defecto
ingresos = ['Ventas', 'Intereses ganados', 'Otros ingresos'];
egresos = ['Intereses perdidos','impuestos', 'Gastos generales', 'Otros egresos'];

ingresarCaja();

//Armado de cabeceras del PL
for(let i=0;i<meses.length;i++){
    let mes = document.createElement('th');
    cabeceraResultados.appendChild(mes);
    mes.appendChild(document.createTextNode(meses[i]));
}


//Input saldos cuentas de ingresos
ingresarSaldosCuentas(ingresos);

//Input saldos cuentas de egresos
ingresarSaldosCuentas(egresos);