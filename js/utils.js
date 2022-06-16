function cargar_saldos_cuentas(manual_cuentas,meses){
    for (let i=0;i < manual_cuentas.length;i++){
        manual_cuentas[i]._cargar_saldos(meses);
    }
}
//Generar manual de cuentas

function generar_manual_cuentas(manual_cuentas,array){
    for (i=0;i<array.length;i++){
        manual_cuentas.push(array[i]);
    }
}

//Generar Estado de Resultados
function generar_estado_resultados(meses,manual_cuentas){
    const t_ganancia_bruta = document.getElementById('t_ganancia_bruta');
    const t_costos_operativos = document.getElementById('t_costos_operativos');
    for( let i=0;i<manual_cuentas.length;i++){
        if (manual_cuentas[i].ingresos){
            let ingreso = document.createElement('tr');
            let cabecera = document.createElement('td');
            

        }
    }
    

}

//Generar Flujo de caja