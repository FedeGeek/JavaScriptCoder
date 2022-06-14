function cargar_saldos_cuentas(manual_cuentas,meses){
    for (let i=0;i < manual_cuentas.length;i++){
        manual_cuentas[i]._cargar_saldos(meses);
    }
}
