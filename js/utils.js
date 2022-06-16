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

//Funciones para generar el Estado de Resultados

function generar_ganancia_bruta(ingresos,egresos){
    const t_ventas = document.getElementById('t_ventas');
    const v_ventas = document.getElementById('v_ventas');
    const t_cmv = document.getElementById('t_cmv');
    const v_cmv = document.getElementById('v_cmv');
    const v_ganancia_bruta = document.getElementById('v_ganancia_bruta');
    const ganancia_bruta = ingresos[0].saldo_final - egresos[0].saldo_final;
    t_ventas.innerHTML = ingresos[0].nombre_cuenta;
    v_ventas.innerHTML = ingresos[0].saldo_final;    
    t_cmv.innerHTML = egresos[0].nombre_cuenta;
    v_cmv.innerHTML = egresos[0].saldo_final;    
    v_ganancia_bruta.innerHTML = ganancia_bruta;
}

function generar_gastos_operativos(egresos){
    const t_gastos_operativos = document.getElementById('t_gastos_operativos');
    for(i=1;i<egresos.length;i++){
        let fila = t_gastos_operativos.appendChild(document.createElement('tr'));
        let cuenta = fila.appendChild(document.createElement('td'));
        let saldo = fila.appendChild(document.createElement('td'));
        cuenta.innerHTML = egresos[i].nombre_cuenta + ':';
        saldo.innerHTML = egresos[i].saldo_final;
        saldo.classList.add('gasto_operativo');
    }
}
function generar_ibt_iat(ingresos){
    const v_ganancia_bruta = document.getElementById('v_ganancia_bruta');
    const gastos_operativos = document.getElementsByClassName('gasto_operativo');
    const v_otros_ingresos = document.getElementById('v_otros_ingresos');
    const v_impuesto_ganancias = document.getElementById('v_impuesto_ganancias');
    const v_iat = document.getElementById('v_iat');
    let v_ibt = document.getElementById('ibt');
    let otros_ingresos = 0;
    let v_gastos_operativos = 0;
    for(i=1;i<ingresos.length;i++){
        otros_ingresos += parseInt(ingresos[i].saldo_final);
    }
  
    for(i=0;i<gastos_operativos.length;i++){
        v_gastos_operativos += parseInt(gastos_operativos[i].innerHTML);
    }
    v_otros_ingresos.innerHTML = otros_ingresos;
    const ibt = parseInt(v_ganancia_bruta.innerHTML) + parseInt(otros_ingresos) - parseInt(v_gastos_operativos);
    const impuesto_ganancias = Math.round(ibt * 0.3);
    v_ibt.innerHTML = ibt;
    v_impuesto_ganancias.innerHTML = impuesto_ganancias;
    v_iat.innerHTML = Math.round(ibt - impuesto_ganancias); 
}


//Generar Flujo de caja 