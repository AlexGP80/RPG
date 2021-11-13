let tablaManiobrasMovimiento = {
	indices: [-151,-101,-51,-26,0,20,40,55,,65,75,85,95,105,115,125,135,145,155,165,185,225,275,9999999],
	rut: ["F","10","30","50","70","80","90","100","100","100","100","100","110","110","120","120","130","130","140","140","150","150","160"], 
	fac: ["F","F","10","30","50","60","70","80","90","100","100","100","100","110","110","120","120","130","130","140","140","150","150"], 
	edf: ["F","F","F","10","30","50","60","70","80","90","100","100","100","100","110","110","120","120","130","130","140","140","150"], 
	dfm: ["F","F","F","F","5","10","20","30","40","50","60","70","80","90","100","100","110","110","120","120","130","130","140"], 
	dif: ["F","F","F","F","F","5","10","20","30","40","50","60","70","80","90","100","100","110","110","120","120","130","130"], 
	mdf: ["F","F","F","F","F","F","5","10","20","30","40","50","60","70","80","90","100","100","110","110","120","120","130"], 
	xdf: ["F","F","F","F","F","F","F","5","10","20","30","40","50","60","70","80","90","100","100","110","110","120","120"], 
	loc: ["F","F","F","F","F","F","F","F","F","5","10","20","30","40","50","60","70","80","90","100","100","110","110"], 
	abs: ["F","F","F","F","F","F","F","F","F","F","F","5","10","20","30","40","50","60","70","80","90","100","100"], 
	getResultado(roll,dificultad) {
		let tabla = null;
		if (dificultad=="rut") tabla = this.rut;
		else if (dificultad=="fac") tabla = this.fac;
		else if (dificultad=="edf") tabla = this.edf;
		else if (dificultad=="dfm") tabla = this.dfm;
		else if (dificultad=="dif") tabla = this.dif;
		else if (dificultad=="mdf") tabla = this.mdf;
		else if (dificultad=="xdf") tabla = this.xdf;
		else if (dificultad=="loc") tabla = this.loc;
		else if (dificultad=="abs") tabla = this.abs;
		return tabla[this.indices.findIndex(function(value) {
			return value >= roll;
		})];
	}		
};

on("chat:message", function(msg) {
  if(msg.type == "api" && msg.content.indexOf("!mm ") !== -1) {
	  // !mm dif000100
	    if(_.has(msg,'inlinerolls')){
            msg.content = _.chain(msg.inlinerolls)
                .reduce(function(m,v,k){
                    m['$[['+k+']]']=v.results.total || 0;
                    return m;
                },{})
                .reduce(function(m,v,k){
                    return m.replace(k,v);
                },msg.content)
            .value();
        }
    msg.content = msg.content.replace("!mm ", "");
	let dificultad = msg.content.substring(0,3);
	let strDificultad = "";
	if (dificultad=="rut") strDificultad = "Rutinaria";
	else if (dificultad=="fac") strDificultad = "Fácil";
	else if (dificultad=="edf") strDificultad = "Escasa dificultad";
	else if (dificultad=="dfm") strDificultad = "Dificultad media";
	else if (dificultad=="dif") strDificultad = "Difícil";
	else if (dificultad=="mdf") strDificultad = "Muy difícil";
	else if (dificultad=="xdf") strDificultad = "Extremadamente difícil";
	else if (dificultad=="loc") strDificultad = "Locura completa";
	else if (dificultad=="abs") strDificultad = "Absurdo";
	else {
			log("ERROR !mm(main): dificultad = " + dificultad);
			return;
		}
	let aturdido = msg.content.substring(3,4);
	let derribado = msg.content.substring(4,5);
	let extremidadInutilizada = msg.content.substring(5,6);
	let tirada = msg.content.substring(6);
	let indice = parseInt(tirada) + (parseInt(aturdido) * (-50)) + (parseInt(derribado) * (-70)) + (parseInt(extremidadInutilizada) * (-30));
	let chorrazo = "";
	chorrazo += "/w GM &{template:maniobramovimiento}";
	chorrazo += "{{dificultad=" + strDificultad + "}}";
	chorrazo += "{{modificadores=";
	if (aturdido > 0) chorrazo +="\uD83E\uDD74 ";
	if (derribado > 0) chorrazo +="\uD83D\uDECC\uD83C\uDFFB ";
	if (extremidadInutilizada>0) chorrazo += "\uD83D\uDC68\u200D\uD83E\uDDBD";
	chorrazo += "}}";
	chorrazo += "{{tirada=" + tirada + "}}";
	chorrazo += "{{tirada modificada= " + indice + "}}";
	chorrazo += "{{resultado= " + tablaManiobrasMovimiento.getResultado(indice,dificultad) + "}}";
	log(chorrazo);
	// aturdido: \uD83E\uDD74
	// derribado: 	\uD83D\uDECC\uD83C\uDFFB
	// miembro inutilizado: \uD83D\uDC68\uD83C\uDFFB\u200D\uD83E\uDDBD
	
	
	sendChat(msg.who, chorrazo);
		
	} else if(msg.type == "api" && msg.content.indexOf("!correr ") !== -1) {
	    // !correr (rut|fac...)000(mm 3 dígitos)30
	    if(_.has(msg,'inlinerolls')){
            msg.content = _.chain(msg.inlinerolls)
                .reduce(function(m,v,k){
                    m['$[['+k+']]']=v.results.total || 0;
                    return m;
                },{})
                .reduce(function(m,v,k){
                    return m.replace(k,v);
                },msg.content)
            .value();
        }
		msg.content = msg.content.replace("!correr ", "");
		
		let dificultad = msg.content.substring(0,3);
		let strDificultad = "";
		if (dificultad=="rut") strDificultad = "Rutinaria";
		else if (dificultad=="fac") strDificultad = "Fácil";
		else if (dificultad=="edf") strDificultad = "Escasa dificultad";
		else if (dificultad=="dfm") strDificultad = "Dificultad media";
		else if (dificultad=="dif") strDificultad = "Difícil";
		else if (dificultad=="mdf") strDificultad = "Muy difícil";
		else if (dificultad=="xdf") strDificultad = "Extremadamente difícil";
		else if (dificultad=="loc") strDificultad = "Locura completa";
		else if (dificultad=="abs") strDificultad = "Absurdo";
		else {
			log("ERROR !correr(main): dificultad = " + dificultad);
			return;
		}
		let aturdido = msg.content.substring(3,4);
		let derribado = msg.content.substring(4,5);
		let extremidadInutilizada = msg.content.substring(5,6);
		let mm = parseInt(msg.content.substring(6,9));
		let tirada = msg.content.substring(9);
		let indice = parseInt(tirada) + (parseInt(aturdido) * (-50)) + (parseInt(derribado) * (-70)) + (parseInt(extremidadInutilizada) * (-30));
		let result = tablaManiobrasMovimiento.getResultado(indice,dificultad);
		let resultado = "";
		if (result == "F") resultado = "Pifia";
		else {
			let resultInt = parseInt(result);
			let diferencia100 = resultInt - 100;
			let tramos = diferencia100/10;
			let metros = 2*(50 + mm)*0.3 + (tramos*3);
			resultado = metros.toString() + " metros";
		}	
		sendChat(msg.who, "/w GM &{template:default}{{name=Correr}}{{Correr="+resultado+"}}");

	}
	
});