class Cuenta {
    
    constructor(nombre_cuenta, cuenta_ingreso, saldo_inicial, saldos_mensuales) {
        this.nombre_cuenta = nombre_cuenta;
        this.cuenta_ingreso = cuenta_ingreso;
        this.saldo_inicial = saldo_inicial;
        this.saldos_mensuales = saldos_mensuales;
        this.saldo_final = saldo_final;
    }
    
    _cargar_saldos(meses){
        for(i=1;i<=meses.length;i++){
            do{
                this.saldos_mensuales[i] = parseFloat(+prompt('Por favor, indica el saldo total de la cuenta '+ this.nombre_cuenta + ' para el mes de ' + meses[i]));
            } while(isNaN(saldos_mensuales[i]));
        }
    }

    _cargar_saldo_final(){
        let saldo_parcial = 0;
        for(i=1;i<=saldos_mensuales.length;i++){
            saldo_parcial += this.saldos_mensuales[i];
        }
        saldo_final = this.saldo_inicial + saldo_parcial;
    }
}

class Caja {

    constructor(saldo_inicial, saldos_apertura, saldos_cierre) {
        this.nombre_cuenta = 'Caja';
        this.saldo_inicial = saldo_inicial;
        this.saldos_apertura = saldos_apertura;
        this.saldos_cierre = saldos_cierre;
    }


    _cargar_saldo_inicial(){
        do{
            this.saldo_inicial = parseFloat(+prompt('Por favor, ingresa el saldo inicial de la cuenta '+ this.nombre_cuenta))
        } while(isNaN(this.saldo_final));
    }

    _cargar_saldos(manual_cuentas,meses){
        this.saldos_cierre[0] = this.saldo_inicial;
        let movimientos = [];
        for(i=1;i<=meses.length;i++){
            movimientos.push(0);
            for(j=1;j<=manual_cuentas.length;j++){
                if (manual_cuentas[j].cuenta_ingreso){
                    movimientos[i] += manual_cuentas[j].saldos_mensuales[i];
                }else{
                    movimientos[i] -= manual_cuentas[j].saldos_mensuales[i];
                }
            }
            this.saldos_apertura[i] = this.saldos_cierre[i-1];
            this.saldos_cierre[i] = saldos_cierre[i-1] + movimientos[i];
        }
    }

}