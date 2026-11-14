// link de youtube:  https://youtu.be/vwyDF_vBpAM

let imgFondo;
let yetiSprites = [];
let vidaSprites = [];
let balaSprites = [];

let musica;
let sonidoYeti;
let yetiSonidoReproducido = false;

let yeti;
let barraVida;
let jugador;
let proyectiles = [];
let copos = [];

let estadoJuego = "MENU"; 

let ultimoDisparo = 0;
let cadenciaDisparo = 300; 

let posYCreditos = 400;

function preload() {
  imgFondo = loadImage("data/img/Escenario.png");
  musica = loadSound("data/Musica.mp3");
  sonidoYeti = loadSound("data/Yeti.mp3");

  for (let i = 1; i <= 3; i++) {
    let numStr = nf(i, 3);
    balaSprites.push(loadImage("data/img/Nieve/" + numStr + ".png"));
  }

  for (let i = 1; i <= 22; i++) {
    let numStr = nf(i, 3);
    yetiSprites.push(loadImage("data/img/Yeti/" + numStr + ".png"));
  }

  for (let i = 1; i <= 13; i++) {
    let numStr = nf(i, 3);
    vidaSprites.push(loadImage("data/img/Vida/" + numStr + ".png"));
  }
}

function setup() {
  createCanvas(800, 400);
  
if (musica) {
    musica.setVolume(0.1);
    musica.loop();
  }

  if (sonidoYeti) {
    sonidoYeti.setVolume(0.4);
  }

  yeti = new Yeti(yetiSprites);
  barraVida = new BarraVida(vidaSprites);
  jugador = new Jugador();

  for (let i = 0; i < 100; i++) {
    copos.push(new CopoDeNieve());
  }
}

function draw() {
  background(0);

  if (imgFondo) {
    image(imgFondo, 0, 0, width, height);
  }

  for (let copo of copos) {
    copo.actualizar();
    copo.mostrar();
  }

  if (estadoJuego === "MENU") {
    dibujarMenu();
  } 
  else if (estadoJuego === "INSTRUCCIONES") {
    dibujarInstrucciones();
  }
  else if (estadoJuego === "CREDITOS") {
    dibujarCreditos();
  }
  else if (estadoJuego === "INTRO") {
    if (sonidoYeti && !yetiSonidoReproducido) {
      sonidoYeti.play();
      yetiSonidoReproducido = true;
    }
    
    yeti.actualizarIntro();
    yeti.mostrar();
    jugador.mostrar();

    if (yeti.introTerminada) {
      estadoJuego = "JUEGO";
    }
  } 
  else if (estadoJuego === "JUEGO") {
    jugador.actualizar();
    jugador.mostrar();

    yeti.actualizarCombate(jugador.y);
    yeti.mostrar();

    for (let i = proyectiles.length - 1; i >= 0; i--) {
      proyectiles[i].actualizar();
      proyectiles[i].mostrar(balaSprites);

      if (proyectiles[i].activo && !proyectiles[i].impactando && yeti.colisionaCon(proyectiles[i])) {
        yeti.recibirDanio();
        proyectiles[i].iniciarImpacto();
      }

      if (!proyectiles[i].activo) {
        proyectiles.splice(i, 1);
      }
    }

    barraVida.mostrar(yeti.vida, width / 2, 35, 220, 25);

    if (yeti.derrotado) {
      estadoJuego = "VICTORIA";
    } else if (yeti.llegoAlJugador) {
      estadoJuego = "GAME_OVER";
    }
  } 
  else if (estadoJuego === "VICTORIA") {
    fill(0, 160);
    rect(0, 0, width, height);

    fill(255, 255, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("¡VICTORIA! DERROTASTE AL YETI", width / 2, height / 2 - 40);

    dibujarBoton("CREDITOS", width / 2, height / 2 + 20, 220, 45);
  } 
  else if (estadoJuego === "GAME_OVER") {
    fill(0, 160);
    rect(0, 0, width, height);

    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("¡GAME OVER! EL YETI TE ALCANZÓ", width / 2, height / 2 - 40);

    dibujarBoton("CREDITOS", width / 2, height / 2 + 20, 220, 45);
  }
}

function dibujarMenu() {
  fill(0, 150);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(42);
  text("ATAQUE DEL YETI", width / 2, 90);

  dibujarBoton("JUGAR", width / 2, 170, 200, 40);
  dibujarBoton("INSTRUCCIONES", width / 2, 230, 200, 40);
  dibujarBoton("CRÉDITOS", width / 2, 290, 200, 40);
}

function dibujarInstrucciones() {
  fill(0, 180);
  rect(0, 0, width, height);

  fill(255);
  textSize(28);
  textAlign(CENTER, CENTER);
  text("CÓMO JUGAR", width / 2, 55);

  textSize(16);
  text("• Movimiento: Flechas Izquierda / Derecha (o teclas A y D).", width / 2, 120);
  text("• Disparar: Barra Espaciadora para lanzar bolas de nieve.", width / 2, 160);
  text("• Objetivo: Evita que el Yeti llegue abajo de la cueva", width / 2, 200);
  text("y vacía su barra de vida antes de que se acabe el tiempo.", width / 2, 225);
  
  if (yetiSprites.length > 0) {
    imageMode(CENTER);
    image(yetiSprites[0], width / 2, 285, 60, 60);
    imageMode(CORNER);
  }

  dibujarBoton("VOLVER", width / 2, 350, 150, 35);
}

function dibujarCreditos() {
  fill(0, 190);
  rect(0, 0, width, height);

  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  let x = width / 2;
  let y = posYCreditos;

  text("--- ATAQUE DEL YETI ---", x, y);
  text("Desarrollado para la materia de Programación", x, y + 40);
  text("Juego tipo Shooter con Programación Orientada a Objetos", x, y + 80);
  text("Hecho por: Sofia Lucrecia Paez Zylber y Luisana Berenice Massa", x, y + 120);
  text("Assets Gráficos y Sonoros:", x, y + 160);
  text("• Sprites del Yeti (22 frames)", x, y + 195);
  text("• Barra de Vida y Proyectiles animados", x, y + 230);
  text("• Escenario de Cueva y Efectos de Nieve", x, y + 265);
  text("¡Gracias por jugar!", x, y + 325);

  pop();

  posYCreditos -= 0.8;

  if (posYCreditos < -350) {
    posYCreditos = 450;
  }

  dibujarBoton("VOLVER", width / 2, 350, 150, 35);
}

function dibujarBoton(etiqueta, bx, by, bw, bh) {
  let x1 = bx - bw / 2;
  let y1 = by - bh / 2;

  if (mouseX >= x1 && mouseX <= x1 + bw && mouseY >= y1 && mouseY <= y1 + bh) {
    fill(70, 130, 250);
  } else {
    fill(40, 90, 180);
  }

  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  rect(bx, by, bw, bh, 8);
  rectMode(CORNER);

  noStroke();
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(etiqueta, bx, by);
}

function mousePressed() {
  if (musica && !musica.isPlaying()) {
    musica.loop();
  }

  if (estadoJuego === "MENU") {
    if (mouseOverBoton(width / 2, 170, 200, 40)) {
      estadoJuego = "INTRO";
      yeti.reiniciar();
      yetiSonidoReproducido = false;
      proyectiles = [];
    }
    else if (mouseOverBoton(width / 2, 230, 200, 40)) {
      estadoJuego = "INSTRUCCIONES";
    }
    else if (mouseOverBoton(width / 2, 290, 200, 40)) {
      estadoJuego = "CREDITOS";
      posYCreditos = 400;
    }
  } 
    else if (estadoJuego === "INSTRUCCIONES" || estadoJuego === "CREDITOS") {
    let btnY = 350; 
    if (mouseOverBoton(width / 2, btnY, 150, 35)) {
      estadoJuego = "MENU";
    }
  }
    else if (estadoJuego === "VICTORIA" || estadoJuego === "GAME_OVER") {
    if (mouseOverBoton(width / 2, height / 2 + 20, 220, 45)) {
      estadoJuego = "CREDITOS";
      posYCreditos = 400;
      yeti.reiniciar();
      proyectiles = [];
    }
  }
}

function mouseOverBoton(bx, by, bw, bh) {
  let x1 = bx - bw / 2;
  let y1 = by - bh / 2;
  return (mouseX >= x1 && mouseX <= x1 + bw && mouseY >= y1 && mouseY <= y1 + bh);
}

function keyPressed() {
  if (estadoJuego === "JUEGO" && key === ' ') {
    let tiempoActual = millis();
    if (tiempoActual - ultimoDisparo > cadenciaDisparo) {
      let nuevoProyectil = new Proyectil(jugador.x, jugador.y - 20);
      proyectiles.push(nuevoProyectil);
      ultimoDisparo = tiempoActual;
    }
  }
}
