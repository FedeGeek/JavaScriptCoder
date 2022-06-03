//Funcion para input de saldo inicial de caja
function ingresarCaja(){
    let cajaInicial = Math.abs(parseInt(prompt('Por favor ingresa el saldo inicial de tu caja, sin decimales. El saldo inicial de caja es la suma del dinero en efectivo y en cuentas bancarias con el que cuenta tu emprendimiento. La aplicación tomará el valor como positivo')));   
    if(isNaN(cajaInicial)==true){
    alert('El valor ingresado no es válido, por favor intenta nuevamente'); 
    }else{
        return cajaInicial;
    }
 }

 //Funcion para input de saldos por mes
 function ingresarSaldo(cuenta,mes){
    let saldo;
    do {
        saldo = parseInt(+prompt('Por favor, ingresa el saldo de la cuenta '+cuenta+' para el mes de '+mes));
    } while (isNaN(saldo)==true);
    return saldo;
}

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