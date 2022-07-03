//Actualizar encabezados tabla Ppto
function update_headers(){
    for(let i=0; i<meses.length;i++){
        let td = document.getElementById('ppto_mes_'+i);
        if(mes_inicial.selectedIndex - 1 + i < meses.length){
            td.innerText = meses[mes_inicial.selectedIndex - 1 + i];
            //td.setAttribute('id',meses[mes_inicial.selectedIndex -1 + i]);
        } else {
            td.innerText = meses[mes_inicial.selectedIndex - (meses.length + 1) + i];
            //td.setAttribute('id',meses[mes_inicial.selectedIndex - (meses.length + 1)]);
        }
    }
    let td = document.getElementById('totales_cuentas');
    td.innerText = 'Totales';
}

/*Cargar cuentas a tabla de Ppto: La funcion itera por el manual de cuentas y por cada cuenta ingresa una fila nueva a la tabla.
Cada fila contiene el nombre de la cuenta y los campos para ingresar el saldo mensual de la cuenta, y un campo calculado con el total de la cuenta
El total se actualiza de forma automatica*/

function cargar_cuentas_ppto(cuentas){
    const tabla = document.getElementById('body_ppto');
    cuentas.forEach(cuenta => {
        let fila = document.createElement('tr');
        fila.setAttribute('id',cuenta.nombre_cuenta);
        let encabezado = document.createElement('td');
        encabezado.setAttribute('id','encabezado_'+cuenta.nombre_cuenta);
        encabezado.innerText = cuenta.nombre_cuenta;
        fila.appendChild(encabezado);
        tabla.appendChild(fila);
    });
    const filas = tabla.children;
    const columnas =  document.getElementById('tr_meses').children;
    for(i=0;i<filas.length;i++){
        let fila = filas[i];
        for(j=1;j<columnas.length;j++){
            let celda = document.createElement('td');
            let campo = document.createElement('input');
            if(columnas[j].id!='totales_cuentas'){
            celda.setAttribute('id',fila.id +'_' + columnas[j].id);
            campo.setAttribute('id','saldo_'+ fila.id + '_' + columnas[j].id);
            campo.setAttribute('type','number');
            campo.setAttribute('rows',1);
            campo.setAttribute('onchange','update_totals("'+fila.id+'")');
            campo.setAttribute('value',0.00);
            celda.appendChild(campo);
            fila.appendChild(celda);
            }else{                
            fila.appendChild(celda);
            celda.setAttribute('id','Total_'+ fila.id);
            }
        }
    }
}

function update_totals(cuenta){
    const fila = document.getElementById(cuenta);
    const td_total = fila.lastChild;
    let saldos = [];
    function sum (a,b){
        a = parseFloat(a);
        b = parseFloat(b);
        return a+b;
    }
    for (i=1;i<fila.childElementCount-1;i++){
        let valor = fila.children[i].firstChild.value;
        (isNaN(valor) || valor=='')?valor = 0:{};
        valor = parseFloat(valor).toFixed(2);
        fila.children[i].firstChild.value = valor;
        saldos.push(valor);
    };
    td_total.innerHTML = saldos.reduce(sum);
    console.log(td_total.innerHTML);
}

//Convertir Saldos de cada cuenta a JSON
function guardar_saldos(nombreCuenta){
    let fila = document.getElementById(nombreCuenta);
    let meses = document.getElementById('tr_meses');
    let montos = [];
    let saldos = {};
    //let nombre_cuenta = fila.children[0].innerHTML;
    //saldos['Cuenta'] = nombre_cuenta
    for (let i=1;i<fila.children.length-1;i++){
        montos.push(fila.children[i].firstChild.value);
    }
    for(let i=1;i<meses.children.length-1;i++){
        saldos[meses.children[i].innerHTML] = montos[i-1];
    }    
    let saldosJSON = JSON.stringify(saldos);
    return saldosJSON;
}

//Guardar ppto en local Storage
function guardar_ppto(cuentas){
    let ppto = {};
    cuentas.forEach(cuenta => {
        let nombre_cuenta = cuenta.nombre_cuenta;
        console.log(String(nombre_cuenta));
        let saldos_cuenta = guardar_saldos(String(nombre_cuenta));
        ppto[nombre_cuenta] = saldos_cuenta;    
    });
    let nombre_ppto = String(prompt('Por favor, ingresa un nombre para el presupuesto (ej: "Ppto 2022 V_1")'));
    let pptoJSON = JSON.stringify(ppto);
    localStorage.setItem(String(nombre_ppto),pptoJSON);
    alert('El presupuesto se ha guardado en tu PC bajo el nombre de "'+nombre_ppto+'"');
}

function cargar_ppto(){
    let nombre_ppto = String(prompt('Por favor, ingresa el nombre del presupuesto a cargar'));
    let ppto = localStorage.getItem(nombre_ppto);
    if(ppto == null){
        alert('El presupuesto solicitado no se encuentra almacenado, por favor, intente nuevamente');
        cargar_ppto();
    }else{
        ppto = JSON.parse(ppto);
        let cuentas = keys(ppto);
        let meses = keys(JSON.parse(ppto[cuentas[0]]));
        document.getElementById('mes_inicial').value = meses[0];
        update_headers();
        cuentas.forEach(cuenta => {
           console.log(JSON.parse(ppto[cuenta]));
         });
    }
}

//Cargar saldos a cuentas --> Revisar
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

function generar_manual_cuentas(manual_cuentas,array){
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