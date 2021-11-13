//Create a new Strength attribute on any Characters that are added to the game.
on("chat:message", function(msg) {
  if(msg.type == "api" && msg.content.indexOf("!merpnpc ") !== -1) {
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
	    msg.content = msg.content.replace("!merpnpc ", "");
        // !merpnpc nombre.nivel.napa.velocidad.pv.ca.bd.ataque.tam.crit.especial
        let chorro = msg.content;
        log ("chorro inicial: " + chorro);
        
        // NOMBRE
        let pos = msg.content.indexOf(".");
        if (pos < 0) {
            log("ERROR: !merpnpc main. No se encuentra '.' para obtener el nombre");
            return;
        }
        log ("nombre raw: " + chorro.substring(0,pos));
        let nombre = chorro.substring(0,pos);
        log("nombre: " + nombre);
        
        log ("chorro antes: " + chorro);
        chorro = chorro.substring(pos+1);
        log ("chorro después: " + chorro);
        
        
        // NIVEL
        pos = chorro.indexOf(".");
        if (pos < 0) {
            log("ERROR: !merpnpc main. No se encuentra '.' para obtener el nivel");
            return;
        }
        log ("nivel raw: " + chorro.substring(0,pos))
        let nivel = parseInt(chorro.substring(0,pos));
        if (isNaN(nivel)) {
            log("ERROR: !merpnpc main. Nivel no numérico");
            return;
        }
        log("nivel: " + nivel);
        log ("chorro antes: " + chorro);
        chorro = chorro.substring(pos+1);
        log ("chorro después: " + chorro);
        
        
        // NUM APA
        pos = chorro.indexOf(".");
        if (pos < 0) {
            log("ERROR: !merpnpc main. No se encuentra '.' para obtener el núm apa");
            return;
        }
        let napa = chorro.substring(0,pos);
        log("napa: " + napa);
        chorro = chorro.substring(pos+1);
        

        // VELOCIDAD
        pos = chorro.indexOf(".");
        if (pos < 0) {
            log("ERROR: !merpnpc main. No se encuentra '.' para obtener la velocidad");
            return;
        }
        let velocidad = chorro.substring(0,pos);
        log("velocidad: " + velocidad);
        chorro = chorro.substring(pos+1);
        
        // PV
        pos = chorro.indexOf(".");
        if (pos < 0) {
            log("ERROR: !merpnpc main. No se encuentra '.' para obtener los pv");
            return;
        }
        let npc_pv = parseInt(chorro.substring(0,pos));
        if (isNaN(npc_pv)) {
            log("ERROR: !merpnpc main. Campo pv con valor no numérico: " + chorro.substring(0,pos));
            return;
        }
        log("pv: " + npc_pv);
        chorro = chorro.substring(pos+1);
        
        // CA
        pos = chorro.indexOf(".");
        if (pos < 0) {
            log("ERROR: !merpnpc main. No se encuentra '.' para obtener la CA");
            return;
        }
        let carmadura = chorro.substring(0,pos);
        chorro = chorro.substring(pos+1);
        
        // BD
        pos = chorro.indexOf(".");
        if (pos < 0) {
            log("ERROR: !merpnpc main. No se encuentra '.' para obtener la BD");
            return;
        }
        let npc_bd = parseInt(chorro.substring(0,pos));
        if (isNaN(npc_bd)) {
            log("ERROR: !merpnpc main. Campo BD con valor no numérico");
            return;
        }
        chorro = chorro.substring(pos+1);
        
        // ATAQUE
        pos = chorro.indexOf(".");
        if (pos < 0) {
            log("ERROR: !merpnpc main. No se encuentra '.' para obtener el ataque");
            return;
        }
        let ataque = chorro.substring(0,pos);
        chorro = chorro.substring(pos+1);
        
        
        // TAMAÑO
        pos = chorro.indexOf(".");
        if (pos < 0) {
            log("ERROR: !merpnpc main. No se encuentra '.' para obtener el tamaño");
            return;
        }
        let tamano = chorro.substring(0,pos);
        chorro = chorro.substring(pos+1);
        
        // CRIT
        pos = chorro.indexOf(".");
        if (pos < 0) {
            log("ERROR: !merpnpc main. No se encuentra '.' para obtener el crit");
            return;
        }
        let crit = chorro.substring(0,pos);
        
        // ESPECIAL
        let especial = chorro.substring(pos+1);
        
       
       
        
        let npc_mm = 0;
        let npc_im = 0;
        
        if (velocidad == "AR") {
            npc_mm = 0;
            npc_im = 20;
        } else if (velocidad == "ML") {
            npc_mm = 0;
            npc_im = 40;
        } else if (velocidad == "L") {
            npc_mm = 10;
            npc_im = 50;
        } else if (velocidad == "N") {
            npc_mm = 15;
            npc_im = 65;
        } else if (velocidad == "MdR") {
            npc_mm = 20;
            npc_im = 80;
        } else if (velocidad == "R") {
            npc_mm = 30;
            npc_im = 110;
        } else if (velocidad == "MR") {
            npc_mm = 40;
            npc_im = 140;
        } else if (velocidad == "RS") {
            npc_mm = 50;
            npc_im = 170;
        } else {
            log("ERROR !merpnpc - Valor de velocidad incorrecto");
        }
        
        
        let npc = createObj("character", {name: nombre});
        createObj("attribute", {
            name: "npc_nivel",
            current: nivel,
            characterid: npc.id
        });
        
        createObj("attribute", {
            name: "npc_mm",
            current: npc_mm,
            characterid: npc.id
        });
        
        createObj("attribute", {
            name: "npc_im",
            current: npc_im,
            characterid: npc.id
        });
        
        createObj("attribute", {
            name: "npc_pv",
            current: npc_pv,
            max: npc_pv,
            characterid: npc.id
        });
        
        createObj("attribute", {
            name: "npc_ca",
            current: carmadura,
            characterid: npc.id
        });
        
        createObj("attribute", {
            name: "npc_bd",
            current: npc_bd,
            characterid: npc.id
        });
        
        
        let ataques = ataque.split("/");
        
        let npc_bo = []; //ataque.match(/\d+/g)[0];
        
        let npc_tipo_ataque = []; // ataques[i].match(/[a-zA-Z]+/g)[0].toLowerCase();
        let armas = ["ea","ha","ec","ci","ga","ma","mg","mc","l1","j1"];
        let armas_proyectil = ["ac","al","ak"];
        let num_ataques = 0;
        
        for (i=0; i<ataques.length; ++i) {
            npc_bo.push(ataques[i].match(/\d+/g)[0]);
            
            let tipo_ataque = ataques[i].match(/[a-zA-Z]+/g)[0].toLowerCase();
            let arma = 0;
            if (tipo_ataque == "ar") {
                arma = Math.floor(Math.random() * 10);
                tipo_ataque = armas[arma];
            } else if (tipo_ataque == "proy") {
                arma = Math.floor(Math.random() * 3);
                tipo_ataque = armas_proyectil[arma];
            }
            createObj("ability", {name: npc_bo[i]+tipo_ataque, action: "!atarma ?{Armadura|Sin Armadura,SA|Cuero,CU|Cuero Endurecido,CE|Cota de Malla,CM|Coraza,CO}"+tipo_ataque+"/[[?{Tirada sin modificar|1d100!>95}]]+[[?{Modificadores|"+npc_bo[i]+"}]]", characterid: npc.id, istokenaction: true});
            
            npc_tipo_ataque.push(tipo_ataque);
            
            
            createObj("attribute", {
                name: "npc_bo"+i,
                current: npc_bo[i],
                characterid: npc.id
            });
            
            createObj("attribute", {
                name: "npc_tipo_ataque"+i,
                current: npc_tipo_ataque[i],
                characterid: npc.id
            });
            
            
            num_ataques = i+1;
            
            
            
                
        }
        
            createObj("attribute", {
                name: "num_ataques",
                current: num_ataques,
                characterid: npc.id
            });
        
        
        createObj("attribute", {
            name: "npc_tam",
            current: tamano,
            characterid: npc.id
        });
        
        createObj("attribute", {
            name: "npc_crit",
            current: crit,
            characterid: npc.id
        });
        
        createObj("attribute", {
            name: "npc_especial",
            current: especial,
            characterid: npc.id
        });
        
        createObj("attribute", {
            name: "npc_napa",
            current: napa,
            characterid: npc.id
        });
        
        let gm_notes = "<table><tr><th>Nombre</th><th>Nivel</th><th>Núm. Apa</th><th>Velocidad</th><th>PV</th><th>CA</th>"+
        "<th>BD</th><th>Ataque</th><th>Tam</th><th>Crit</th><th>Especial</th></tr><tr><td>"+nombre+"</td><td>"+nivel+"</td>"+
        "<td>"+napa+"</td><td>"+velocidad+"</td><td>"+npc_pv+"</td><td>"+carmadura+"</td><td>"+npc_bd+"</td><td>";
        
        for (i=0; i<npc_tipo_ataque.length;++i) {
            if (i>0) gm_notes += "/";
            gm_notes += npc_bo[i]+npc_tipo_ataque[i];
        }
        
        gm_notes += "</td><td>"+tamano+"</td><td>"+crit+"</td><td>"+especial+"</td></tr></table>";
    
        npc.set("gmnotes",gm_notes);
  }

});