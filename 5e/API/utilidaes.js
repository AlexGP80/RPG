let temperatura = {
	tmin: [1,1,3,5,8,12,14,14,12,8,4,1],
	tint: [3,4,7,9,12,17,20,20,17,12,6,3],
	tmax: [5,7,11,13,17,23,27,27,22,16,9,6],
	getClasifTemperatura(grados) {
		if (grados <= -9) return "Frío glacial";
		if (grados <= -1) return "Frío gélido";
		if (grados <= 6) return "Mucho frío";
		if (grados <= 12) return "Frío";
		if (grados <= 18) return "Fresco";
		if (grados <= 24) return "Temp. cómoda";
		if (grados <= 29) return "Calor";
		if (grados <= 35) return "Mucho calor";
		return "Tórrida";
	},
	getVariacion() {
		let multip = 0;
		let tirada = dados.tirardados(1,20);
		if (tirada <= 3) multip = -1;
		else if (tirada >= 18) multip = 1;
		let variacion = dados.tirardados(1,6)*multip;
		return variacion;
	},
	getTemperatura(mes,hora, variacion = this.getVariacion()) {
		let hm = hora.toLowerCase();
		if (hm == "amanecer" || hm == "noche" || hm == "madrugada") {
			return this.tmin[mes] + variacion;
		}
		if (hm == "horas centrales") return this.tmax[mes] + variacion;
		return this.tint[mes] + variacion;
	}
};

let horas = {
	vhoras: [[8,9,11,13,16,24],[7,8,11,13,17,24],[6,7,10,14,18,24],[6,7,10,14,18,24],[5,6,10,14,19,24],[4,5,10,14,20,24],[4,5,10,14,20,24],[5,6,10,14,19,24],[6,7,10,14,18,24],[6,7,10,14,18,24],[7,8,11,13,17,24],[8,9,11,13,16,24]],
	getIntervalo(hora, mes) {
		let hm = hora.toLowerCase();
		// mes: 0-enero, 1-febrero...
		if (hm == "madrugada") return "0-" + this.vhoras[mes][0];
		if (hm == "amanecer") return this.vhoras[mes][0] + "-" + this.vhoras[mes][1];
		if (hm == "mañana") return this.vhoras[mes][1] + "-" + this.vhoras[mes][2];
		if (hm == "horas centrales") return this.vhoras[mes][2] + "-" + this.vhoras[mes][3];
		if (hm == "tarde") return this.vhoras[mes][3] + "-" + this.vhoras[mes][4];
		if (hm == "noche") return this.vhoras[mes][4] + "-" + this.vhoras[mes][5];
			
	}
};

let meses = {
	getNombreMes(mes) {
		if (mes == 0) return "enero";
		if (mes == 1) return "febrero";
		if (mes == 2) return "marzo";
		if (mes == 3) return "abril";
		if (mes == 4) return "mayo";
		if (mes == 5) return "junio";
		if (mes == 6) return "julio";
		if (mes == 7) return "agosto";
		if (mes == 8) return "septiembre";
		if (mes == 9) return "octubre";
		if (mes == 10) return "noviembre";
		if (mes == 11) return "diciembre";
		
	}
};

let lluviaWestMarches = {
	porcentajesPorMes: [16.18,15.88,15.29,17.06,22.06,18.24,10.00,10.30,16.18,15.88,16.18,18.82],
	getLluvia(mes) {
		let tirada = dados.tirardados(1,10000) / 100;
		if (tirada < this.porcentajesPorMes[mes]) {
			return true;
		}
		return false;
	},
	getTipoLluvia(intensa) {
		if (intensa) return "Lluvia o nieve intensas";
		return "Lluvia o nieve leves";
	},
	getLluviaPorHoras(diaLluvioso) {
		// salida: array, 0 es amanecer, 5 es madrugada
		let lluviaPorHoras = ["Sin precipitaciones","Sin precipitaciones","Sin precipitaciones","Sin precipitaciones","Sin precipitaciones","Sin precipitaciones"];
		if (!diaLluvioso) return lluviaPorHoras;
		let haLlovido = false;
		// amanecer
		let tirada = dados.tirardados(1,20);
		let intensa = dados.tirardados(1,10)<=4;
		if (tirada<=1) {
			haLlovido = true;
			lluviaPorHoras[0] = this.getTipoLluvia(intensa);
		}
		// mañana
		tirada = dados.tirardados(1,20);
		intensa = dados.tirardados(1,10)<=4;
		if (tirada<=4) {
			haLlovido = true;
			lluviaPorHoras[1] = this.getTipoLluvia(intensa);
		}
		// tarde
		tirada = dados.tirardados(1,20);
		intensa = dados.tirardados(1,10)<=4;
		if (tirada<=5) {
			haLlovido = true;
			lluviaPorHoras[3] = this.getTipoLluvia(intensa);
		}
		// noche
		tirada = dados.tirardados(1,20);
		intensa = dados.tirardados(1,10)<=4;
		if (tirada<=4) {
			haLlovido = true;
			lluviaPorHoras[4] = this.getTipoLluvia(intensa);
		}
		// madrugada
		tirada = dados.tirardados(1,20);
		intensa = dados.tirardados(1,10)<=4;
		if (tirada<=3) {
			haLlovido = true;
			lluviaPorHoras[5] = this.getTipoLluvia(intensa);
		}
		// horas centrales
		tirada = dados.tirardados(1,20);
		intensa = dados.tirardados(1,10)<=4;
		if (!haLlovido || tirada<=6) {
			lluviaPorHoras[2] = this.getTipoLluvia(intensa);
		}
		
		return lluviaPorHoras;
	},
	getNubes(mes, diaLluvioso, lluviaEnHora) {
		let tirada = dados.tirardados(1,100);
		let tormenta = dados.tirardados(1,100);
		if (diaLluvioso) {
			if (lluviaEnHora) {
				if (tirada <= 90) {
					if (tormenta <= 20)	return "Nublado (tormenta)";
					return "Nublado";					
				}
				if (tormenta <= 10) return "Mayormente nublado (tormenta)";
				return "Mayormente nublado";
			} else {
				if (tirada <= 60) {
					if (tormenta <= 10) return "Nublado (tormenta)";
					return "Nublado";
				}
				if (tirada <= 95) {
					if (tormenta <= 5) return "Mayormente nublado (tormenta)";
					return "Mayormente nublado";
				}
				if (tirada <= 99) return "Parcialmente nublado";
				return "Mayormente despejado";
			}
		} else {
			tirada = dados.tirardados(1,20);
			if (mes == 6 || mes == 7) {
				// julio y agosto
				if (tirada <= 2) return "Nublado";
				if (tirada <= 4) return "Mayormente nublado";
				if (tirada <= 6) return "Parcialmente nublado";
				if (tirada <= 9) return "Mayormente despejado";
				return "Despejado";
			} else if (mes == 5 || mes == 8) {
				// junio y septiembre
				if (tirada <= 5) return "Nublado";
				if (tirada <= 8) return "Mayormente nublado";
				if (tirada <= 10) return "Parcialmente nublado";
				if (tirada <= 13) return "Mayormente despejado";
				return "Despejado";
			} else {
				// resto de meses
				if (tirada <= 9) return "Nublado";
				if (tirada <= 12) return "Mayormente nublado";
				if (tirada <= 14) return "Parcialmente nublado";
				if (tirada <= 16) return "Mayormente despejado";
				return "Despejado";
			}
		}
	}
};

let vientoWM = {
	getDireccion(valor = 0) {
		let tirada = 0;
		
		if (valor > 0) tirada = valor;
		else tirada = dados.tirardados(1,8);
		
		if (tirada == 1) return "NE";
		if (tirada == 2) return "E";
		if (tirada == 3) return "SE";
		if (tirada == 4) return "S";
		if (tirada == 5) return "SO";
		if (tirada == 6) return "O";
		if (tirada == 7) return "NO";
		if (tirada == 8) return "N";
	},
	getViento(dirnum = dados.tirardados(1,8)) {
		// direccion = 1(NE)..8(N)
		let direccion = "";
		let dirn = dirnum;
		
		let vardir = dados.tirardados(2,6);
		if (vardir == 2) dirn += 2;
		else if (vardir == 12) dirn -= 2;
		else if (vardir == 3) dirn += 1;
		else if (vardir == 11) dirn -= 1;
		
		if (dirn < 1) dirn += 8;
		else if (dirn > 8) dirn -= 8;
		
		direccion = this.getDireccion(dirn);
		

		resultado = dados.tirardados(12,5) - 11;
		// if (resultado == 1 || resultado == 50) return "Huracán (cat. 5). " + direccion + " 252-400 km/h. Destrucción de tejados completa en algunos edificios. Las inundaciones pueden llegar a las plantas bajas de los edificios cercanos a la costa. Puede ser requerida la evacuación masiva de áreas residenciales. Los vientos de 300 kmh pueden arrancar árboles y hasta casas de sus cimientos.";
		// if (resultado == 2 || resultado == 49) return "Huracán (cat. 4). " + direccion + " 210-251 km/h. Daños generalizados en estructuras protectoras, desplome de tejados en edificios pequeños. Alta erosión de bancales y playas. Inundaciones en terrenos interiores. ";
		// if (resultado == 3 || resultado == 48) return "Huracán (cat. 3). " + direccion + " 178-209 km/h. Daños estructurales en edificios pequeños. Destrucción de casas móviles. Las inundaciones destruyen edificaciones pequeñas en zonas costeras y objetos a la deriva pueden causar daños en edificios mayores. Posibilidad de inundaciones tierra adentro. ";
		// if (resultado == 4 || resultado == 47) return "Huracán (cat. 2). " + direccion + " 166-177 km/h. Daños en tejados, puertas y ventanas. Importantes daños en la vegetación, casas móviles, etc. Inundaciones en puertos así como ruptura de pequeños amarres. ";
		// if (resultado == 5 || resultado == 46) return "Huracán (cat. 1). " + direccion + " 132-153 km/h. Olas expecionalmente gigantescas, visibilidad completamente nula. Navegación imposible. En tierra, sin daños en las estructuras de los edificios. Daños en casas flotantes no amarradas, arbustos y árboles. Inundaciones en zonas costeras y daños de poco alcance en puertos.";
		// if (resultado == 6 || resultado == 45) return "Temporal muy duro. " + direccion + " 103-118 km/h. Olas excepcionalmente grandes (los buques de pequeño y mediano tonelaje pueden perderse de vista). La mar está completamente cubierta de bancos de espuma blanca extendida en la dirección del viento. Se reduce aún más la visibilidad. En tierra, daños generalizados, personas arrastradas.";
		// if (resultado <= 8 || resultado >= 43) return "Temporal duro. " + direccion + " 89-102 km/h. Olas muy gruesas con crestas empenechadas. La espuma se alomera en grandes bancos, siendo arrastrada por el viento en forma de espesas estelas blancas. En su conjunto la superficie del mar parece blanca. La visibilidad se reduce. En tierra, árboles arrancados, daños en las construcciones. Daños mayores en objetos a la intemperie.";
		// if (resultado <= 10 || resultado >= 41) return "Temporal fuerte. " + direccion + " 75-88 km/h. Olas gruesas: la espuma es arrastrada en capas espesas. Las crestas de las olas comienzan a romper. Los rociones dificultan la visibilidad. En tierra se producen daños en los árboles, imposible caminar con normalidad. Se empiezan a dañar las construcciones. Arrastre de vehículos.";
		// if (resultado >= 37 && resultado <= 39) return "Temporal. " + direccion + " 62-74 km/h. Olas de altura media y más alargadas. De las crestas se desprenden algunos rociones en forma de torbellinos. La espuma es arrastrada en nubes blancas. En tierra las ramas son arrancadas de los árboles, muy difícil caminar.";
		// if (resultado == 34 || resultado == 36) return "Viento fuerte. " + direccion + " 50-61 km/h. La mar engruesa. La espuma de las crestas empieza a ser arrastrada por el viento, formando nubecillas. En tierra, los árboles enteros en movimiento, dificultad al caminar contra el viento.";
		// if (resultado == 17) return "Calma. " + direccion + " 0-1 km/h. Mar en calma. En tierra, el humo asciende verticalmente";
		// if (resultado >= 11 && resultado <= 16) return "Brisa fuerte. " + direccion + " 39-49 km/h. En el mar comienzan a formarse olas grandes de crestas rompientes y espuma. En tierra las ramas gruesas se mueven y es difícil sostener el paraguas.";
		// if (resultado == 18 || resultado == 22) return "Brisa fresca. " + direccion + " 29-38 km/h. Mar con olas medianas y alargadas, borreguillos muy abundantes. En tierra oscilan los árboles pequeños. Superficie de los lagos ondulada.";
		// if (resultado >= 19 && resultado <= 21) return "Ventolina. " + direccion + " 2-5 km/h. Mar con pequeñas olas, pero sin espuma. En tierra, el humo indica la dirección del viento. Las veletas no se mueven";
		// if (resultado >= 29 && resultado <= 33) return "Brisa muy débil. " + direccion + " 6-11 km/h. Mar con crestas de apariencia vítrea, sin romper. El viento se siente en la cara. En tierra se escucha el susurro de las hojas. Se empiezan a mover las veletas";
		// if (resultado == 23 || resultado == 27 || resultado == 28) return "Brisa moderada. " + direccion + " 20-28 km/h. Mar con borreguillos numerosos y olas cada vez más largas. En tierra se levanta polvo y papeles, las copas de los árboles se agitan.";
		// return "Brisa ligera. " + direccion + " 12-19 km/h. Mar con pequeñas olas y crestas rompientes. En tierra se agitan las hojas de los árboles, las banderas ondean.";
		
		if (resultado == 1 || resultado == 50) return "Huracán (cat. 5). " + direccion + " 252-400 km/h. Destrucción de tejados completa en algunos edificios. Las inundaciones pueden llegar a las plantas bajas de los edificios cercanos a la costa. Puede ser requerida la evacuación masiva de áreas residenciales. Los vientos de 300 kmh pueden arrancar árboles y hasta casas de sus cimientos.";
		if (resultado == 2 || resultado == 49) return "Huracán (cat. 4). " + direccion + " 210-251 km/h. Daños generalizados en estructuras protectoras, desplome de tejados en edificios pequeños. Alta erosión de bancales y playas. Inundaciones en terrenos interiores. ";
		if (resultado == 3 || resultado == 48) return "Huracán (cat. 3). " + direccion + " 178-209 km/h. Daños estructurales en edificios pequeños. Destrucción de casas móviles. Las inundaciones destruyen edificaciones pequeñas en zonas costeras y objetos a la deriva pueden causar daños en edificios mayores. Posibilidad de inundaciones tierra adentro. ";
		if (resultado == 4 || resultado == 47) return "Huracán (cat. 2). " + direccion + " 166-177 km/h. Daños en tejados, puertas y ventanas. Importantes daños en la vegetación, casas móviles, etc. Inundaciones en puertos así como ruptura de pequeños amarres. ";
		if (resultado == 5 || resultado == 46) return "Huracán (cat. 1). " + direccion + " 132-153 km/h. Sin daños en las estructuras de los edificios modernos. Daños en casas flotantes no amarradas, arbustos y árboles. Inundaciones en zonas costeras y daños de poco alcance en puertos.";
		if (resultado == 6 || resultado == 45) return "Temporal muy duro. " + direccion + " 103-118 km/h. Daños generalizados, personas arrastradas.";
		if (resultado <= 8 || resultado >= 43) return "Temporal duro. " + direccion + " 89-102 km/h. Árboles arrancados, daños en las construcciones. Daños mayores en objetos a la intemperie.";
		if (resultado <= 10 || resultado >= 41) return "Temporal fuerte. " + direccion + " 75-88 km/h. Se producen daños en los árboles, imposible caminar con normalidad. Se empiezan a dañar las construcciones. Arrastre de vehículos.";
		if (resultado >= 37 && resultado <= 39) return "Temporal. " + direccion + " 62-74 km/h.Las ramas son arrancadas de los árboles, muy difícil caminar.";
		if (resultado == 34 || resultado == 36) return "Viento fuerte. " + direccion + " 50-61 km/h. Los árboles enteros en movimiento, dificultad al caminar contra el viento.";
		if (resultado == 17) return "Calma. " + direccion + " 0-1 km/h. El humo asciende verticalmente";
		if (resultado >= 11 && resultado <= 16) return "Brisa fuerte. " + direccion + " 39-49 km/h. Las ramas gruesas se mueven y es difícil sostener el paraguas.";
		if (resultado == 18 || resultado == 22) return "Brisa fresca. " + direccion + " 29-38 km/h. Los árboles menos robustos oscilan. Superficie de los lagos ondulada.";
		if (resultado >= 19 && resultado <= 21) return "Ventolina. " + direccion + " 2-5 km/h. El humo indica la dirección del viento. Las veletas y las aspas de los molinos no se mueven";
		if (resultado >= 29 && resultado <= 33) return "Brisa muy débil. " + direccion + " 6-11 km/h. El viento se siente en la cara. Se escucha el susurro de las hojas. Se empiezan a mover las veletas y las aspas de los molinos.";
		if (resultado == 23 || resultado == 27 || resultado == 28) return "Brisa moderada. " + direccion + " 20-28 km/h. Se levanta polvo y papeles, las copas de los árboles se agitan.";
		return "Brisa ligera. " + direccion + " 12-19 km/h. Se agitan las hojas de los árboles, las banderas ondean.";
		
		
		
	}
};
	
on("chat:message", function(msg) {
	
	if (msg.type == "api" && msg.content.indexOf("!clima ") !== -1) {
		// !clima mes
		// devuelve una tabla con el clima completo de un día del mes dado, por horas
		msg.content = msg.content.replace("!clima ", "");
		
		let params = msg.content.split(" ");
		if (params.length < 1) {
			log("ERROR !clima main: faltan parámetros");
			return;
		}
		
	
		let mes = parseInt(params[0])-1;
		
		if (isNaN(mes)) {
			log("ERROR !clima main: parámetro mes incorrecto: " + params[0]);
			return;
		}
		
		let diaLluvioso  = lluviaWestMarches.getLluvia(mes);
		let lluviaPorHoras = lluviaWestMarches.getLluviaPorHoras(diaLluvioso);
		let chorrazo = "";
		
		let tempH = 0;
		let tempVar = temperatura.getVariacion();
		let tempDesc = "";
		let lluviaH = "";
		let lluviaHBool = false;
		let nubesH = "";
		let vientoH = "";
		let dirViento = dados.tirardados(1,8);
		
		// Madrugada
		lluviaH = lluviaPorHoras[5];
		lluviaHBool = lluviaH.toLowerCase() != "sin precipitaciones";
		nubesH = lluviaWestMarches.getNubes(mes, diaLluvioso, lluviaHBool);
		tempH = temperatura.getTemperatura(mes, "madrugada", tempVar);
		tempDesc = temperatura.getClasifTemperatura(tempH);
		vientoH = vientoWM.getViento(dirViento);
		if (vientoH.includes("Ventolina")||vientoH.includes("Calma")) {
			if (!lluviaHBool) {
				if (tempH<10) {
					nubesH = "Niebla";
				}
			}
		}
		
		chorrazo = "/w GM &{template:default}{{name=**Madrugada**}}";
		chorrazo += "{{=" + horas.getIntervalo("madrugada",mes) + "}}";
		chorrazo += "{{ =" + tempH + " ºC (" + tempDesc + ")}}";
		chorrazo += "{{  =" + nubesH + "}}";
		chorrazo += "{{   =" + lluviaH + "}}";
		chorrazo += "{{    =" + vientoH + "}}";

		sendChat(msg.who, chorrazo);


		// Amanecer
		lluviaH = lluviaPorHoras[0];
		lluviaHBool = lluviaH.toLowerCase() != "sin precipitaciones";
		nubesH = lluviaWestMarches.getNubes(mes, diaLluvioso, lluviaHBool);
		tempH = temperatura.getTemperatura(mes, "amanecer", tempVar);
		tempDesc = temperatura.getClasifTemperatura(tempH);
		vientoH = vientoWM.getViento(dirViento);
		if (vientoH.includes("Ventolina")||vientoH.includes("Calma")) {
			if (!lluviaHBool) {
				if (tempH<10) {
					nubesH = "Niebla";
				}
			}
		}

		chorrazo = "/w GM &{template:default}{{name=**Amanecer**}}";
		chorrazo += "{{=" + horas.getIntervalo("amanecer",mes) + "}}";
		chorrazo += "{{ =" + tempH + " ºC (" + tempDesc + ")}}";
		chorrazo += "{{  =" + nubesH + "}}";
		chorrazo += "{{   =" + lluviaH + "}}";
		chorrazo += "{{    =" + vientoH + "}}";

		sendChat(msg.who, chorrazo);
		
		// Mañana
		lluviaH = lluviaPorHoras[1];
		lluviaHBool = lluviaH.toLowerCase() != "sin precipitaciones";
		nubesH = lluviaWestMarches.getNubes(mes, diaLluvioso, lluviaHBool);
		tempH = temperatura.getTemperatura(mes, "mañana", tempVar);
		tempDesc = temperatura.getClasifTemperatura(tempH);
		vientoH = vientoWM.getViento(dirViento);
		if (vientoH.includes("Ventolina")||vientoH.includes("Calma")) {
			if (!lluviaHBool) {
				if (tempH<10) {
					nubesH = "Niebla";
				}
			}
		}
		
		chorrazo = "/w GM &{template:default}{{name=**Mañana**}}";
		chorrazo += "{{=" + horas.getIntervalo("mañana",mes) + "}}";
		chorrazo += "{{ =" + tempH + " ºC (" + tempDesc + ")}}";
		chorrazo += "{{  =" + nubesH + "}}";
		chorrazo += "{{   =" + lluviaH + "}}";
		chorrazo += "{{    =" + vientoH + "}}";
		
		sendChat(msg.who, chorrazo);

		// Horas centrales
		lluviaH = lluviaPorHoras[2];
		lluviaHBool = lluviaH.toLowerCase() != "sin precipitaciones";
		nubesH = lluviaWestMarches.getNubes(mes, diaLluvioso, lluviaHBool);
		tempH = temperatura.getTemperatura(mes, "horas centrales", tempVar);
		tempDesc = temperatura.getClasifTemperatura(tempH);
		vientoH = vientoWM.getViento(dirViento);
		
		chorrazo = "/w GM &{template:default}{{name=**Horas centrales**}}";
		chorrazo += "{{=" + horas.getIntervalo("horas centrales",mes) + "}}";
		chorrazo += "{{ =" + tempH + " ºC (" + tempDesc + ")}}";
		chorrazo += "{{  =" + nubesH + "}}";
		chorrazo += "{{   =" + lluviaH + "}}";
		chorrazo += "{{    =" + vientoH + "}}";
		
		sendChat(msg.who, chorrazo);
		
		// Tarde
		lluviaH = lluviaPorHoras[3];
		lluviaHBool = lluviaH.toLowerCase() != "sin precipitaciones";
		nubesH = lluviaWestMarches.getNubes(mes, diaLluvioso, lluviaHBool);
		tempH = temperatura.getTemperatura(mes, "tarde", tempVar);
		tempDesc = temperatura.getClasifTemperatura(tempH);
		vientoH = vientoWM.getViento(dirViento);
		if (vientoH.includes("Ventolina")||vientoH.includes("Calma")) {
			if (!lluviaHBool) {
				if (tempH<10) {
					nubesH = "Niebla";
				}
			}
		}
		
		chorrazo = "/w GM &{template:default}{{name=**Tarde**}}";
		chorrazo += "{{=" + horas.getIntervalo("tarde",mes) + "}}";
		chorrazo += "{{ =" + tempH + " ºC (" + tempDesc + ")}}";
		chorrazo += "{{  =" + nubesH + "}}";
		chorrazo += "{{   =" + lluviaH + "}}";
		chorrazo += "{{    =" + vientoH + "}}";
		
		sendChat(msg.who, chorrazo);
		
		// Noche
		lluviaH = lluviaPorHoras[4];
		lluviaHBool = lluviaH.toLowerCase() != "sin precipitaciones";
		nubesH = lluviaWestMarches.getNubes(mes, diaLluvioso, lluviaHBool);
		tempH = temperatura.getTemperatura(mes, "noche", tempVar);
		tempDesc = temperatura.getClasifTemperatura(tempH);
		vientoH = vientoWM.getViento(dirViento);
		if (vientoH.includes("Ventolina")||vientoH.includes("Calma")) {
			if (!lluviaHBool) {
				if (tempH<10) {
					nubesH = "Niebla";
				}
			}
		}
		
		chorrazo = "/w GM &{template:default}{{name=**Noche**}}";
		chorrazo += "{{=" + horas.getIntervalo("noche",mes) + "}}";
		chorrazo += "{{ =" + tempH + " ºC (" + tempDesc + ")}}";
		chorrazo += "{{  =" + nubesH + "}}";
		chorrazo += "{{   =" + lluviaH + "}}";
		chorrazo += "{{    =" + vientoH + "}}";
		
		sendChat(msg.who, chorrazo);
		
		
	}
});