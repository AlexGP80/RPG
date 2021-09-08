let idiomas = {
	getIdioma() {
		let tirada = dados.tirardados(1,5);
		if (dados == 1) return "Elfo";
		if (dados == 2) return "Enano";
		if (dados == 3) return "Mediano";
		if (dados == 4) return "Gnomo";
		if (dados == 5) return "Orco";
	}
}
let aspecto_personaje = {
	getAlturaPeso(raza) {
		let pies = 0;
		let pulgadas = 0;
		let peso = 0;
		if (raza == "Humano") {
			let modAltura = dados.tirardados(2,10);
			let modPeso = dados.tirardados(2,4);
			pies = 4;
			pulgadas = 8 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 110 + (modAltura*modPeso);
		} else if (raza == "Alto Elfo") {
			let modAltura = dados.tirardados(2,10);
			let modPeso = dados.tirardados(1,4);
			pies = 4;
			pulgadas = 6 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 90 + (modAltura*modPeso);
		} else if (raza == "Elfo de los Bosques") {
			let modAltura = dados.tirardados(2,10);
			let modPeso = dados.tirardados(1,4);
			pies = 4;
			pulgadas = 6 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 100 + (modAltura*modPeso);
		} else if (raza == "Drow") {
			let modAltura = dados.tirardados(2,6);
			let modPeso = dados.tirardados(1,6);
			pies = 4;
			pulgadas = 5 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 75 + (modAltura*modPeso);
		} else if (raza == "Enano de las Colinas") {
			let modAltura = dados.tirardados(2,4);
			let modPeso = dados.tirardados(2,6);
			pies = 3;
			pulgadas = 8 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 115 + (modAltura*modPeso);
		} else if (raza == "Enano de las Montañas") {
			let modAltura = dados.tirardados(2,4);
			let modPeso = dados.tirardados(2,6);
			pies = 4;
			pulgadas = 0 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 130 + (modAltura*modPeso);
		} else if (raza == "Mediano Piesligeros" || raza == "Mediano Fornido") {
			let modAltura = dados.tirardados(2,4);
			let modPeso = 1;
			pies = 2;
			pulgadas = 7 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 35 + (modAltura*modPeso);
		} else if (raza == "Dracónido") {
			let modAltura = dados.tirardados(2,8);
			let modPeso = dados.tirardados(2,6);
			pies = 5;
			pulgadas = 6 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 175 + (modAltura*modPeso);
		} else if (raza.substring(0,5) == "Gnomo") {
			let modAltura = dados.tirardados(2,4);
			let modPeso = 1;
			pies = 2;
			pulgadas = 11 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 35 + (modAltura*modPeso);
		} else if (raza == "Semielfo") {
			let modAltura = dados.tirardados(2,8);
			let modPeso = dados.tirardados(2,4);
			pies = 4;
			pulgadas = 9 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 110 + (modAltura*modPeso);
		} else if (raza == "Semiorco") {
			let modAltura = dados.tirardados(2,10);
			let modPeso = dados.tirardados(2,6);
			pies = 4;
			pulgadas = 10 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 140 + (modAltura*modPeso);
		} else if (raza == "Tiefling") {
			let modAltura = dados.tirardados(2,8);
			let modPeso = dados.tirardados(2,4);
			pies = 4;
			pulgadas = 9 + modAltura;
			while (pulgadas >= 12) {
				pulgadas -= 12;
				pies++;
			}
			peso = 110 + (modAltura*modPeso);
		}
		let centimetros = Math.round(pies * 30.48 + pulgadas * 2.54);
		let kilogramos = Math.round(peso * 0.453592);
		return "ALTURA: " + pies + "'" + pulgadas + "\" (" + centimetros + " cm)\nPESO: " + peso + " lbs. (" + kilogramos + " kg)";
	}
}
let idiomas_personaje = {
	elfo: 0,
	enano: 0,
	mediano: 0,
	gnomo: 0,
	orco: 0,
	infernal: 0,
	dracónico: 0,
	churro: "Imperial",
	aprender_idioma_aleatorio() {
		let fin = 0;
		while (fin == 0) {
			let tirada = dados.tirardados(1,5);
			if (tirada == 1) {
				if (this.elfo == 0) {
					this.elfo = 1;
					this.churro += ", Elfo";
					fin = 1;
				}
			} else if (tirada == 2) {
				if (this.enano == 0) {
					this.enano = 1;
					this.churro += ", Enano";
					fin = 1;
				}
			} else if (tirada == 3) {
				if (this.mediano == 0) {
					this.mediano = 1;
					this.churro += ", Mediano";
					fin = 1;
				}
			} else if (tirada == 4) {
				if (this.gnomo == 0) {
					this.gnomo = 1;
					this.churro += ", Gnomo";
					fin = 1;
				}
			} else if (tirada == 5) {
				if (this.orco == 0) {
					this.orco = 1;
					this.churro += ", Orco";
					fin = 1;
				}
			}
		}
		return 0;
	}, 
	aprender_idioma(idioma) {
		if (idioma == "Elfo") {
			if (this.elfo == 0) {
				this.elfo = 1;
				this.churro += ", Elfo";
			}
		} else if (idioma == "Enano") {
			if (this.enano == 0) {
				this.enano = 1;
				this.churro += ", Enano";
			}
		} else if (idioma == "Mediano") {
			if (this.mediano == 0) {
				this.mediano = 1;
				this.churro += ", Mediano";
			}
		} else if (idioma == "Gnomo") {
			if (this.gnomo == 0) {
				this.gnomo = 1;
				this.churro += ", Gnomo";
			}
		} else if (idioma == "Orco") {
			if (this.orco == 0) {
				this.orco = 1;
				this.churro += ", Orco";
			}
		} else if (idioma == "Infernal") {
			if (this.infernal == 0) {
				this.infernal = 1;
				this.churro += ", Infernal";
			}
		} else if (idioma == "Dracónico") {
			if (this.dracónico == 0) {
				this.dracónico = 1;
				this.churro += ", Dracónico";
			}
		}
	}
}

let dados = {
	tirardados(numdados,carasdado) {
		let resultado = 0;
		let i = 0;
		for (i=0; i<numdados; ++i) {
			resultado += Math.floor(Math.random()*carasdado) + 1;
		}
		return resultado;
	}
};

let caracteristicas = {
	getValor() {
		let min = 99999;
		let valor = 0;
		for (i=0; i<4; ++i) {
			tirada = dados.tirardados(1,6);
			valor += tirada;
			if (tirada < min) min = tirada;
			// console.log("Tirada: " + tirada);
			// console.log("Valor: " + valor);
			// console.log("Min: " + min);
		}
		valor -= min;
		// console.log("Valor final de la tirada de 4d6k3: " + valor);
		return valor;
	},
	getModificador(valor) {
		return Math.floor((valor-10)/2);
	}
};

let herramientasArtesano = {
	getHerramienta() {
		let tirada = dados.tirardados(1,17);
		if (tirada == 1) return "Herramientas de albañil. ";
		if (tirada == 2) return "Herramientas de alfarero. ";
		if (tirada == 3) return "Herramientas de carpintero. ";
		if (tirada == 4) return "Herramientas de cartógrafo. ";
		if (tirada == 5) return "Herramientas de curtidor. ";
		if (tirada == 6) return "Herramientas de ebanista. ";
		if (tirada == 7) return "Herramientas de herrero. ";
		if (tirada == 8) return "Herramientas de joyero. ";
		if (tirada == 9) return "Herramientas de manitas. ";
		if (tirada == 10) return "Herramientas de soplador de vidrio. ";
		if (tirada == 11) return "Herramientas de tejedor. ";
		if (tirada == 12) return "Herramientas de zapatero. ";
		if (tirada == 13) return "Suministros de alquimista. ";
		if (tirada == 14) return "Suministros de calígrafo. ";
		if (tirada == 15) return "Suministros de cervecero. ";
		if (tirada == 16) return "Suministros de pintor. ";
		if (tirada == 17) return "Útiles de cocinero. ";
	}
};

let instrumentosMusicales = {
	getInstrumento() {
		let tirada = dados.tirardados(1,10);
		if (tirada == 1) return "Chirimía. ";
		if (tirada == 2) return "Cuerno. ";
		if (tirada == 3) return "Dulcémele. ";
		if (tirada == 4) return "Flauta. ";
		if (tirada == 5) return "Flauta de pan. ";
		if (tirada == 6) return "Gaita. ";
		if (tirada == 7) return "Laúd. ";
		if (tirada == 8) return "Lira. ";
		if (tirada == 9) return "Tambor. ";
		if (tirada == 10) return "Viola. ";
	}
	
};

let juegos = {
	getJuego() {
		let tirada = dados.tirardados(1,4);
		if (tirada == 1) return "Ajedrez de dragón. ";
		if (tirada == 2) return "Apuesta de Tres Dragones. ";
		if (tirada == 3) return "Dados. ";
		if (tirada == 4) return "Naipes. ";
	}
};

let razas = {
	indices: [1,2,4,6,8,10,11,13,18,23,25,35,38,99999],
	valores: ["Dracónido", "Tiefling", "Semiorco", "Semielfo", "Gnomo de los Bosques", "Gnomo de las Rocas", "Drow", "Alto Elfo", "Elfo de los Bosques", "Enano de las Colinas", "Enano de las Montañas", "Mediano Piesligeros", "Mediano Fornido", "Humano"],
	getRaza() {
		let tirada = dados.tirardados(1,100);
		let raza = this.valores[this.indices.findIndex(function(value) {
			return value >= tirada;
		})];
		if (raza == "Dracónido") idiomas_personaje.aprender_idioma("Dracónico"); 
		else if (raza == "Tiefling") idiomas_personaje.aprender_idioma("Infernal");  
		else if (raza == "Semiorco") idiomas_personaje.aprender_idioma("Orco"); 
		else if (raza == "Semielfo" || raza == "Elfo de los Bosques" || raza == "Alto Elfo" || raza == "Drow") idiomas_personaje.aprender_idioma("Elfo"); 
		else if (raza == "Gnomo de los Bosques" || raza == "Gnomo de las Rocas") idiomas_personaje.aprender_idioma("Gnomo"); 
		else if (raza == "Mediano Piesligeros" || raza == "Mediano Fornido") idiomas_personaje.aprender_idioma("Mediano"); 
		else if (raza == "Enano de las Colinas" || raza == "Enano de las Montañas") idiomas_personaje.aprender_idioma("Enano"); 
		else if (raza == "Humano") idiomas_personaje.aprender_idioma_aleatorio();
		//console.log(raza);
		//console.log(idiomas_personaje);
		return raza;
	},
	getRazaVerosimil(fuerza, destreza, constitucion, inteligencia, sabiduria, carisma) {
		let razas=[];
		for (i=0;i<5;++i) razas.push("Humano");
		if (fuerza >= 12) {
			razas.push("Dracónido");
			razas.push("Semiorco");
		} else if (fuerza < 10) {
			razas.push("Gnomo de los Bosques");
			razas.push("Gnomo de las Rocas");
			razas.push("Mediano Fornido");
			razas.push("Mediano Piesligeros");
		} 
		if (fuerza >= 10 && constitucion >= 10) {
			razas.push("Enano de las Colinas");
			razas.push("Enano de las Colinas");
			razas.push("Enano de las Montañas");
		}
		if (destreza >= 12) {
			if (sabiduria >= 10) {
				razas.push("Elfo de los Bosques");
				razas.push("Elfo de los Bosques");
			}
			if (inteligencia >= 10) razas.push("Alto Elfo");
			if (carisma >= 10) razas.push("Drow");
		}
		if (destreza >= 10) {
			razas.push("Semielfo");
		}
		if (carisma >= 12 && inteligencia >= 10) razas.push("Tiefling");
		
		let tirada = dados.tirardados(1,razas.length)-1;
		// console.log(razas);
		// console.log(tirada);
		// console.log(razas[tirada]);
		let raza = razas[tirada];
		if (raza == "Dracónido") idiomas_personaje.aprender_idioma("Dracónico"); 
		else if (raza == "Tiefling") idiomas_personaje.aprender_idioma("Infernal");  
		else if (raza == "Semiorco") idiomas_personaje.aprender_idioma("Orco"); 
		else if (raza == "Semielfo" || raza == "Elfo de los Bosques" || raza == "Alto Elfo" || raza == "Drow") idiomas_personaje.aprender_idioma("Elfo"); 
		else if (raza == "Gnomo de los Bosques" || raza == "Gnomo de las Rocas") idiomas_personaje.aprender_idioma("Gnomo"); 
		else if (raza == "Mediano Piesligeros" || raza == "Mediano Fornido") idiomas_personaje.aprender_idioma("Mediano"); 
		else if (raza == "Enano de las Colinas" || raza == "Enano de las Montañas") idiomas_personaje.aprender_idioma("Enano"); 
		else if (raza == "Humano") idiomas_personaje.aprender_idioma_aleatorio();
		
		return raza;
	}
};	

let trasfondos = {
	indices: [2, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 20, 21, 22, 24, 26],
	valores: ["Acólito", "Charlatán", "Criminal", "Espía", "Animador", "Gladiador", "Héroe del Pueblo", "Artesano Gremial", "Comerciante Gremial", "Ermitaño", "Noble", "Caballero", "Salvaje", "Erudito", "Marinero", "Pirata", "Soldado", "Huérfano"],
	getTrasfondo() {
		let tirada = dados.tirardados(1,26);
		return this.valores[this.indices.findIndex(function(value) {
			return value >= tirada;
		})];
	},
	getEspecial(trasfondo) {
		if (trasfondo == "Acólito" || trasfondo == "Animador" || trasfondo == "Gladiador") {
			return "Instrumento: " + instrumentosMusicales.getInstrumento();
		} else if (trasfondo == "Artesano Gremial" || trasfondo == "Comerciante Gremial") {
			idiomas_personaje.aprender_idioma_aleatorio();
			let tirada = dados.tirardados(1,20);
			let gremio = "";
			let herramienta = "";
			if (tirada == 1) {
				gremio = "Albañiles y canteros. ";
			} else if (tirada == 2) {
				gremio = "Alfareros y azulejeros. ";
			} else if (tirada == 3) {
				gremio = "Alquimistas y apotecarios. ";
			} else if (tirada == 4) {
				gremio = "Armeros, cerrajeros y orfebres. ";
			} else if (tirada == 5) {
				gremio = "Calígrafos, escribas y escribanos. ";
			} else if (tirada == 6) {
				gremio = "Carpinteros, techadores y yeseros. ";
			} else if (tirada == 7) {
				gremio = "Carpinteros de ribera y veleros. ";
			} else if (tirada == 8) {
				gremio = "Carreteros y ruederos. ";
			} else if (tirada == 9) {
				gremio = "Cartógrafos, agrimensores y topógrafos. ";
			} else if (tirada == 10) {
				gremio = "Cerveceros, destiladores y viticultores. ";
			} else if (tirada == 11) {
				gremio = "Cocineros y panaderos. ";
			} else if (tirada == 12) {
				gremio = "Cristaleros y sopladores de vidrio. ";
			} else if (tirada == 13) {
				gremio = "Curtidores, desolladores y taxidermistas. ";
			} else if (tirada == 14) {
				gremio = "Herreros y fojadores. ";
			} else if (tirada == 15) {
				gremio = "Hojalateros, peltreros y fundidores. ";
			} else if (tirada == 16) {
				gremio = "Joyeros y lapidarios. ";
			} else if (tirada == 17) {
				gremio = "Pintores, retratistas y cartelistas. ";
			} else if (tirada == 18) {
				gremio = "Tallistas, toneleros y fabricantes de arcos. ";
			} else if (tirada == 19) {
				gremio = "Tejedores y tintoreros. ";
			} else if (tirada == 20) {
				gremio = "Zapateros y zurcidores. ";
			}
			return "Gremio: " + gremio;
		} else if (trasfondo == "Charlatán") {
			let estafa = "Estafa favorita: ";
			let tirada = dados.tirardados(1,6);
			if (tirada == 1) estafa += "Hago trampas en los juegos de azar. ";
			else if (tirada == 2) {
				let tirada2 = dados.tirardados(1,2);
				if (tirada2 == 1) estafa += "Limo monedas. ";
				else estafa += "Falsifico documentos. ";
			} else if (tirada == 3) estafa += "Me inmiscuyo en las vidas de los demás para aprovecharme de sus debilidades y hacerme con sus fortunas. ";
			else if (tirada == 4) estafa += "Cambio de identidad como de camisa. ";
			else if (tirada == 5) estafa += "Engaño a los viandantes con el timo del trilero. ";
			else if (tirada == 6) estafa += "Convenzo a los demás de que un trasto inútil es digno de sus ahorros. ";
			
			return estafa;
		} else if (trasfondo == "Criminal" || trasfondo == "Espía") {
			let juego = juegos.getJuego();
			let tirada = dados.tirardados(1,8);
			let especialidad_criminal = "";
			if (tirada == 1) especialidad_criminal = "Bandolero";
			else if (tirada == 2) especialidad_criminal = "Carterista";
			else if (tirada == 3) especialidad_criminal = "Chantajista";
			else if (tirada == 4) especialidad_criminal = "Contrabandista";
			else if (tirada == 5) especialidad_criminal = "Ladrón de viviendas";
			else if (tirada == 6) especialidad_criminal = "Matón";
			else if (tirada == 7) especialidad_criminal = "Perista";
			else if (tirada == 8) especialidad_criminal = "Sicario";
			return "Juego: " + juego + ". \nEspecialidad criminal: " + especialidad_criminal;
		} else if (trasfondo == "Ermitaño") {
			idiomas_personaje.aprender_idioma_aleatorio();
			let tirada = dados.tirardados(1,8);
			if (tirada == 1) return "Vida de retiro: Buscaba la iluminación espiritual. ";
			if (tirada == 2) return "Vida de retiro: Formaba parte de la vida en comunidad de una orden religiosa, siguiendo sus preceptos. ";
			if (tirada == 3) return "Vida de retiro: 3. ";
			if (tirada == 4) return "Vida de retiro: 4. ";
			if (tirada == 5) return "Vida de retiro: 5. ";
			if (tirada == 6) return "Vida de retiro: 6. ";
			if (tirada == 7) return "Vida de retiro: 7. ";
			if (tirada == 8) return "Vida de retiro: 8. ";
		} else if (trasfondo == "Erudito") {
			idiomas_personaje.aprender_idioma_aleatorio();
			idiomas_personaje.aprender_idioma_aleatorio();
			let tirada = dados.tirardados(1,8);
			if (tirada == 1) return "Especialidad Académica: 1. ";
			if (tirada == 2) return "Especialidad Académica: 2. ";
			if (tirada == 3) return "Especialidad Académica: 3. ";
			if (tirada == 4) return "Especialidad Académica: 4. ";
			if (tirada == 5) return "Especialidad Académica: 5. ";
			if (tirada == 6) return "Especialidad Académica: 6. ";
			if (tirada == 7) return "Especialidad Académica: 7. ";
			if (tirada == 8) return "Especialidad Académica: 8. ";
		} else if (trasfondo == "Héroe del Pueblo") {
			let tirada = dados.tirardados(1,8);
			let momentodecisivo = "";
			if (tirada == 1) momentodecisivo = "Momento Decisivo: 1. ";
			else if (tirada == 2) momentodecisivo = "Momento Decisivo: 2. ";
			else if (tirada == 3) momentodecisivo = "Momento Decisivo: 3. ";
			else if (tirada == 4) momentodecisivo = "Momento Decisivo: 4. ";
			else if (tirada == 5) momentodecisivo = "Momento Decisivo: 5. ";
			else if (tirada == 6) momentodecisivo = "Momento Decisivo: 6. ";
			else if (tirada == 7) momentodecisivo = "Momento Decisivo: 7. ";
			else if (tirada == 8) momentodecisivo = "Momento Decisivo: 8. ";
			return momentodecisivo + "\nHerramientas Artesano: " + herramientasArtesano.getHerramienta();
		} else if (trasfondo == "Noble" || trasfondo == "Caballero") {
			idiomas_personaje.aprender_idioma_aleatorio();
			return "Juego: " + juegos.getJuego();
		} else if (trasfondo == "Salvaje") {
			let tirada = dados.tirardados(1,10);
			let origen = "";
			if (tirada == 1) origen = "Origen: 1. ";
			else if (tirada == 2) origen = "Origen: 2. ";
			else if (tirada == 3) origen = "Origen: 3. ";
			else if (tirada == 4) origen = "Origen: 4. ";
			else if (tirada == 5) origen = "Origen: 5. ";
			else if (tirada == 6) origen = "Origen: 6. ";
			else if (tirada == 7) origen = "Origen: 7. ";
			else if (tirada == 8) origen = "Origen: 8. ";
			else if (tirada == 9) origen = "Origen: 9. ";
			else if (tirada == 10) origen = "Origen: 10. ";
			idiomas_personaje.aprender_idioma_aleatorio();
			return "ORIGEN: " + origen + "\nInstrumento: " + instrumentosMusicales.getInstrumento();
		} else if (trasfondo == "Soldado") {
			let tirada = dados.tirardados(1,8);
			let especialidad = "";
			if (tirada == 1) especialidad = "Especialidad: 1. ";
			else if (tirada == 2) especialidad = "Especialidad: 2. ";
			else if (tirada == 3) especialidad = "Especialidad: 3. ";
			else if (tirada == 4) especialidad = "Especialidad: 4. ";
			else if (tirada == 5) especialidad = "Especialidad: 5. ";
			else if (tirada == 6) especialidad = "Especialidad: 6. ";
			else if (tirada == 7) especialidad = "Especialidad: 7. ";
			else if (tirada == 8) especialidad = "Especialidad: 8. ";
			return especialidad + "\nJuego: " + juegos.getJuego();
			
		}
		return "";
	},
	getPersonalidad(trasfondo, o_personalidad) {
		let tirada = dados.tirardados(1,8);
		while (tirada == o_personalidad.index) tirada = dados.tirardados(1,8);
		o_personalidad.index = tirada;
		if (trasfondo == "Acólito") {
			if (tirada == 1) return "Idolatro a cierto héroe de mi fe, por lo que siempre pongo sus hazañas como ejemplo. ";
			if (tirada == 2) return "Soy capaz de hallar un punto de encuentro incluso entre los enemigos más acérrimos, empatizando con ellos y trabajando para alcanzar la paz. ";
			if (tirada == 3) return "Veo presagios en cada suceso o acción. Los dioses intentan hablarnos, simplemente nos falta escuchar. ";
			if (tirada == 4) return "Nada puede apagar mi actitud optimista. ";
			if (tirada == 5) return "Cito textos sagrados y proverbios, a veces erróneamente, en prácticamente cada situación. ";
			if (tirada == 6) return "Soy tolerante (o intolerante) a otras fes y respeto (o condeno) su adoración a otros dioses. ";
			if (tirada == 7) return "He disfrutado la comida, bebida y lujos de la alta sociedad típicos de la élite de mi templo. La vida sin comodidades me irrita. ";
			return "Llevo tanto tiempo en el templo que tengo muy poca experiencia tratando con quienes no pertenecen a él. ";
		} else if (trasfondo == "Charlatán") {
			if (tirada == 1) return "Me enamoro y desenamoro con facilidad. Siempre ando detrás de alguien. ";
			if (tirada == 2) return "Conozco una broma para cada ocasión, especialmente aquellas en las que el humor no resulta apropiado. ";
			if (tirada == 3) return "Los halagos son mi herramienta preferida para conseguir lo que quiero. ";
			if (tirada == 4) return "Soy un jugador nato, que no puede resistirse a los riesgos si van acompañados de una posible recompensa. ";
			if (tirada == 5) return "Miento sobre casi todo, incluso cuando no hay una buena razón para ellos. ";
			if (tirada == 6) return "El sarcasmo y los insultos son mis armas favoritas. ";
			if (tirada == 7) return "Llevo encima varios símbolos sagrados, invocanco a la deidad que me convenga según las circunstancias. ";
			return "Me guardo todo aquello que pueda valer algo. ";			
		} else if (trasfondo == "Criminal") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Espía") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Animador") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Gladiador") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Héroe del Pueblo") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Artesano Gremial") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Comerciante Gremial") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Ermitaño") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Noble") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Caballero") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Salvaje") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Erudito") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Marinero") {
			if (tirada == 1) return "Mis amigos saben que, pase lo que pase, pueden confiar en mí. ";
			if (tirada == 2) return "Trabajo duro para poder disfrutar al máximo al terminar. ";
			if (tirada == 3) return "Me encanta arribar a puertos nuevos y hacer amigos junto a una jarra de cerveza. ";
			if (tirada == 4) return "Refuerzo ligeramente la verdad en aras de una historia interesante. ";
			if (tirada == 5) return "Una trifulca de taberna es una forma maravillosa de conocer una ciudad nueva. ";
			if (tirada == 6) return "Nunca paso por alto una apuesta hecha en buena fe. ";
			if (tirada == 7) return "Mi lenguaje es tan desagradable como el nido de un otyugh. ";
			return "Aprecio un trabajo bien hecho, en especial si puedo convencer a otro para hacerlo. ";			
		} else if (trasfondo == "Pirata") {
			if (tirada == 1) return "Mis amigos saben que, pase lo que pase, pueden confiar en mí. ";
			if (tirada == 2) return "Trabajo duro para poder disfrutar al máximo al terminar. ";
			if (tirada == 3) return "Me encanta arribar a puertos nuevos y hacer amigos junto a una jarra de cerveza. ";
			if (tirada == 4) return "Refuerzo ligeramente la verdad en aras de una historia interesante. ";
			if (tirada == 5) return "Una trifulca de taberna es una forma maravillosa de conocer una ciudad nueva. ";
			if (tirada == 6) return "Nunca paso por alto una apuesta hecha en buena fe. ";
			if (tirada == 7) return "Mi lenguaje es tan desagradable como el nido de un otyugh. ";
			return "Aprecio un trabajo bien hecho, en especial si puedo convencer a otro para hacerlo. ";			
		} else if (trasfondo == "Soldado") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		} else if (trasfondo == "Huérfano") {
			if (tirada == 1) return "1. ";
			if (tirada == 2) return "2. ";
			if (tirada == 3) return "3. ";
			if (tirada == 4) return "4. ";
			if (tirada == 5) return "5. ";
			if (tirada == 6) return "6. ";
			if (tirada == 7) return "7. ";
			return "8. ";			
		}
	},
	getIdeal(trasfondo) {
		let tirada = dados.tirardados(1,6);
		if (trasfondo == "Acólito") {
			if (tirada == 1) return "Tradición. Las tradiciones ancestrales de adoración y sacrificio deben ser preservadas y mantenidas. ";
			if (tirada == 2) return "Caridad. Siempre trato de ayudar a los que lo necesitan, sin importar lo que pueda costarme. ";
			if (tirada == 3) return "Cambio. Debemos impulsar los cambios que los dioses, incesantemente, están intentando traer al mundo. ";
			if (tirada == 4) return "Confío en, algún día, alcanzar la cima de la jerarquía religiosa de mi fe. ";
			if (tirada == 5) return "Confío en que mi dios guiará mis actos. Tengo fe en que, si trabajo duro, las cosas me irán bien. ";
			return "Intento mostrarme digno del favor de mi dios al comparar mis acciones con sus enseñanzas. ";
		} else if (trasfondo == "Charlatán") {
			if (tirada == 1) return "Independencia. Soy un espíritu libre, nadie me dice lo que tengo que hacer. ";
			if (tirada == 2) return "Justicia. Nunca me aprovecho de nadie que no puede permitirse perder unas pocas monedas. ";
			if (tirada == 3) return "Caridad. Reparto el dinero que consigo entre aquellos que verdaderamente lo necesitan. ";
			if (tirada == 4) return "Creatividad. Nunca repito la misma estafa. ";
			if (tirada == 5) return "Amistad. Las posesiones vienen y van, pero los lazos de amistad son para siempre. ";
			return "Estoy decidido a mostrar mi valía. ";			
		} else if (trasfondo == "Criminal") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Espía") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Animador") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Gladiador") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Héroe del Pueblo") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Artesano Gremial") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Comerciante Gremial") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Ermitaño") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Noble") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Caballero") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Salvaje") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Erudito") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Marinero") {
			if (tirada == 1) return "Respeto. Lo que mantiene a una nave unida es el respeto mutuo entre capitán y tripulación. ";
			if (tirada == 2) return "Justicia. Todos trabajamos, así que todos compartimos la recompensa. ";
			if (tirada == 3) return "Libertad. El mar es libertad. Libertad para ir a donde me plazca y hacer lo que quiera. ";
			if (tirada == 4) return "Dominio. Soy un depredador y el resto de barcos no son sino mis presas. ";
			if (tirada == 5) return "Personas. Estoy comprometido con mis compañeros de tripulación, no con un ideal. ";
			return "Aspiración. Algún día tendré mi propio barco y trazaré mi propio destino. ";			
		} else if (trasfondo == "Pirata") {
			if (tirada == 1) return "Respeto. Lo que mantiene a una nave unida es el respeto mutuo entre capitán y tripulación. ";
			if (tirada == 2) return "Justicia. Todos trabajamos, así que todos compartimos la recompensa. ";
			if (tirada == 3) return "Libertad. El mar es libertad. Libertad para ir a donde me plazca y hacer lo que quiera. ";
			if (tirada == 4) return "Dominio. Soy un depredador y el resto de barcos no son sino mis presas. ";
			if (tirada == 5) return "Personas. Estoy comprometido con mis compañeros de tripulación, no con un ideal. ";
			return "Aspiración. Algún día tendré mi propio barco y trazaré mi propio destino. ";			
		} else if (trasfondo == "Soldado") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Huérfano") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		}
	},
	getVinculo(trasfondo) {
		let tirada = dados.tirardados(1,6);
		if (trasfondo == "Acólito") {
			if (tirada == 1) return "Moriría por recuperar una antigua reliquia de mi fe, que se perdió hace mucho. ";
			if (tirada == 2) return "Algún día me vengaré de la corrupta jerarquía del templo, que me marcó como hereje. ";
			if (tirada == 3) return "Debo mi vida al sacerdote que me acogió cuando mis padres murieron. ";
			if (tirada == 4) return "Todo lo que hago es por la gente humilde. ";
			if (tirada == 5) return "Haría lo que fuera por proteger el templo en el que serví. ";
			return "Busco preservar un texto sagrado que mis enemigos consideran herético y quieren destruir. ";
		} else if (trasfondo == "Charlatán") {
			if (tirada == 1) return "Desplumé a la persona equivocada y ahora debo asegurarme de que nunca vuelva a cruzarse conmigo ni con mis seres queridos. ";
			if (tirada == 2) return "Todo se lo debo a mi mentor: una persona horrible que probablemente esté pudriéndose en alguna celda. ";
			if (tirada == 3) return "En algún lugar hay un hijo mío que no me conoce. Conseguiré que viva en un mundo mejor. ";
			if (tirada == 4) return "Provengo de una familia noble y algún día arrancaré mi título y tierras de las garras de quienes me los robaron. ";
			if (tirada == 5) return "Un poderoso mató a alguien a quien amaba. Pronto tendré mi venganza. ";
			return "Estafé y arruiné a una persona que no se lo merecía. Aunque busco redimirme de mis fechorías, jamás podré perdonarme a mí mismo. ";			
		} else if (trasfondo == "Criminal") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Espía") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Animador") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Gladiador") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Héroe del Pueblo") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Artesano Gremial") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Comerciante Gremial") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Ermitaño") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Noble") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Caballero") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Salvaje") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Erudito") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Marinero") {
			if (tirada == 1) return "Mi lealtad es para mi capitán, todo lo demás va después. ";
			if (tirada == 2) return "Capitán y compañeros vienen y se van. La nave es lo más importante. ";
			if (tirada == 3) return "Siempre recordaré mi primer barco. ";
			if (tirada == 4) return "En uno de los puertos que he visitado me espera un/a amante, cuyos ojos casi me apartan del mar. ";
			if (tirada == 5) return "Me estafaron la parte del botín que me correspondía y pienso recuperar lo que se me debe. ";
			return "Unos piratas despiadados asesinaron a mi capitán y al resto de la tripulación, saquearon nuestra nave y me dejaron morir. La venganza será mía. ";			
		} else if (trasfondo == "Pirata") {
			if (tirada == 1) return "Mi lealtad es para mi capitán, todo lo demás va después. ";
			if (tirada == 2) return "Capitán y compañeros vienen y se van. La nave es lo más importante. ";
			if (tirada == 3) return "Siempre recordaré mi primer barco. ";
			if (tirada == 4) return "En uno de los puertos que he visitado me espera un/a amante, cuyos ojos casi me apartan del mar. ";
			if (tirada == 5) return "Me estafaron la parte del botín que me correspondía y pienso recuperar lo que se me debe. ";
			return "Unos piratas despiadados asesinaron a mi capitán y al resto de la tripulación, saquearon nuestra nave y me dejaron morir. La venganza será mía. ";			
		} else if (trasfondo == "Soldado") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Huérfano") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		}
	},
	getDefecto(trasfondo) {
		let tirada = dados.tirardados(1,6);
		if (trasfondo == "Acólito") {
			if (tirada == 1) return "Soy exigente con los demás, pero todavía más conmigo mismo. ";
			if (tirada == 2) return "Confío demasiado en los miembros poderosos de la jerarquía de mi templo. ";
			if (tirada == 3) return "A veces mi piedad me lleva a confiar ciegamente en aquellos que comparten mi fe. ";
			if (tirada == 4) return "Soy de pensamiento inflexible. ";
			if (tirada == 5) return "Sospecho de los extraños y siempre espero lo peor de ellos. ";
			return "En cuanto elijo un objetivo, me obsesiono tanto con él que ignoro el resto de los aspectos de mi vida. ";
		} else if (trasfondo == "Charlatán") {
			if (tirada == 1) return "No puedo resistirme a una cara bonita. ";
			if (tirada == 2) return "Siempre estoy en deuda. Gasto mis ilícitas ganancias en lujos decadentes más deprisa de lo que puedo conseguirlas. ";
			if (tirada == 3) return "Estoy convencido de que nadie podrá engañarme como yo engaño a los demás. ";
			if (tirada == 4) return "Soy demasiado codicioso para mi propio bien. No puedo evitar arriesgarme si hay dinero de por medio. ";
			if (tirada == 5) return "No puedo resistirme a estafar a los que son más poderosos que yo. ";
			return "Odio admitirlo y me detesto por ello, pero si las cosas se ponen serias huiré para preservar mi propia vida. ";			
		} else if (trasfondo == "Criminal") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Espía") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Animador") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Gladiador") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Héroe del Pueblo") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Artesano Gremial") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Comerciante Gremial") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Ermitaño") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Noble") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Caballero") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Salvaje") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Erudito") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Marinero") {
			if (tirada == 1) return "Obedezco órdenes, incluso cuando pienso que están equivocadas. ";
			if (tirada == 2) return "Diré lo que sea para evitar hacer trabajo de más. ";
			if (tirada == 3) return "Nunca me echo atrás si alguien cuestiona mi valor, sin importar el peligro de la situación. ";
			if (tirada == 4) return "Cuando empiezo a beber me cuesta muchísimo parar. ";
			if (tirada == 5) return "No puedo evitar embolsarme las monedas y otros abalorios que encuentro. ";
			return "Mi orgullo acabará siendo mi perdición. ";			
		} else if (trasfondo == "Pirata") {
			if (tirada == 1) return "Obedezco órdenes, incluso cuando pienso que están equivocadas. ";
			if (tirada == 2) return "Diré lo que sea para evitar hacer trabajo de más. ";
			if (tirada == 3) return "Nunca me echo atrás si alguien cuestiona mi valor, sin importar el peligro de la situación. ";
			if (tirada == 4) return "Cuando empiezo a beber me cuesta muchísimo parar. ";
			if (tirada == 5) return "No puedo evitar embolsarme las monedas y otros abalorios que encuentro. ";
			return "Mi orgullo acabará siendo mi perdición. ";			
		} else if (trasfondo == "Soldado") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		} else if (trasfondo == "Huérfano") {
			if (tirada == 1) return "1";
			if (tirada == 2) return "2";
			if (tirada == 3) return "3";
			if (tirada == 4) return "4";
			if (tirada == 5) return "5";
			return "6";			
		}
	}
	
};
	
let clases = {
	indices: [7, 14, 21, 28, 35, 42, 49, 56, 63, 64, 65, 66, 67, 68, 69, 70, 72, 74, 76, 79, 82],
	valores: ["Guerrero", "Pícaro", "Explorador", "Bárbaro", "Bardo", "Mago", "Paladín", "Monje", "Druida", "Clérigo - Conocimiento", "Clérigo - Engaño", "Clérigo - Guerra", "Clérigo - Luz", "Clérigo - Naturaleza", "Clérigo - Tempestad", "Clérigo - Vida", "Brujo - Señor Feérico", "Brujo - Infernal", "Brujo - Primigenio", "Hechicero - Linaje Dracónico", "Hechicero - Magia Salvaje"],
	getClase() {
		let tirada = dados.tirardados(1,82);
		return this.valores[this.indices.findIndex(function(value) {
			return value >= tirada;
		})];
	},
	getClasePorModificadores(mFuerza,mDestreza,mConstitucion,mInteligencia,mSabiduria,mCarisma) {
		let elegibles = [];
		// Bárbaro
		// if (mFuerza >= 3 && mConstitucion >= 3 && mDestreza >= 2) elegibles.push("Bárbaro");
		// if (mSabiduria >= 3 && mConstitucion >= 2 && mFuerza >= 2) elegibles.push("Clérigo Pesado");
		// if (mSabiduria >= 3 && mConstitucion >= 2 && mDestreza >= 2) {
			// elegibles.push("Clérigo Ligero");
			// elegibles.push("Druida");
		// }
		// if ((mFuerza >= 3 || mDestreza >= 3) && mConstitucion >= 2) elegibles.push("Guerrero");
		// if (mDestreza >= 3 && mConstitucion >= 2 && mSabiduria >= 2) elegibles.push("Monje");
		// if (mFuerza >= 3 && mCarisma >= 3 && mConstitucion >= 2) elegibles.push("Paladín");
		// if (mDestreza >= 3 && mConstitucion >= 2 && mSabiduria >= 2) elegibles.push("Explorador");
		// if (mDestreza >= 3 && mConstitucion >= 2 && mCarisma >= 2) elegibles.push("Pícaro");
		// if (mCarisma >= 3 && mDestreza >= 2 && mConstitucion >= 2) {
			// elegibles.push("Hechicero");
			// elegibles.push("Brujo");
			// elegibles.push("Bardo");
		// }
		// if (mInteligencia >= 3 && mDestreza >= 2 && mConstitucion >= 2) elegibles.push("Mago");
		
		if (mFuerza >= 3 && mConstitucion >= 3 && mDestreza >= 2) {
			elegibles.push("Bárbaro");
			let papeletasAdicionales = mFuerza-3 + mConstitucion-3 + mDestreza-2;
			for (i=0;i<papeletasAdicionales;++i) elegibles.push("Bárbaro");
		}
		if (mSabiduria >= 3 && mConstitucion >= 2 && mFuerza >= 2) {
			elegibles.push("Clérigo Pesado");
			let papeletasAdicionales = mSabiduria-3 + mConstitucion-2 + mFuerza-2;
			for (i=0;i<papeletasAdicionales;++i) elegibles.push("Clérigo Pesado");
		}
		if (mSabiduria >= 3 && mConstitucion >= 2 && mDestreza >= 2) {
			elegibles.push("Clérigo Ligero");
			elegibles.push("Druida");
			let papeletasAdicionales = mSabiduria-3 + mConstitucion-2 + mDestreza-2;
			for (i=0;i<papeletasAdicionales;++i) {
				elegibles.push("Clérigo Ligero");
				elegibles.push("Druida");
			}
		}
		if (((mFuerza >= 3 != mDestreza >= 3) && mConstitucion >= 3)||((mFuerza >= 3 || mDestreza >=3) && mConstitucion == 2)) {
			elegibles.push("Guerrero");
			let papeletasAdicionales = mConstitucion-2;
			if (mFuerza > 3) papeletasAdicionales += mFuerza-3;
			if (mDestreza > 3) papeletasAdicionales += mDestreza-3;
			for (i=0;i<papeletasAdicionales;++i) elegibles.push("Guerrero");
		}
		if (mDestreza >= 3 && mConstitucion >= 2 && mSabiduria >= 2) {
			elegibles.push("Monje");
			let papeletasAdicionales = mSabiduria-2 + mConstitucion-2 + mDestreza-3;
			for (i=0;i<papeletasAdicionales;++i) elegibles.push("Monje");
		}
		if (mFuerza >= 3 && mCarisma >= 3 && mConstitucion >= 2) {
			elegibles.push("Paladín");
			let papeletasAdicionales = mFuerza-3 + mCarisma-3 + mConstitucion-2;
			for (i=0;i<papeletasAdicionales;++i) elegibles.push("Paladín");
		}
		if (mDestreza >= 3 && mConstitucion >= 2 && mSabiduria >= 2) {
			elegibles.push("Explorador");
			let papeletasAdicionales = mDestreza-3 + mConstitucion-2 + mSabiduria-2;
			for (i=0;i<papeletasAdicionales;++i) elegibles.push("Explorador");
		}
		if (mDestreza >= 3 && mConstitucion >= 2 && mCarisma >= 2) {
			elegibles.push("Pícaro");
			let papeletasAdicionales = mDestreza-3 + mConstitucion-2 + mCarisma-2;
			for (i=0;i<papeletasAdicionales;++i) elegibles.push("Pícaro");
		}
		if (mCarisma >= 3 && mDestreza >= 2 && mConstitucion >= 2) {
			elegibles.push("Hechicero");
			elegibles.push("Brujo");
			elegibles.push("Bardo");
			let papeletasAdicionales = mCarisma-3 + mConstitucion-2 + mDestreza-2;
			for (i=0;i<papeletasAdicionales;++i) {
				elegibles.push("Hechicero");
				elegibles.push("Brujo");
				elegibles.push("Bardo");
			}
		}
		if (mInteligencia >= 3 && mDestreza >= 2 && mConstitucion >= 2) {
			elegibles.push("Mago");
			let papeletasAdicionales = mInteligencia-3 + mConstitucion-2 + mDestreza-2;
			for (i=0;i<papeletasAdicionales;++i) elegibles.push("Mago");
		}
		
		if (elegibles.length < 1) {
			return this.getClasePorModificadores(mFuerza+1,mDestreza+1,mConstitucion+1,mInteligencia+1,mSabiduria+1,mCarisma+1);
			//return "*" + this.getClasePorCaracteristicas(mFuerza*2+10,mDestreza*2+10,mConstitucion*2+10,mInteligencia*2+10,mSabiduria*2+10,mCarisma*2+10);
		}

		let tirada = dados.tirardados(1, elegibles.length)-1;
		let clase = elegibles[tirada];
		if (clase=="Clérigo Pesado") {
			let tirada2 = dados.tirardados(1,4);
			if (tirada2 == 1) clase = "Clérigo de Myrena (Diosa de la Vida)";
			else if (tirada2 == 2) clase = "Clérigo de Kamenar (Dios de la Tempestad)";
			else if (tirada2 == 3) clase = "Clérigo de Eor (Dios de la Guerra)";
			else clase = "Clérigo de Atyx (Dios de la Forja)";
		} else if (clase == "Clérigo Ligero") {
			let tirada2 = dados.tirardados(1,5);
			if (tirada2 == 1) clase = "Clérigo de Heteas (Deidad del Conocimiento)";
			else if (tirada2 == 2) clase = "Clérigo de Luvian (Diosa de la Naturaleza)";
			else if (tirada2 == 3) clase = "Clérigo de Iarus (Dios de la Luz)";
			else if (tirada2 == 4) clase = "Clérigo de Seftis (Deidad del Engaño)";
			else clase = "Clérigo de Tidasis (Diosa de la Tumba)";
		}
		console.log(elegibles);
		console.log(tirada);
		console.log(clase);
		return clase;
	},
	getClaseOptima(mFuerza,mDestreza,mConstitucion,mInteligencia,mSabiduria,mCarisma) {
		let elegibles = [];

		if (mFuerza >= 3 && mConstitucion >= 3 && mDestreza >= 2) {
			let puntos = (mFuerza-3)*2 + mConstitucion-3 + mDestreza-2;
			elegibles.push({clase: "Bárbaro",valor: puntos});
		}
		if (mSabiduria >= 3 && mConstitucion >= 2 && mFuerza >= 2) {
			let puntos = (mSabiduria-3)*2 + mConstitucion-2 + mFuerza-2;
			elegibles.push({clase: "Clérigo Pesado",valor: puntos});
		}
		if (mSabiduria >= 3 && mConstitucion >= 2 && mDestreza >= 2) {
			let puntos = (mSabiduria-3)*2 + mConstitucion-2 + mDestreza-2;
			elegibles.push({clase: "Clérigo Ligero",valor: puntos});
			elegibles.push({clase: "Druida", valor: puntos});
		}
		if (((mFuerza >= 3 != mDestreza >= 3) && mConstitucion >= 3)||((mFuerza >= 3 || mDestreza >=3) && mConstitucion == 2)) {
			let puntos = mConstitucion-2;
			if (mFuerza > 3) puntos += mFuerza-3;
			if (mDestreza > 3) puntos += mDestreza-3;
			if (mFuerza > mDestreza) puntos += mFuerza-3;
			else puntos += mDestreza-3;
			elegibles.push({clase: "Guerrero",valor: puntos});
		}
		if (mDestreza >= 3 && mConstitucion >= 2 && mSabiduria >= 2) {
			let puntos = mSabiduria-2 + mConstitucion-2 + (mDestreza-3)*2;
			elegibles.push({clase: "Monje", valor: puntos});
		}
		if (mFuerza >= 3 && mCarisma >= 3 && mConstitucion >= 2) {
			let puntos = mFuerza-3 + mCarisma-3 + mConstitucion-2;
			if (mFuerza > mCarisma) puntos += mFuerza-3;
			else puntos += mCarisma-3;
			elegibles.push({clase: "Paladín", valor: puntos});
		}
		if (mDestreza >= 3 && mConstitucion >= 2 && mSabiduria >= 2) {
			let puntos = (mDestreza-3)*2 + mConstitucion-2 + mSabiduria-2;
			elegibles.push({clase: "Explorador", valor: puntos});
		}
		if (mDestreza >= 3 && mConstitucion >= 2 && mCarisma >= 2) {
			let puntos = (mDestreza-3)*2 + mConstitucion-2 + mCarisma-2;
			elegibles.push({clase: "Pícaro", valor: puntos});
		}
		if (mCarisma >= 3 && mDestreza >= 2 && mConstitucion >= 2) {
			let puntos = (mCarisma-3)*2 + mConstitucion-2 + mDestreza-2;
			elegibles.push({clase: "Hechicero", valor: puntos});
			elegibles.push({clase: "Brujo", valor: puntos});
			elegibles.push({clase: "Bardo", valor: puntos});
		}
		if (mInteligencia >= 3 && mDestreza >= 2 && mConstitucion >= 2) {
			let puntos = (mInteligencia-3)*2 + mConstitucion-2 + mDestreza-2;
			elegibles.push({clase: "Mago", valor: puntos});
		}
		
		if (elegibles.length < 1) {
			return this.getClaseOptima(mFuerza+1,mDestreza+1,mConstitucion+1,mInteligencia+1,mSabiduria+1,mCarisma+1);
			//return "*" + this.getClasePorCaracteristicas(mFuerza*2+10,mDestreza*2+10,mConstitucion*2+10,mInteligencia*2+10,mSabiduria*2+10,mCarisma*2+10);
		}

		// TODO: ordenar por valor y luego foreach con break cuando se encuentre uno con valor menor que el primero
		// ir añadiendo a array de finalistas
		// elegir un finalista al azar

		elegibles.sort(function(obj1,obj2) {
			return obj2.valor - obj1.valor;
		});
		
		let valorMaximo = elegibles[0].valor;
		let finalistas = [];
		
		for (indice=0;indice < elegibles.length; ++indice) {
			if (elegibles[indice].valor < valorMaximo) break;
			finalistas.push(elegibles[indice].clase);
		}
		
		let tirada = dados.tirardados(1, finalistas.length)-1;
		let clase = finalistas[tirada];
		if (clase=="Clérigo Pesado") {
			let tirada2 = dados.tirardados(1,4);
			if (tirada2 == 1) clase = "Clérigo de Myrena (Diosa de la Vida)";
			else if (tirada2 == 2) clase = "Clérigo de Kamenar (Dios de la Tempestad)";
			else if (tirada2 == 3) clase = "Clérigo de Eor (Dios de la Guerra)";
			else clase = "Clérigo de Atyx (Dios de la Forja)";
		} else if (clase == "Clérigo Ligero") {
			let tirada2 = dados.tirardados(1,5);
			if (tirada2 == 1) clase = "Clérigo de Heteas (Deidad del Conocimiento)";
			else if (tirada2 == 2) clase = "Clérigo de Luvian (Diosa de la Naturaleza)";
			else if (tirada2 == 3) clase = "Clérigo de Iarus (Dios de la Luz)";
			else if (tirada2 == 4) clase = "Clérigo de Seftis (Deidad del Engaño)";
			else clase = "Clérigo de Tidasis (Diosa de la Tumba)";
		}
		// console.log(elegibles);
		// console.log(finalistas);
		// console.log(tirada);
		// console.log(clase);
		return clase;
	},
	getClasePorCaracteristicas(fuerza,destreza,constitucion,inteligencia,sabiduria,carisma) {
		let caracteristicas = [{key: 'fuerza', value: fuerza},{key: 'destreza', value: destreza},{key: 'constitución', value: constitucion},{key: 'inteligencia', value: inteligencia},{key: 'sabiduría', value: sabiduria},{key: 'carisma', value: carisma}];
		caracteristicas.sort(function(obj1,obj2) {
			let tirada = dados.tirardados(1,2);
			let desempate = 0;
			if (tirada == 2) desempate = -1;
			if (obj2.value == obj1.value) return desempate;
			return obj2.value - obj1.value;
		});
		//console.log(caracteristicas);
		
		let indice = 0;
		if (caracteristicas[0].key=="constitución") indice = 1;
		
		if (caracteristicas[indice].key=="fuerza") {
			if (constitucion>fuerza) {
				if (caracteristicas[indice+1].key == "destreza") {
					return "Bárbaro";
				}
			} else {
				if (caracteristicas[indice+1].key == "destreza" || caracteristicas[indice+1].key == "constitucion") {
					if (caracteristicas[indice+2].key == "destreza" || caracteristicas[indice+2].key == "constitucion") {
						return "Bárbaro";
					}
				}
			}

			return "Guerrero";

		} else if (caracteristicas[indice].key=="destreza") {
			if (sabiduria>carisma && sabiduria>inteligencia) {
				if (fuerza>inteligencia) return "Monje";
				return "Explorador";
			}
			return "Pícaro";
		} else if (caracteristicas[indice].key=="inteligencia") {
			return "Mago";
		} else if (caracteristicas[indice].key=="sabiduría") {
			if (fuerza>destreza) {
				let tipo=dados.tirardados(1,9);
				if (tipo==1) return "Clérigo de Heteas (Deidad del Conocimiento)";
				if (tipo==2) return "Clérigo de Myrena (Diosa de la Vida)";
				if (tipo==3) return "Clérigo de Luvian (Diosa de la Naturaleza)";
				if (tipo==4) return "Clérigo de Iarus (Dios de la Luz)";
				if (tipo==5) return "Clérigo de Kamenar (Dios de la Tempestad)";
				if (tipo==6) return "Clérigo de Seftis (Deidad del Engaño)";
				if (tipo==7) return "Clérigo de Eor (Dios de la Guerra)";
				if (tipo==8) return "Clérigo de Atyx (Dios de la Forja)";
				return "Clérigo de Tidasis (Diosa de la Tumba)";
			} else return "Druida";
		} else if (caracteristicas[indice].key=="carisma") {
			if (fuerza > destreza) return "Paladín";
			let tirada = dados.tirardados(1,3);
			if (tirada==1) return "Bardo";
			if (tirada==2) {
				let tipo=dados.tirardados(1,3);
				if (tipo==1) return "Brujo. Pacto con Señor Feérico.";
				if (tipo==2) return "Brujo. Pacto con Infernal.";
				return "Brujo. Pacto con Primigenio.";
			} 
			let tipo = dados.tirardados(1,2);
			if (tipo == 1) return "Hechicero. Linaje Dracónico.";
			return "Hechicero. Magia Salvaje.";
		}
		return "Cagada";
	}
		
};

let riqueza_inicial = {
	getRiqueza(clase) {
		if (clase=="Guerrero") return dados.tirardados(5,4)*10;
		if (clase=="Pícaro") return dados.tirardados(4,4)*10;
		if (clase=="Explorador") return dados.tirardados(5,4)*10;
		if (clase=="Bárbaro") return dados.tirardados(2,4)*10;
		if (clase=="Bardo") return dados.tirardados(5,4)*10;
		if (clase=="Mago") return dados.tirardados(4,4)*10;
		if (clase=="Paladín") return dados.tirardados(5,4)*10;
		if (clase=="Monje") return dados.tirardados(5,4); //ahora vas y lo cascas
		if (clase=="Druida") return dados.tirardados(2,4)*10;
		if (clase.substr(0,7)=="Clérigo") return dados.tirardados(5,4)*10;
		if (clase.substr(0,5)=="Brujo") return dados.tirardados(4,4)*10;
		if (clase.substr(0,9)=="Hechicero") return dados.tirardados(3,4)*10;
		return 0; //a chuparla
	}
};
	
function nuevoPJ() {
	
	let chorrazo = "";
	let notas = "";
	
	// CARACTERÍSTICAS
	
	// Fuerza
	let fuerza = caracteristicas.getValor();
	
	// Destreza
	let destreza = caracteristicas.getValor();
	
	// Constitución
	let constitucion = caracteristicas.getValor();
	
	// Inteligencia
	let inteligencia = caracteristicas.getValor();
	
	// Sabiduría
	let sabiduria = caracteristicas.getValor();
	
	// Carisma
	let carisma = caracteristicas.getValor();
		
	// RAZA
	let raza = razas.getRazaVerosimil(fuerza, destreza, constitucion, inteligencia, sabiduria, carisma);
	
	// Aplicar modificadores de características por raza

	if (raza == "Dracónido") {
		fuerza += 2;
		carisma += 1;
	} else if (raza == "Tiefling") {
		carisma += 2;
		inteligencia += 1;
	} else if (raza == "Semiorco") {
		fuerza += 2;
		constitucion += 1;
	} else if (raza == "Semielfo") {
		carisma += 2;
		let tiradaAnterior = 0;
		let tirada = 0;
		for (i=0; i<2; ++i) {
			while (tirada == tiradaAnterior) {
				tirada = dados.tirardados(1,5);
			}
//			console.log(tirada);
			tiradaAnterior = tirada;
			if (tirada == 1) {
				fuerza += 1;
				notas += "fuerza:+1 ";
			} else if (tirada == 2) {
				destreza += 1;     
				notas += "destreza:+1 ";
			} else if (tirada == 3) {
				constitucion += 1; 
				notas += "constitucion:+1 ";
			} else if (tirada == 4) {
				inteligencia += 1; 
				notas += "inteligencia:+1 ";
			} else if (tirada == 5) {
				sabiduria += 1;    
				notas += "sabiduria:+1 ";
			}
		}
	} else if (raza == "Gnomo de los Bosques") {
		inteligencia+=2;
		destreza+=1;
	} else if (raza == "Gnomo de las Rocas") {
		inteligencia+=2;
		constitucion+=1;
	} else if (raza == "Drow") {
		destreza+=2;
		carisma+=1;
	} else if (raza == "Alto Elfo") {
		destreza+=2;
		inteligencia+=1;
	} else if (raza == "Elfo de los Bosques") {
		destreza+=2;
		sabiduria+=1;
	} else if (raza == "Enano de las Colinas") {
		constitucion+=2;
		sabiduria+=1;
	} else if (raza == "Enano de las Montañas") {
		constitucion+=2;
		fuerza+=2;
	} else if (raza == "Mediano Piesligeros") {
		destreza+=2;
		carisma+=1;
	} else if (raza == "Mediano Fornido") {
		destreza+=2;
		constitucion+=1;
	} else if (raza == "Humano") {
		fuerza+=1;
		destreza+=1;
		constitucion+=1;
		inteligencia+=1;
		sabiduria+=1;
		carisma+=1;
	}		
		
	let mFuerza = caracteristicas.getModificador(fuerza);
	let mDestreza = caracteristicas.getModificador(destreza);
	let mConstitucion = caracteristicas.getModificador(constitucion);
	let mInteligencia = caracteristicas.getModificador(inteligencia);
	let mSabiduria = caracteristicas.getModificador(sabiduria);
	let mCarisma = caracteristicas.getModificador(carisma);
		
	// TRASFONDO
	let trasfondo = trasfondos.getTrasfondo();
	let p1 = 0;
	let o_personalidad = {index: 0, texto: ""};
	let personalidad = trasfondos.getPersonalidad(trasfondo, o_personalidad);
	personalidad += "Y además: " + trasfondos.getPersonalidad(trasfondo, o_personalidad);
	let ideal = trasfondos.getIdeal(trasfondo);
	let vinculo = trasfondos.getVinculo(trasfondo);
	let defecto = trasfondos.getDefecto(trasfondo);
	let t_especial = trasfondos.getEspecial(trasfondo);

	// CLASE (wooooah no te atreverás... SÍ, con dos cojones)
	//let clase = clases.getClase();
	//let clase = clases.getClasePorCaracteristicas(fuerza,destreza,constitucion,inteligencia,sabiduria,carisma);
	//let clase = clases.getClasePorModificadores(mFuerza,mDestreza,mConstitucion,mInteligencia,mSabiduria,mCarisma);
	let clase = clases.getClaseOptima(mFuerza,mDestreza,mConstitucion,mInteligencia,mSabiduria,mCarisma);
	
	// RIQUEZA INICIAL
	let riqueza = riqueza_inicial.getRiqueza(clase);
	
	chorrazo += "\nCARACTERÍSTICAS (valores modificados por raza)\n";
	chorrazo += "FUERZA: " + fuerza + " (" + mFuerza + ")\n";
	chorrazo += "DESTREZA: " + destreza + " (" + mDestreza + ")\n";
	chorrazo += "CONSTITUCIÓN: " + constitucion + " (" + mConstitucion + ")\n";
	chorrazo += "INTELIGENCIA: " + inteligencia + " (" + mInteligencia + ")\n";
	chorrazo += "SABIDURÍA: " + sabiduria + " (" + mSabiduria + ")\n";
	chorrazo += "CARISMA: " + carisma + " (" + mCarisma + ")\n";
	chorrazo += "\nRAZA: " + raza + "\n";
	chorrazo += "\nCLASE: " + clase + "\n";
	chorrazo += "\nTRASFONDO: " + trasfondo + "\n";
	chorrazo += "\nPERSONALIDAD: " + personalidad + "\n";
	chorrazo += "\nIDEAL: " + ideal + "\n";
	chorrazo += "\nVINCULO: " + vinculo + "\n";
	chorrazo += "\nDEFECTO: " + defecto + "\n";
	chorrazo += "\nESPECIAL POR TRASFONDO: " + t_especial + "\n";
	chorrazo += "\nIDIOMAS: " + idiomas_personaje.churro + "\n";
	chorrazo += "\nRIQUEZA INICIAL: " + riqueza + "\n";
	chorrazo += "\nNOTAS: " + notas + "\n";
	chorrazo += "\nASPECTO: " + aspecto_personaje.getAlturaPeso(raza) + "\n";


	return(chorrazo);
	
	
}

console.log(nuevoPJ());