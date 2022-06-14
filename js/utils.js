//Ingreso de saldos por cuentas
function ingresarSaldosCuentas(cuentas){
    for(let i=0;i<cuentas.length;i++){
        let fila = document.createElement('tr');
        let celda = document.createElement('td');
        celda.innerText = cuentas[i];
        fila.appendChild(celda);
        resultados.appendChild(fila);
        for(let j=1;j<meses.length;j++){
            let saldoCuenta = document.createElement('td');
            let saldo = ingresarSaldo(cuentas[i],meses[j]);
            saldoCuenta.innerText = saldo;
            fila.appendChild(saldoCuenta);
        }
    }
}