//description: '',
const SOLUTIONS = [
  {
    id: 1,
    word: 'apero',
    description: 'Es el conjunto de prendas que el jinete coloca a su caballo.',
  },
  {
    id: 2,
    word: 'apaga',
    description: 'Expresion para que dejes de hacer algo o te detengas.',
  },
  {
    id: 3,
    word: 'amaca',
    description: 'Forma coloquial de “hamaca”.',
  },
  {
    id: 4,
    word: 'argel',
    description: 'Persona de mal humor o difícil de tratar.',
  },
  {
    id: 5,
    word: 'asado',
    description: 'Comida típica argentina hecha a la parrilla.',
  },
  {
    id: 6,
    word: 'facha',
    description: 'Sinónimo de verse bien, ser guapo.',
  },
  {
    id: 7,
    word: 'amigo',
    description: 'tu gran amigo.',
  },
  {
    id: 8,
    word: 'amuro',
    description: 'abandonar o dejar a alguien a su suerte.',
  },
  {
    id: 9,
    word: 'araca',
    description: 'Expresión de alerta: “cuidado” o “ojo”.',
  },
  {
    id: 10,
    word: 'apero',
    description: 'Conjunto de piezas que van sobre el caballo.',
  },
  {
    id: 11,
    word: 'bachi',
    description: 'Persona joven o adolescente, generalmente varón.',
  },
  {
    id: 12,
    word: 'bendi',
    description: 'Forma tierna para referirse a un hijo o niño.',
  },
  {
    id: 13,
    word: 'biaba',
    description: 'Golpiza fuerte o paliza.',
  },
  {
    id: 14,
    word: 'bocha',
    description: 'Gran cantidad de algo, también pelota pesada.',
  },
  {
    id: 15,
    word: 'pibes',
    description:
      'Nombre que se le dice a sus amigos de compañía y de confianza',
  },
  {
    id: 16,
    word: 'bondi',
    description: 'Colectivo, bus urbano.',
  },
  {
    id: 17,
    word: 'boton',
    description: 'Alguien que delata o informa a la policía.',
  },
  {
    id: 18,
    word: 'burra',
    description: 'Persona poco hábil o tonta.',
  },
  {
    id: 19,
    word: 'burro',
    description: 'Persona torpe o poco inteligente.',
  },
  {
    id: 20,
    word: 'bagre',
    description: 'Alguien poco atractivo.',
  },
  {
    id: 21,
    word: 'bajon',
    description: 'Estado de tristeza o desánimo.',
  },
  {
    id: 22,
    word: 'balin',
    description: 'bala pequeña usada en armas de aire comprimido o de juguete.',
  },
  {
    id: 23,
    word: 'bambi',
    description: 'Apodo para un ciervo.',
  },
  {
    id: 24,
    word: 'bardo',
    description: 'Lío, conflicto o quilombo.',
  },
  {
    id: 25,
    word: 'bicho',
    description: 'Insecto; también persona astuta.',
  },
  {
    id: 26,
    word: 'bidet',
    description: 'Sanitario usado para la higiene personal.',
  },
  {
    id: 27,
    word: 'birra',
    description: 'Cerveza.',
  },
  {
    id: 28,
    word: 'bocho',
    description: 'Cabeza; también mente inteligente.',
  },
  {
    id: 29,
    word: 'bocon',
    description: 'El que habla de más o presume.',
  },
  {
    id: 30,
    word: 'chill',
    description: 'Relajado tranquilo.',
  },
  {
    id: 31,
    word: 'bomba',
    description: 'Artefacto explosivo; también algo muy bueno.',
  },
  {
    id: 32,
    word: 'bosta',
    description: 'Excremento de vaca; basura o algo muy malo.',
  },
  {
    id: 33,
    word: 'bover',
    description: 'Resultado de juntar “Boca” y “River”.',
  },
  {
    id: 34,
    word: 'burro',
    description: 'Persona torpe o poco inteligente.',
  },
  {
    id: 35,
    word: 'burra',
    description: 'Persona poco hábil o tonta.',
  },
  {
    id: 36,
    word: 'cabio',
    description:
      'Expresion para decirle a alguien que se equivocó, que no tuvo razón.',
  },
  {
    id: 37,
    word: 'cacho',
    description: 'Pedazo grande de algo o también “un poco”.',
  },
  {
    id: 38,
    word: 'cagon',
    description: 'Persona miedosa.',
  },
  {
    id: 39,
    word: 'ceibo',
    description: 'Flor nacional argentina.',
  },
  {
    id: 40,
    word: 'cebar',
    description: 'Servir mate; también entusiasmar a alguien.',
  },
  {
    id: 41,
    word: 'chaco',
    description: 'Provincia del norte argentino.',
  },
  {
    id: 42,
    word: 'chapa',
    description: 'Placa metálica; también fama o prestigio.',
  },
  {
    id: 43,
    word: 'chata',
    description:
      'Persona aburrida o cosa de poca gracia, tambien puede ser una camioneta.',
  },
  {
    id: 44,
    word: 'chele',
    description: 'Un juego de silabas de la palabra Leche',
  },
  {
    id: 45,
    word: 'cheto',
    description: 'Persona de clase alta o con actitud sobervia.',
  },
  {
    id: 46,
    word: 'chivo',
    description: 'Olor fuerte a transpiración.',
  },
  {
    id: 47,
    word: 'choto',
    description: 'Algo malo, de mala calidad.',
  },
  {
    id: 48,
    word: 'chota',
    description: 'Sinonimo de pene (vulgar).',
  },
  {
    id: 49,
    word: 'coima',
    description: 'Soborno o pago ilegal.',
  },
  {
    id: 50,
    word: 'coscu',
    description: 'Streamer argentino conocido.',
  },
  {
    id: 51,
    word: 'crack',
    description: 'Persona muy destacada o talentosa.',
  },
  {
    id: 52,
    word: 'croto',
    description: 'Persona muy pobre o desaliñada.',
  },
  {
    id: 53,
    word: 'darin',
    description: 'Referencia al actor argentino Ricardo Darín.',
  },
  {
    id: 54,
    word: 'banda',
    description: 'Significa mucho o bastante',
  },
  {
    id: 55,
    word: 'denso',
    description: 'Persona cargosa o molesta.',
  },
  {
    id: 56,
    word: 'facho',
    description: 'Persona autoritaria o con ideas rígidas.',
  },
  {
    id: 57,
    word: 'facto',
    description: 'Hecho empirico de los acontecimientos',
  },
  {
    id: 58,
    word: 'fajar',
    description: 'Golpear a alguien.',
  },
  {
    id: 59,
    word: 'fiaca',
    description: 'Pereza o ganas de no hacer nada.',
  },
  {
    id: 60,
    word: 'fiero',
    description: 'Muy feo o desagradable.',
  },
  {
    id: 61,
    word: 'fiera',
    description: 'Alguien de aspecto rudo o feo.',
  },
  {
    id: 62,
    word: 'finde',
    description: 'Fin de semana.',
  },
  {
    id: 63,
    word: 'flaco',
    description: 'Persona muy delgada; también “amigo”.',
  },
  {
    id: 64,
    word: 'forro',
    description: 'Persona antipática o mala onda.',
  },
  {
    id: 65,
    word: 'fulbo',
    description: 'Forma popular de decir “fútbol”.',
  },
  {
    id: 66,
    word: 'garca',
    description: 'Alguien deshonesto o traicionero.',
  },
  {
    id: 67,
    word: 'garpa',
    description: 'Funciona bien; da resultado.',
  },
  {
    id: 68,
    word: 'govir',
    description: 'Juego de silabas para “Virgo”',
  },
  {
    id: 69,
    word: 'gordi',
    description: 'Apodo cariñoso para alguien querido.',
  },
  {
    id: 70,
    word: 'gorra',
    description: 'Policía en lunfardo.',
  },
  {
    id: 71,
    word: 'grone',
    description: 'Término coloquial para persona de piel oscura.',
  },
  {
    id: 72,
    word: 'groso',
    description: 'Alguien muy bueno en algo o excelente.',
  },
  {
    id: 73,
    word: 'guaso',
    description: 'Persona tosca o brusca.',
  },
  {
    id: 74,
    word: 'guita',
    description: 'Dinero.',
  },
  {
    id: 75,
    word: 'chaja',
    description:
      'Ese amigo que no respeta los codigos con las novias, primas, hermanas o ex.',
  },
  {
    id: 76,
    word: 'jenny',
    description: 'Nombre propio muy popular en Argentina.',
  },
  {
    id: 77,
    word: 'jermu',
    description: 'Esposa o pareja femenina.',
  },
  {
    id: 78,
    word: 'kevin',
    description: 'Nombre propio muy popular en Argentina.',
  },
  {
    id: 79,
    word: 'lacra',
    description: 'Persona despreciable.',
  },
  {
    id: 80,
    word: 'lanus',
    description: 'Ciudad y equipo de Buenos Aires.',
  },
  {
    id: 81,
    word: 'lcdtm',
    description:
      'Insulto abreviado muy común en Argentina usado para descargar bronca.',
  },
  {
    id: 82,
    word: 'lerdo',
    description: 'Persona que actúa o reacciona con mucha lentitud.',
  },
  {
    id: 83,
    word: 'ligar',
    description: 'Recibir algo por azar o sacar ventaja sin buscarlo.',
  },
  {
    id: 84,
    word: 'locro',
    description: 'Guiso tradicional argentino hecho con maíz, zapallo y carne.',
  },
  {
    id: 85,
    word: 'lompa',
    description: 'Pantalón dicho de forma coloquial.',
  },
  {
    id: 86,
    word: 'chucu',
    description: 'Sinónimo de chamuyar.',
  },
  {
    id: 87,
    word: 'macri',
    description:
      'Apellido de expresidente y figura política argentina muy conocida.',
  },
  {
    id: 88,
    word: 'mambo',
    description: 'Confusión o lío mental que complica entender algo.',
  },
  {
    id: 89,
    word: 'mango',
    description: 'Poca cantidad de dinero o billete.',
  },
  {
    id: 90,
    word: 'manso',
    description: 'Tranquilo o relajado también algo bueno o agradable.',
  },
  {
    id: 91,
    word: 'massa',
    description: 'Apellido de una figura política argentina reconocida.',
  },
  {
    id: 92,
    word: 'mecha',
    description: 'Pelo de color distinto o mechón visible.',
  },
  {
    id: 93,
    word: 'menem',
    description: 'Apellido de un expresidente argentino muy famoso.',
  },
  {
    id: 94,
    word: 'merca',
    description: 'Cocaína dicho de forma callejera.',
  },
  {
    id: 95,
    word: 'messi',
    description: 'El hombre que nos dio nuestro tercer Mundial.',
  },
  {
    id: 96,
    word: 'michi',
    description: 'Forma cariñosa para decir gato.',
  },
  {
    id: 97,
    word: 'milei',
    description: 'Apellido del presidente argentino.',
  },
  {
    id: 98,
    word: 'moron',
    description: 'Nombre de un partido y ciudad del Gran Buenos Aires.',
  },
  {
    id: 99,
    word: 'nafta',
    description: 'Combustible para autos.',
  },
  {
    id: 100,
    word: 'napia',
    description: 'Nariz grande o prominente dicho en tono informal.',
  },
  {
    id: 101,
    word: 'nashe',
    description: 'Expresión de entusiasmo o aprobación muy usada en redes.',
  },
  {
    id: 102,
    word: 'ñaupa',
    description: 'Algo muy viejo o de tiempo remoto.',
  },
  {
    id: 103,
    word: 'negro',
    description:
      'Término coloquial para referirse a alguien de confianza o del barrio.',
  },
  {
    id: 104,
    word: 'nuñez',
    description: 'Barrio de la Ciudad de Buenos Aires.',
  },
  {
    id: 105,
    word: 'ñoqui',
    description: 'Empleado que cobra sin trabajar o persona muy vaga.',
  },
  {
    id: 106,
    word: 'ocote',
    description: 'Miedo o apuro extremo dicho en forma vulgar.',
  },
  {
    id: 107,
    word: 'ojota',
    description: 'Sandalia de goma usada en verano.',
  },
  {
    id: 108,
    word: 'ojete',
    description: 'Suerte inesperada o trasero dicho vulgarmente.',
  },
  {
    id: 109,
    word: 'pajin',
    description: 'Persona torpe o ridícula dicho en broma.',
  },
  {
    id: 110,
    word: 'peron',
    description: 'Apellido de un expresidente argentino muy conocido.',
  },
  {
    id: 111,
    word: 'pingo',
    description:
      'Caballo o montura dicho de modo criollo o pene en tono vulgar.',
  },
  {
    id: 112,
    word: 'pinga',
    description: 'Bebida alcohólica fuerte o pene en tono vulgar.',
  },
  {
    id: 113,
    word: 'pinta',
    description: 'Apariencia o estilo de una persona.',
  },
  {
    id: 114,
    word: 'piola',
    description: 'Persona copada o situación fácil de resolver.',
  },
  {
    id: 115,
    word: 'plata',
    description: 'Dinero.',
  },
  {
    id: 116,
    word: 'plomo',
    description: 'Persona pesada, molesta o sinonimo de bala.',
  },
  {
    id: 117,
    word: 'pocho',
    description: 'Apodo común o algo desinflado.',
  },
  {
    id: 118,
    word: 'pollo',
    description:
      'persona inexperta, arrebatar o quitar pertenencias a alguien.',
  },
  {
    id: 119,
    word: 'porfi',
    description: 'Forma infantil de decir “por favor”.',
  },
  {
    id: 120,
    word: 'porro',
    description: 'Cigarrillo de marihuana.',
  },
  {
    id: 121,
    word: 'posta',
    description: 'Algo verdadero o dicho con sinceridad.',
  },
  {
    id: 122,
    word: 'pucho',
    description: 'Cigarrillo.',
  },
  {
    id: 123,
    word: 'rajar',
    description: 'Irse rápido de un lugar.',
  },
  {
    id: 124,
    word: 'river',
    description: 'Club Atlético River Plate.',
  },
  {
    id: 125,
    word: 'riber',
    description: 'Forma burlona de decir “River”.',
  },
  {
    id: 126,
    word: 'rocha',
    description: 'Apodo despectivo para persona de bajos recursos.',
  },
  {
    id: 127,
    word: 'rosas',
    description: 'Apellido de un histórico líder político argentino.',
  },
  {
    id: 128,
    word: 'rosca',
    description: 'Negociación interna o arreglo entre grupos.',
  },
  {
    id: 129,
    word: 'saque',
    description: 'Golpe fuerte o impulso brusco.',
  },
  {
    id: 130,
    word: 'safar',
    description: 'Salir bien de una situación difícil.',
  },
  {
    id: 131,
    word: 'salta',
    description: 'Provincia del noroeste argentino.',
  },
  {
    id: 132,
    word: 'skere',
    description: 'Expresión de emoción popularizada por la música trap.',
  },
  {
    id: 133,
    word: 'tacho',
    description: 'Contenedor de basura o taxi dicho en lunfardo.',
  },
  {
    id: 134,
    word: 'tanga',
    description: 'Prenda interior muy reducida.',
  },
  {
    id: 135,
    word: 'temon',
    description: 'Canción muy buena o pegadiza.',
  },
  {
    id: 136,
    word: 'tibio',
    description: 'Persona indecisa o que no se la juega.',
  },
  {
    id: 137,
    word: 'timba',
    description: 'Juego de apuestas o de azar.',
  },
  {
    id: 138,
    word: 'toque',
    description: 'Poco tiempo o pequeña cantidad.',
  },
  {
    id: 139,
    word: 'torta',
    description: 'Pastel dulce o dinero en gran cantidad.',
  },
  {
    id: 140,
    word: 'tosco',
    description: 'Rudo o poco delicado.',
  },
  {
    id: 141,
    word: 'traba',
    description: 'Persona trans dicho de forma despectiva.',
  },
  {
    id: 142,
    word: 'trola',
    description:
      'Insulto para mujer o trabajadora sexual dicho de forma ofensiva.',
  },
  {
    id: 143,
    word: 'truco',
    description: 'Juego de cartas tradicional argentino.',
  },
  {
    id: 144,
    word: 'tigre',
    description: 'Partido del conurbano bonaerense.',
  },
  {
    id: 145,
    word: 'turra',
    description: 'Mujer provocadora o con actitud desafiante.',
  },
  {
    id: 146,
    word: 'upite',
    description: 'Trasero dicho en tono vulgar o gracioso.',
  },
  {
    id: 147,
    word: 'velez',
    description: 'Club Atlético Vélez Sarsfield.',
  },
  {
    id: 148,
    word: 'verde',
    description: 'Adjetivo para denostar a alguien de baboso.',
  },
  {
    id: 149,
    word: 'vicio',
    description: 'Hábito fuerte o adicción leve.',
  },
  {
    id: 150,
    word: 'viejo',
    description: 'Padre o persona mayor.',
  },
  {
    id: 151,
    word: 'vieja',
    description: 'Madre o mujer mayor.',
  },
  {
    id: 152,
    word: 'virgo',
    description: 'Persona muy tímida o sin experiencia.',
  },
  {
    id: 153,
    word: 'wacha',
    description: 'Chica joven dicho en tono popular.',
  },
  {
    id: 154,
    word: 'wacho',
    description: 'Pibe del barrio dicho con confianza.',
  },
  {
    id: 155,
    word: 'waska',
    description: 'Esperma dicho en forma vulgar.',
  },
  {
    id: 156,
    word: 'yegua',
    description: 'Hembra del caballo o mujer atractiva dicho coloquialmente.',
  },
  {
    id: 157,
    word: 'yerba',
    description: 'Hoja del mate tradicional argentino.',
  },
  {
    id: 158,
    word: 'zafar',
    description: 'Salir ileso o resolver algo de forma improvisada.',
  },
  {
    id: 159,
    word: 'zapas',
    description: 'Zapatillas.',
  },
  {
    id: 160,
    word: 'zurdo',
    description:
      'Persona que usa la mano izquierda o que apoya ideologias politicas de izquierda.',
  },
  {
    id: 161,
    word: 'amaño',
    description: 'Arreglo engañoso o trampa.',
  },
  {
    id: 162,
    word: 'remis',
    description: 'Auto de transporte privado por encargo.',
  },
  {
    id: 163,
    word: 'ladri',
    description: 'Ladron en lunfardo.',
  },
  {
    id: 164,
    word: 'zapan',
    description: 'Juego de silabas para panza',
  },
];

export default SOLUTIONS;
// fijate
