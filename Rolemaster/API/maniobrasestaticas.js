const { evaluate } = require("mathjs");
var fs = require("fs");

let tablaManiobrasEstaticasGeneral = {
  //roll: 0;
  indices: [-26, 4, 75, 90, 110, 175, 9999999],
  resultados: [
    "ERROR GARRAFAL: Fracasas espectacularmente. Si es posible, tu acción estática tiene el efecto contrario al que te proponías.",
    "FRACASO ABSOLUTO: Tu total incompentencia te produce un lapsus mental. Cualquier maniobra estática que intentes durante los siguientes diez minutos (60 asaltos) será un FRACASO (FRACASO:'Has fallado. No podrás intentar la misma maniobra estática en el mismo sitio durante 1 día').",
    "FRACASO: Has fallado. No podrás intentar la misma maniobra estática en el mismo sitio durante 1 día.",
    "ÉXITO PARCIAL: Si es posible el éxito parcial, consigues el 20% de tu maniobra estática. No podrás intentar la misma maniobra estática en el mismo lugar durante una hora.",
    "CASI ÉXITO: Si es posible el éxito parcial, consigues el 50% de tu acción. Puedes volver a intentarlo después de 3 asaltos de reflexión.",
    "ÉXITO: Tu maniobra estática ha sido un éxito.",
    "ÉXITO ABSOLUTO: Tu maniobra estática tiene éxito y tienes una bonificación de +20 para las acciones estáticas que realices en los siguienes 10 minutos (60 asaltos).",
  ],
  getResultado(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaManiobrasEstaticasInfluenciaInteraccion = {
  //roll: 0;
  indices: [-26, 4, 75, 90, 110, 175, 9999999],
  resultados: [
    "ERROR GARRAFAL: Tu descarado intento de coerción alucina a la audiencia. Deciden hacer lo contrario de lo que tú intentabas que hiciesen. Hasta que no se produzca un cambio en la circunstancias, fracasarán todos tus intentos de influencia.",
    "FRACASO ABSOLUTO: Tu audiencia te rechaza, lo que te hace perder la confianza y tus aires de autoridad. Cualquier intento de influencia durante la siguiente hora (360 asaltos) resultará en FRACASO (FRACASO: 'tu audiencia no será receptiva a ninguno de tus intentos de influenciarla, al menos durante un día')",
    "FRACASO: Has fallado. Tu audiencia no será receptiva a ninguno de tus intentos de influenciarla, al menos durante un día.",
    "ÉXITO PARCIAL: Tu audiencia te sigue escuchando. Puedes seguir intentando influenciarles.",
    "CASI ÉXITO: Sigue hablando. Tu audiencia se muestra más receptiva. Modifica tu siguiente tirada en +20.",
    "ÉXITO: Has influenciado a tu audiencia.",
    "ÉXITO: ABSOLUTO No sólo has influenciado a tu audiencia, sino que recibes una bonificación de +50 cada vez que quieras volverles a influenciar, hasta que hagas algo que provoque una pérdida de confianza.",
  ],
  getResultado(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaManiobrasEstaticasRunasUsarObjetos = {
  //roll: 0;
  indices: [-26, 4, 75, 90, 110, 175, 9999999],
  resultados: [
    "ERROR GARRAFAL: Las capacidades o sortilegios que se encuentran en el papel de runas o en el objeto se activan y se dirigen contra ti. Las runas del papel desaparecerán y no podrás usar nunca los sortilegios o capacidades contenidas en el objeto.",
    "FRACASO ABSOLUTO: Tu mente se bloquea con este objeto/papel de runas y fracasarás automáticamente en futuros intentos de usarlo o leerlo. Existe una probabilidad del 50% de que un sortilegio se active.",
    "FRACASO: En estos momentos no se te ocurren más ideas sobre cómo leer/utilizar esta runa/objeto. Cuando hayas subido de nivel, podrás realizar otro intento de leer/usar esta runa/objeto.",
    "ÉXITO PARCIAL: Averiguas cuántos sortilegios y capacidades contiene y qué son. Pero todavía no puedes leerlo/usarlo y no podrás volver a intentarlo hasta que haya transcurrido una semana.",
    "CASI ÉXITO: Averiguas cuántos sortilegios y capacidades tiene y qué son. Si esperas 24 horas, podrás volver a intentarlo con una bonificación extra de +10.",
    "ÉXITO: Aprendes uno de los sortilegios o capacidades en un objeto o en un trozo de papel o pergamino rúnico, y podrás usarlo siempre que sostengas el objeto o el papel (las runas sólo se pueden usar una vez).",
    "ÉXITO ABSOLUTO: Aprendes todos los sortilegios y capacidades en un objeto o trozo de papel o pergamino rúnico, y puedes usarlos siempre que sostengas el papel o el objeto (las runas sólo se pueden usar una vez).",
  ],
  getResultado(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaManiobrasEstaticasPercepcionRastrear = {
  //roll: 0;
  indices: [-26, 4, 75, 90, 110, 175, 9999999],
  resultados: [
    "ERROR GARRAFAL: No sólo no consigues ninguna información válida, sino que obtienes información falsa debido a un juicio erróneo o por fijarte en los detalles equivocados. Nunca podrás volver a intentarlo sobre el mismo tema y en la misma zona.",
    "FRACASO ABSOLUTO: La confusión te causa un lapsus mental. Esta tirada de percepción y todas las tiradas de percepción realizadas durante los siguientes 10 minutos (60 asaltos) resultarán en FRACASO (FRACASO: No consigues información pero te parece que has averiguado todo lo que era posible averiguar. No podrás intentarlo otra vez, sobre el mismo tema y en la misma zona, durante 1 día).",
    "FRACASO: No consigues información pero te parece que has averiguado todo lo que era posible averiguar. No podrás intentarlo otra vez, sobre el mismo tema y en la misma zona, durante 1 día.",
    "ÉXITO PARCIAL: Averiguas algo de la información referente al tema sobre el que iba la tirada de percepción, pero te das cuenta de que hay algo que se te ha escapado. No podrás volver a intentarlo sobre el mismo tema y en la misma zona durante 1 hora.",
    "CASI ÉXITO: Consigues algo de la información requerida por el tema sobre el que iba la tirada de percepción y te das cuenta de que te falta algo. Piensa en ello durante 3 asaltos y puedes volver a intentarlo.",
    "ÉXITO: Consigues toda la información sobre el tema que requería la tirada de percepción.",
    "ÉXITO ABSOLUTO: Percibes todo en la zona que estás examinando. Ello incluye la información sobre otros temas que no eran el que requería la tirada de percepción.",
  ],
  getResultado(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaManiobrasEstaticasCerradurasTrampas = {
  //roll: 0;
  indices: [-26, 4, 75, 90, 110, 175, 9999999],
  resultados: [
    "ERROR GARRAFAL: Si estás abriendo una cerradura, se te rompe la ganzúa, que queda atascada en la cerradura, impidiendo abrirla hasta que sea extraído el trozo de herramienta (lo que requiere otra tirada de abrir cerraduras por parte de otro personaje). Cualquier trampa se disparará.",
    "FRACASO ABSOLUTO: Te has bloqueado mentalmente con esta cerradura/trampa y fracasarás automáticamente en cualquier otro inento de abrirla/desactivarla. Existe una probabilidad del 50% de que las trampas se disparen.",
    "FRACASO: Has fallado. En estos momentos no se te ocurre ninguna idea más sobre cómo abrir/desactivar esta cerradura/trampa. Después de 24 horas podrás hacer una tirada de percepción y si tiene éxito, podrás intentarlo otra vez.",
    "ÉXITO PARCIAL: Has descubierto ya cómo funciona parte de la cerradura/trampa y tienes cierta idea de cómo puede ser el resto. Haz otra cosa durante 10 minutos y luego puedes volver a intentarlo.",
    "CASI ÉXITO: Casi lo consigues. Si pasas dos asaltos pensando en tu intento (ninguna otra actividad), puedes volverlo a intentar con una bonificación extra de +5.",
    "ÉXITO: La cerradura/trampa está abierta/desactivada. +50 en los futuros intentos de abrir/desactivar esta misma cerradura/trampa.",
    "ÉXITO ABSOLUTO: En el futuro podrás abrir/desactivar automáticamente (tardas 1 asalto) esta cerradura/trampa, o cualquier cerradura/trampa que sea idéntica. Bonificación de +10 para los intentos de abrir/desactivar cerraduras/trampas similares en el futuro.",
  ],
  getResultado(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

//TODO: Arreglar esto para adaptarlo a node.
function maniobraestatica(msg) {
  if (msg.indexOf("!mest ") !== -1) {
    // !mest G88;+30-20+15
    msg = msg.replace("!mest ", "");
    let pos = msg.indexOf(";");
    let tirada = parseInt(msg.substring(1, pos), 10);
    let tabla = null;
    let modificador = evaluate(msg.substring(pos + 1));
    let tipoManiobra = "";
    let indice = 0;
    if (msg[0] == "G") {
      tabla = tablaManiobrasEstaticasGeneral;
      tipoManiobra = "General";
    } else if (msg[0] == "I") {
      tabla = tablaManiobrasEstaticasInfluenciaInteraccion;
      tipoManiobra = "Influencia e Interacción";
    } else if (msg[0] == "L") {
      tabla = tablaManiobrasEstaticasRunasUsarObjetos;
      tipoManiobra = "Leer runas / Usar objetos";
    } else if (msg[0] == "P") {
      tabla = tablaManiobrasEstaticasPercepcionRastrear;
      tipoManiobra = "Percepción y rastrear";
    } else if (msg[0] == "A") {
      tabla = tablaManiobrasEstaticasCerradurasTrampas;
      tipoManiobra = "Abrir cerraduras / Desactivar trampas";
    }
    // TBD: meter las demás tablas, y cascar aquí los else if correspondientes
    else {
      return;
    }
    indice = tirada + modificador;
    let strModificador = "";
    if (modificador > 0) strModificador = "+" + modificador;
    else strModificador = modificador;
    // log(msg.substring(2));
    // log(indice);
    //sendChat(msg.who, "Crítico " + gravedad + " de " + tipoManiobra + ":");
    // let resultado = "&{template:default}{{name=Crítico " + gravedad + " (" + strModificador + ") de " + tipoManiobra + "}}{{Tirada[" + indice + "]="+tabla.getCritico(indice)+"}}";
    let resultado = tabla.getResultado(indice);
    let chorrazo = "\n===== Maniobra estática " + tipoManiobra + " =====\n";
    chorrazo += " - Tirada: " + tirada + strModificador + " = " + indice + "\n";
    chorrazo += " - " + resultado + "\n\n";
    return chorrazo;
  }
}

let text = maniobraestatica(process.argv[2]);
console.log(text);
fs.appendFile("man_mov.log", text, function (err) {
  if (err) throw err;
});
