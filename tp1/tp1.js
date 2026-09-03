let pantalla = 0;
let Coco = [];
let fondo, musica, pasos;

let posX = -100;
let posY = 260;
let estadoCoco = "ENTRANDO";

let frameActual = 0;
let tFrame = 0;
let tCentro = 0;

let duracionFrame = 120;
let vel = 150;
let tiempoCentro = 3000;

function preload() {
  for (let i = 0; i < 9; i++) {
    Coco[i] = loadImage("data/Coco/" + nf(i, 3) + ".png");
  }
  fondo = loadImage("data/fondo.png");
  pasos = loadSound("data/Caminar.mp3");
  musica = loadSound("data/MusicaAmbiente.mp3");
}

function setup() {
  createCanvas(800, 600);
  musica.setVolume(0.1);
}

function draw() {
  if (pantalla === 0) {
    background(0);
    image(fondo, 0, 0, 800, 600);
    hacerBoton(width / 2, height / 2, 200, 100, "Comenzar");
  } else if (pantalla === 1) {
    animacionPrincipal();
  }
}

function animacionPrincipal() {
  image(fondo, 0, 0, 800, 600);

  let movimiento = (vel * deltaTime) / 1000;

  if (estadoCoco === "ENTRANDO") {
    posX += movimiento;
    frameActual = cambiarFrame(3, 8, duracionFrame);
    
    if (posX >= width / 2 - 50) {
      estadoCoco = "CENTRO";
      frameActual = 1;
      tCentro = 0;
      if (pasos.isPlaying()) {
        pasos.stop();
      }
    }
  } else if (estadoCoco === "CENTRO") {
    frameActual = cambiarFrame(1, 2, 250);
    tCentro += deltaTime;

    if (tCentro >= tiempoCentro) {
      estadoCoco = "SALIENDO";
      frameActual = 3;
      if (!pasos.isPlaying()) {
        pasos.loop();
      }
    }
  } else if (estadoCoco === "SALIENDO") {
    posX += movimiento;
    frameActual = cambiarFrame(3, 8, duracionFrame);

    if (posX > width + 100) {
      reset();
    }
  }

  image(Coco[frameActual], posX, posY, 150, 150);
}

function hacerBoton(x, y, w, h, txt) {
  push();
  fill(0);
  rectMode(CENTER);
  rect(x, y, w, h);
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(txt, x, y);
  pop();
}

function cambiarFrame(fMin, fMax, tiempo) {
  tFrame += deltaTime;

  if (tFrame >= tiempo) {
    frameActual++;
    tFrame = 0;

    if (frameActual > fMax || frameActual < fMin) {
      frameActual = fMin;
    }
  }
  return frameActual;
}

function checkClick(bx, by, bw, bh) {
  return mouseX >= bx - bw / 2 && mouseX <= bx + bw / 2 && mouseY >= by - bh / 2 && mouseY <= by + bh / 2;
}

function reset() {
  pantalla = 0;
  estadoCoco = "ENTRANDO";
  posX = -100;
  frameActual = 0;
  tFrame = 0;
  tCentro = 0;
  
  if (pasos.isPlaying()) pasos.stop();
  if (musica.isPlaying()) musica.stop();
}

function mousePressed() {
  if (pantalla === 0) {
    if (checkClick(width / 2, height / 2, 200, 100)) {
      pantalla = 1;
      if (!musica.isPlaying()) {
        musica.loop();
      }
      pasos.loop();
    }
  }
}
