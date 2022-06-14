function cargar_saldos_cuentas(manual_cuentas,meses){
    for (let i=0;i < manual_cuentas.length;i++){
        manual_cuentas[i]._cargar_saldos(meses);
    }
}

//Generar Estado de Resultados
function generar_estado_resultados(meses,manual_cuentas){
    const t_ganancias = document.getElementById('t_ganancias');
    const t_perdidas = document.getElementById('t_perdidas');
    for( let i=0;i<manual_cuentas.length;i++){
        if (manual_cuentas[i].ingresos){
            let ingreso = document.createElement('tr');
            let cabecera = document.createElement('td');
            

        }
    }
    

}

//Generar Flujo de caja