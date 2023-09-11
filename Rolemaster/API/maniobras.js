const { evaluate } = require("mathjs");
var fs = require("fs");

let tablaManiobrasMovimiento = {
  indices: [
    -151,
    -101,
    -51,
    -26,
    0,
    20,
    40,
    55,
    ,
    65,
    75,
    85,
    95,
    105,
    115,
    125,
    135,
    145,
    155,
    165,
    185,
    225,
    275,
    9999999,
  ],
  rut: [
    "F",
    "10",
    "30",
    "50",
    "70",
    "80",
    "90",
    "100",
    "100",
    "100",
    "100",
    "100",
    "110",
    "110",
    "120",
    "120",
    "130",
    "130",
    "140",
    "140",
    "150",
    "150",
    "160",
  ],
  fac: [
    "F",
    "F",
    "10",
    "30",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
    "100",
    "100",
    "100",
    "110",
    "110",
    "120",
    "120",
    "130",
    "130",
    "140",
    "140",
    "150",
    "150",
  ],
  edf: [
    "F",
    "F",
    "F",
    "10",
    "30",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
    "100",
    "100",
    "100",
    "110",
    "110",
    "120",
    "120",
    "130",
    "130",
    "140",
    "140",
    "150",
  ],
  dfm: [
    "F",
    "F",
    "F",
    "F",
    "5",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
    "100",
    "110",
    "110",
    "120",
    "120",
    "130",
    "130",
    "140",
  ],
  dif: [
    "F",
    "F",
    "F",
    "F",
    "F",
    "5",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
    "100",
    "110",
    "110",
    "120",
    "120",
    "130",
    "130",
  ],
  mdf: [
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "5",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
    "100",
    "110",
    "110",
    "120",
    "120",
    "130",
  ],
  xdf: [
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "5",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
    "100",
    "110",
    "110",
    "120",
    "120",
  ],
  loc: [
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "5",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
    "100",
    "110",
    "110",
  ],
  abs: [
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "F",
    "5",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
    "100",
  ],
  getResultado(roll, dificultad) {
    let tabla = null;
    if (dificultad == "rut") tabla = this.rut;
    else if (dificultad == "fac") tabla = this.fac;
    else if (dificultad == "edf") tabla = this.edf;
    else if (dificultad == "dfm") tabla = this.dfm;
    else if (dificultad == "dif") tabla = this.dif;
    else if (dificultad == "mdf") tabla = this.mdf;
    else if (dificultad == "xdf") tabla = this.xdf;
    else if (dificultad == "loc") tabla = this.loc;
    else if (dificultad == "abs") tabla = this.abs;
    return tabla[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

function maniobras(msg) {
  if (msg.indexOf("!mm ") !== -1) {
    msg = msg.replace("!mm ", "");
    // !mm dif+30000100/+30-10
    // !mm rut-1011185/+45-10+38-12
    // !mm (dificultad[3])(bonif_mm[3])(aturdido[1])(derribado[1])(extremidadInutilizada[1])(Tirada[variable])/(Modificadores[variable])
    let dificultad = msg.substring(0, 3);
    let strDificultad = "";
    if (dificultad == "rut") strDificultad = "Rutinaria";
    else if (dificultad == "fac") strDificultad = "Fácil";
    else if (dificultad == "edf") strDificultad = "Escasa dificultad";
    else if (dificultad == "dfm") strDificultad = "Dificultad media";
    else if (dificultad == "dif") strDificultad = "Difícil";
    else if (dificultad == "mdf") strDificultad = "Muy difícil";
    else if (dificultad == "xdf") strDificultad = "Extremadamente difícil";
    else if (dificultad == "loc") strDificultad = "Locura completa";
    else if (dificultad == "abs") strDificultad = "Absurda";
    else {
      console.log("ERROR !mm(main): dificultad = " + dificultad);
      return;
    }
    let bonifMM = msg.substring(3, 6);
    let aturdido = msg.substring(6, 7);
    let derribado = msg.substring(7, 8);
    let extremidadInutilizada = msg.substring(8, 9);
    let tirada = msg.substring(9);
    let modStr = "0";
    let posSlash = msg.indexOf("/");
    if (posSlash >= 0) {
      tirada = msg.substring(9, posSlash);
      modStr = msg.substring(posSlash + 1);
    }

    let modAturdido = parseInt(aturdido) * -50;
    let modDerribado = parseInt(derribado) * -70;
    let modExtremInut = parseInt(extremidadInutilizada) * -30;
    let modificadores =
      evaluate(modStr) +
      modAturdido +
      modDerribado +
      modExtremInut +
      parseInt(bonifMM);

    let indice = parseInt(tirada) + modificadores;
    let chorrazo = "";
    chorrazo += "\n===== Maniobra de movimiento " + strDificultad + " =====\n";
    chorrazo += " - " + getTimestamp() + "\n";
    if (aturdido == 1) {
      chorrazo += " - Aturdido\n";
    }
    if (derribado == 1) {
      chorrazo += " - Derribado\n";
    }
    if (extremidadInutilizada == 1) {
      chorrazo += " - Extremidad inutilizada\n";
    }
    chorrazo +=
      " - Tirada: " +
      tirada +
      (modificadores >= 0 ? "+" : "") +
      modificadores +
      " = " +
      indice +
      "\n";
    chorrazo +=
      " - Resultado: " +
      tablaManiobrasMovimiento.getResultado(indice, dificultad) +
      "\n\n";
    return chorrazo;
  } else if (msg.indexOf("!correr ") !== -1) {
    // !correr (rut|fac...)000(mm 3 dígitos)30
    msg = msg.replace("!correr ", "");

    let dificultad = msg.substring(0, 3);
    let strDificultad = "";
    if (dificultad == "rut") strDificultad = "Rutinaria";
    else if (dificultad == "fac") strDificultad = "Fácil";
    else if (dificultad == "edf") strDificultad = "Escasa dificultad";
    else if (dificultad == "dfm") strDificultad = "Dificultad media";
    else if (dificultad == "dif") strDificultad = "Difícil";
    else if (dificultad == "mdf") strDificultad = "Muy difícil";
    else if (dificultad == "xdf") strDificultad = "Extremadamente difícil";
    else if (dificultad == "loc") strDificultad = "Locura completa";
    else if (dificultad == "abs") strDificultad = "Absurda";
    else {
      console.log("ERROR !mm(main): dificultad = " + dificultad);
      return;
    }
    let bonifMM = msg.substring(3, 6);
    let aturdido = msg.substring(6, 7);
    let derribado = msg.substring(7, 8);
    let extremidadInutilizada = msg.substring(8, 9);
    let tirada = msg.substring(9);
    let modStr = "0";
    let posSlash = msg.indexOf("/");
    if (posSlash >= 0) {
      tirada = msg.substring(9, posSlash);
      modStr = msg.substring(posSlash + 1);
    }

    let modAturdido = parseInt(aturdido) * -50;
    let modDerribado = parseInt(derribado) * -70;
    let modExtremInut = parseInt(extremidadInutilizada) * -30;
    let modificadores =
      evaluate(modStr) +
      modAturdido +
      modDerribado +
      modExtremInut +
      parseInt(bonifMM);

    let indice = parseInt(tirada) + modificadores;

    let result = tablaManiobrasMovimiento.getResultado(indice, dificultad);
    let resultado = "";
    if (result == "F") resultado = "F";
    else {
      let resultInt = parseInt(result);
      let diferencia100 = resultInt - 100;
      let tramos = diferencia100 / 10;
      let pies = 2 * (50 + parseInt(bonifMM)) + tramos * 10;
      let metros = Math.round(0.3048 * pies);
      resultado = pies.toString() + " pies (" + metros.toString() + " metros)";
    }

    let chorrazo = "\n\n===== Correr (" + strDificultad + ") =====\n";
    chorrazo += " - " + getTimestamp() + "\n";
    if (aturdido == 1) {
      chorrazo += " - Aturdido\n";
    }
    if (derribado == 1) {
      chorrazo += " - Derribado\n";
    }
    if (extremidadInutilizada == 1) {
      chorrazo += " - Extremidad inutilizada\n";
    }
    chorrazo +=
      " - Tirada: " +
      tirada +
      (modificadores >= 0 ? "+" : "") +
      modificadores +
      " = " +
      indice +
      "\n";
    chorrazo += " - Resultado: " + resultado + "\n\n";
    return chorrazo;
  }
}

function getTimestamp() {
  let currentdate = new Date();
  return (
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    currentdate.getFullYear().toString().padStart(4, "0") +
    " - " +
    currentdate.getHours().toString().padStart(2, "0") +
    ":" +
    currentdate.getMinutes().toString().padStart(2, "0") +
    ":" +
    currentdate.getSeconds().toString().padStart(2, "0") +
    "." +
    currentdate.getMilliseconds().toString().padStart(3, "0")
  );
}

let text = maniobras(process.argv[2]);
console.log(text);
fs.appendFile("man_mov.log", text, "latin1", function (err) {
  if (err) throw err;
});
