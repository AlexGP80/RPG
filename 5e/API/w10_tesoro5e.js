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

let armasaleatorias = {
	getArmaAleatoria() {
		let tipo = dados.tirardados(1,100);
		let arma = dados.tirardados(1,100);
		if (tipo < 31) {
			// Armas cuerpo a cuerpo sencillas
			if (arma < 6) return "Garrote";
			if (arma < 21) return "Daga";
			if (arma < 26) return "Garrote grande";
			if (arma < 36) return "Hacha de mano";
			if (arma < 46) return dados.tirardados(1,4) + " jabalinas";
			if (arma < 51) return "Martillo ligero";
			if (arma < 66) return "Maza";
			if (arma < 76) return "Bastón";
			if (arma < 81) return "Hoz";
			return "Lanza";
			
		} else if (tipo < 39) {
			// Armas a distancia sencillas
			if (arma < 31) return "Ballesta ligera";
			if (arma < 46) return dados.tirardados(2,6) + " dardos";
			if (arma < 91) return "Arco corto";
			return "Honda";
			
		} else if (tipo < 89) {
			// Armas cuerpo a cuerpo marciales
			if (arma < 10) return "Hacha de guerra";
			if (arma < 16) return "Hacha a dos manos";
			if (arma < 19) return "Flagelo";
			if (arma < 39) {
				let asta = dados.tirardados(1,100);
				if (asta < 26) return "Guja";
				if (asta < 61) return "Alabarda";
				if (asta < 96) return "Pica";
				return "Tridente";
			}
			if (arma < 84) {
				let espada = dados.tirardados(1,100);
				if (espada < 16) return "Espadón";
				if (espada < 41) return "Espada larga";
				if (espada < 56) return "Estoque";
				if (espada < 76) return "Cimitarra";
				return "Espada corta";
			}
			if (arma < 87) return "Lanza de caballería";
			if (arma < 90) return "Maza a dos manos";
			if (arma < 94) return "Lucero del alba";
			if (arma < 97) return "Pico de guerra";
			if (arma < 100) return "Martillo de guerra";
			return "Látigo";
			
		} else {
			// Armas a distancia marciales
			if (arma < 6) return "Cerbatana";
			if (arma < 21) return "Ballesta de mano";
			if (arma < 41) return "Ballesta pesada";
			return "Arco largo";
		}
	},
	getEspada() {
		let espada = dados.tirardados(1,100);
		if (espada < 16) return "Espadón";
		if (espada < 41) return "Espada larga";
		if (espada < 56) return "Estoque";
		if (espada < 76) return "Cimitarra";
		return "Espada corta";
	},
	getEspadaCortante() {
		let espada = dados.tirardados(1,4);
		if (espada == 1) return "Espadón";
		if (espada == 2) return "Cimitarra";
		return "Espada larga";
	},
	getHacha() {
		let hacha = dados.tirardados(1,3);
		if (hacha == 1) return "Hacha de guerra";
		if (hacha == 2) return "Hacha de dos manos";
		return "Hacha de mano";
	},
	getEspadaHacha() {
		let azar = dados.tirardados(1,2);
		if (azar == 1) return this.getEspada();
		return this.getHacha();
	}, 
	getMunicion() {
		let d20 = dados.tirardados(1,20);
		let cantidad = dados.tirardados(5,6);
		if (d20 < 11) return cantidad + " flechas";
		if (d20 < 12) return cantidad + " dardos de cerbatana";
		if (d20 < 17) return cantidad + " virotes de ballesta";
		return cantidad + " balas de honda";
	}
};

let conjuros = {
	trucos: ["Agarre electrizante", "Amistad", "Burla dañina", "Crear llama", "Descarga de fuego", "Descarga sobrenatural", "Shillelagh", "Guardia de cuchillas", "Guía", "Ilusión menor", "Impacto certero", "Látigo de espinas", "Llama sagrada", "Luces danzantes", "Luz", "Mano de mago", "Mensaje", "Piedad con los moribundos", "Prestidigitación", "Rayo de escarcha", "Reparar", "Resistencia", "Rociada venenosa", "Saber druídico", "Salpicadura ácida", "Taumaturgia", "Toque helado"],
	nivel1: ["Alarma", "Armadura de Agathys", "Armadura de mago", "Bendecir", "Brazos de Hadar", "Buenas bayas", "Caída de pluma", "Castigo abrasador", "Castigo atronador", "Castigo furioso", "Crear o destruir agua", "Curar heridas", "Detectar el bien y el mal", "Detectar magia", "Detectar venenos y enfermedades", "Disco flotante de Tenser", "Disfrazarse", "Dormir", "Duelo forzado", "Encantar animal", "Encontrar familiar", "Enmarañar", "Entender idiomas", "Escudo", "Escudo de fe", "Falsa vida", "Favor divino", "Fuego feérico", "Golpe apresador", "Grasa", "Hablar con los animales", "Hechizar persona", "Heroísmo", "Identificar", "Imagen silenciosa", "Infligir heridas", "Maleficio", "Manos ardientes", "Marca del cazador", "Nube de oscurecimiento", "Ola atronadora", "Orbe cromático", "Orden imperiosa", "Palabra de curación", "Perdición", "Protección contra el bien y el mal", "Proyectil mágico", "Purificar comida y bebida", "Rayo de hechicería", "Rayo nauseabundo", "Represión infernal", "Retirada expeditiva", "Risa horrible de Tasha", "Rociada de color", "Saeta guiada", "Salto", "Santuario", "Sirviente invisible", "Susurros disonantes", "Texto ilusorio", "Tormenta de espinas", "Zancada prodigiosa"],
	nivel2: ["Abrir", "Agrandar/reducir", "Alterar el propio aspecto", "Arma espiritual", "Arma mágica", "Augurio", "Aura mágica de Nystul", "Auxilio", "Boca mágica", "Calentar metal", "Calmar emociones", "Castigo marcador", "Cerradura arcana", "Contorno borroso", "Cordón de flechas", "Corona de la locura", "Crecimiento espinoso", "Detectar pensamientos", "Detectar trampas", "Dulce descanso", "Embelesar", "Esfera de llamas", "Flecha ácida de Melf", "Fuerza fantasmal", "Hacer añicos", "Hallar corcel", "Hoja de fuego", "Imagen múltiple", "Inmovilizar persona", "Invisibilidad", "Levitar", "Llama permanente", "Localizar animales o plantas", "Localizar objeto", "Mensajero animal", "Nube de dagas", "Oscuridad", "Pasar sin rastro", "Paso brumoso", "Piel robliza", "Plegaria de curación", "Potenciar característica", "Protección contra veneno", "Ráfaga de viento", "Rayo abrasador", "Rayo de luna", "Rayo debilitador", "Restablecimiento menor", "Sentidos de la bestia", "Silencio", "Sordera/Ceguera", "Sugestión", "Telaraña", "Trepar cual arácnido", "Truco de la cuerda", "Ver invisibilidad", "Vínculo protector", "Visión en la oscuridad", "Zona de verdad"],
	nivel3: ["Acelerar", "Animar a los muertos", "Arma elemental", "Aura de vitalidad", "Bola de fuego", "Caminar sobre el agua", "Castigo cegador", "Círculo mágico", "Clarividencia", "Conjurar animales", "Conjurar descarga de proyectiles", "Contrahechizo", "Corcel fantasma", "Crear comida y agua", "Crecimiento vegetal", "Desplazamiento", "Disipar magia", "Don de lenguas", "El manto del cruzado", "Espíritus guardianes", "Fingir muerte", "Flecha de relámpago", "Forma gaseosa", "Fundirse con la piedra", "Glifo custodio", "Hablar con las plantas", "Hablar con los muertos", "Hambre de Hadar", "Imagen mayor", "Imponer maldición", "Indetectable", "Levantar maldición", "Llamar al relámpago", "Luz del día", "Muro de viento", "Nube apestosa", "Palabra de curación en masa", "Patrón hipnótico", "Pequeña choza de Leomund", "Protección contra energía", "Ralentizar", "Recado", "Relámpago", "Respirar bajo el agua", "Revivir", "Señal de esperanza", "Terror", "Toque vampírico", "Tormenta de aguanieve", "Volar"],
	nivel4: ["Adivinación", "Asesino fantasmal", "Aura de pureza", "Aura de vida", "Castigo abrumador", "Cofre oculto de Leomund", "Compulsión", "Confusión", "Conjurar elementales menores", "Conjurar seres de los bosques", "Controlar agua", "Destierro", "Dominar bestia", "Enredadera", "Escudo de fuego", "Esfera elástica de Otiluke", "Fabricar", "Guardia contra la muerte", "Guardián de la fe", "Insecto gigante", "Invisibilidad mejorada", "Libertad de movimiento", "Localizar criatura", "Marchitar", "Mastín fiel de Mordenkainen", "Moldear la piedra", "Muro de fuego", "Ojo arcano", "Piel pétrea", "Polimorfar", "Puerta dimensional", "Sanctasanctórum privado de Mordenkainen", "Tentáculos negros de Evard", "Terreno alucinatorio", "Tormenta de hielo"],
	nivel5: ["Alterar los recuerdos", "Alzar a los muertos", "Animar objetos", "Apariencia", "Atadura planar", "Caparazón antivida", "Carcaj veloz", "Castigo desterrador", "Círculo de poder", "Círculo de teletransportación", "Comunión", "Comunión con la naturaleza", "Conjurar elemental", "Conjurar lluvia de flechas", "Cono de frío", "Conocer las leyendas", "Consagrar", "Contactar con otro plano", "Contagio", "Creación", "Curar heridas en masa", "Despertar", "Disipar el bien y el mal", "Dominar persona", "Engañar", "Enlace telepático de Rary", "Ensueño", "Escudriñar", "Geas", "Golpe flamígero", "Inmovilizar monstruo", "Mano de Bigby", "Muro de fuerza", "Muro de piedra", "Nube aniquiladora", "Ola destructora", "Pasamuros", "Paso arbóreo", "Plaga de insectos", "Reencarnar", "Restablecimiento mayor", "Telequinesis"],
	nivel6: ["Aliado planar", "Baile irresistible de Otto", "Barrera de cuchillas", "Círculo de muerte", "Conjurar feérico", "Contingencia", "Crear muerto viviente", "Curar", "Dañar", "De la carne a la piedra", "Desintegrar", "Encontrar el camino", "Esfera congelante de Otiluke", "Festín de héroes", "Globo de invulnerabilidad", "Guardas y guardias", "Ilusión programada", "Invocación instantánea de Drawmij", "Mal de ojo", "Mover la tierra", "Muro de espinas", "Muro de hielo", "Palabra de regreso", "Prohibición", "Puerta arcana", "Rayo solar", "Relámpago en cadena", "Sugestión en masa", "Urna mágica", "Viajar con el viento", "Viajar mediante plantas", "Visión veraz"],
	nivel7: ["Bola de fuego de explosión retardada", "Conjurar celestial", "Dedo de la muerte", "Desplazamiento entre planos", "Espada de Mordenkainen", "Espejismo arcano", "Excursión etérea", "Invertir gravedad", "Jaula de fuerza", "Magnífica mansión de Mordenkainen", "Palabra divina", "Proyectar imagen", "Recluir", "Regenerar", "Resurrección", "Rociada prismática", "Símbolo", "Simulacro", "Teletransporte", "Tormenta de fuego"],
	nivel8: ["Antipatía/simpatía", "Aspectos animales", "Aura sagrada", "Campo antimagia", "Clon", "Controlar el clima", "Dominar monstruo", "Explosión solar", "Laberinto", "Labia", "Mente en blanco", "Nube incendiaria", "Palabra de poder: aturdir", "Romper la mente", "Semiplano", "Telepatía", "Terremoto", "Tsunami"],
	nivel9: ["Cambiar de forma", "Cautiverio", "Curar en masa", "Deseo", "Muro prismático", "Palabra de poder: matar", "Palabra de poder: sanar", "Parar el tiempo", "Polimorfar verdadero", "Portal", "Presagio", "Proyección astral", "Resurrección verdadera", "Terror abyecto", "Tormenta de meteoritos", "Tormenta de venganza"],
	getConjuro(nivel) {
		let tabla = null;
		if (nivel === 0) {
			tabla = this.trucos;
		} else if (nivel == 1) {
			tabla = this.nivel1;
		} else if (nivel == 2) {
			tabla = this.nivel2;
		} else if (nivel == 3) {
			tabla = this.nivel3;
		} else if (nivel == 4) {
			tabla = this.nivel4;
		} else if (nivel == 5) {
			tabla = this.nivel5;
		} else if (nivel == 6) {
			tabla = this.nivel6;
		} else if (nivel == 7) {
			tabla = this.nivel7;
		} else if (nivel == 8) {
			tabla = this.nivel8;
		} else if (nivel == 9) {
			tabla = this.nivel9;
		} else {
			log("ERROR tesoro5e.conjuros.getConjuro(nivel): nivel incorrecto, nivel = " + nivel);
			return;
		}
		let dado = tabla.length;
		let indice = dados.tirardados(1,dado)-1;
		return tabla[indice];
	}
};

let objetosmagicos = {
	indicesA: [51,61,71,91,95,99,100,9999999],
	tablaA: ["Poción de curación. ",
			"Pergamino de --conjuro (truco)--. ",
			"Poción de trepar. ",
			"Pergamino de --conjuro (nivel 1)--. ",
			"Pergamino de --conjuro (nivel 2)--. ",
			"Poción de curación mayor. ",
			"Bolsa de contención. ",
			"Globo flotante. "], 
	indicesB: [16,23,30,35,40,45,50,55,60,65,68,71,74,76,78,80,82,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,9999999],
	tablaB: ["Poción de curación mayor. ",
			"Poción de aliento de fuego. ",
			"Poción de resistencia. ",
			"--Munición-- +1. ",
			"Poción de amistad animal. ",
			"Poción de fuerza de gigante de las colinas. ",
			"Poción de crecimiento. ",
			"Poción de respirar bajo el agua. ",
			"Pergamino de --conjuro (nivel 2)--. ",
			"Pergamino de --conjuro (nivel 3)--. ",
			"Bolsa de contención. ",
			"Ungüento de Keoghtom. ",
			"Aceite escurridizo. ",
			"Polvo de desaparición. ",
			"Polvo de sequedad. ",
			"Polvo de estornudar y atragantarse. ",
			"Gema elemental. ",
			"Filtro de amor. ",
			"Vasija alquímica. ",
			"Gorro de respirar bajo el agua. ",
			"Capa de la mantarraya. ",
			"Globo flotante. ",
			"Anteojos de la noche. ",
			"Yelmo de entender idiomas. ",
			"Vara inamovible. ",
			"Linterna de revelación. ",
			"Armadura de marinero. ",
			"Armadura de mithral. ",
			"Poción de veneno. ",
			"Anillo de natación. ",
			"Túnica de objetos útiles. ",
			"Cuerda de escalada. ",
			"Silla de monta del caballero. ",
			"Varita de detección mágica. ",
			"Varita de secretos"], 
	indicesC: [16,23,28,33,38,44,48,53,58,63,68,73,76,79,82,85,88,90,92,93,94,95,96,97,98,99,100,9999999],
	tablaC: ["Poción de curación superior. ",
			"Pergamino de --conjuro (nivel 4)--. ",
			"--Munición-- +2. ",
			"Poción de clarividencia. ",
			"Poción de encoger. ",
			"Poción de forma gaseosa. ",
			"Poción de fuerza de gigante de escarcha. ",
			"Poción de fuerza de gigante de piedra. ",
			"Poción de heroísmo. ",
			"Poción de invulnerabilidad. ",
			"Poción de leer mentes. ",
			"Pergamino de --conjuro (nivel 5)--. ",
			"Elixir de salud. ",
			"Aceite de etereidad. ",
			"Poción de fuerza de gigante de fuego. ",
			"Ficha pluma de Quall. ",
			"Pergamino de protección. ",
			"Bolsa de judías. ",
			"Canica de fuerza. ",
			"Carillón de apertura. ",
			"Decantador de agua interminable. ",
			"Anteojos de visión minuciosa. ",
			"Bote plegable. ",
			"Morral práctico de Heward. ",
			"Herraduras de velocidad. ",
			"Collar de bolas de fuego. ",
			"Talismán de salud. ",
			"Piedras mensajeras. "], 
	indicesD: [21,31,41,51,58,63,68,73,78,83,88,93,96,99,100,9999999],
	tablaD: ["Poción de curación suprema. ",
			"Poción de invisibilidad. ",
			"Poción de velocidad. ",
			"Pergamino de --conjuro (nivel 6)--. ",
			"Pergamino de --conjuro (nivel 7)--. ",
			"--Munición-- +3. ",
			"Aceite de afilado. ",
			"Poción de vuelo. ",
			"Poción de fuerza de gigante de las nubes. ",
			"Poción de longevidad. ",
			"Poción de vitalidad. ",
			"Pergamino de --conjuro (nivel 8)--. ",
			"Herraduras del céfiro. ",
			"Maravillosos pigmentos de Nolzur. ",
			"Bolsa devoradora. ",
			"Agujero portátil. "], 
	indicesE: [31,56,71,86,94,99,9999999],
	tablaE: ["Pergamino de --conjuro (nivel 8)--. ",
			"Poción de fuerza de gigante de las tormentas. ",
			"Poción de curación suprema. ",
			"Pergamino de --conjuro (nivel 9)--. ",
			"Disolvente universal. ",
			"Flecha asesina. ",
			"Pegamento soberano. "], 
	indicesF: [16,19,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,9999999],
	tablaF: ["--Arma-- +1. ",
			"Escudo +1. ",
			"Escudo centinela. ",
			"Amuleto a prueba de detección y localización. ",
			"Botas élficas. ",
			"Botas de zancadas y brincos. ",
			"Brazales de arquería. ",
			"Broche escudo. ",
			"Escoba voladora. ",
			"Capa élfica. ",
			"Capa de protección. ",
			"Guanteletes de fuerza de ogro. ",
			"Sombrero de disfraz. ",
			"Jabalina del relámpago. ",
			"Perla de poder. ",
			"Vara del pacto +1. ",
			"Babuchas de trepar cual arácnido. ",
			"Bastón de la víbora. ",
			"Bastón de la pitón. ",
			"--Espada-- de la venganza. ",
			"Tridente de comandar peces. ",
			"Varita de proyectiles mágicos. ",
			"Varita del mago de guerra +1. ",
			"Varita de telaraña. ",
			"--Arma-- de advertencia. ",
			"Armadura adamantina (cota de malla). ",
			"Armadura adamantina (camisa de malla). ",
			"Armadura adamantina (cota de escamas). ",
			"Bolsa de trucos (gris). ",
			"Bolsa de trucos (rojiza). ",
			"Bolsa de trucos (marrón). ",
			"Botas de las tierras invernales. ",
			"Diadema de estallidos. ",
			"Baraja de ilusiones. ",
			"Botella siemprehumeante. ",
			"Anteojos de encantamiento. ",
			"Anteojos de vista de águila. ",
			"Estatuilla de poder maravilloso (cuervo de plata). ",
			"Gema del resplandor. ",
			"Guantes atrapaflechas. ",
			"Guantes de natación y escalada. ",
			"Guantes de ladrón. ",
			"Diadema de intelecto. ",
			"Yelmo de telepatía. ",
			"Instrumento de los bardos (laúd de Doss). ",
			"Instrumento de los bardos (bandora de Fochlucan). ",
			"Instrumento de los bardos (cistro de Mac-Fuirmidh). ",
			"Medallón de los pensamientos. ",
			"Collar de adaptación. ",
			"Talismán de cerrar heridas. ",
			"Flauta de la aparición. ",
			"Flauta de las cloacas. ",
			"Anillo de salto. ",
			"Anillo de escudo mental. ",
			"Anillo de calidez. ",
			"Anillo de caminar sobre las aguas. ",
			"Carcaj de Ehlonna. ",
			"Piedra de la buena fortuna. ",
			"Abanico del viento. ",
			"Botas aladas. "], 
	indicesG: [12,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,9999999],
	tablaG: ["--Arma-- +2. ",
			"Estatuilla de poder maravilloso (1d8: 1.Grifo de bronce; 2.Mosca de ébano; 3.Leones dorados. 4.Cabras de marfil. 5.Elefante de mármol. 6-7.Perro de ónice. 8.Búho de serpentina). ",
			"Armadura adamantina (coraza). ",
			"Armadura adamantina (de bandas). ",
			"Amuleto de salud. ",
			"Armadura de vulnerabilidad. ",
			"Escudo atrapaflechas. ",
			"Cinturón enano. ",
			"Cinturón de fuerza de gigante de las colinas. ",
			"--Hacha-- berserker. ",
			"Botas de levitación. ",
			"Botas de velocidad. ",
			"Cuenco para controlar elementales de agua. ",
			"Brazales de defensa. ",
			"Brasero para controlar elementales de fuego. ",
			"Capa del charlatán. ",
			"Incensario de controlar elementales de aire. ",
			"Armadura, cota de malla +1. ",
			"Armadura de resistencia (cota de malla). ",
			"Armadura, camisa de malla +1. ",
			"Armadura de resistencia (camisa de malla). ",
			"Capa de desplazamiento. ",
			"Capa de murciélago. ",
			"Cubo de fuerza. ",
			"Fortaleza instantánea de Daern. ",
			"Daga de la ponzoña. ",
			"Grilletes dimensionales. ",
			"--Espada-- matadragones. ",
			"Malla élfica. ",
			"--Espada-- lengua de fuego. ",
			"Gema de visión. ",
			"--Espada o hacha-- Matagigantes. ",
			"Cuero tachonado encantado. ",
			"Yelmo de teletransporte. ",
			"Cuerno de estallido. ",
			"Cuerno del Valhalla (plata o latón). ",
			"Instrumento de los bardos (mandolina de Canaith). ",
			"Instrumento de los bardos (lira de Cli). ",
			"Piedra Ioun (consciencia). ",
			"Piedra Ioun (protección). ",
			"Piedra Ioun (reserva). ",
			"Piedra Ioun (sustento). ",
			"Bandas de hierro de Bilarro. ",
			"Armadura, cuero +1. ",
			"Armadura de resistencia (cuero). ",
			"Maza disruptiva. ",
			"Maza castigadora. ",
			"Maza del terror. ",
			"Manto de resistencia a conjuros. ",
			"Collar de plegarias. ",
			"Colgante de inmunidad al veneno. ",
			"Anillo de influencia animal. ",
			"Anillo de evasión. ",
			"Anillo de caída de pluma. ",
			"Anillo de libertad de acción. ",
			"Anillo de protección. ",
			"Anillo de resistencia. ",
			"Anillo de almacenamiento de conjuros. ",
			"Anillo del carnero. ",
			"Anillo de visión de rayos X. ",
			"Túnica de los ojos. ",
			"Cetro de mando. ",
			"Vara del pacto +2. ",
			"Cuerda enredadora. ",
			"Armadura, cota de escamas +1. ",
			"Armadura de resistencia (cota de escamas). ",
			"Escudo +2. ",
			"Escudo de atraer proyectiles. ",
			"Bastón del cautivador. ",
			"Bastón de curación. ",
			"Bastón de enjambre de insectos. ",
			"Bastón de los bosques. ",
			"Bastón de marchitamiento. ",
			"Piedra de controlar elementales de tierra. ",
			"Espada solar. ",
			"--Espada-- ladrona de vida. ",
			"--Espada-- hiriente. ",
			"Vara de tentáculos. ",
			"--Arma-- feroz. ",
			"Varita de atadura. ",
			"Varita de detectar enemigos. ",
			"Varita del terror. ",
			"Varita de bolas de fuego. ",
			"Varita de relámpagos. ",
			"Varita de parálisis. ",
			"Varita del mago de guerra +2. ",
			"Varita de las maravillas. ",
			"Alas de vuelo. "], 
	indicesH: [11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,9999999],
	tablaH: ["--Arma-- +3. ",
			"Amuleto de los planos. ",
			"Alfombra voladora. ",
			"Bola de cristal (versión muy rara). ",
			"Anillo de regeneración. ",
			"Anillo de estrellas fugaces. ",
			"Anillo de telequinesis. ",
			"Túnica de colores hipnóticos. ",
			"Túnica de las estrellas. ",
			"Vara de la absorción. ",
			"Vara de la alerta. ",
			"Vara de la seguridad. ",
			"Vara del pacto +3. ",
			"Cimitarra de velocidad. ",
			"Escudo +3. ",
			"Bastón de fuego. ",
			"Bastón de escarcha. ",
			"Bastón de poder. ",
			"Bastón de impacto. ",
			"Bastón de truenos y relámpagos. ",
			"--Espada corte-- de hoja afilada. ",
			"Varita de polimorfar. ",
			"Varita del mago de guerra +3. ",
			"Armadura adamantina (media armadura). ",
			"Armadura adamantina (de placas). ",
			"Escudo animado. ",
			"Cinturón de fuerza de gigante de fuego. ",
			"Cinturón de fuerza de gigante de escarcha o piedra. ",
			"Armadura, coraza +1. ",
			"Armadura de resistencia (coraza). ",
			"Vela de invocación. ",
			"Armadura, cota de malla +2. ",
			"Armadura, camisa de malla +2. ",
			"Capa arácnida. ",
			"--Espada-- danzarina. ",
			"Armadura demoníaca. ",
			"Cota de escamas de dragón. ",
			"Armadura de placas enana. ",
			"Martillo arrojadizo enano. ",
			"Botella de ifrit. ",
			"Estatuilla de poder maravilloso (corcel de obsidiana). ",
			"--Espada-- hierro de escarcha. ",
			"Yelmo de fulgor. ",
			"Cuerno del Valhalla (bronce). ",
			"Instrumento de los bardos (arpa de Anstruth). ",
			"Piedra Ioun (absorción). ",
			"Piedra Ioun (agilidad). ",
			"Piedra Ioun (fortaleza). ",
			"Piedra Ioun (perspicacia). ",
			"Piedra Ioun (intelecto). ",
			"Piedra Ioun (liderazgo). ",
			"Piedra Ioun (fuerza). ",
			"Armadura, cuero +2. ",
			"Manual de la salud corporal. ",
			"Manual del ejercicio beneficioso. ",
			"Manual de gólems. ",
			"Manual de rapidez de acción. ",
			"Espejo atrapavidas. ",
			"--Espada-- ladrona de nueve vidas. ",
			"Arco juramentado. ",
			"Armadura, cota de escamas +2. ",
			"Escudo de guarda contra conjuros. ",
			"Armadura, de bandas +1. ",
			"Armadura de resistencia (de bandas). ",
			"Armadura, cuero tachonado +1. ",
			"Armadura de resistencia (cuero tachonado). ",
			"Tomo de pensamiento claro. ",
			"Tomo de liderazgo e influencia. ",
			"Tomo de entendimiento. "], 
	indicesI: [6,11,16,21,24,27,30,33,36,39,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,9999999],
	tablaI: ["--Espada-- Defensora. ",
			"Martillo de rayos. ",
			"--Espada-- filo de la fortuna. ",
			"Espada de la respuesta. ",
			"--Espada-- vengadora sagrada. ",
			"Anillo de invocar djinns. ",
			"Anillo de invisibilidad. ",
			"Anillo de retorno de conjuros. ",
			"Cetro de poder señorial. ",
			"Bastón de los magos. ",
			"--Espada corte-- vorpal. ",
			"Cinturón de fuerza de gigante de las nubes. ",
			"Armadura, coraza +2. ",
			"Armadura, cota de malla +3. ",
			"Armadura, camisa de malla +3. ",
			"Capa de invisibilidad. ",
			"Bola de cristal (versión legendaria). ",
			"Armadura, media armadura +1. ",
			"Frasco de hierro. ",
			"Armadura, cuero+3. ",
			"Armadura, de placas +1. ",
			"Túnica del archimago. ",
			"Vara de la resurrección. ",
			"Armadura, cota de escamas +1. ",
			"Escarabajo protector. ",
			"Armadura de bandas +2. ",
			"Armadura de cuero +2. ",
			"Pozo de los muchos mundos. ",
			"Armadura mágica (1d12 = 1-2: Media armadura +2; 3-4: De placas +2; 5-6: Cuero tachonado +3; 7-8: Coraza +3; 9-10: De bandas +3; 11: Media armadura +3; 12: De placas +3). ",
			"Aparato de Kwalish. ",
			"Armadura de invulnerabilidad. ",
			"Cinturón de fuerza de gigante de las tormentas. ",
			"Portal cúbico. ",
			"Baraja de múltiples cosas. ",
			"Malla de ifrit. ",
			"Armadura de resistencia (media armadura). ",
			"Cuerno del Valhalla (hierro). ",
			"Instrumento de los bardos (arpa de Ollamh). ",
			"Piedra Ioun (absorción mayor). ",
			"Piedra Ioun (maestría). ",
			"Piedra Ioun (regeneración). ",
			"Armadura de placas de etereidad. ",
			"Armadura de placas de resistencia. ",
			"Anillo de comandar elementales de aire. ",
			"Anillo de comandar elementales de tierra. ",
			"Anillo de comandar elementales de fuego. ",
			"Anillo de los tres deseos. ",
			"Anillo de comandar elementales de agua. ",
			"Esfera de aniquilación. ",
			"Talismán del bien puro. ",
			"Talismán de la esfera. ",
			"Talismán del mal definitivo. ",
			"Tomo de la lengua detenida. "], 
	getOM(num,tipo) {
		let tabla = null;
		let indices = null;
		let salida = "";
		if (tipo=="A") {
			tabla = this.tablaA;
			indices = this.indicesA;
		} else if (tipo=="B") {
			tabla = this.tablaB;
			indices = this.indicesB;
		} else if (tipo=="C") {
			tabla = this.tablaC;
			indices = this.indicesC;
		} else if (tipo=="D") {
			tabla = this.tablaD;
			indices = this.indicesD;
		} else if (tipo=="E") {
			tabla = this.tablaE;
			indices = this.indicesE;
		} else if (tipo=="F") {
			tabla = this.tablaF;
			indices = this.indicesF;
		} else if (tipo=="G") {
			tabla = this.tablaG;
			indices = this.indicesG;
		} else if (tipo=="H") {
			tabla = this.tablaH;
			indices = this.indicesH;
		} else if (tipo=="I") {
			tabla = this.tablaI;
			indices = this.indicesI;
		} else {
			log("ERROR objetosmagicos.getOM(num,tipo): tipo incorrecto. tipo=="+tipo);
			return "";
		}

		let i = 0;
		let resultados = [];
		
		let opcs = tabla.length;
		for (i=0; i<opcs; i++) {
			resultados[i] = 0;
		}

		
		for (i = 0; i < num; ++i) {
			let tirada = dados.tirardados(1,100);
			let indice = indices.findIndex(function(value) {
				return value > tirada;});
			resultados[indice] += 1;
		}
		
		
		for (i = 0; i < opcs; ++i) {
			if (resultados[i]>0) {
				if (tabla[i].includes("--Arma--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let arma = tabla[i];
						arma = arma.replace("--Arma--", armasaleatorias.getArmaAleatoria());
						salida += "1x " + arma;
					}
				} else if (tabla[i].includes("--Espada--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let espada = tabla[i];
						espada = espada.replace("--Espada--", armasaleatorias.getEspada());
						salida += "1x " + espada;
					}
				} else if (tabla[i].includes("--Espada corte--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let espada = tabla[i];
						espada = espada.replace("--Espada corte--", armasaleatorias.getEspadaCortante());
						salida += "1x " + espada;
					}
				} else if (tabla[i].includes("--Hacha--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let hacha = tabla[i];
						hacha = hacha.replace("--Hacha--", armasaleatorias.getHacha());
						salida += "1x " + hacha;
					}
				} else if (tabla[i].includes("--Espada o hacha--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let arma = tabla[i];
						arma = arma.replace("--Espada o hacha--", armasaleatorias.getEspadaHacha());
						salida += "1x " + arma;
					}
				} else if (tabla[i].includes("--Munición--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let arma = tabla[i];
						arma = arma.replace("--Munición--", armasaleatorias.getMunicion());
						salida += "1x " + arma;
					}
				} else if (tabla[i].includes("--conjuro (truco)--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let conjuro = tabla[i];
						conjuro = conjuro.replace("--conjuro (truco)--", conjuros.getConjuro(0));
						salida += "1x " + conjuro;
					}
				} else if (tabla[i].includes("--conjuro (nivel 1)--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let conjuro = tabla[i];
						conjuro = conjuro.replace("--conjuro (nivel 1)--", conjuros.getConjuro(1));
						salida += "1x " + conjuro;
					}
				} else if (tabla[i].includes("--conjuro (nivel 2)--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let conjuro = tabla[i];
						conjuro = conjuro.replace("--conjuro (nivel 2)--", conjuros.getConjuro(2));
						salida += "1x " + conjuro;
					}
				} else if (tabla[i].includes("--conjuro (nivel 3)--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let conjuro = tabla[i];
						conjuro = conjuro.replace("--conjuro (nivel 3)--", conjuros.getConjuro(3));
						salida += "1x " + conjuro;
					}
				} else if (tabla[i].includes("--conjuro (nivel 4)--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let conjuro = tabla[i];
						conjuro = conjuro.replace("--conjuro (nivel 4)--", conjuros.getConjuro(4));
						salida += "1x " + conjuro;
					}
				} else if (tabla[i].includes("--conjuro (nivel 5)--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let conjuro = tabla[i];
						conjuro = conjuro.replace("--conjuro (nivel 5)--", conjuros.getConjuro(5));
						salida += "1x " + conjuro;
					}
				} else if (tabla[i].includes("--conjuro (nivel 6)--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let conjuro = tabla[i];
						conjuro = conjuro.replace("--conjuro (nivel 6)--", conjuros.getConjuro(6));
						salida += "1x " + conjuro;
					}
				} else if (tabla[i].includes("--conjuro (nivel 7)--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let conjuro = tabla[i];
						conjuro = conjuro.replace("--conjuro (nivel 7)--", conjuros.getConjuro(7));
						salida += "1x " + conjuro;
					}
				} else if (tabla[i].includes("--conjuro (nivel 8)--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let conjuro = tabla[i];
						conjuro = conjuro.replace("--conjuro (nivel 8)--", conjuros.getConjuro(8));
						salida += "1x " + conjuro;
					}
				} else if (tabla[i].includes("--conjuro (nivel 9)--")) {
					let j = 0;
					for (j = 0; j < resultados[i]; ++j) {
						let conjuro = tabla[i];
						conjuro = conjuro.replace("--conjuro (nivel 9)--", conjuros.getConjuro(9));
						salida += "1x " + conjuro;
					}
				} else {
					salida += "" + resultados[i] + "x " + tabla[i];
				}
			}
		}
		
		return salida;
		
	}
};

let obrasdearte = {
	dado25po: 10,
	dado250po: 10,
	dado750po: 10,
	dado2500po: 10,
	dado7500po: 8,
	tabla25po: ["Aguamanil de plata [25po]. ",
				"Estatuilla tallada en hueso [25po]. ",
				"Brazalete pequeño de oro [25po]. ",
				"Vestiduras de tela de oro [25po]. ",
				"Máscara de terciopelo negro bordada en plata [25po]. ",
				"Cáliz de cobre con filigrana de plata [25po]. ",
				"Pareja de dados de hueso grabados [25po]. ",
				"Conjunto de espejos con marco de madera pintada [25po]. ",
				"Pañuelo de seda bordado [25po]. ",
				"Relicario con retrato pintado a mano dentro [25po]. "],
	tabla250po: ["Anillo de oro con jaspe sanguíneo [250po]. ",
				"Estatuilla tallada en marfil [250po]. ",
				"Brazalete de oro grande [250po]. ",
				"Collar de plata con colgante de piedra preciosa [250po]. ",
				"Corona de bronce [250po]. ",
				"Bata de seda bordada en oro [250po]. ",
				"Tapiz grande y de calidad [250po]. ",
				"Jarra de latón con incrustación de jade [250po]. ",
				"Caja de figuritas de animales de turquesa [250po]. ",
				"Jaula de pájaro de oro, con filigrana de electro [250po]. "],
	tabla750po: ["Cáliz de plata con piedras de luna incrustadas [750po]. ",
				"Espada de acero revestida en plata con un azabache incrustado en la empuñadura [750po]. ",
				"Arpa tallada en madera exótica con incrustaciones de marfil y zirconitas [750po]. ",
				"Ídolo de oro pequeño [750po]. ",
				"Peine dorado con forma de dragón, cuyos ojos son granates rojos [750po]. ",
				"Tapón de vino repujado con pan de oro e incrustado con amatistas [750po]. ",
				"Daga ceremonial de electro con perla negra en el pomo [750po]. ",
				"Broche de oro y plata [750po]. ",
				"Estatuilla de obsidiana con incrustaciones y relieves en oro [750po]. ",
				"Máscara de guerra de oro, pintada [750po]. "],
	tabla2500po: ["Cadena de oro fino con colgante de ópalo de fuego [2500po]. ",
				"Antigua obra maestra de la pintura [2500po]. ",
				"Manto de terciopelo, con encaje de seda y numerosas piedras de luna engastadas [2500po]. ",
				"Brazalete de platino con zafiro engastado [2500po]. ",
				"Guante bordado con trozos de gema incrustados [2500po]. ",
				"Ajorca de tobillo enjollada [2500po]. ",
				"Caja de música de oro [2500po]. ",
				"Diadema de oro con cuatro aguamarinas engastadas [2500po]. ",
				"Parche de ojo con un ojo falso representado mediante zafiro azul y piedras de luna [2500po]. ",
				"Collar de perlas rosas pequeñas [2500po]. "],
	tabla7500po: ["Corona de oro con piedras preciosas incrustadas [7500po]. ",
				"Anillo de platino con gemas [7500po]. ",
				"Estatuilla de oro con rubíes engarzados [7500po]. ",
				"Copa de oro con esmeraldas [7500po]. ",
				"Joyero de oro con filigrana de platino [7500po]. ",
				"Sarcófago de niño pintado en oro [7500po]. ",
				"Tablero de juego de mesa de jade, con piezas de oro macizo [7500po]. ",
				"Cuerno para beber de marfil, con filigrana de oro y cuajado de piedras preciosas [7500po]. "],
	getOA(num,valor) {
		
		
		
		let tabla = null;
		let dado;
		let salida = "";
		
		if (valor == 25) {
			dado = this.dado25po;
			tabla = this.tabla25po;
		} else if (valor == 250) {
			dado = this.dado250po;
			tabla = this.tabla250po;
		} else if (valor == 750) {
			dado = this.dado750po;
			tabla = this.tabla750po;
		} else if (valor == 2500) {
			dado = this.dado2500po;
			tabla = this.tabla2500po;
		} else if (valor == 7500) {
			dado = this.dado7500po;
			tabla = this.tabla7500po;
		} else {
			log("ERROR obrasdearte.getOA(valor): valor incorrecto " + valor);
			return "";		
		}
		
		let i = 0;
		let resultados = [];
		for (i=0; i<dado; i++) {
			resultados[i] = 0;
		}

		
		for (i = 0; i < num; ++i) {
			let tirada = dados.tirardados(1,dado) - 1;
			resultados[tirada] += 1;
		}
		
		
		for (i = 0; i < dado; ++i) {
			if (resultados[i]>0) {
				salida += "" + resultados[i] + "x " + tabla[i];
			}
		}

		
		return salida;
		
	}
		
};

let piedraspreciosas = {
	dado10po: 12,
	dado50po: 12,
	dado100po: 10,
	dado500po: 6,
	dado1000po: 8,
	dado5000po: 4,
	tabla10po: ["Azurita (opaca, azul oscuro moteado) [10po]. ",
				"Ágata con franjas (translúcida, con rayas marrones, azules, blancas o rojas) [10po]. ",
				"Cuarzo azul (transparente, azul pálido) [10po]. ",
				"Ojo de ágata (translúcida, círculos grises, blancos, marrones, azules o verdes) [10po]. ",
				"Hematita (opaca, gris-negra) [10po]. ",
				"Lapislázuli (opaco, azul claro y oscuro con motas amarillas) [10po]. ",
				"Malaquita (opaca, estrías de verde claro y oscuro) [10po]. ",
				"Ágata musgosa (translúcida, rosa o blanco amarillento con trazos musgosos verdes o grises) [10po]. ",
				"Obsidiana (opaca, negro) [10po]. ",
				"Rodocrosita (opaca, rosa pálido) [10po]. ",
				"Ojo de tigre (translúcida, marrón con núcleo dorado) [10po]. ",
				"Turquesa (opaca, azul-verde claro) [10po]. "],
	tabla50po: ["Jaspe sanguíneo (opaco, gris oscuro con motas rojas) [50po]. ",
				"Cornalina (opaca, de naranja a marrón rojizo) [50po]. ",
				"Calcedonia (opaca, blanco) [50po]. ",
				"Crisoprasa (translúcida, verde) [50po]. ",
				"Citrino (transparente, amarillo-marrón pálido) [50po]. ",
				"Jaspe (opaco, azul, negro o marrón) [50po]. ",
				"Piedra de luna (translúcida, blanco con brillos azulados) [50po]. ",
				"Ónice (opaco, blanco, negro, o con franjas de ambos colores) [50po]. ",
				"Cuarzo (transparente, blanco, gris turbio o amarillo) [50po]. ",
				"Sardónice (opaco, franjas rojas y blancas) [50po]. ",
				"Cuarzo rosa estrellado (translúcido, piedra rosácea con núcleo en forma de estrella blanca) [50po]. ",
				"Zirconita (transparente, azul verdoso pálido) [50po]. "],
	tabla100po: ["Ámbar (transparente, dorado acuoso a dorado profundo) [100po]. ",
				"Amatista (transparente, púrpura profundo) [100po]. ",
				"Crisoberilo (transparente, de amarillo verdoso a verde pálido) [100po]. ",
				"Coral (opaco, carmesí) [100po]. ",
				"Granate (transparente, rojo, marrón verdoso o violeta) [100po]. ",
				"Jade (translúcido, verde claro, verde oscuro o blanco) [100po]. ",
				"Azabache (opaco, negro profundo) [100po]. ",
				"Perla (opaco, blanco lustroso, amarillo o rosa) [100po]. ",
				"Espinela (transparente, rojo, marrón rojizo o verde oscuro) [100po]. ",
				"Turmalina (transparente, verde pálido, azul, marrón o rojo) [100po]. "],
	tabla500po: ["Alejandrita (transparente, verde oscuro) [500po]. ",
				"Aguamarina (transparente, azul verdoso pálido) [500po]. ",
				"Perla negra (opaco, negro puro) [500po]. ",
				"Espinela azul (transparente, azul oscuro) [500po]. ",
				"Peridoto (transparente, verde aceituna profundo) [500po]. ",
				"Topacio (transparente, amarillo dorado) [500po]. "],
	tabla1000po: ["Ópalo negro (translúcido, verde oscuro con moteado negro y vetas doradas) [1000po]. ",
				"Zafiro azul (transparente, azul-blanco a azul medio) [1000po]. ",
				"Esmeralda (transparente, verde profundo y brillante) [1000po]. ",
				"Ópalo de fuego (translúcido, rojo fuego) [1000po]. ",
				"Ópalo (translúcido, azul pálido con moteado verde y dorado) [1000po]. ",
				"Rubí estrella (translúcido, rubí con núcleo en forma de estrella blanca) [1000po]. ",
				"Zafiro estrella (translúcido, zafiro azul con núcleo en forma de estrella blanca) [1000po]. ",
				"Zafiro amarillo (transparente, amarillo fuego o amarillo verdoso) [1000po]. "],
	tabla5000po: ["Zafiro negro (translúcido, negro lustroso con detalles luminosos) [5000po]. ",
				"Diamante (transparente, azul-blanco, amarillo canario, rosa, marrón o azul) [5000po]. ",
				"Jacinto (transparente, naranja fuego) [5000po]. ",
				"Rubí (transparente, rojo claro a rojo profundo) [5000po]. "],
	getPP(num, valor) {
		
		
		
		let indice = 0;
		let tabla = null;
		let dado;
		let salida = "";
		
		if (valor == 10) {
			dado = this.dado10po;
			tabla = this.tabla10po;
		} else if (valor == 50) {
			dado = this.dado50po;
			tabla = this.tabla50po;
		} else if (valor == 100) {
			dado = this.dado100po;
			tabla = this.tabla100po;
		} else if (valor == 500) {
			dado = this.dado500po;
			tabla = this.tabla500po;
		} else if (valor == 1000) {
			dado = this.dado1000po;
			tabla = this.tabla1000po;
		} else if (valor == 5000) {
			dado = this.dado5000po;
			tabla = this.tabla5000po;
		} else {
			log("ERROR piedraspreciosas.getPP(valor): valor incorrecto " + valor);
			return "";		
		}
		
		let i = 0;
		let resultados = [];
		for (i=0; i<dado; i++) {
			resultados[i] = 0;
		}

		
		for (i = 0; i < num; ++i) {
			let tirada = dados.tirardados(1,dado) - 1;
			resultados[tirada] += 1;
		}
		
		
		for (i = 0; i < dado; ++i) {
			if (resultados[i]>0) {
				salida += "" + resultados[i] + "x " + tabla[i];
			}
		}

		
		return salida;
		
	}
};




function tesoro5e(msg) {
	// node w10_tesoro5e "individual 1"
		
		let params = msg.split(" ");
		let acumulado = false;
		if (params.length < 2) {
			console.log("ERROR !tesoro5e main: faltan parámetros");
			return;
		}
		
		if (params[0] == "acumulado") {
			acumulado = true;
		} else if (params[0] != "individual") {
			console.log("ERROR !tesoro5e main: parámetro acumulado/individual incorrecto");
			return;
		}
		
		let desafio = parseInt(params[1]);
		
		if (isNaN(desafio)) {
			console.log("ERROR !tesoro5e main: parámetro desafío incorrecto");
			return;
		}
		
		let monedas = "";
		let pcobre = 0;
		let pplata = 0;
		let pelectro = 0;
		let poro = 0;
		let pplatino = 0;
		let gemas = "";
		let oarte = "";
		let omagicos = "";
	
		if (!acumulado) {
			// TESORO INDIVIDUAL
			if (desafio < 5) {
				
				let d100 = Math.floor(Math.random() * 100) + 1;
				
				if (d100 <= 30) {
					pcobre += dados.tirardados(5,6);
				} else if (d100 <= 60) {
					pplata += dados.tirardados(4,6);
				} else if (d100 <= 70) {
					pelectro += dados.tirardados(3,6);
				} else if (d100 <= 95) {
					poro += dados.tirardados(3,6);
				} else {
					pplatino += dados.tirardados(1,6);
				}
				
			} else if (desafio < 11) {

				let d100 = Math.floor(Math.random() * 100) + 1;
				
				if (d100 <= 30) {
					pcobre += dados.tirardados(4,6)*100;
					pelectro += dados.tirardados(1,6)*35;
				} else if (d100 <= 60) {
					pplata += dados.tirardados(6,6)*10;
					poro += dados.tirardados(2,6)*10;
				} else if (d100 <= 70) {
					pelectro += dados.tirardados(3,6)*10;
					poro += dados.tirardados(2,6)*10;
				} else if (d100 <= 95) {
					poro += dados.tirardados(4,6)*10;
				} else {
					poro += dados.tirardados(2,6)*10;
					pplatino += dados.tirardados(3,6);
				}
				
			} else if (desafio < 17) {
				let d100 = Math.floor(Math.random() * 100) + 1;
				
				if (d100 <= 20) {
					pplata += dados.tirardados(4,6)*100;
					poro += dados.tirardados(1,6)*100;
				} else if (d100 <= 35) {
					pelectro += dados.tirardados(1,6)*100;
					poro += dados.tirardados(1,6)*100;
				} else if (d100 <= 75) {
					poro += dados.tirardados(2,6)*100;
					pplatino += dados.tirardados(1,6)*10;
				} else {
					poro += dados.tirardados(2,6)*100;
					pplatino += dados.tirardados(2,6)*10;
				}
				
			} else  {
				let d100 = Math.floor(Math.random() * 100) + 1;
				
				if (d100 <= 15) {
					pelectro += dados.tirardados(2,6)*1000;
					poro += dados.tirardados(8,6)*100;
				} else if (d100 <= 55) {
					poro += dados.tirardados(1,6)*1000;
					pplatino += dados.tirardados(1,6)*100;
				} else {
					poro += dados.tirardados(1,6)*1000;
					pplatino += dados.tirardados(2,6)*100;
				}
			}
		
		
		} else {
			// TESORO ACUMULADO
			if (desafio < 5) {
				
				pcobre += dados.tirardados(6,6)*100;
				pplata += dados.tirardados(3,6)*100;
				poro += dados.tirardados(2,6)*10;
				
				let d100 = dados.tirardados(1,100);
				
				if (d100 < 7) {
					// Nada
				} else if (d100 < 17) {
					gemas += piedraspreciosas.getPP(dados.tirardados(2,6),10);
				} else if (d100 < 27) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
				} else if (d100 < 37) {
					gemas += piedraspreciosas.getPP(dados.tirardados(2,6),50);
				} else if (d100 < 45) {
					gemas += piedraspreciosas.getPP(dados.tirardados(2,6),10);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"A");
				} else if (d100 < 53) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"A");
				} else if (d100 < 61) {
					gemas += piedraspreciosas.getPP(dados.tirardados(2,6),50);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"A");
				} else if (d100 < 66) {
					gemas += piedraspreciosas.getPP(dados.tirardados(2,6),10);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"B");
				} else if (d100 < 71) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"B");
				} else if (d100 < 76) {
					gemas += piedraspreciosas.getPP(dados.tirardados(2,6),50);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"B");
				} else if (d100 < 79) {
					gemas += piedraspreciosas.getPP(dados.tirardados(2,6),10);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"C");
				} else if (d100 < 81) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"C");
				} else if (d100 < 86) {
					gemas += piedraspreciosas.getPP(dados.tirardados(2,6),50);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"C");
				} else if (d100 < 93) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"F");
				} else if (d100 < 98) {
					gemas += piedraspreciosas.getPP(dados.tirardados(2,6),50);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"F");
				} else if (d100 < 100) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"G");
				} else {
					gemas += piedraspreciosas.getPP(dados.tirardados(2,6),50);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"G");
				}
				
				
			} else if (desafio < 11) {
			
				pcobre += dados.tirardados(2,6)*100;
				pplata += dados.tirardados(2,6)*1000;
				poro += dados.tirardados(6,6)*100;
				pplatino += dados.tirardados(3,6)*10;
				
				let d100 = dados.tirardados(1,100);
				
				if (d100 < 5) {
					// Nada
				} else if (d100 < 11) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
				} else if (d100 < 17) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),50);
				} else if (d100 < 23) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),100);				
				} else if (d100 < 29) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
				} else if (d100 < 33) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"A");
				} else if (d100 < 37) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),50);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"A");
				} else if (d100 < 41) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),100);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"A");
				} else if (d100 < 45) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"A");
				} else if (d100 < 50) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"B");
				} else if (d100 < 55) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),50);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"B");
				} else if (d100 < 60) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),100);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"B");
				} else if (d100 < 64) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"B");
				} else if (d100 < 67) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"C");
				} else if (d100 < 70) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),50);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"C");
				} else if (d100 < 73) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),100);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"C");
				} else if (d100 < 75) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"C");
				} else if (d100 < 77) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
					omagicos += objetosmagicos.getOM(1,"D");
				} else if (d100 < 79) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),50);
					omagicos += objetosmagicos.getOM(1,"D");
				} else if (d100 < 80) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),100);				
					omagicos += objetosmagicos.getOM(1,"D");
				} else if (d100 < 81) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(1,"D");
				} else if (d100 < 85) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),25);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"F");
				} else if (d100 < 89) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),50);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"F");
				} else if (d100 < 92) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),100);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"F");
				} else if (d100 < 95) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"F");
				} else if (d100 < 97) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),100);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"G");
				} else if (d100 < 99) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"G");
				} else if (d100 < 100) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),100);				
					omagicos += objetosmagicos.getOM(1,"H");
				} else  {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(1,"H");
				}
			} else if (desafio < 17) {
			
				poro += dados.tirardados(4,6)*1000;
				pplatino += dados.tirardados(5,6)*100;
				
				let d100 = dados.tirardados(1,100);
				
				if (d100 < 4) {
					// Nada
				} else if (d100 < 7) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
				} else if (d100 < 10) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),750);
				} else if (d100 < 13) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),500);				
				} else if (d100 < 16) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
				} else if (d100 < 20) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"A");
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"B");
				} else if (d100 < 24) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),750);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"A");
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"B");
				} else if (d100 < 27) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),500);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"A");
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"B");
				} else if (d100 < 30) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"A");
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"B");
				} else if (d100 < 36) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"C");
				} else if (d100 < 41) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),750);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"C");
				} else if (d100 < 46) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),500);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"C");
				} else if (d100 < 51) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"C");
				} else if (d100 < 55) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"D");
				} else if (d100 < 59) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),750);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"D");
				} else if (d100 < 63) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),500);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"D");
				} else if (d100 < 67) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"D");
				} else if (d100 < 69) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(1,"E");
				} else if (d100 < 71) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),750);
					omagicos += objetosmagicos.getOM(1,"E");
				} else if (d100 < 73) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),500);				
					omagicos += objetosmagicos.getOM(1,"E");
				} else if (d100 < 75) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(1,"E");
				} else if (d100 < 77) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(1,"F");
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"G");
				} else if (d100 < 79) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),750);
					omagicos += objetosmagicos.getOM(1,"F");
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"G");
				} else if (d100 < 81) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),500);				
					omagicos += objetosmagicos.getOM(1,"F");
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"G");
				} else if (d100 < 83) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(1,"F");
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"G");
				} else if (d100 < 86) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"H");
				} else if (d100 < 89) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),750);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"H");
				} else if (d100 < 91) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),500);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"H");
				} else if (d100 < 93) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"H");
				} else if (d100 < 95) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),250);
					omagicos += objetosmagicos.getOM(1,"I");
				} else if (d100 < 99) {
					oarte += obrasdearte.getOA(dados.tirardados(2,4),750);
					omagicos += objetosmagicos.getOM(1,"I");
				} else if (d100 < 99) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),500);				
					omagicos += objetosmagicos.getOM(1,"I");
				} else  {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(1,"I");
				}
			} else {
			
				poro += dados.tirardados(12,6)*1000;
				pplatino += dados.tirardados(8,6)*1000;
				
				let d100 = dados.tirardados(1,100);
				
				if (d100 < 3) {
					// Nada
				} else if (d100 < 6) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"C");
				} else if (d100 < 9) {
					oarte += obrasdearte.getOA(dados.tirardados(1,10),2500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,8),"C");
				} else if (d100 < 12) {
					oarte += obrasdearte.getOA(dados.tirardados(1,4),7500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,8),"C");
				} else if (d100 < 15) {
					gemas += piedraspreciosas.getPP(dados.tirardados(1,8),5000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,8),"C");
				} else if (d100 < 23) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"D");
				} else if (d100 < 31) {
					oarte += obrasdearte.getOA(dados.tirardados(1,10),2500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"D");
				} else if (d100 < 39) {
					oarte += obrasdearte.getOA(dados.tirardados(1,4),7500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"D");
				} else if (d100 < 47) {
					gemas += piedraspreciosas.getPP(dados.tirardados(1,8),5000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"D");
				} else if (d100 < 53) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"E");
				} else if (d100 < 59) {
					oarte += obrasdearte.getOA(dados.tirardados(1,10),2500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"E");
				} else if (d100 < 64) {
					oarte += obrasdearte.getOA(dados.tirardados(1,4),7500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"E");
				} else if (d100 < 69) {
					gemas += piedraspreciosas.getPP(dados.tirardados(1,8),5000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,6),"E");
				} else if (d100 < 70) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"G");
				} else if (d100 < 71) {
					oarte += obrasdearte.getOA(dados.tirardados(1,10),2500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"G");
				} else if (d100 < 72) {
					oarte += obrasdearte.getOA(dados.tirardados(1,4),7500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"G");
				} else if (d100 < 73) {
					gemas += piedraspreciosas.getPP(dados.tirardados(1,8),5000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"G");
				} else if (d100 < 75) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"H");
				} else if (d100 < 77) {
					oarte += obrasdearte.getOA(dados.tirardados(1,10),2500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"H");
				} else if (d100 < 79) {
					oarte += obrasdearte.getOA(dados.tirardados(1,4),7500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"H");
				} else if (d100 < 81) {
					gemas += piedraspreciosas.getPP(dados.tirardados(1,8),5000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"H");
				} else if (d100 < 86) {
					gemas += piedraspreciosas.getPP(dados.tirardados(3,6),1000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"I");
				} else if (d100 < 91) {
					oarte += obrasdearte.getOA(dados.tirardados(1,10),2500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"I");
				} else if (d100 < 96) {
					oarte += obrasdearte.getOA(dados.tirardados(1,4),7500);
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"I");
				} else  {
					gemas += piedraspreciosas.getPP(dados.tirardados(1,8),5000);				
					omagicos += objetosmagicos.getOM(dados.tirardados(1,4),"I");
				}
			}
			
		}
	
		if (pcobre) monedas += pcobre + " piezas de cobre. ";
		if (pplata) monedas += pplata + " piezas de plata. ";
		if (pelectro) monedas += pelectro + " piezas de electro. ";
		if (poro) monedas += poro + " piezas de oro. ";
		if (pplatino) monedas += pplatino + " piezas de platino. ";
		
		let chorrazo = "Tesoro " + params[0] + " desafío " + params[1] + "\n";
		if (monedas != "") chorrazo += "Monedas=" + monedas + "\n";
		if (gemas != "") chorrazo += "Gemas=" + gemas + "\n";
		if (oarte != "") chorrazo += "Obras de Arte=" + oarte + "\n";
		if (omagicos != "") chorrazo += "Objetos mágicos=" + omagicos + "\n";
		
		
		
		return chorrazo;

}


console.log(tesoro5e(process.argv[2]));