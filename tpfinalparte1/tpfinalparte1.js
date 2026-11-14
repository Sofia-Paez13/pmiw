// link de youtube:  https://youtu.be/TmD0mswo62s

let misEscenas = [
  "inicio", "cinematica", "caminos", "pueblo", "bruja_charla",
  "bruja_decision", "final1", "final2", "ruta_segura", "atajo_rapido",
  "cueva_oculta", "eleccion", "cueva_interior", "final3", "refugio", "titulos"
];

let misTextos = [
  "", 
  "En las heladas cumbres del Himalaya, una expedición se adentra en busca de un científico desaparecido...", 
  "Llegaste al Himalaya a buscar al científico desaparecido.\nTenés tres caminos posibles para iniciar su búsqueda:", 
  "Llegas a la aldea local y te adentras en el pueblo para hablar con la bruja en su choza.", 
  "Te cuenta la leyenda ancestral del Yeti, un ser sagrado que los protege.\nTe pide que no reveles el secreto.", 
  "¿Guardas el Secreto?", 
  "No encuentras al cientifico, pero descubris el misterio del Yeti \ny respetas el pacto con la bruja.", 
  "Revelas el secreto al mundo. La leyenda se rompe y te perdes en la tormenta mistica, \nSin poder salir de la montaña.", 
  "Seguis avanzando lentamente por el sendero principal para evitar accidentes.", 
  "Seguis avanzando por el atajo rapido. De repente, una avalancha bloquea el paso \ny destruye tu equipo de escalada.", 
  "Llegas a una cueva oculta en la ladera de la montaña.\nEn el suelo encontras una bifurcacion con huellas profundas.", 
  "¿Qué haces?", 
  "Encuentras una pila de huesos y escuchas pasos retumbando cerca tuyo.", 
  "Te encontras cara a cara con el Yeti. Te saca el celular,\npero logras rescatar al cientifico y escapan sanos y salvos.", 
  "Te refugias de emergencia debajo de una cornisa mientras la nieve cae sin parar.", 
  ""
];


let bX = [43, 674, 161, 545, 545, 312, 530, 702, 545, 545, 546, 162, 546, 480, 546, 275];
let bY = [380, 5, 381, 382, 382, 380, 401, 420, 382, 382, 382, 382, 382, 380, 382, 370];
let bW = [168, 112, 153, 92, 92, 78, 116, 82, 92, 92, 92, 130, 92, 158, 92, 220];
let bH = [39, 22, 25, 26, 26, 25, 14, 18, 26, 26, 26, 26, 26, 26, 26, 40];
let bDestino = [1, 2, 3, 4, 5, 6, 15, 15, 10, 14, 11, 7, 13, 15, 7, 0];

let extra2X = [325, 488];
let extra2Y = [381, 381];
let extra2W = [153, 153];
let extra2H = [25, 25];
let extra2Dest = [8, 9];

let extraBrujaX = [410];
let extraBrujaY = [380];
let extraBrujaW = [78];
let extraBrujaH = [25];
let extraBrujaDest = [7];

let extraEleccionX = [520];
let extraEleccionY = [382];
let extraEleccionW = [118];
let extraEleccionH = [26];
let extraEleccionDest = [12];

let pantallaActual = 0;

let nombresDeImagenes = [
  "inicio", "cinematica", "caminos", "pueblo", "bruja_charla",
  "bruja_decision", "final1", "final2", "ruta_segura", "atajo_rapido",
  "cueva_oculta", "eleccion", "cueva_interior", "final3", "refugio"
];

let archivosImagenes = [
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

let fotos = [];
let imgTitulo;
let miMusica;

let posXTexto = -100;
let posYTexto = -50;
let giroTitulo = 0;

let nieveX = [];
let nieveY = [];
let nieveVelocidad = [];
let nieveTamano = [];
let totalCopos = 60;

function preload() {
  for (let i = 0; i < archivosImagenes.length; i++) {
    fotos[i] = loadImage(archivosImagenes[i]);
  }
  
  imgTitulo = loadImage("data/escenas/tituloinicio.png");
  miMusica = loadSound("data/Musica.mp3");
}

function setup() {
  createCanvas(800, 450);
  
  if (miMusica) {
    miMusica.setVolume(0.1);
  }

  for (let i = 0; i < totalCopos; i++) {
    nieveX[i] = random(width);
    nieveY[i] = random(height);
    nieveVelocidad[i] = random(1, 3);
    nieveTamano[i] = random(2, 6);
  }
}

function draw() {
  background(0);
  
  let nombreID = misEscenas[pantallaActual];
  let textoMostrado = misTextos[pantallaActual];

  let indiceFoto = buscarIndiceImagen(nombreID);
  if (indiceFoto !== -1 && fotos[indiceFoto]) {
    image(fotos[indiceFoto], 0, 0, width, height);
  } else if (nombreID === "titulos") {
    background(10, 16, 26);
    fill(160, 210, 255);

    push();
    textSize(21);
    noStroke();
    text("Trabajo Práctico - Elige tu propia aventura", posXTexto, 80);
    text(
      "El libro interactivo 'El abominable hombre de las nieves', perteneciente a la famosa \n coleccion 'Elige tu propia aventura', fue escrito por el autor \n estadounidense Raymond A. Montgomery y publicado \n originalmente en 1982. \n Integrantes: Sofia Lucrecia Paez Zylber y Luisana Berenice Mas",
      0,
      posYTexto
    );
    pop();

    push();
    textSize(30);
    noStroke();
    text("Volver al Menu", 288, 401);
    pop();

    if (posXTexto < 0) posXTexto++;
    if (posYTexto < 200) posYTexto++;
  }

  if (textoMostrado !== "" && nombreID !== "titulos") {
    
    let cajaY = 310;
    let cajaH = 60;
    
    if (pantallaActual === 7) {
      cajaY = 365; 
      cajaH = 55;
    }

    push();
    fill(20, 26, 35); 
    stroke(60, 75, 90);
    strokeWeight(1);
    rect(155, cajaY, 490, cajaH, 6); 

    fill(235, 235, 235);
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    text(textoMostrado, 160, cajaY + 2, 480, cajaH - 4);
    pop();
  }

  if (nombreID === "inicio") {
    posXTexto = -100;
    posYTexto = -50;
    
    caerNieve(nieveX, nieveY, nieveVelocidad, nieveTamano);

    if (imgTitulo) {
      let flotar = sin(giroTitulo) * 6;
      imageMode(CENTER);
      image(imgTitulo, width / 2, 110 + flotar, 500, 140);
      imageMode(CORNER);
      giroTitulo += 0.04;
    }
  }

  let x = bX[pantallaActual];
  let y = bY[pantallaActual];
  let w = bW[pantallaActual];
  let h = bH[pantallaActual];

  if (chequearMouse(x, y, w, h, mouseX, mouseY)) {
    pintarBoton(x, y, w, h);
  }

  if (pantallaActual === 2) {
    for (let i = 0; i < 2; i++) {
      if (chequearMouse(extra2X[i], extra2Y[i], extra2W[i], extra2H[i], mouseX, mouseY)) {
        pintarBoton(extra2X[i], extra2Y[i], extra2W[i], extra2H[i]);
      }
    }
  } else if (pantallaActual === 5) {
    if (chequearMouse(extraBrujaX[0], extraBrujaY[0], extraBrujaW[0], extraBrujaH[0], mouseX, mouseY)) {
      pintarBoton(extraBrujaX[0], extraBrujaY[0], extraBrujaW[0], extraBrujaH[0]);
    }
  } else if (pantallaActual === 11) {
    if (chequearMouse(extraEleccionX[0], extraEleccionY[0], extraEleccionW[0], extraEleccionH[0], mouseX, mouseY)) {
      pintarBoton(extraEleccionX[0], extraEleccionY[0], extraEleccionW[0], extraEleccionH[0]);
    }
  }
}

function caerNieve(px, py, pvel, ptam) {
  fill(255, 255, 255, 200);
  noStroke();

  for (let i = 0; i < px.length; i++) {
    ellipse(px[i], py[i], ptam[i], ptam[i]);
    py[i] += pvel[i];

    if (py[i] > height) {
      py[i] = -5;
      px[i] = random(width);
    }
  }
}

function pintarBoton(x, y, w, h) {
  push();
  fill(255, 255, 255, 50); 
  stroke(255, 255, 255, 240); 
  strokeWeight(2);
  rect(x, y, w, h, 4);
  pop();
}

function mousePressed() {
  if (miMusica && !miMusica.isPlaying()) {
    miMusica.loop();
  }

  let x = bX[pantallaActual];
  let y = bY[pantallaActual];
  let w = bW[pantallaActual];
  let h = bH[pantallaActual];
  let destino = bDestino[pantallaActual];

  if (chequearMouse(x, y, w, h, mouseX, mouseY)) {
    pantallaActual = destino;
    return;
  }

  if (pantallaActual === 2) {
    for (let i = 0; i < 2; i++) {
      if (chequearMouse(extra2X[i], extra2Y[i], extra2W[i], extra2H[i], mouseX, mouseY)) {
        pantallaActual = extra2Dest[i];
        return;
      }
    }
  } else if (pantallaActual === 5) {
    if (chequearMouse(extraBrujaX[0], extraBrujaY[0], extraBrujaW[0], extraBrujaH[0], mouseX, mouseY)) {
      pantallaActual = extraBrujaDest[0];
      return;
    }
  } else if (pantallaActual === 11) {
    if (chequearMouse(extraEleccionX[0], extraEleccionY[0], extraEleccionW[0], extraEleccionH[0], mouseX, mouseY)) {
      pantallaActual = extraEleccionDest[0];
      return;
    }
  }
}

function chequearMouse(x, y, w, h, mx, my) {
  return mx >= x && mx <= x + w && my >= y && my <= y + h;
}

function buscarIndiceImagen(idBuscado) {
  for (let i = 0; i < nombresDeImagenes.length; i++) {
    if (nombresDeImagenes[i] === idBuscado) {
      return i;
    }
  }
  return -1;
}
