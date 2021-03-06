class Cuenta {
  constructor(
    nombre_cuenta,
    ingresos,
    saldo_final = 0,
    saldos_mensuales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ) {
    this.nombre_cuenta = nombre_cuenta;
    this.ingresos = ingresos;
    this.saldo_final = saldo_final;
    this.saldos_mensuales = saldos_mensuales;
  }

  _cargar_saldos(meses) {
    for (let i = 0; i < meses.length; i++) {
      this.saldos_mensuales[i] = parseFloat(
        document.getElementById(
          "saldo_" + this.nombre_cuenta + "_ppto_mes_" + i
        ).value
      );
      this.saldo_final += this.saldos_mensuales[i];
    }
  }

  _cargar_saldo_final() {
    let saldo_parcial = 0;
    for (let i = 1; i <= saldos_mensuales.length; i++) {
      saldo_parcial += this.saldos_mensuales[i];
    }
    saldo_final += saldo_parcial;
  }
}

class Caja {
  constructor(saldo_inicial, saldos_apertura, saldos_cierre) {
    this.nombre_cuenta = "Caja";
    this.saldo_inicial = saldo_inicial;
    this.saldos_apertura = saldos_apertura;
    this.saldos_cierre = saldos_cierre;
  }

  _cargar_saldo_inicial() {
    let saldo_inicial_caja = document.getElementById("saldo_inicial_caja");
    this.saldo_inicial = parseFloat(saldo_inicial_caja.value);
  }

  _cargar_saldos(manual_cuentas, meses) {
    this.saldos_cierre[0] = this.saldo_inicial;
    let movimientos = [];
    for (let i = 1; i <= meses.length; i++) {
      movimientos.push(0);
      for (let j = 1; j <= manual_cuentas.length; j++) {
        if (manual_cuentas[j].cuenta_ingreso) {
          movimientos[i] += manual_cuentas[j].saldos_mensuales[i];
        } else {
          movimientos[i] -= manual_cuentas[j].saldos_mensuales[i];
        }
      }
      this.saldos_apertura[i] = this.saldos_cierre[i - 1];
      this.saldos_cierre[i] = saldos_cierre[i - 1] + movimientos[i];
    }
  }
}
