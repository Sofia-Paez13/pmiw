// link al video:  https://youtu.be/8d9nfd8gpks

let escenas = [
  // 0
  ["inicio", [
    [43, 380, 168, 39, 1]
  ], ""],

  // 1
  ["cinematica", [
    [674, 5, 112, 22, 2]
  ], "En las heladas cumbres del Himalaya, una expedición se adentra en busca de un científico desaparecido..."],

  // 2
  ["caminos", [
    [161, 381, 153, 25, 3],
    [325, 381, 153, 25, 8],
    [488, 381, 153, 25, 9]
  ], "Llegaste al Himalaya a buscar al científico desaparecido.\nTenés tres caminos posibles para iniciar su búsqueda:"],

  // 3
  ["pueblo", [
    [545, 382, 92, 26, 4]
  ], "Llegas a la aldea local y te adentras en el pueblo para hablar con la bruja en su choza."],

  // 4
  ["bruja_charla", [
    [545, 382, 92, 26, 5]
  ], "Te cuenta la leyenda ancestral del Yeti, un ser sagrado que los protege.\nTe pide que no reveles el secreto."],

  // 5
  ["bruja_decision", [
    [312, 380, 78, 25, 6],
    [410, 380, 78, 25, 7]
  ], "¿Guardas el Secreto?"],

  // 6
  ["final1", [
    [530, 401, 116, 14, 15]
  ], "No encuentras al cientifico, pero descubris el misterio del Yeti \ny respetas el pacto con la bruja."],

  // 7
  ["final2", [
    [702, 420, 82, 18, 15]
  ], "Revelas el secreto al mundo. La leyenda se rompe y te perdes en la tormenta mistica, \nSin poder salir de la montaña."],

  // 8
  ["ruta_segura", [
    [545, 382, 92, 26, 10]
  ], "Seguis avanzando lentamente por el sendero principal para evitar accidentes."],

  // 9
  ["atajo_rapido", [
    [545, 382, 92, 26, 14]
  ], "Seguis avanzando por el atajo rapido. De repente, una avalancha bloquea el paso \ny destruye tu equipo de escalada."],

  // 10
  ["cueva_oculta", [
    [546, 382, 92, 26, 11]
  ], "Llegas a una cueva oculta en la ladera de la montaña.\nEn el suelo encontras una bifurcacion con huellas profundas."],

  // 11
  ["eleccion", [
    [162, 382, 130, 26, 7],
    [520, 382, 118, 26, 12]
  ], "¿Qué haces?"],

  // 12
  ["cueva_interior", [
    [546, 382, 92, 26, 13]
  ], "Encuentras una pila de huesos y escuchas pasos retumbando cerca tuyo."],

  // 13
  ["final3", [
    [480, 380, 158, 26, 15]
  ], "Te encontras cara a cara con el Yeti. Te saca el celular,\npero logras rescatar al cientifico y escapan sanos y salvos."],

  // 14
  ["refugio", [
    [546, 382, 92, 26, 7]
  ], "Te refugias de emergencia debajo de una cornisa mientras la nieve cae sin parar."],

  // 15
  ["titulos", [
    [275, 370, 220, 40, 0]
  ], ""]
];

let estado = 0;

let nombresImagenes = [
  "inicio", "cinematica", "caminos", "pueblo", "bruja_charla",
  "bruja_decision", "final1", "final2", "ruta_segura", "atajo_rapido",
  "cueva_oculta", "eleccion", "cueva_interior", "final3", "refugio"
];

let rutasImagenes = [
  "data/escenas/pantallainicio.jpg",
  "data/escenas/cinematica.png",
  "data/escenas/elecciondecaminos.png",
  "data/escenas/camino1.png",
  "data/escenas/camino1b.png",
  "data/escenas/guardaselsecreto.png",
  "data/escenas/finalguardaselsecreto.png",
  "data/escenas/finalnoguardaselsecreto.png",
  "data/escenas/camino2.png",
  "data/escenas/atajorapido.png",
  "data/escenas/camino2b.png",
  "data/escenas/quehaces.png",
  "data/escenas/seguirhuellas.png",
  "data/escenas/final3.png",
  "data/escenas/atajorapidob.png"
];

let listaImagenes = [];
let titulo;

let animX = -100;
let animY = -50;
let musica;

let anguloTitulo = 0;
let copos = [];
let cantidadCopos = 60;

function preload() {
  for (let i = 0; i < rutasImagenes.length; i++) {
    listaImagenes[i] = loadImage(rutasImagenes[i]);
  }
  
  titulo = loadImage("data/escenas/tituloinicio.png");
  musica = loadSound("data/Musica.mp3");
}

function setup() {
  createCanvas(800, 450);
  if (musica) {
    musica.setVolume(0.1);
  }

  for (let i = 0; i < cantidadCopos; i++) {
    copos[i] = [random(width), random(height), random(1, 3), random(2, 6)];
  }
}

function draw() {
  background(0);
  let escenaActual = escenas[estado];
  let idActual = escenaActual[0];
  let opcionesActuales = escenaActual[1];
  let textoEscena = escenaActual[2];

  
  let indiceImagen = obtenerIndiceImagen(idActual);
  if (indiceImagen !== -1 && listaImagenes[indiceImagen]) {
    image(listaImagenes[indiceImagen], 0, 0, width, height);
  } else if (idActual === "titulos") {
    background(10, 16, 26);
    fill(160, 210, 255);

    push();
    textSize(21);
    noStroke();
    text("Visión general creada por IA", animX, 80);
    text(
      "El libro interactivo 'El abominable hombre de las nieves', perteneciente a la famosa \n coleccion 'Elige tu propia aventura', fue escrito por el autor \n estadounidense Raymond A. Montgomery y publicado \n originalmente en 1982.",
      0,
      animY
    );
    pop();

    push();
    textSize(30);
    noStroke();
    text("Volver al Menu", 288, 401);
    pop();

    if (animX < 0) animX++;
    if (animY < 200) animY++;
  }


  if (textoEscena !== "" && idActual !== "titulos") {
    push();

    fill(20, 26, 35); 
    stroke(60, 75, 90);
    strokeWeight(1);
    

    rect(155, 310, 490, 60, 6); 

 
    fill(235, 235, 235);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(textoEscena, 160, 312, 480, 56);
    pop();
  }

 
  if (idActual === "inicio") {
    animX = -100;
    animY = -50;
    dibujarNieve();

    if (titulo) {
      let offset = sin(anguloTitulo) * 6;
      imageMode(CENTER);
      image(titulo, width / 2, 110 + offset, 500, 140);
      imageMode(CORNER);
      anguloTitulo += 0.04;
    }
  }

  
  for (let i = 0; i < opcionesActuales.length; i++) {
    let opc = opcionesActuales[i];
    let x = opc[0];
    let y = opc[1];
    let w = opc[2];
    let h = opc[3];

    if (mouseSobreArea(x, y, w, h)) {
      push();
      fill(255, 255, 255, 50); 
      stroke(255, 255, 255, 240); 
      strokeWeight(2);
      rect(x, y, w, h, 4);
      pop();
    }
  }
}

function dibujarNieve() {
  fill(255, 255, 255, 200);
  noStroke();

  for (let i = 0; i < copos.length; i++) {
    let copo = copos[i];
    ellipse(copo[0], copo[1], copo[3], copo[3]);
    copo[1] += copo[2];

    if (copo[1] > height) {
      copo[1] = -5;
      copo[0] = random(width);
    }
  }
}

function mousePressed() {
  let opcionesActuales = escenas[estado][1];

  if (musica && !musica.isPlaying()) {
    musica.loop();
  }

  for (let i = 0; i < opcionesActuales.length; i++) {
    let opc = opcionesActuales[i];
    let x = opc[0];
    let y = opc[1];
    let w = opc[2];
    let h = opc[3];
    let destino = opc[4];

    if (mouseSobreArea(x, y, w, h)) {
      estado = destino;
      break;
    }
  }
}

function mouseSobreArea(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function obtenerIndiceImagen(id) {
  for (let i = 0; i < nombresImagenes.length; i++) {
    if (nombresImagenes[i] === id) {
      return i;
    }
  }
  return -1;
}
