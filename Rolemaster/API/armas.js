class TipoArma {
	constructor(resumenTipo) {
		this.resumenTipo = resumenTipo
	}
}
class Arma extends TipoArma {
  constructor(arma, resumenTipo, pifia, crits, alcBasico, especial/*, resumen*/) {
	super(resumenTipo);
    this.arma = arma;
    this.pifia = pifia;
	this.crits = crits;
	this.alcBasico = alcBasico;
	this.especial = especial;
	// this.resumen = resumen;
  }
}

// DE FILO A 1 MANO
let espadaAncha = new Arma("Espada ancha","??? ? ???","3","TA","","");
let daga = new Arma("Daga","??? ? ???","1","PE(C)","5-10-15-20","-15 BO vs CM/CO");
let hacha = new Arma("Hacha","??? ? ???","4","TA","5-10-15-20","+5 BO vs CM/CO");
let cimitarra = new Arma("Cimitarra","??? ? ???","4","TA","","-5 BO vs CM/CO, +5 BO vs SA/C/CE");
let espadaCorta = new Arma("Espada corta","??? ? ???","2","PE","1-2-3-4","-10 BO vs CM/CO, +10 BO vs SA/C/CE");
let latigo = new Arma("Latigo","??? ? ???","6","PR(C)/TA(A)","","-10 BO, mín. 3m.");

// CONTUNDENTES A 1 MANO
let garrote = new Arma("Garrote","?? ? ???","4","AP(D)","1-2-3-4","-10 BO");
let maza = new Arma("Maza","?? ? ???","2","AP","1-2-3-4","");
let mazaCombate = new Arma("Maza de combate","?? ? ???","8 (crit B)","AP/PE(A)","","+10 BO");
let red = new Arma("Red","?? ? ???","6","PR","3","Tabla Agarr/Deseq (medio)");
let martilloGuerra = new Arma("Martillo de guerra","?? ? ???","4","AP","3-6-9-12","+5 BO");

// ARMAS DE ASTA A 1 MANO
let jabalina1 = new Arma("Jabalina a 1 mano","??? ? ???","4","PE","9-18-27-36","-10 BO, mín. 1.5m.");
let jabalina2 = new Arma("Jabalina a 2 manos","?? ??","4","PE","","mín. 1.5m.");
let lanza1 = new Arma("Lanza a 1 mano","??? ? ???","5","PE/TA(A)","6-12-18-24","-5 BO, mín. 1.5m.");
let lanza2 = new Arma("Lanza a 2 manos","?? ??","5","PE/TA(A)","","+5 BO, mín. 1.5m.");
let lanzaCaballeria = new Arma("Lanza de caballería","?? ??","7 (crit B)","PE/DE","","+15 BO, montado");
let alabarda = new Arma("Alabarda","?? ??","7","TA/PE","","-5 BO, mín. 1.5m.");

// ARMAS A 2 MANOS
let hachaCombate = new Arma("Hacha de combate","?? ??","5","TA/AP","","+5 BO vs CM/CO, -5 BO vs SA/C/CE");
let mayal = new Arma("Mayal","?? ??","8 (crit C)","AP/PE","","+10 BO");
let baston = new Arma("Bastón","?? ??","3","AP","","-10 BO");
let espadon = new Arma("Espadón","?? ??","5","TA/AP","","");

// ARMAS DE PROYECTIL
let boleadoras = new Arma("Boleadoras","?? ??","7 (crit B)","PR/AP(A)","12-24-36-48","-5 BO");
let arcoCompuesto = new Arma("Arco compuesto","?? ??","4","PE","23-45-68-90","Carga(1) sin movim. o recarga(0) con -25 BO. ");
let arcoCorto = new Arma("Arco corto","?? ??","4","PE","18-36-54-72","Carga(1) sin movim. o recarga(0) con -10 BO. ");
let arcoLargo = new Arma("Arco largo","?? ??","5","PE","30-60-90-120","Carga(1) sin movim. o recarga(0) con -35 BO. ");
let ballesta = new Arma("Ballesta","?? ??","5","PE","27-54-81-108","Carga(2). +20 BO hasta 15 m.");
let honda = new Arma("Honda","?? ? ???","6","AP(D)","15-30-45-60","Carga(1) sin movim.");



on("chat:message", function(msg) {
  if(msg.type == "api" && msg.content.indexOf("!arma ") !== -1) {
	  // !atq DFSA100
    msg.content = msg.content.replace("!arma ", "");
	let arma = null;

	if (msg.content.substring(0,2) == "ea") arma = espadaAncha;
	else if (msg.content.substring(0,2) == "da") arma = daga;
	else if (msg.content.substring(0,2) == "ha") arma = hacha;
	else if (msg.content.substring(0,2) == "ci") arma = cimitarra;
	else if (msg.content.substring(0,2) == "ec") arma = espadaCorta;
	else if (msg.content.substring(0,2) == "lt") arma = latigo;
	else if (msg.content.substring(0,2) == "ga") arma = garrote;
	else if (msg.content.substring(0,2) == "ma") arma = maza;
	else if (msg.content.substring(0,2) == "mc") arma = mazaCombate;
	else if (msg.content.substring(0,2) == "rd") arma = red;
	else if (msg.content.substring(0,2) == "mg") arma = martilloGuerra;
	else if (msg.content.substring(0,2) == "j1") arma = jabalina1;
	else if (msg.content.substring(0,2) == "j2") arma = jabalina2;
	else if (msg.content.substring(0,2) == "l1") arma = lanza1;
	else if (msg.content.substring(0,2) == "l2") arma = lanza2;
	else if (msg.content.substring(0,2) == "lc") arma = lanzaCaballeria;
	else if (msg.content.substring(0,2) == "ab") arma = alabarda;
	else if (msg.content.substring(0,2) == "hc") arma = hachaCombate;
	else if (msg.content.substring(0,2) == "my") arma = mayal;
	else if (msg.content.substring(0,2) == "bs") arma = baston;
	else if (msg.content.substring(0,2) == "e2") arma = espadon;
	else if (msg.content.substring(0,2) == "bo") arma = boleadoras;
	else if (msg.content.substring(0,2) == "ak") arma = arcoCompuesto;
	else if (msg.content.substring(0,2) == "ac") arma = arcoCorto;
	else if (msg.content.substring(0,2) == "al") arma = arcoLargo;
	else if (msg.content.substring(0,2) == "ba") arma = ballesta;
	else if (msg.content.substring(0,2) == "ho") arma = honda;
	else return;
	
	let output = "";
	output += "&{template:infoarma}";
	output += "{{nombre arma=" + arma.arma + "}}";
	output += "{{resumen tipo=" + arma.resumenTipo + "}}";
	output += "{{pifia=" + arma.pifia + "}}";
	output += "{{criticos=" + arma.crits + "}}";
	output += "{{alcance=" + arma.alcBasico + "}}";
	output += "{{especial=" + arma.especial + "}}";
	
	sendChat(msg.who, output);
  }
});