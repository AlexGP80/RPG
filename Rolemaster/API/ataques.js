const { evaluate } = require("mathjs");
var fs = require("fs");

let dados = {
  tirardados(numdados, carasdado) {
    let resultado = 0;
    let i = 0;
    for (i = 0; i < numdados; ++i) {
      resultado += Math.floor(Math.random() * carasdado) + 1;
    }
    return resultado;
  },
  tiradaAbierta(numdados, carasdado) {
    let tirada = this.tirardados(numdados, carasdado);
    let resultado = tirada;
    if (tirada >= 96) {
      while (tirada >= 96) {
        tirada = this.tirardados(numdados, carasdado);
        resultado += tirada;
      }
    } else if (tirada <= 5) {
      tirada = this.tirardados(numdados, carasdado);
      resultado -= tirada;
      while (tirada >= 96) {
        tirada = this.tirardados(numdados, carasdado);
        resultado -= tirada;
      }
    }
    return resultado;
  },
};

let tablaFilo = {
  indices: [
    45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125,
    130, 135, 140, 145, 9999999,
  ],
  sa: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "7",
    "9A",
    "10A",
    "11B",
    "13C",
    "15C",
    "17D",
    "19D",
    "20D",
    "21E",
    "23E",
    "25E",
    "27E",
    "28E",
    "30E",
  ],
  cu: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "3",
    "5",
    "7A",
    "9A",
    "10B",
    "12B",
    "13B",
    "14C",
    "15C",
    "17C",
    "18D",
    "19D",
    "20D",
    "22D",
    "23E",
    "24E",
    "25E",
  ],
  ce: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "2",
    "3",
    "5",
    "6",
    "7A",
    "9A",
    "10B",
    "11B",
    "12B",
    "13C",
    "15C",
    "16C",
    "17D",
    "18D",
    "20D",
    "21E",
    "22E",
  ],
  cm: [
    "0",
    "0",
    "1",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10A",
    "11A",
    "12B",
    "13B",
    "13C",
    "14C",
    "15C",
    "16D",
    "17D",
    "18E",
  ],
  co: [
    "0",
    "1",
    "1",
    "2",
    "2",
    "3",
    "3",
    "4",
    "5",
    "5",
    "6",
    "6",
    "7",
    "8",
    "8A",
    "9A",
    "9A",
    "10B",
    "11B",
    "11C",
    "12D",
    "12E",
  ],
  getResultado(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.sa;
    else if (armadura == "CU") tabla = this.cu;
    else if (armadura == "CE") tabla = this.ce;
    else if (armadura == "CM") tabla = this.cm;
    else if (armadura == "CO") tabla = this.co;
    else {
      console.log(
        "ERROR - tablaFilo.getResultado(roll,armadura): armadura == " + armadura
      );
      return;
    }
    return tabla[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaContundentes = {
  indices: [
    35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120,
    125, 130, 135, 140, 145, 9999999,
  ],
  sa: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "6",
    "8",
    "9A",
    "10B",
    "12C",
    "13C",
    "14D",
    "15D",
    "17D",
    "18E",
    "19E",
    "21E",
    "22E",
    "23E",
  ],
  cu: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "3",
    "5",
    "6",
    "7A",
    "8A",
    "9A",
    "10B",
    "11B",
    "12B",
    "13C",
    "14C",
    "15C",
    "16D",
    "17D",
    "18E",
    "19E",
    "20E",
  ],
  ce: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "2",
    "3",
    "4",
    "6",
    "7A",
    "8A",
    "9B",
    "10B",
    "11B",
    "12C",
    "13C",
    "15C",
    "16C",
    "17D",
    "18D",
    "19E",
    "20E",
  ],
  cm: [
    "0",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12A",
    "13A",
    "14B",
    "15B",
    "16C",
    "17C",
    "18C",
    "19D",
    "20D",
    "21E",
    "22E",
  ],
  co: [
    "0",
    "1",
    "1",
    "2",
    "3",
    "3",
    "4",
    "5",
    "5",
    "6",
    "7",
    "8",
    "8",
    "9",
    "10",
    "10A",
    "11A",
    "12B",
    "13B",
    "13C",
    "14C",
    "15D",
    "16D",
    "16E",
  ],
  getResultado(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.sa;
    else if (armadura == "CU") tabla = this.cu;
    else if (armadura == "CE") tabla = this.ce;
    else if (armadura == "CM") tabla = this.cm;
    else if (armadura == "CO") tabla = this.co;
    else {
      console.log(
        "ERROR - tablaContundentes.getResultado(roll,armadura): armadura == " +
          armadura
      );
      return;
    }
    return tabla[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tabla2Manos = {
  indices: [
    55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135,
    140, 145, 9999999,
  ],
  sa: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "10A",
    "13B",
    "16C",
    "19D",
    "22D",
    "25D",
    "28E",
    "31E",
    "33E",
    "36E",
    "39E",
    "42E",
    "45E",
    "48E",
  ],
  cu: [
    "0",
    "0",
    "0",
    "6",
    "8A",
    "10A",
    "13B",
    "15B",
    "17C",
    "20C",
    "22C",
    "24C",
    "27D",
    "29D",
    "31D",
    "33E",
    "36E",
    "38E",
    "40E",
    "43E",
  ],
  ce: [
    "0",
    "0",
    "0",
    "0",
    "2",
    "4A",
    "7A",
    "9B",
    "12B",
    "14C",
    "17C",
    "19C",
    "22C",
    "24D",
    "27D",
    "29D",
    "32E",
    "34E",
    "37E",
    "40E",
  ],
  cm: [
    "0",
    "0",
    "0",
    "3",
    "5",
    "7",
    "9",
    "11",
    "12A",
    "14A",
    "16B",
    "18B",
    "20C",
    "22C",
    "24C",
    "26D",
    "28D",
    "29E",
    "31E",
    "33E",
  ],
  co: [
    "0",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "11",
    "12A",
    "13A",
    "14B",
    "15B",
    "16C",
    "17C",
    "19D",
    "20D",
    "21E",
    "22E",
  ],
  getResultado(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.sa;
    else if (armadura == "CU") tabla = this.cu;
    else if (armadura == "CE") tabla = this.ce;
    else if (armadura == "CM") tabla = this.cm;
    else if (armadura == "CO") tabla = this.co;
    else {
      log(
        "ERROR - tabla2Manos.getResultado(roll,armadura): armadura == " +
          armadura
      );
      return;
    }
    return tabla[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaProyectiles = {
  indices: [
    70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145,
    9999999,
  ],
  sa: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "8A",
    "10B",
    "11C",
    "13C",
    "15C",
    "16D",
    "18D",
    "20D",
    "22E",
    "23E",
    "25E",
    "27E",
  ],
  cu: [
    "0",
    "0",
    "4",
    "6",
    "8A",
    "10A",
    "12B",
    "13B",
    "14B",
    "16C",
    "17C",
    "19D",
    "20D",
    "22D",
    "23E",
    "25E",
    "26E",
  ],
  ce: [
    "0",
    "0",
    "0",
    "3",
    "5",
    "7A",
    "9A",
    "10B",
    "12B",
    "13B",
    "15C",
    "17C",
    "19D",
    "21D",
    "23D",
    "25E",
    "26E",
  ],
  cm: [
    "0",
    "0",
    "2",
    "4",
    "6",
    "7",
    "8A",
    "10A",
    "13B",
    "14B",
    "16B",
    "17C",
    "19C",
    "20D",
    "22D",
    "23E",
    "25E",
  ],
  co: [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8A",
    "9A",
    "10A",
    "11B",
    "11B",
    "12C",
    "13C",
    "14D",
    "15E",
  ],
  getResultado(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.sa;
    else if (armadura == "CU") tabla = this.cu;
    else if (armadura == "CE") tabla = this.ce;
    else if (armadura == "CM") tabla = this.cm;
    else if (armadura == "CO") tabla = this.co;
    else {
      console.log(
        "ERROR - tablaProyectiles.getResultado(roll,armadura): armadura == " +
          armadura
      );
      return;
    }
    return tabla[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaGarrasDientes = {
  indices: [
    45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125,
    130, 135, 140, 145, 9999999,
  ],
  sa: [
    "0",
    "1",
    "2",
    "4",
    "5T",
    "6T",
    "8T",
    "9A",
    "10A",
    "12A",
    "13B",
    "14B",
    "15B",
    "17C",
    "19C",
    "20D",
    "26D",
    "28E",
    "30E",
    "36E",
    "38E",
    "40E",
  ],
  cu: [
    "0",
    "0",
    "0",
    "1",
    "2",
    "4",
    "5",
    "7T",
    "9T",
    "10A",
    "11A",
    "12A",
    "13B",
    "15B",
    "16C",
    "17C",
    "20C",
    "23D",
    "25D",
    "30E",
    "33E",
    "36E",
  ],
  ce: [
    "0",
    "0",
    "0",
    "0",
    "1",
    "2",
    "3",
    "5",
    "7T",
    "8T",
    "9A",
    "10A",
    "11A",
    "12B",
    "13B",
    "14C",
    "18C",
    "20C",
    "22D",
    "26D",
    "29E",
    "32E",
  ],
  cm: [
    "0",
    "0",
    "0",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6T",
    "7T",
    "8A",
    "9A",
    "10A",
    "11B",
    "11B",
    "15B",
    "18C",
    "20C",
    "23D",
    "25D",
    "27E",
  ],
  co: [
    "0",
    "0",
    "0",
    "1",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "6T",
    "7T",
    "7A",
    "8A",
    "9A",
    "10B",
    "14B",
    "16B",
    "18C",
    "20C",
    "22D",
    "24E",
  ],
  indicesSM: [2, 99999],
  saSM: ["0", ""],
  cuSM: ["0", ""],
  ceSM: ["0", ""],
  cmSM: ["0", ""],
  coSM: ["0", ""],
  getResultado(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.sa;
    else if (armadura == "CU") tabla = this.cu;
    else if (armadura == "CE") tabla = this.ce;
    else if (armadura == "CM") tabla = this.cm;
    else if (armadura == "CO") tabla = this.co;
    else {
      console.log(
        "ERROR - tablaGarrasDientes.getResultado(roll,armadura): armadura == " +
          armadura
      );
      return;
    }
    return tabla[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
  getResultadoSM(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.saSM;
    else if (armadura == "CU") tabla = this.cuSM;
    else if (armadura == "CE") tabla = this.ceSM;
    else if (armadura == "CM") tabla = this.cmSM;
    else if (armadura == "CO") tabla = this.coSM;
    else {
      console.log(
        "ERROR - tablaGarrasDientes.getResultadoSM(roll,armadura): armadura == " +
          armadura
      );
      return;
    }
    return tabla[
      this.indicesSM.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaAgarrarDesequilibrar = {
  indices: [
    45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125,
    130, 135, 140, 145, 9999999,
  ],
  sa: [
    "0",
    "0",
    "0",
    "0",
    "1",
    "1",
    "2",
    "4",
    "5",
    "7T",
    "8T",
    "10T",
    "11A",
    "14A",
    "15A",
    "16B",
    "18B",
    "20B",
    "22C",
    "28C",
    "30C",
    "33D",
  ],
  cu: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "3",
    "4T",
    "6T",
    "7T",
    "8A",
    "9A",
    "10A",
    "12B",
    "13B",
    "14C",
    "16C",
    "18C",
    "20D",
    "26D",
    "28D",
    "30E",
  ],
  ce: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "2",
    "4T",
    "5T",
    "6T",
    "7A",
    "8A",
    "10A",
    "11B",
    "12B",
    "14B",
    "16C",
    "18C",
    "22C",
    "25D",
    "27E",
  ],
  cm: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "2T",
    "3T",
    "4A",
    "4A",
    "5A",
    "6A",
    "7A",
    "8B",
    "9C",
    "10C",
    "11C",
    "13D",
    "15D",
    "19D",
    "21E",
    "23E",
  ],
  co: [
    "0",
    "0",
    "0",
    "1",
    "1",
    "2T",
    "2A",
    "3A",
    "3A",
    "4A",
    "4A",
    "5B",
    "5B",
    "6C",
    "7C",
    "8C",
    "10D",
    "11D",
    "12D",
    "14E",
    "16E",
    "18E",
  ],
  indicesSM: [2, 99999],
  saSM: ["0", ""],
  cuSM: ["0", ""],
  ceSM: ["0", ""],
  cmSM: ["0", ""],
  coSM: ["0", ""],
  getResultado(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.sa;
    else if (armadura == "CU") tabla = this.cu;
    else if (armadura == "CE") tabla = this.ce;
    else if (armadura == "CM") tabla = this.cm;
    else if (armadura == "CO") tabla = this.co;
    else {
      console.log(
        "ERROR - tablaAgarrarDesequilibrar.getResultado(roll,armadura): armadura == " +
          armadura
      );
      return;
    }
    return tabla[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
  getResultadoSM(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.saSM;
    else if (armadura == "CU") tabla = this.cuSM;
    else if (armadura == "CE") tabla = this.ceSM;
    else if (armadura == "CM") tabla = this.cmSM;
    else if (armadura == "CO") tabla = this.coSM;
    else {
      console.log(
        "ERROR - tablaAgarrarDesequilibrar.getResultadoSM(roll,armadura): armadura == " +
          armadura
      );
      return;
    }
    return tabla[
      this.indicesSM.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaRayo = {
  indices: [
    10, 20, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110,
    115, 120, 125, 130, 135, 140, 145, 9999999,
  ],
  sa: [
    "F",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "8A",
    "10A",
    "11B",
    "12B",
    "13B",
    "14B",
    "15C",
    "16C",
    "18C",
    "20C",
    "22D",
    "24D",
    "26E",
    "28E",
    "30E",
    "32E",
    "34E",
    "36E",
  ],
  cu: [
    "F",
    "0",
    "0",
    "0",
    "0",
    "1",
    "1",
    "2",
    "3",
    "4A",
    "5A",
    "6B",
    "7B",
    "8B",
    "10B",
    "12C",
    "14C",
    "16C",
    "18C",
    "20D",
    "22D",
    "24E",
    "26E",
    "28E",
    "30E",
    "31E",
  ],
  ce: [
    "F",
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "2",
    "4",
    "5",
    "6",
    "7A",
    "8A",
    "9B",
    "10B",
    "11B",
    "12C",
    "13C",
    "14C",
    "15C",
    "16D",
    "17D",
    "18E",
    "19E",
    "20E",
    "22E",
  ],
  cm: [
    "F",
    "F",
    "0",
    "0",
    "1",
    "1",
    "2",
    "2",
    "3",
    "4",
    "5A",
    "6A",
    "7A",
    "8A",
    "9B",
    "10B",
    "11B",
    "12C",
    "13C",
    "14C",
    "15C",
    "16D",
    "17D",
    "18D",
    "20E",
    "22E",
  ],
  co: [
    "F",
    "F",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7A",
    "7A",
    "8A",
    "8A",
    "9A",
    "9A",
    "10A",
    "10B",
    "11B",
    "12B",
    "12C",
    "13C",
    "14C",
    "15C",
    "16D",
    "17D",
    "18E",
  ],
  indicesSM: [2, 99999],
  saSM: ["F", ""],
  cuSM: ["F", ""],
  ceSM: ["F", ""],
  cmSM: ["F", ""],
  coSM: ["F", ""],
  getResultado(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.sa;
    else if (armadura == "CU") tabla = this.cu;
    else if (armadura == "CE") tabla = this.ce;
    else if (armadura == "CM") tabla = this.cm;
    else if (armadura == "CO") tabla = this.co;
    else {
      console.log(
        "ERROR - tablaRayo.getResultado(roll,armadura): armadura == " + armadura
      );
      return;
    }
    return tabla[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
  getResultadoSM(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.saSM;
    else if (armadura == "CU") tabla = this.cuSM;
    else if (armadura == "CE") tabla = this.ceSM;
    else if (armadura == "CM") tabla = this.cmSM;
    else if (armadura == "CO") tabla = this.coSM;
    else {
      console.log(
        "ERROR - tablaRayo.getResultadoSM(roll,armadura): armadura == " +
          armadura
      );
      return;
    }
    return tabla[
      this.indicesSM.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaBola = {
  indices: [
    8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80,
    84, 88, 92, 9999999,
  ],
  sa: [
    "F",
    "1",
    "2",
    "3",
    "4",
    "5A",
    "6A",
    "7A",
    "8A",
    "9A",
    "10B",
    "11B",
    "12B",
    "13B",
    "14B",
    "15C",
    "16C",
    "17C",
    "18C",
    "19C",
    "20C",
    "21C",
    "22C",
  ],
  cu: [
    "F",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6A",
    "7A",
    "8A",
    "9A",
    "10A",
    "10A",
    "11B",
    "11B",
    "12B",
    "12B",
    "13C",
  ],
  ce: [
    "F",
    "0",
    "0",
    "0",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5A",
    "6A",
    "7A",
    "8A",
    "9A",
    "10A",
    "10A",
    "11B",
    "11B",
    "12B",
    "12C",
    "13C",
    "13C",
    "14C",
  ],
  cm: [
    "F",
    "0",
    "0",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5A",
    "6A",
    "7A",
    "8A",
    "9A",
    "10B",
    "11B",
    "11B",
    "12B",
    "12B",
    "13C",
    "13C",
    "14C",
    "14C",
    "15C",
  ],
  co: [
    "F",
    "0",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5A",
    "6A",
    "7A",
    "8A",
    "9A",
    "10B",
    "11B",
    "12B",
    "12B",
    "13C",
    "13C",
    "14C",
    "14C",
    "15C",
    "15C",
    "16C",
  ],
  indicesSM: [4, 96, 99, 99999],
  saSM: ["F", "", "28D", "34E"],
  cuSM: ["F", "", "16D", "19E"],
  ceSM: ["F", "", "17D", "20E"],
  cmSM: ["F", "", "18D", "21E"],
  coSM: ["F", "", "19D", "22E"],
  getResultado(roll, armadura) {
    console.log(roll);
    let tabla = null;
    if (armadura == "SA") tabla = this.sa;
    else if (armadura == "CU") tabla = this.cu;
    else if (armadura == "CE") tabla = this.ce;
    else if (armadura == "CM") tabla = this.cm;
    else if (armadura == "CO") tabla = this.co;
    else {
      console.log(
        "ERROR - tablaBola.getResultado(roll,armadura): armadura == " + armadura
      );
      return;
    }
    return tabla[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
  getResultadoSM(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.saSM;
    else if (armadura == "CU") tabla = this.cuSM;
    else if (armadura == "CE") tabla = this.ceSM;
    else if (armadura == "CM") tabla = this.cmSM;
    else if (armadura == "CO") tabla = this.coSM;
    else {
      console.log(
        "ERROR - tablaBola.getResultadoSM(roll,armadura): armadura == " +
          armadura
      );
      return;
    }
    return tabla[
      this.indicesSM.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaSortilegiosBase = {
  indices: [
    4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76,
    80, 84, 88, 92, 9999999,
  ],
  sa: [
    "F",
    "+70",
    "+65",
    "+60",
    "+50",
    "+45",
    "+35",
    "+30",
    "+20",
    "+15",
    "+5",
    "0",
    "0",
    "-5",
    "-10",
    "-15",
    "-20",
    "-25",
    "-30",
    "-35",
    "-40",
    "-45",
    "-50",
    "-55",
  ],
  cu: [
    "F",
    "F",
    "F",
    "+45",
    "+40",
    "+35",
    "+30",
    "+25",
    "+20",
    "+15",
    "+10",
    "+5",
    "0",
    "0",
    "-5",
    "-5",
    "-10",
    "-15",
    "-20",
    "-25",
    "-30",
    "-35",
    "-40",
    "-45",
  ],
  ce: [
    "F",
    "F",
    "F",
    "+45",
    "+40",
    "+35",
    "+30",
    "+25",
    "+20",
    "+15",
    "+10",
    "+5",
    "0",
    "0",
    "-5",
    "-5",
    "-10",
    "-15",
    "-20",
    "-25",
    "-30",
    "-35",
    "-40",
    "-45",
  ],
  cm: [
    "F",
    "F",
    "F",
    "F",
    "+45",
    "+40",
    "+35",
    "+30",
    "+25",
    "+20",
    "+15",
    "+10",
    "+5",
    "0",
    "0",
    "-5",
    "-5",
    "-10",
    "-25",
    "-30",
    "-35",
    "-40",
    "-45",
    "-50",
  ],
  co: [
    "F",
    "F",
    "F",
    "F",
    "+45",
    "+40",
    "+35",
    "+30",
    "+25",
    "+20",
    "+15",
    "+10",
    "+5",
    "0",
    "0",
    "-5",
    "-5",
    "-10",
    "-25",
    "-30",
    "-35",
    "-40",
    "-45",
    "-50",
  ],
  indicesSM: [4, 96, 99, 99999],
  saSM: ["F", "", "-65", "-90"],
  cuSM: ["F", "", "-65", "-90"],
  ceSM: ["F", "", "-65", "-90"],
  cmSM: ["F", "", "-65", "-90"],
  coSM: ["F", "", "-65", "-90"],
  getResultado(roll, armadura) {
    console.log(roll);
    let tabla = null;
    if (armadura == "SA") tabla = this.sa;
    else if (armadura == "CU") tabla = this.cu;
    else if (armadura == "CE") tabla = this.ce;
    else if (armadura == "CM") tabla = this.cm;
    else if (armadura == "CO") tabla = this.co;
    else {
      console.log(
        "ERROR - tablaSortilegiosBase.getResultado(roll,armadura): armadura == " +
          armadura
      );
      return;
    }
    return tabla[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
  getResultadoSM(roll, armadura) {
    let tabla = null;
    if (armadura == "SA") tabla = this.saSM;
    else if (armadura == "CU") tabla = this.cuSM;
    else if (armadura == "CE") tabla = this.ceSM;
    else if (armadura == "CM") tabla = this.cmSM;
    else if (armadura == "CO") tabla = this.coSM;
    else {
      console.log(
        "ERROR - tablaSortilegiosBase.getResultadoSM(roll,armadura): armadura == " +
          armadura
      );
      return;
    }
    return tabla[
      this.indicesSM.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

function ataques(msg) {
  let chorrazo = "";
  // node ataques "!atq eaSA100"
  // node ataques "!ttr nivAt/divDef"

  if (msg.indexOf("!ttr ") !== -1) {
    // !ttr nivAt/nivDef
    msg = msg.replace("!ttr ", "");
    let pos = msg.indexOf("/");
    if (pos < 0) {
      console.log("ERROR - main !atanim: no se encuentra / en " + msg);
      return;
    }
    let nivAt = parseInt(msg.substring(0, pos));
    let nivDef = parseInt(msg.substring(pos + 1));
    let resultado = 50;
    let i = 0;
    for (i = 1; i <= nivAt; ++i) {
      if (i < 6) resultado += 5;
      else if (i < 11) resultado += 3;
      else if (i < 16) resultado += 2;
      else resultado += 1;
    }
    for (i = 1; i <= nivDef; ++i) {
      if (i < 6) resultado -= 5;
      else if (i < 11) resultado -= 3;
      else if (i < 16) resultado -= 2;
      else resultado -= 1;
    }
    chorrazo +=
      "Nivel Atacante = " +
      nivAt +
      "\nNivel Defensor = " +
      nivDef +
      "\nResultado = " +
      resultado +
      "\n";
  } else if (msg.indexOf("!atq ") !== -1) {
    // !atq eaSA100

    msg = msg.replace("!atq ", "");
    let tablaDesc = ""; //De filo, contundentes, etc.
    let tablaAtaque = null; //tablaFilo, tablaContundentes, etc.
    let tirada = 0;
    let resultado = "";
    let indice = 0;
    if (msg.substring(0, 2) == "ea") {
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Espada ancha";
    } else if (msg.substring(0, 2) == "da") {
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Daga";
    } else if (msg.substring(0, 2) == "ha") {
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Hacha";
    } else if (msg.substring(0, 2) == "ci") {
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Cimitarra";
    } else if (msg.substring(0, 2) == "ec") {
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Espada corta";
    } else if (msg.substring(0, 2) == "lt") {
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Látigo";
    } else if (msg.substring(0, 2) == "ga") {
      tablaDesc = "Contundentes";
      tablaAtaque = tablaContundentes;
      arma = "Garrote";
    } else if (msg.substring(0, 2) == "ma") {
      tablaDesc = "Contundentes";
      tablaAtaque = tablaContundentes;
      arma = "Maza";
    } else if (msg.substring(0, 2) == "mc") {
      tablaDesc = "Contundentes";
      tablaAtaque = tablaContundentes;
      arma = "Maza de combate";
    } else if (msg.substring(0, 2) == "rd") {
      tablaDesc = "Agarre y desequilibrio";
      tablaAtaque = tablaAgarrarDesequilibrar;
      arma = "Red";
    } else if (msg.substring(0, 2) == "mg") {
      tablaDesc = "A dos manos";
      tablaAtaque = tablaContundentes;
      arma = "Martillo de guerra";
    } else if (msg.substring(0, 2) == "j1") {
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Jabalina a 1 mano";
    } else if (msg.substring(0, 2) == "j2") {
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Jabalina a 2 manos";
    } else if (msg.substring(0, 2) == "l1") {
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Lanza a 1 mano";
    } else if (msg.substring(0, 2) == "l2") {
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Lanza a 2 manos";
    } else if (msg.substring(0, 2) == "lc") {
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Lanza de caballería";
    } else if (msg.substring(0, 2) == "ab") {
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Alabarda";
    } else if (msg.substring(0, 2) == "hc") {
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Hacha de combate";
    } else if (msg.substring(0, 2) == "my") {
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Mayal";
    } else if (msg.substring(0, 2) == "bs") {
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Bastón";
    } else if (msg.substring(0, 2) == "e2") {
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Espadón";
    } else if (msg.substring(0, 2) == "bo") {
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Boleadoras";
    } else if (msg.substring(0, 2) == "ak") {
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Arco compuesto";
    } else if (msg.substring(0, 2) == "ac") {
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Arco corto";
    } else if (msg.substring(0, 2) == "al") {
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Arco largo";
    } else if (msg.substring(0, 2) == "ba") {
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Ballesta";
    } else if (msg.substring(0, 2) == "ho") {
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Honda";
    } else return;
    let armadura = msg.substring(2, 4);
    let tipoArmadura = "";
    if (armadura == "SA") tipoArmadura = "Sin Armadura";
    else if (armadura == "CU") tipoArmadura = "Cuero";
    else if (armadura == "CE") tipoArmadura = "Cuero Endurecido";
    else if (armadura == "CM") tipoArmadura = "Cota de Malla";
    else if (armadura == "CO") tipoArmadura = "Coraza";
    else {
      console.log("ERROR - main !atq: armadura == " + armadura);
      return;
    }
    tirada = parseInt(msg.substring(4), 10);
    // log(msg.substring(2));
    // log(indice);
    //sendChat(msg.who, "Crítico " + gravedad + " de " + tipoCritico + ":");
    chorrazo +=
      "/w GM &{template:ataque}{{tabla=" +
      tablaDesc +
      "}}{{arma=" +
      arma +
      "}}{{armadura=" +
      tipoArmadura +
      "}}{{tirada=" +
      tirada +
      "}}{{resultado=" +
      tablaAtaque.getResultado(tirada, armadura) +
      "}}{{personaje=}}";
    //resultado = tabla.getCritico(indice);
    // log(resultado);
  } else if (msg.indexOf("!bola ") !== -1) {
    // !bola SA100+100
    msg = msg.replace("!bola ", "");
    let armadura = msg.substring(0, 2);
    let tipoArmadura = "";
    if (armadura == "SA") tipoArmadura = "Sin Armadura";
    else if (armadura == "CU") tipoArmadura = "Cuero";
    else if (armadura == "CE") tipoArmadura = "Cuero Endurecido";
    else if (armadura == "CM") tipoArmadura = "Cota de Malla";
    else if (armadura == "CO") tipoArmadura = "Coraza";
    else {
      console.log("ERROR - main !bola: armadura == " + armadura);
      return;
    }
    let pos = msg.lastIndexOf("-");
    if (pos < 0) pos = msg.lastIndexOf("+");
    if (pos < 0) {
      console.log("ERROR - main !atarma: no se encuentra +/- en " + msg);
      return;
    }
    let tiradaSM = parseInt(msg.substring(2, pos));
    let modificador = parseInt(msg.substring(pos));
    let modStr = (modificador > 0 ? "+" : "") + modificador.toString();
    console.log(armadura);
    console.log(tiradaSM);
    console.log(modificador);
    let resultadoAtq = tablaBola.getResultadoSM(tiradaSM, armadura);
    let tiradaStr = tiradaSM.toString() + "SM";
    if (resultadoAtq == "") {
      resultadoAtq = tablaBola.getResultado(tiradaSM + modificador, armadura);
      tiradaStr = (tiradaSM + modificador).toString();
    }
    chorrazo +=
      "/w GM &{template:ataque}{{tabla=Sortilegios de Bola}}{{arma=Bola de Fuego/Frío}}{{armadura=" +
      tipoArmadura +
      "}}{{tirada=" +
      tiradaStr +
      "}}{{resultado=" +
      resultadoAtq +
      "}}{{personaje=}}";
  } else if (msg.indexOf("!base ") !== -1) {
    // !base (CAN/ESE)(SA/CU...)100+100
    msg = msg.replace("!base ", "");
    let armadura = msg.substring(3, 5);
    let tipoArmadura = "";
    if (armadura == "SA") tipoArmadura = "Sin Armadura";
    else if (armadura == "CU") tipoArmadura = "Cuero";
    else if (armadura == "CE") tipoArmadura = "Cuero Endurecido";
    else if (armadura == "CM") tipoArmadura = "Cota de Malla";
    else if (armadura == "CO") tipoArmadura = "Coraza";
    else {
      console.log("ERROR - main !base: armadura == " + armadura);
      return;
    }
    let pos = msg.lastIndexOf("-");
    if (pos < 0) pos = msg.lastIndexOf("+");
    if (pos < 0) {
      console.log("ERROR - main !atarma: no se encuentra +/- en " + msg);
      return;
    }
    let tiradaSM = parseInt(msg.substring(5, pos));
    let modificador = parseInt(msg.substring(pos));
    let modStr = (modificador > 0 ? "+" : "") + modificador.toString();
    let tiradaModificada = tiradaSM + modificador;

    let armaduraEfectiva = armadura;
    let dominio = msg.substring(0, 3);
    if (dominio == "CAN") {
      dominio = "Canalización";
      if (armadura == "CU" || armadura == "CE") armaduraEfectiva = "SA";
      if (armadura == "CO" || armadura == "CM") tiradaModificada -= 10;
    } else if (dominio == "ESE") {
      dominio = "Esencia";
    } else {
      console.log("ERROR - main !base: dominio = " + dominio);
      return;
    }

    let resultadoAtq = tablaSortilegiosBase.getResultadoSM(
      tiradaSM,
      armaduraEfectiva
    );
    let tiradaStr = tiradaSM.toString() + "\uD83C\uDFB2";
    if (resultadoAtq == "F") {
      tiradaStr += " (pifia)";
    } else {
      resultadoAtq = tablaSortilegiosBase.getResultado(
        tiradaModificada,
        armaduraEfectiva
      );
      tiradaStr += modStr + " = " + tiradaModificada;
    }
    chorrazo +=
      "/w GM &{template:ataque}{{tabla=Sortilegios de base}}{{arma=Sortilegio de " +
      dominio +
      "}}{{armadura=" +
      tipoArmadura +
      "}}{{tirada=" +
      tiradaStr +
      "}}{{resultado=" +
      resultadoAtq +
      "}}{{personaje=}}";
  } else if (msg.indexOf("!rayo ") !== -1) {
    // !rayo RDDSA100+100
    msg = msg.replace("!rayo ", "");

    let maxTirada = 150;

    let pos = msg.lastIndexOf("-");
    if (pos < 0) pos = msg.lastIndexOf("+");
    if (pos < 0) {
      console.log("ERROR - main !rayo: no se encuentra +/- en " + msg);
      return;
    }
    let tiradaSM = parseInt(msg.substring(5, pos));
    let modificador = parseInt(msg.substring(pos));
    let modStr = (modificador > 0 ? "+" : "") + modificador.toString();
    let tiradaModificada = tiradaSM + modificador;

    let armadura = msg.substring(3, 5);
    let tipoArmadura = "";
    if (armadura == "SA") tipoArmadura = "Sin Armadura";
    else if (armadura == "CU") tipoArmadura = "Cuero";
    else if (armadura == "CE") tipoArmadura = "Cuero Endurecido";
    else if (armadura == "CM") tipoArmadura = "Cota de Malla";
    else if (armadura == "CO") tipoArmadura = "Coraza";
    else {
      console.log("ERROR - main !rayo: armadura == " + armadura);
      return;
    }
    let tipoRayo = msg.substring(0, 3);
    let strRayo = "";
    if (tipoRayo == "RDD") {
      strRayo = "Rayo de Descarga";
      maxTirada = 90;
      if (armadura == "CM" || armadura == "CO") tiradaModificada += 10;
    } else if (tipoRayo == "RDA") {
      strRayo = "Rayo de Agua";
      maxTirada = 110;
      if (armadura == "CO" || armadura == "CE") tiradaModificada -= 10;
    } else if (tipoRayo == "RDH") {
      strRayo = "Rayo de Hielo";
      maxTirada = 130;
      if (armadura == "CO" || armadura == "CE") tiradaModificada -= 5;
    } else if (tipoRayo == "REL") {
      strRayo = "Relámpago";
      maxTirada = 150;
      if (armadura == "CM" || armadura == "CO") tiradaModificada += 10;
    } else if (tipoRayo == "RIG") {
      strRayo = "Rayo Ígneo";
      maxTirada = 150;
    } else {
      console.log("ERROR - main !rayo: tipoRayo == " + tipoRayo);
      return;
    }

    let resultadoAtq = tablaRayo.getResultadoSM(tiradaSM, armadura);
    let tiradaStr = tiradaSM.toString() + "SM";
    if (resultadoAtq == "") {
      tiradaStr = tiradaModificada.toString();
      if (tiradaModificada > maxTirada) {
        tiradaModificada = maxTirada;
        tiradaStr = maxTirada.toString() + "MAX";
      }
      resultadoAtq = tablaRayo.getResultado(tiradaModificada, armadura);
    }
    chorrazo +=
      "/w GM &{template:ataque}{{tabla=Sortilegios de Rayo}}{{arma=" +
      strRayo +
      "}}{{armadura=" +
      tipoArmadura +
      "}}{{tirada=" +
      tiradaStr +
      "}}{{resultado=" +
      resultadoAtq +
      "}}{{personaje=}}";
  } else if (msg.indexOf("!atanim ") !== -1) {
    // !atanim (P|M|G|E)(SA|CU...)(pi|mo|ga...)/100+100
    msg = msg.replace("!atanim ", "");
    let tablaAtaque = null;

    let tamano = msg.substring(0, 1);
    let maxTirada = 150;
    if (tamano == "P" || tamano == "D") {
      maxTirada = 105;
    } else if (tamano == "M") {
      maxTirada = 120;
    } else if (tamano == "G") {
      maxTirada = 135;
    } else if (tamano == "E") {
      maxTirada = 150;
    }

    let criticoPrincipal = "";
    let criticoSecundario = "--";

    let pos = msg.indexOf("/");
    if (pos < 0) {
      console.log("ERROR - main !atanim: no se encuentra / en " + msg);
      return;
    }

    let tipoAtaque = msg.substring(3, pos);
    let tipoAtaqueStr = "";
    if (tipoAtaque == "pi") {
      tipoAtaqueStr = "Pico/Pinzas";
      tablaAtaque = tablaGarrasDientes;
      criticoPrincipal = "TA";
      if (tamano == "G" || tamano == "E") criticoSecundario = "AP";
    } else if (tipoAtaque == "mo") {
      tipoAtaqueStr = "Mordisco";
      tablaAtaque = tablaGarrasDientes;
      criticoPrincipal = "PE";
      criticoSecundario = "TA(C)";
    } else if (tipoAtaque == "ga") {
      tipoAtaqueStr = "Garra/Zarpa";
      tablaAtaque = tablaGarrasDientes;
      criticoPrincipal = "TA";
      if (tamano == "G" || tamano == "E") criticoSecundario = "PE(B)";
    } else if (tipoAtaque == "cu" || tipoAtaque == "ag" || tipoAtaque == "co") {
      tipoAtaqueStr = "Cuerno/Colmillo/Aguijón";
      tablaAtaque = tablaGarrasDientes;
      criticoPrincipal = "PE";
      if (tamano == "G" || tamano == "E") criticoSecundario = "AP(C)";
    } else if (tipoAtaque == "apr") {
      tipoAtaqueStr = "Apresar/Fagocitar";
      tablaAtaque = tablaAgarrarDesequilibrar;
      criticoPrincipal = "PR";
      criticoSecundario = "DE(C)";
    } else if (tipoAtaque == "em" || tipoAtaque == "to") {
      tipoAtaqueStr = "Embestida/Topetazo";
      tablaAtaque = tablaAgarrarDesequilibrar;
      criticoPrincipal = "DE";
      if (tamano == "G" || tamano == "E") criticoSecundario = "AP(C)";
    } else if (tipoAtaque == "di") {
      tipoAtaqueStr = "Animales diminutos";
      tablaAtaque = tablaGarrasDientes;
      criticoPrincipal = "TA(T)";
    } else if (tipoAtaque == "ps") {
      tipoAtaqueStr = "Pisotón";
      tablaAtaque = tablaGarrasDientes;
      criticoPrincipal = "AP";
      if (tamano == "G" || tamano == "E") criticoSecundario = "AP";
    } else if (tipoAtaque == "ca" || tipoAtaque == "ap") {
      tipoAtaqueStr = "Caída / Aplastamiento";
      tablaAtaque = tablaGarrasDientes;
      criticoPrincipal = "AP";
      if (tamano == "G" || tamano == "E") criticoSecundario = "AP";
    } else if (tipoAtaque == "pu") {
      tipoAtaqueStr = "Puño / Patada";
      tablaAtaque = tablaGarrasDientes;
      criticoPrincipal = "DE(A)";
    } else if (tipoAtaque == "lu") {
      tipoAtaqueStr = "Lucha libre";
      tablaAtaque = tablaAgarrarDesequilibrar;
      criticoPrincipal = "PR(A)";
    } else {
      console.log(
        "ERROR - main !atanim: tipo de ataque no válido " + tipoAtaque
      );
      return;
    }

    let tablaDesc = "Agarrar y Desequilibrar";
    if (tablaAtaque == tablaGarrasDientes) tablaDesc = "Garras y Dientes";

    let iniTirada = pos + 1;

    let posMinus = msg.indexOf("-");
    let posPlus = msg.indexOf("+");

    if (posMinus < 0 && posPlus < 0) {
      pos = -1;
    } else if (posMinus < 0 && posPlus >= 0) {
      pos = posPlus;
    } else if (posPlus < 0 && posMinus >= 0) {
      pos = posMinus;
    } else {
      pos = Math.min(posPlus, posMinus);
    }

    if (pos < 0) {
      console.log("ERROR - main !atanim: no se encuentra +/- en " + msg);
      return;
    }

    let tiradaSM = parseInt(msg.substring(iniTirada, pos));
    let modificador = parseInt(evaluate(msg.substring(pos)));
    let tiradaModificada = tiradaSM + modificador;

    let armadura = msg.substring(1, 3);
    let tipoArmadura = "";
    if (armadura == "SA") tipoArmadura = "Sin Armadura";
    else if (armadura == "CU") tipoArmadura = "Cuero";
    else if (armadura == "CE") tipoArmadura = "Cuero Endurecido";
    else if (armadura == "CM") tipoArmadura = "Cota de Malla";
    else if (armadura == "CO") tipoArmadura = "Coraza";
    else {
      console.log("ERROR - main !atanim: armadura == " + armadura);
      return;
    }

    let pifia = 2;
    let resultadoAtq = "ATAQUE FALLIDO";
    let tiradaStr = tiradaSM.toString(); // + "SM (pifia)";
    if (tiradaSM <= pifia) {
      tiradaStr += "SM (ataque fallido)";
    } else {
      tiradaStr +=
        (modificador >= 0 ? "+" : "") +
        modificador.toString() +
        " = " +
        tiradaModificada.toString();
      resultadoAtq = tablaAtaque.getResultado(tiradaModificada, armadura);
    }

    if (tamano == "D") {
      let result_pv = resultadoAtq.match(/\d+/g)[0];
      let result_crit = resultadoAtq.match(/[a-zA-Z]+/g)[0];
      if (result_crit != "") result_crit = "T";
      resultadoAtq = result_pv.toString() + result_crit;
    }

    // chorrazo += "/w GM &{template:ataque}{{tabla=" + tablaDesc + "}}{{arma=" + tipoAtaqueStr + "}}{{armadura=" + tipoArmadura + "}}{{tirada=" + tiradaStr + "}}{{resultado=" + resultadoAtq + "}}{{personaje=}}{{crit1="+criticoPrincipal+"}}{{crit2="+criticoSecundario+"}}";
    chorrazo +=
      "\n===== Ataque con " +
      tipoAtaqueStr +
      "(" +
      tamano +
      ")" +
      " vs " +
      tipoArmadura +
      " =====\n";
    chorrazo += " - " + getTimestamp() + "\n";
    chorrazo += " - Tabla: " + tablaDesc + "\n";
    chorrazo += " - Tirada: " + tiradaStr + "\n";
    chorrazo += " - Resultado: " + resultadoAtq + "\n";
    chorrazo += " - Crítico principal: " + criticoPrincipal + "\n";
    chorrazo += " - Crítico secundario: " + criticoSecundario + "\n\n";
  } else if (msg.indexOf("!atarma ") !== -1) {
    // node ataques "!atarma COha/98+98-15"
    msg = msg.replace("!atarma ", "");
    let tablaAtaque = null;

    let criticoPrincipal = "";
    let criticoSecundario = "--";

    let pos = msg.indexOf("/");
    if (pos < 0) {
      console.log("ERROR - main !atarma: no se encuentra / en " + msg);
      return;
    }

    let tipoAtaque = msg.substring(2, pos);
    let pifia = 0;

    if (tipoAtaque == "ea") {
      pifia = 3;
      criticoPrincipal = "TA";
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Espada ancha";
    } else if (tipoAtaque == "da") {
      pifia = 1;
      criticoPrincipal = "PE(C)";
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Daga";
    } else if (tipoAtaque == "ha") {
      pifia = 4;
      criticoPrincipal = "TA";
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Hacha";
    } else if (tipoAtaque == "ci") {
      pifia = 4;
      criticoPrincipal = "TA";
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Cimitarra";
    } else if (tipoAtaque == "ec") {
      pifia = 2;
      criticoPrincipal = "PE";
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Espada corta";
    } else if (tipoAtaque == "lt") {
      pifia = 6;
      criticoPrincipal = "PR(C)";
      criticoSecundario = "TA(A)";
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Látigo";
    } else if (tipoAtaque == "ga") {
      pifia = 4;
      criticoPrincipal = "AP(D)";
      tablaDesc = "Contundentes";
      tablaAtaque = tablaContundentes;
      arma = "Garrote";
    } else if (tipoAtaque == "ma") {
      pifia = 2;
      criticoPrincipal = "AP";
      tablaDesc = "Contundentes";
      tablaAtaque = tablaContundentes;
      arma = "Maza";
    } else if (tipoAtaque == "mc") {
      pifia = 8;
      criticoPrincipal = "AP";
      criticoSecundario = "PE(A)";
      tablaDesc = "Contundentes";
      tablaAtaque = tablaContundentes;
      arma = "Maza de combate";
    } else if (tipoAtaque == "rd") {
      pifia = 6;
      criticoPrincipal = "PR";
      tablaDesc = "Agarre y desequilibrio";
      tablaAtaque = tablaAgarrarDesequilibrar;
      arma = "Red";
    } else if (tipoAtaque == "mg") {
      pifia = 4;
      criticoPrincipal = "AP";
      tablaDesc = "Contundentes";
      tablaAtaque = tablaContundentes;
      arma = "Martillo de guerra";
    } else if (tipoAtaque == "j1") {
      pifia = 4;
      criticoPrincipal = "PE";
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Jabalina a 1 mano";
    } else if (tipoAtaque == "j2") {
      pifia = 4;
      criticoPrincipal = "PE";
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Jabalina a 2 manos";
    } else if (tipoAtaque == "l1") {
      pifia = 5;
      criticoPrincipal = "PE";
      criticoSecundario = "TA(A)";
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Lanza a 1 mano";
    } else if (tipoAtaque == "l2") {
      pifia = 5;
      criticoPrincipal = "PE";
      criticoSecundario = "TA(A)";
      tablaDesc = "De filo";
      tablaAtaque = tablaFilo;
      arma = "Lanza a 2 manos";
    } else if (tipoAtaque == "lc") {
      pifia = 7;
      criticoPrincipal = "PE";
      criticoSecundario = "DE";
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Lanza de caballería";
    } else if (tipoAtaque == "ab") {
      pifia = 7;
      criticoPrincipal = "TA";
      criticoSecundario = "PE";
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Alabarda";
    } else if (tipoAtaque == "hc") {
      pifia = 5;
      criticoPrincipal = "TA";
      criticoSecundario = "AP";
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Hacha de combate";
    } else if (tipoAtaque == "my") {
      pifia = 8;
      criticoPrincipal = "AP";
      criticoSecundario = "PE";
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Mayal";
    } else if (tipoAtaque == "bs") {
      pifia = 3;
      criticoPrincipal = "AP";
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Bastón";
    } else if (tipoAtaque == "e2") {
      pifia = 5;
      criticoPrincipal = "TA";
      criticoSecundario = "AP";
      tablaDesc = "A dos manos";
      tablaAtaque = tabla2Manos;
      arma = "Espadón";
    } else if (tipoAtaque == "bo") {
      pifia = 7;
      criticoPrincipal = "PR";
      criticoSecundario = "AP(A)";
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Boleadoras";
    } else if (tipoAtaque == "ak") {
      pifia = 4;
      criticoPrincipal = "PE";
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Arco compuesto";
    } else if (tipoAtaque == "ac") {
      pifia = 4;
      criticoPrincipal = "PE";
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Arco corto";
    } else if (tipoAtaque == "al") {
      pifia = 5;
      criticoPrincipal = "PE";
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Arco largo";
    } else if (tipoAtaque == "ba") {
      pifia = 5;
      criticoPrincipal = "PE";
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Ballesta";
    } else if (tipoAtaque == "ho") {
      pifia = 6;
      criticoPrincipal = "AP(D)";
      tablaDesc = "Proyectil";
      tablaAtaque = tablaProyectiles;
      arma = "Honda";
    } else
      console.log(
        "ERROR - main !atarma: no se encuentra " + tipoAtaque + " en " + msg
      );

    let maxTirada = 150;
    let iniTirada = pos + 1;
    let posMinus = msg.indexOf("-");
    let posPlus = msg.indexOf("+");

    if (posMinus < 0 && posPlus < 0) {
      pos = -1;
    } else if (posMinus < 0 && posPlus >= 0) {
      pos = posPlus;
    } else if (posPlus < 0 && posMinus >= 0) {
      pos = posMinus;
    } else {
      pos = Math.min(posPlus, posMinus);
    }

    // pos = msg.lastIndexOf("-");
    // if (pos<0) pos = msg.lastIndexOf("+");
    if (pos < 0) {
      console.log("ERROR - main !atarma: no se encuentra +/- en " + msg);
      return;
    }

    let tiradaSM = parseInt(msg.substring(iniTirada, pos));
    // npm install mathjs
    let modificador = parseInt(evaluate(msg.substring(pos)));
    let tiradaModificada = tiradaSM + modificador;

    let armadura = msg.substring(0, 2);
    let tipoArmadura = "";
    if (armadura == "SA") tipoArmadura = "Sin Armadura";
    else if (armadura == "CU") tipoArmadura = "Cuero";
    else if (armadura == "CE") tipoArmadura = "Cuero Endurecido";
    else if (armadura == "CM") tipoArmadura = "Cota de Malla";
    else if (armadura == "CO") tipoArmadura = "Coraza";
    else {
      console.log("ERROR - main !atarma: armadura == " + armadura);
      return;
    }

    let resultadoAtq = "PIFIA";
    let tiradaStr = tiradaSM.toString(); // + "SM (pifia)";
    if (tiradaSM <= pifia) {
      tiradaStr += "SM (pifia)";
    } else {
      tiradaStr +=
        (modificador > 0 ? "+" : "") +
        modificador.toString() +
        " = " +
        tiradaModificada.toString();
      resultadoAtq = tablaAtaque.getResultado(tiradaModificada, armadura);
    }

    // chorrazo += "&{template:ataque}{{tabla=" + tablaDesc + "}}{{arma=" + arma + "}}{{armadura=" + tipoArmadura + "}}{{tirada=" + tiradaStr + "}}{{resultado=" + resultadoAtq + "}}{{personaje=}}{{crit1="+criticoPrincipal+"}}{{crit2="+criticoSecundario+"}}";
    chorrazo +=
      "\n===== Ataque con " + arma + " vs " + tipoArmadura + " =====\n";
    chorrazo += " - " + getTimestamp() + "\n";
    chorrazo += " - Tabla: " + tablaDesc + "\n";
    chorrazo += " - Tirada: " + tiradaStr + "\n";
    chorrazo += " - Resultado: " + resultadoAtq + "\n";
    chorrazo += " - Crítico principal: " + criticoPrincipal + "\n";
    chorrazo += " - Crítico secundario: " + criticoSecundario + "\n\n";
  }

  return chorrazo;
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

let text = ataques(process.argv[2]);
console.log(text);
fs.appendFile("ataques.log", text, "latin1", function (err) {
  if (err) throw err;
});
