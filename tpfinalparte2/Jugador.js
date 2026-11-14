class Jugador {
  constructor() {
    this.x = width / 2;
    this.y = 360;
    this.ancho = 50;
    this.alto = 50;
    this.velocidad = 6;
  }

  actualizar() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= this.velocidad;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += this.velocidad;
    }


    this.x = constrain(this.x, 40, width - 40);
  }

  mostrar() {
    push();
    fill(100, 200, 255);
    stroke(255);
    strokeWeight(2);
    rectMode(CENTER);
    rect(this.x, this.y, this.ancho, this.alto, 8);
    pop();
  }
}
