var fs = require("fs");
const { evaluate } = require("mathjs");

let tablaAplastamiento = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Poco dominio. No hay daño extra. +0.",
    "Fractura leve en las costillas. -5pv. -5 a la actividad.",
    "Golpe en un costado. -4pv. -40 a la actividad durante 1 asalto.",
    "Golpe en el antebrazo. -5pv. Aturdido durante 1 asalto.",
    "Un golpe al hombro del lado del escudo, rompe el escudo. Si no hay escudo, el hombro se rompe y el brazo queda inutilizado.",
    "El golpe rompe un hueso de la pierna. -12pv. -40 a la actividad. Aturdido durante 2 asaltos.",
    "Golpe en la frente. -30pv. Un ojo destruido. Aturdido durante 24 asaltos. Si no se lleva yelmo puesto, estado de coma durante 1 mes.",
    "El golpe rompe el brazo que esgrime el arma. El brazo inutilizado. Daño en los tendones. -8pv. Aturdido durante 2 asaltos.",
    "Rodilla hecha trizas. -9pv. -60 a la actividad. Derribado y aturdido durante 3 asaltos.",
    "Un golpe en la base del cuello deja paralizado de los hombros hacia abajo. -25pv. El enemigo queda bastante desconcertado.",
    "Inconsciente durante 4 horas debido a un golpe en un lado de la cabeza. Si no se lleva yelmo, el cráneo queda aplastado. -20pv.",
    "Un golpe tremendo en el pecho hace que las costillas perforen los pulmones. Cae y muere en 6 asaltos. Perverso",
    "Golpe en la mandíbula, hace que el hueso penetre en el cerebro. Muerte instantánea.",
    "Un golpe rompe la cadera. -15pv. -75 a la actividad. Cae al suelo y queda aturdido durante 3 asaltos.",
    "Un golpe en el cuello aplasta la garganta. No puede respirar y queda aturdido durante 12 asaltos. Después, el pobre infeliz muere.",
    "Cadera aplastada. -35pv. Aturdido durante 2 asaltos. Activo los siguientes 4 asaltos, pero luego muere debido a un fallo del sistema nervioso.",
    "Destrozado el codo del brazo que sostenía el arma. El brazo queda inutilizado. Aturdido durante 5 asaltos.",
    "Un golpe en el costado aplasta la cavidad torácica. Cae y muere en 3 asaltos.",
    "Golpe tremendo en la zona del pecho. El corazón queda destruido y el sujeto muere instantáneamente. -25pv. Un buen trabajo.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaTajo = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Un golpe débil que no produce daño extra. +0.",
    "Herida leve en la pantorrilla. 1 punto de vida por asalto.",
    "Golpe en la parte superior de la pierna. -5pv. Si no se llevan grebas, 2 puntos de vida más por asalto.",
    "Herida leve en el pecho. -3pv. 1pv por asalto. -5 a la actividad.",
    "Herida leve en el antebrazo. -4pv. 2pv más por asalto. Aturdido durante 1 asalto.",
    "Herida menos grave en el muslo. -6pv. 1pv por asalto. -10 a la actividad. Aturdido durante 2 asaltos.",
    "Un golpe en el cuello secciona la arteria carótida. Cuello roto. Muerte tras 1 asalto de intensa agonía.",
    "Tajo en los músculos y tendones del brazo que esgrime el arma. El brazo queda inutilizado -10 pv y 1pv más cada asalto.",
    "Un ojo destruido. -10pv. Aturdido durante 30 asaltos.",
    "Destripado, muere instantáneamente. 25% de probabilidad de que tu arma se quede atascada en el contrincante durante 2 asaltos.",
    "Inconsciente durante 6 horas debido a un tajo en el lado de la cabeza. -15pv. Si no se lleva yelmo, muerte instantánea.",
    "Extremo inferior de la pierna seccionado. -20 pv por asalto. Cae y se desmaya.",
    "Tajo abierto en el costado. Cae inconsciente y muere en 3 asaltos debido a daños masivos en los órganos internos.",
    "Grave herida en el abdomen. -10pv. Pierde 8pv más cada asalto. -10 a la actividad. Aturdido durante 4 asaltos.",
    "El brazo que esgrimía el arma queda cercenado. -15 pv por asalto. Cae inconsciente inmediatamente.",
    "Empalado el corazón. Muere instantáneamente, el corazón destrozado. 25% de probabilidad de que el arma se quede atascada en el enemigo durante 3 asaltos.",
    "Mano cercenada. 12 puntos de vida por asalto. Cae al suelo y queda aturdido durante 6 asaltos.",
    "Tajo en la espina dorsal. Colapso inmediato. Paralizado desde el cuello para abajo, permanente. -20 pv adicionales.",
    "Un tajo en la cabeza destruye el cerebro, lo que hace difícil que el pobre infeliz siga con vida. Expira 'en un suspiro'",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaPerforacion = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Golpe oblicuo. No hay daño extra.",
    "Golpe oblicuo en un costado. -3pv.",
    "Impacto en el muslo, -3 pv. Si no se lleva armadura en las piernas, -3 pv más por asalto.",
    "Herida leve en el antebrazo. -2pv. Aturdido durante 1 asalto.",
    "Impacto en un lado del pecho. Pérdida de 1 punto de vida por asalto. Aturdido durante 1 asalto.",
    "Impacto en la parte inferior de la pierna. Tendones desgarrados y -3pv. -25 a la actividad. Aturdido durante 1 asalto.",
    "Impacto en el cuello. Nervios y vasos sanguíneos seccionados. Muerte por fallo del corazón.",
    "Golpe en el brazo que sostiene el arma. Hueso roto. -10pv. Aturdido durante 3 asaltos.",
    "Golpe que perfora la parte inferior de la pierna. Músculo seccionado. -50 a la actividad. Aturdido 3 asaltos.",
    "Golpe a través de ambos pulmones. Caído e inconsciente. Muere en 6 asaltos.",
    "Impacto en un lado de la cabeza. Inconsciente durante 6 horas. -10 pv. Si no lleva yelmo, muerte inmediata.",
    "Un golpe que atraviesa el cuello rompe el espinazo y secciona la espina dorsal. Paralizado permanentemente del cuello para abajo.",
    "Estocada en el ojo. Muerte instantánea. Una auténtica diana.",
    "Herida grave en el abdomen. -10 pv. Pérdida de 6 pv por asalto. -20 a la actividad. Aturdido durante 4 asaltos.",
    "Clavado en la parte inferior de la espalda. Cae derribado e inconsciente. Muerte por hemorragia y shock interno en 6 asaltos.",
    "Estocada que atraviesa el corazón. Retrocede girando sobre sí mismo unos 3 metros hasta encontrar un lugar adecuado en el que fallecer. El arma queda clavada en la víctima que gira durante 3 asaltos como mínimo.",
    "Estocada a la pierna. Arteria seccionada. Derribado e inconsciente. -12 pv por asalto.",
    "Impacto en los riñones. -9pv. Derribado, muerte tras 6 asaltos de intensa agonía.",
    "Atravesado de oreja a oreja. No podrá oír y muere inmediatamente. Vaya puntería.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaDesequilibrio = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Demasiado débil. 0 puntos de vida adicionales.",
    "Golpe en el brazo. -2 pv. -5 a la actividad durante 2 asaltos.",
    "Golpe en la pierna. -4 pv. Si no se lleva armadura en las piernas, pérdida de 7 puntos en lugar de 4 y aturdido durante 1 asalto.",
    "Golpe en el pecho. Recula 1 metro. -5 pv. -10 a la actividad durante 2 asaltos.",
    "Golpe en el brazo que sostiene el escudo. -5pv. El escudo es arrancado. Si no se usa escudo, -8 pv. y aturdido durante 2 asaltos.",
    "Golpe en el codo. El brazo queda dormido. -8 pv. Se cae el arma. -10 a la actividad durante 10 asaltos.",
    "Brutal golpe en la cadera. Blanco derribado. Tendones desgarrados y junturas aplastadas. Pierna inutilizada y -80 a la actividad.",
    "Golpe en el costado. Desplazado lateralmente metro y medio. Se le cae cualquier cosa que lleve en las manos. Aturdido durante 3 asaltos.",
    "Golpe en el costado. Tropieza torpemente para acabar en una embarazosa posición de 'decúbito supino'. Aturdido durante 6 asaltos.",
    "Golpe en la espalda. Vuela 3 metros y cae de cara. Daño grave en los nervios. Paralizado de cintura para abajo.",
    "Duro golpe en la cabeza. Retrocede 3 metros por el impacto y queda aturdido durante 6 asaltos. Si no lleva yelmo, queda inconsciente durante 24 horas.",
    "Golpe terrible. La víctima cae de rodillas. Si usa un arma a una sola mano, ésta sale despedida a 3 metros a sus espaldas. Aturdido durante 15 asaltos.",
    "Golpe en la parte superior del pecho. Desplazado 3 metros lateralmente. Cae y se rompe ambos brazos. Como resultado, queda en coma durante 2 meses.",
    "Golpe que rompe una pierna. -12 pv. -50 a la actividad. Aturdido durante 1 asalto.",
    "Golpe a la cabeza. Despedido hacia atrás 3 metros. -9 pv. Aturdido durante 6 asaltos. Si no lleva yelmo, estado de coma durante 4 semanas.",
    "Golpe salvaje a la cabeza. Cae al suelo. Muerte en 12 asaltos debido a una vena seccionada.",
    "Tremendo golpe lateral. Derribado y desplazado metro y medio lateralmente. Rota la parte inferior de una pierna. Aturdido durante 7 asaltos. -40 a la actividad.",
    "Golpe en el hombro del lado del escudo. Aturdido durante 9 asaltos. -20 a la actividad. Si no se lleva escudo, inconsciente y el brazo hecho trizas.",
    "Horrible golpe en la sien. Desplazado hacia atrás 6 metros. Muere instantáneamente. Nada bonito.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaPresa = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Una oportunidad desaprovechada.",
    "Golpe superficial. -2 pv.",
    "Ataque rechazado. -3 pv. Si se lleva armadura en los brazos, aturdido 1 asalto.",
    "Ataque a la parte superior de la pierna. Hay presa, pero la víctima consigue soltarse. Aturdido durante 1 asalto.",
    "El escudo queda atrapado, -50 a la actividad hasta que se deje caer el escudo. Si no lleva escudo, es el brazo el que queda atrapado. -50 a la actividad.",
    "Atrapado el brazo del arma. Desarmado y muñeca torcida. Aturdido 2 asaltos. -25 a la actividad.",
    "Ambas piernas trabadas. Derribado e inconsciente. -9 pv.",
    "El brazo que sostiene el arma queda inmovilizado. Rotura de ligamentos y tirón muscular. Desarmado y aturdido durante 3 asaltos. -40 a la actividad.",
    "Completamente atrapado e inmovilizado. Derribado pero todavía consciente. No hay actividad posible.",
    "Peligrosa presa en el cuello. Inconsciente. Cuello torcido, -60 a la actividad.",
    "Presa en la cabeza. Aturdido durante 9 asaltos. Si no lleva yelmo se produce un estado de coma debido a una fractura en el cráneo.",
    "Ambos brazos atrapados y pegados al pecho. No podrá mover los brazos hasta que se retire la presa. -75 a la actividad.",
    "Presa en el cuello. Si hay armadura en el cuello, -60 a la actividad debido a una torcedura en el cuello y aturdido durante 3 asaltos. Si no hay armadura, muerto con el cuello roto.",
    "Presa en el pecho. Costillas rotas. Aturdido durante 5 asaltos. -10 a la actividad.",
    "Piernas enredadas y completamente inmovilizadas. Cae y se rompe el brazo que sostenía el arma. Desarmado e inconsciente. -20 pv.",
    "Presa en el cuello. Si lleva armadura en el cuello: desarmado y aturdido durante 5 asaltos. Si no, muere en 6 asaltos.",
    "Pie trabado. Tropieza, cae y se rompe el arma con el impacto, y el sujeto queda aturdido durante 2 asaltos. Si no lleva armadura en el pecho, recibe un crítico D de aplastamiento.",
    "Ambas piernas liadas. Tropieza y cae al suelo quedando inconsciente. -80 a la actividad debido a un brazo y un tobillo rotos. -20pv.",
    "La tráquea aplastada. Muere inmediatamente debido al traumatismo total y a la asfixia.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaGrandesCriaturas = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "-10 pv. Tu arma se parte por la mitad, lo cual te hace sentir molesto.",
    "-6 pv.",
    "-12 pv.",
    "-18 pv.",
    "Asombrado por un fuerte golpe. -20 pv. -10 a la actividad. Aturdido durante 2 asaltos.",
    "Buen golpe a la pierna. -18 pv. -5 pv. por asalto. -20 a la actividad. Aturdido 3 asaltos.",
    "Un golpe bien colocado al cuello secciona la vena yugular. -15 pv. Muere en 6 asaltos, pero hasta entonces puede actuar con -60 a la actividad.",
    "Duro golpe. -25 pv. Pérdida de 3 puntos de vida por asalto debido a una herida ligera. -10 a la actividad. Aturdido durante 2 asaltos.",
    "El golpe secciona una arteria en una pierna (o pata). Puede actuar con -30 a la actividad durante 4 asaltos, después caerá y morirá en 6 asaltos más.",
    "Seccionada una vena en la juntura de una extremidad. -20 pv. Aturdido durante 6 asaltos, después cae muerto.",
    "Golpe en una pierna. -15 pv. -20 a la actividad. Pérdida de 2 puntos de vida por asalto. Aturdido 3 asaltos.",
    "Golpe en la cabeza. Fractura del cráneo. -30 pv. Inconsciente. Un buen golpe.",
    "Golpe al corazón. Muerte instantánea. El arma queda clavada y atrapada bajo el cuerpo. La probabilidad de que el arma se rompa es de 60% menos la bonificación del arma.",
    "El hombro del brazo que sostiene el arma hecho añicos. -15 pv. Aturdido durante 3 asaltos. El brazo (o la pata) queda inutilizado.",
    "Peligroso golpe cruzado. Ciego y enfadado. Aturdido durante 2 asaltos, pero luego, la pobre bestia podrá moverse a tientas.",
    "Golpe que perfora la mejilla. Muere inmediatamente. Por desgracia, el arma se queda clavada en el hueso durante 2 asaltos.",
    "Golpe en la barbilla. La mandíbula destrozada. Inconsciente. -60 pv. Resulta un estado de coma durante 1 mes.",
    "Golpe que atraviesa un ojo. Muere inmediatamente y cae sobre el atacante quien pierde 20 puntos de vida y queda atrapado durante 6 asaltos.",
    "Un golpe que atraviesa un oído destruye el cerebro. El desgraciado bobo muere inmediatamente, eso sí, con una oreja completamente limpia de cera.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaSortilegiosGrandesCriaturas = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "El tamaño de la criatura te impresiona. 0 puntos de vida adicionales.",
    "Pérdida de 5 pv. adicionales.",
    "Pérdida de 8 pv. adicionales.",
    "Pérdida de 10 pv. adicionales.",
    "Pérdida de 12 pv. adicionales.",
    "Pérdida de 15 pv. adicionales.",
    "Desequilibrado por el impacto. Pérdida de 15 puntos de vida adicionales. Aturdido durante 2 asaltos.",
    "Estupefacto por el fuerte impacto. Pérdida de 20 puntos de vida adicionales. Aturdido durante 1 asalto.",
    "Impacto en una pierna. Pérdida de 15 puntos de vida adicionales. -20 a la actividad. Aturdido durante 2 asaltos.",
    "Impacto en la boca. Derribado al suelo. Estado de coma durante un mes. Pérdida de 30 pv. adicionales.",
    "El impacto le hace girar sobre sí mismo. Desequilibrado. Pérdida de 18 puntos de vida adicionales. -10 a la actividad. Aturdido durante 1 asalto.",
    "Impacto en un costado. Pérdida de 25 puntos de vida adicionales. -20 a la actividad debido a las costillas rotas. Aturdido durante 3 asaltos.",
    "Impacto en la sección media. La vejiga destrozada. Muere en 4 asaltos, pero hasta entonces está plenamente activo.",
    "Impacto en la cabeza. Momentáneamente confuso. Pérdida de 20 puntos de vida adicionales. Aturdido 2 asaltos.",
    "El impacto comba una pierna. Grave herida en el muslo. Pérdida de 25 puntos de vida adicionales. Muere en 5 asaltos debido a lesiones nerviosas, pero hasta entonces está plenamente activo.",
    "Tremendo impacto. El cuello roto y la espina dorsal quebrada. Cae y muere en 3 asaltos.",
    "Impacto en los ojos. Cegado durante 2 asaltos. Pérdida de 15 puntos de vida adicionales. -20 a la actividad.",
    "El impacto en el cuerpo destruye una serie de órganos. Muerte en 3 asaltos pero el ignorante bruto permanece completamente activo hasta ese momento.",
    "Un impacto soberbio hace que una costilla atraviese el corazón. Cae y muere en 6 agonizantes asaltos.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaCalor = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Aire caliente. No hay pérdida adicional de pv.",
    "Fuerte calor con pocos efectos. -3 pv.",
    "Quemaduras leves. -8 pv. Pérdida de 1 punto de vida más por asalto.",
    "Momentáneamente cegado por un humo ardiente. -12 pv. Aturdido durante 1 asalto.",
    "La ropa se enciende. -12 pv. El fuego dura 2 asaltos. -8 pv. por cada asalto encendido.",
    "Derribado por un tremendo impacto. Todos los recubrimientos y protecciones orgánicos de pies y pantorrilas destruidos. -10 pv.",
    "Impacto en la cabeza. El rostro horriblemente quemado. Inconsciente. -15 pv. Pérdida de 5 pv. más por asalto. Si no se lleva yelmo, un mes en estado de coma.",
    "El fuego se apodera de la espalda. Derribado. Toda la materia orgánica transportada en la espalda queda destruida. Pérdida de 2 pv. por asalto. Aturdido durante 1 asalto.",
    "Impacto en la cabeza. Cegado durante 6 asaltos. Cualquier protección orgánica de la cabeza (sombrero, casco, yelmo) destruida. Si no se lleva yelmo, toda la cabellera quemada.",
    "La cabeza convertida en un fragmento carbonizado. Tristemente, se muere de inmediato debido a este inaceptable estado.",
    "El brazo que sostiene el escudo frito. Cualquier escudo queda destruido, junto con la mano. Aturdido durante 5 asaltos. Si no se lleva escudo, pérdida del brazo e inconsciente.",
    "Quemadura en la parte superior de la pierna. Pierna inutilizada debido a la destrucción de tejido muscular. Pérdida de 3 pv. por asalto. -60 a la actividad. Aturdido durante 6 asaltos.",
    "Impacto en el cuello que funde las vértebras y pega la piel a la ropa. Parálisis permanente y -25 pv.",
    "Impacto en una pierna. Pérdida de 2 pv. por asalto. -20 a la actividad. Si no se lleva armadura en las piernas: lesiones masivas en el tejido muscular, -70 a la actividad.",
    "Impacto en la cabeza. Si se lleva yelmo, cegado durante 2 semanas. Si no, muerte en 6 asaltos.",
    "Cintura volatilizada. Partido por la mitad, el sujeto muere. Destruidos todos los objetos.",
    "Impacto en el pecho. Destruida cualquier armadura de esta zona. -12 pv. Aturdido durante 3 asaltos. Si no se lleva armadura, derribado y pérdida de 6 pv. más por asalto.",
    "El fuego se apodera del cuerpo. Toda la materia orgánica sobre el cuerpo queda destruida. Muerte en 6 asaltos debido al trauma y a las lesiones del sistema nervioso.",
    "Todo lo que queda son fragmentos carbonizados de huesos y dientes.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaFrio = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Fresca brisa. No hay pérdida adicional de pv.",
    "Golpe frío. -3 pv. Si no se lleva puesta una capa o armadura, aturdido durante 1 asalto.",
    "Congelación leve. -7 pv. Pérdida de 1 pv. más por asalto.",
    "Congelación. -5 pv. Pérdida de 2 pv. más por asalto y -10 a la activida.",
    "Golpe frío en la espalda. -2 pv. por asalto. Todo objeto de madera en la espalda queda inservible y quebradizo.",
    "Golpe bajo. Aturdido durante 1 asalto. Destruido cualquier tipo de calzado y protección de los pies. Si se va descalzo, congelación, -30 a la actividad.",
    "Impacto helado en la cabeza. Como resultado, estado de coma durante un mes (y gran resfriado de cabeza). Pérdida de la nariz a consecuencia de congelación grave y trauma.",
    "Impacto en una pierna. Derribado. Aturdido durante 3 asaltos. Si no se llevan protecciones en las piernas (grebas), congelación, la parte inferior de la pierna inútil y -40 a la actividad.",
    "Impacto en la zona del cuello. Inconsciente. Pérdida de la oreja (oído externo). Si no se lleva armadura en el cuello, congelación de éste y muerte tras 9 asaltos de inactividad.",
    "Un impacto congela y seca la cabeza. Muerte en 2 asaltos. El cerebro y el cráneo quebradizos y sin vida.",
    "Muslo congelado. Aparte de la congelación, hueso roto. Pérdida de 5 pv. por asalto. -30 a la actividad. Aturdido durante 4 asaltos.",
    "Un impacto lateral congela y hace astillas la pelvis. Muerte en 12 asaltos debido al trauma y las lesiones del sistema nervioso.",
    "Impacto en la cabeza. Ojos congelados. Estado de coma durante 3 semanas. Parálisis de cuello para abajo.",
    "Un impacto congela ambas manos. Pérdida del uso de los brazos durante una hora. Pérdida de 6 pv. por asalto. Aturdido durante 5 asaltos.",
    "Corazón y pulmones congelados de repente. Muerte en 6 asaltos de inactividad, debido al shock y a la asfixia.",
    "Un golpe tremendo hace añicos el pecho y congela los preciosos fluidos corporales. Muerte en 3 asaltos.",
    "Gélido golpe a la parte superior del pecho. Inconsciente y derribado. Si no lleva armadura en el pecho, muerte en 10 asaltos por tener un corazón de hielo.",
    "Congelado y convertido en una estatua sin vida, muy bien conservada pero el personaje ha muerto.",
    "Congelación repentina y luego estalla en mil pedazos.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaElectricidad = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Pelos de punta. -0 pv.",
    "Pequeña descarga. -3 pv. Si se lleva armadura de metal, aturdido durante 1 asalto.",
    "Explosión de luz. Aturdido durante 1 asalto.",
    "Descarga moderada. -6 pv. -5 a la actividad. Si se lleva armadura de metal, aturdido durante 2 asaltos.",
    "Descarga potente. -9 pv. -10 a la actividad. Aturdido durante 1 asalto. Si se lleva armadura de metal, aturdido durante 3 asaltos.",
    "Impacto en el brazo que sostiene el escudo. -12 pv. -20 a la actividad. Si se lleva armadura metálica y no se tiene escudo, inconsciente durante 1 día entero.",
    "Un impacto en el costado devasta el sistema nervioso. Graves resultados traumáticos. La víctima será un vegetal durante un mes.",
    "Golpe en el brazo que sostiene el arma. Músculos y cartílagos destrozados. El brazo inútil, pérdida de 2 pv. por asalto. Aturdido durante 6 asaltos.",
    "Completamente cubierto por la electricidad. Todo el sistema nervioso reorganizado. Cae y yace en estado de shock durante 12 asaltos antes de morir.",
    "Impacto en la cabeza. Si se lleva yelmo de cuero, éste queda destruido y se produce un coma de dos semanas. Si no, muerte instantánea.",
    "Impacto en el pecho. Si se lleva armadura metálica, no se podrá quitar. Blanco inmovilizado. Si no, inconsciente durante 6 horas.",
    "Electrificante experiencia. Colapso del cerebro debido a un shock general y quemaduras de superficie. Desmayado y muere en 6 asaltos.",
    "El sistema nervioso actúa como superconductor. La inmediata muerte proporciona a los presentes un inesperado espectáculo de luces.",
    "Impacto en la cara. Pérdida de la nariz. Aturdido durante 8 asaltos. Ciego durante 2 semanas. Si no se lleva yelmo, también derribado.",
    "Impacto en el pecho que destruye el corazón y los pulmones. Si se lleva armadura metálica, ésta se funde y se muere en 6 asaltos. Si no, la muerte es inmediata.",
    "La cabeza ya no está disponible para su uso. Humo y ozono rodean el cuerpo sin vida.",
    "Impacto en el abdomen. Aturdido durante 7 asaltos. Pérdida de 6 puntos de vida por asalto. Si no se lleva armadura protegiendo el abdomen, muerte por trauma y hemorragia en 12 asaltos.",
    "Un impacto en el pecho destroza ambos pulmones. Partido por la mitad. La descarga se extiende 3 metros infligiendo un crítico A a todos los que estén en medio.",
    "La descarga deshace la estructura celular. Todo el cuerpo se convierte en polvo.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let tablaImpacto = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Ni un rasguño. -0 pv.",
    "Un golpe sesgado. -5 pv.",
    "Tambaleante debido a un golpe en el costado. -10 pv. Aturdido durante 1 asalto.",
    "Golpe en el hombro. La víctima gira sobre sí misma y retrocede 3 metros como una peonza. -12 pv. Si no se lleva armadura, aturdido durante 2 asaltos.",
    "Golpe en la pierna. Derribado, périda de 8 pv. Si no lleva armadura en la pierna, aturdido durante 2 asaltos.",
    "Porrazo en el brazo del escudo. -10 pv. Escudo aplastado e inútil. Si no se lleva escudo, brazo roto y aturdido durante 3 asaltos.",
    "Golpe en la cabeza. -12 pv. El yelmo destrozado. Derribado e inconsciente durante 1 día. Sin yelmo, cráneo fracturado y muerte en 3 asaltos.",
    "Golpe en la parte superior de la pierna. Músculos desgarrados. -15 pv. -10 a la actividad. Sin armadura en la pierna, -20 a la actividad y aturdido 3 asaltos.",
    "Impacto en la zona del cuello. Pérdida de 12 pv. Aturdido durante 5 asaltos. Pérdida del habla durante 1 semana. Si no se lleva armadura en el cuello, la pérdida del habla es permanente.",
    "Golpe en el cuello. Paralizado de los hombros hacia abajo. Pérdida adicional de 20 pv. La víctima se pone melancólica.",
    "Golpe en una rodilla. La rodilla dislocada. Cartílagos y tendones desgarrados. -15 pv. -50 a la actividad. Aturdido durante 9 asaltos.",
    "Impacto en el abdomen. -18 pv. Aturdido durante 12 asaltos. Sin armadura en el abdomen, muere en 6 asaltos por órganos destruidos.",
    "Un impacto en la cabeza fractura el cráneo. Estado de coma durante 3 semanas. Si no lleva yelmo, muerte instantánea.",
    "Golpe en la mandíbula, que se rompe. No podrá ni hablar ni comer nada sólido hasta ser curado. -15 pv. -10 a la actividad. Aturdido 7 asaltos.",
    "Golpe en un lateral. Un hueso se clava en los riñones. Muerte en 6 asaltos.",
    "Pecho destrozado. Los pulmones y el corazón estallan. Muerte instantánea que lo pone todo hecho un asco.",
    "Gira sobre sí mismo por el impacto, cae al suelo. Se rompe los dos brazos. -60 a la actividad. Aturdido durante 3 asaltos.",
    "Un porrazo que destroza el cráneo en miles de partículas. Muerte instantánea. Impacto directo, buen puñetazo.",
    "El porrazo aniquila todo el esqueleto. El blanco queda reducido a una pulpa gelatinosa.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let pifiasEmpuñadas = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Pierdes el control. No haces nada más en este asalto.",
    "Resbalas. Si tu arma se maneja con una sola mano y no es mágica, se rompe.",
    "Mala continuación. Pierdes tu oportunidad y 2 puntos de vida.",
    "Se te cae el arma. Tardarás 1 asalto en desenvainar otra o 2 asaltos en recuperar la que se te ha caído.",
    "Pierdes el hilo y te das cuenta de que deberías relajarte. -40 a la actividad durante dos asaltos.",
    "Tropiezas. Semejante demostración de falta de estilo te deja aturdido durante 2 asaltos. Con suerte, sobrevivirás.",
    "Movimiento increíblemente inepto. Te haces a ti mismo un crítico B. Si el oponente está usando un arma de tajo, tu arma se rompe.",
    "Con los nervios te muerdes la lengua. Aturdido durante 2 asaltos.",
    "Pierdes el control de tu arma y de la realidad. Aturdido durante 3 asaltos.",
    "Mal gusto y peor ejecución. Intentas automutilarte al tiempo que tu arma se rompe. Te haces un crítico C de tajo.",
    "Increíble tu forma de esgrimir el arma. Cualquier combatiente de tu bando que se encuentre cerca, recibe un crítico B de aplastamiento.",
    "Tropiezas con una imaginaria, e invisible, tortuga fenecida. Lo cual te confunde bastante. Aturdido 3 asaltos.",
    "El peor movimiento visto en muchos años. -60 a la actividad por un tirón en la ingle. El enemigo queda aturdido 2 asaltos, muerto de risa.",
    "Te tambaleas y caes, en un aparente intento de suicidio. Quedas aturdido 3 asaltos. Si usas un arma de asta, se rompe su mango.",
    "Rompes tu arma por inepto. Quedas aturdido 4 asaltos.",
    "Tropiezas y clavas la punta de tu arma en el suelo. Aturdido 5 asaltos. Si estás montado, tu arma de asta te hace saltar 9 metros y recibes un crítico C de aplastamiento al tomar tierra.",
    "Tu montura retrocede súbitamente. Aturdido 3 asaltos recuperándote.",
    "No coordinas tus movimientos con los de tu montura. -90 a la actividad durante los siguientes 3 asaltos mientras intentas seguir siendo el jinete.",
    "Te caes de la montura. Te haces un crítico D de aplastamiento.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let pifiasProyectil = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Pierdes el control. No haces nada más en este asalto.",
    "Eres tan manazas que no aciertas a recargar. Pierdes este asalto.",
    "Pifia con la munición. Pierdes este asalto y -50 a la actividad en el siguiente.",
    "Se te rompe la munición y pierdes la serenidad. Te encuentras con -30 a la actividad durante 3 asaltos.",
    "Se te cae la munición. Quedas aturdido este asalto y el siguiente, intentando decidir si debes recogerla o no.",
    "Realmente te estás haciendo un lío con el arma. Aturdido durante 2 asaltos.",
    "Falta de criterio. Pierdes 5 puntos de vida. Si estás usando un arco, se te escapa una flecha, te arrancas una oreja y pierdes 2 pv. por asalto.",
    "Se rompe la cuerda de tu arma. Tardarás 2 asaltos en sacar una nueva arma o 6 asaltos en volver a poner una cuerda, siempre y cuando no hagas otra cosa y no estés enzarzado en combate cuerpo a cuerpo.",
    "Pifia con la munición cuando recargabas. Esparces tu munición en una superficie de 3 metros de radio.",
    "Tu arma se hace añicos. Quedas aturdido durante 4 asaltos de combate. Que tengas suerte, chaval.",
    "Disparas tu flecha demasiado pronto. Se queda 6 metros corta en su trayectoria. Estás a -30 de actividad durante los siguientes 3 asaltos.",
    "Pareces pensar que tu arco es una batuta. Se te resbala y al intentar recogerlo va a parar a un metro y medio delante tuyo.",
    "Se te resbala la munición al ir a disparar. El proyectil te atraviesa la mano. La mano queda inutilizada. Pierdes 8 puntos de vida y luego 2 puntos de vida cada asalto.",
    "Resbalas y caes al suelo. Tu disparo se pierde. Aturdido 5 asaltos.",
    "Las plumas de tu proyectil te arañan el ojo al disparar. Pierdes 5 puntos de vida. -20 a la actividad. Aturdido 2 asaltos.",
    "La punta del arma se engancha en el objeto más próximo y se rompe. Si es aplicable, el objeto recibe un crítico A de perforación.",
    "Se dispara el seguro cuando estás alzando tu arma. Haz un ataque sin modificadores sobre el combatiente más próximo.",
    "Mientras soñabas despierto, pusiste la mano delante del pivote en el momento del disparo. Pierdes un dedo y 4 puntos de vida. Luego sigues perdiendo 2 puntos de vida por asalto.",
    "Resbalas y te clavas el pie al suelo con un pivote. Pierdes 10 puntos de vida adicionales. Luego 2 puntos de vida más por cada asalto. -30 a la actividad y aturdido 3 asaltos.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let pifiasSortilegios = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Pérdida de concentración debido a la tensión. Se pierde el sortilegio, pero no los puntos de poder.",
    "La cabeza en otro sitio. Se pierde el sortilegio pero no los puntos de poder. No podrá realizarse ni prepararse ningún otro sortilegio en el siguiente asalto.",
    "Indecisión debido a un ligero lapsus mental. El sortilegio se retrasa un asalto.",
    "Serio lapsus mental. Se pierde el sortilegio, pero no los puntos de poder. -30 a la actividad durante 3 asaltos.",
    "Agotamiento moderado pero serio. Se pierde el sortilegio así como los puntos de poder. Aturdido 1 asalto.",
    "Miedo en el subconsciente. Se pierde el sortilegio, así como los puntos de poder. Aturdido durante 2 asaltos.",
    "El sortilegio se interioriza. Pierdes 15 pv. Caes al suelo. Aturdido durante 1 hora.",
    "Serio agotamiento. Se pierde el sortilegio así como los puntos de poder. Aturdido 3 asaltos.",
    "Interiorización: sobrecarga de los setidos. -20pv. Ciego y sordo durante 10 minutos.",
    "La tensión causa una apoplejía leve. -20 pv. Inconsciente durante 12 horas.",
    "La severa tensión ocasiona un fallo. 5 pv. Aturdido 3 asaltos.",
    "La Esencia del blanco hace que el sortilegio rebote. Se invierten los papeles del atacante y el blanco a la hora de aplicar los efectos del sortilegio.",
    "Crisis de identidad. Pierdes la capacidad de realizar sortilegios durante dos semanas.",
    "La extrema presión mental produce un rebote. Caes derribado al suelo -10 pv. Aturdido 6 asaltos.",
    "Interiorización del sortilegio. Pierdes toda capacidad de realizar sortilegios durante 3 semanas. -25 pv. Inconsciente durante 3 horas.",
    "La tensión produce una grave apoplejía. Paralizado de cintura para abajo.",
    "El sortilegio se pierde y viaja a un lugar a 6 metros a la derecha del blanco. Cualquiera que se encuentre en la nueva trayectoria recibe un ataque sin modificadores. Aturdido 3 asaltos.",
    "El sortilegio se pierde y viaja a un lugar a 6 metros a la izquierda del blanco. Cualquiera que se encuentre en la nueva trayectoria recibe un ataque sin modificadores. Aturdido 3 asaltos.",
    "Colapso mental. El sortilegio se lanza en la dirección opuesta a la que pretendías. Pierdes toda capacidad de realizar sortilegios durante 3 meses.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

let pifiasManiobrasMovimiento = {
  indices: [
    5, 20, 35, 50, 65, 79, 80, 86, 89, 90, 96, 99, 100, 106, 109, 110, 116, 119,
    9999999,
  ],
  resultados: [
    "Dudas y no aciertas a actuar.",
    "Tienes segundas intenciones y decides esperar un asalto.",
    "Resbalas. 30% de probabilidad de que caigas. -20 a cualquier maniobra durante 2 asaltos.",
    "Tropiezas. 45% de probabilidad de que caigas. -30 a cualquier maniobra durante 2 asaltos.",
    "Tropiezas con tu dedo gordo. 60% de probabilidad de que caigas. -3 pv. -10 a la actividad.",
    "Resbalas. 75% de probabilidad de que caigas. Aturdido 2 asaltos.",
    "Te tuerces el tobillo. -5pv. -10 a la actividad.",
    "Te caes. -3 pv. -20 a la actividad durante 3 asaltos.",
    "Te tuerces el tobillo, desgarrándote algunos tendones. -7 pv. -20 a la aactividad. Aturdido 1 asalto.",
    "Te rompes una pierna al caer. -8 pv. -30 a la actividad. Aturdido durante 3 asaltos.",
    "Te rompes la muñeca al caer. -12 pv. -20 a la actividad. Aturdido 2 asaltos.",
    "Tu brazo se rompe al aterrizar sobre él con todo tu peso. -14 pv. -30 a la actividad. Aturdido 4 asaltos.",
    "En un vano intento de frenar tu caída, te rompes ambos brazos. Queda inútiles. -30 pv. Aturdido durante 6 asaltos.",
    "Al caer, la pierna se te tuerce y se rompe. -15 pv. -50 a la actividad. Aturdido durante 3 asaltos.",
    "Tu rodilla, al caer choca con un objeto duro y se hace añicos. -10 pv. -80 a la actividad. Aturdido durante 4 asaltos.",
    "Caes y la conmoción resultante te produce un estado de coma que durará un año.",
    "Caes y aterrizas sobre la parte baja de tu espina dorsal. Quedas paralizado de cintura para abajo. -30 pv.",
    "Caes y quedas paralizado del cuello para abajo. -20 pv.",
    "Tu caída se convierte en un picado. Te abres el cráneo y mueres.",
  ],
  getCritico(roll) {
    return this.resultados[
      this.indices.findIndex(function (value) {
        return value >= roll;
      })
    ];
  },
};

function crits(msg) {
  if (msg.indexOf("!crit ") !== -1) {
    msg = msg.replace("!crit ", "");
    let modificador = 0;
    let tabla = null;
    let gravedad = "";
    let tipoCritico = "";
    let indice = 0;
    if (msg[0] == "T") modificador = -50;
    else if (msg[0] == "A") modificador = -20;
    else if (msg[0] == "B") modificador = -10;
    else if (msg[0] == "C") modificador = 0;
    else if (msg[0] == "D") modificador = 10;
    else if (msg[0] == "E") modificador = 20;
    else if (msg[0] == "N") return;
    else {
      console.log("Error de sintaxis. Formato: !crit EK100");
      return;
    }
    gravedad = msg[0];
    if (msg[1] == "K") {
      tabla = tablaAplastamiento;
      tipoCritico = "Aplastamiento";
    } else if (msg[1] == "S") {
      tabla = tablaTajo;
      tipoCritico = "Tajo";
    } else if (msg[1] == "P") {
      tabla = tablaPerforacion;
      tipoCritico = "Perforación";
    } else if (msg[1] == "U") {
      tabla = tablaDesequilibrio;
      tipoCritico = "Desequilibrio";
    } else if (msg[1] == "G") {
      tabla = tablaPresa;
      tipoCritico = "Presa";
    } else if (msg[1] == "C") {
      tabla = tablaCalor;
      tipoCritico = "Calor";
    } else if (msg[1] == "F") {
      tabla = tablaFrio;
      tipoCritico = "Frío";
    } else if (msg[1] == "E") {
      tabla = tablaElectricidad;
      tipoCritico = "Electricidad";
    } else if (msg[1] == "I") {
      tabla = tablaImpacto;
      tipoCritico = "Impacto";
    } else if (msg[1] == "L") {
      tabla = tablaGrandesCriaturas;
      tipoCritico = "Grandes Criaturas";
    } else if (msg[1] == "X") {
      tabla = tablaSortilegiosGrandesCriaturas;
      tipoCritico = "Sortilegios Grandes Criaturas";
    }
    // TBD: meter las demás tablas, y cascar aquí los else if correspondientes
    else {
      console.log("Error de sintaxis. Formato: !crit EK100");
      return;
    }
    tirada = parseInt(msg.substring(2), 10);
    indice = tirada + modificador;
    let strModificador = "";
    if (modificador >= 0) strModificador = "+" + modificador;
    else strModificador = modificador;
    let resultado =
      "\n===== Crítico " + gravedad + " de " + tipoCritico + " =====\n";
    resultado += " - Timestamp: " + getTimestamp() + "\n";
    resultado +=
      " - Tirada: " + tirada + strModificador + " = " + indice + "\n";
    resultado += " - Resultado: " + tabla.getCritico(indice) + "\n\n";

    return resultado;
  } else if (msg.indexOf("!pif ") !== -1) {
    msg = msg.replace("!pif ", "");
    let tipoPifia = "";
    let tabla = null;
    if (msg[0] == "E") {
      tipoPifia = "armas empuñadas";
      tabla = pifiasEmpuñadas;
    } else if (msg[0] == "P") {
      tipoPifia = "armas de proyectil";
      tabla = pifiasProyectil;
    } else if (msg[0] == "S") {
      tipoPifia = "sortilegios";
      tabla = pifiasSortilegios;
    } else if (msg[0] == "M") {
      tipoPifia = "maniobras de movimiento";
      tabla = pifiasManiobrasMovimiento;
    } else {
      let resultado = "\n" + getTimestamp() + "\n";
      resultado += "Error de sintaxis: !pif " + msg + "\n";
      resultado += "Formato: !pif (TIPO)(MOD)(TIRADA)\n";
      resultado += " (ejemplo: !pif E+2059)\n";
      resultado +=
        " TIPO: E=Empuñadas, P=Proyectil, S=Sortilegios, M=Maniobras de movimiento\n";
      resultado +=
        " MOD: Modificador numérico, signo y dos cifras (ejemplos: +20, -10, +00)\n";
      resultado +=
        " TIRADA: Resultado de la tirada sin modificar (ejemplos: 89, 45, 13)\n\n";
      return resultado;
    }
    let modificador = parseInt(msg.substring(1, 4));
    let tirada = parseInt(msg.substring(4));
    let indice = tirada + modificador;
    let strModificador = "";
    if (modificador < 0) strModificador = modificador;
    else strModificador = "+" + modificador;
    let resultado = "\n===== Fallo de " + tipoPifia + " =====\n";
    resultado += " - Timestamp: " + getTimestamp() + "\n";
    resultado +=
      " - Tirada: " + tirada + strModificador + " = " + indice + "\n";
    resultado += " - Resultado: " + tabla.getCritico(indice) + "\n\n";

    return resultado;
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

let text = crits(process.argv[2]);
console.log(text);
fs.appendFile("crits.log", text, function (err) {
  if (err) throw err;
});
