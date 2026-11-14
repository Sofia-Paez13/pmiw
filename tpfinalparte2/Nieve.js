class CopoDeNieve {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.radio = random(2, 5);
    this.velocidadY = random(1, 3);
    this.velocidadX = random(-0.5, 0.5);
  }

  actualizar() {
    this.y += this.velocidadY;
    this.x += this.velocidadX;

    if (this.y > height) {
      this.y = random(-20, 0);
      this.x = random(width);
    }
  }

  mostrar() {
    push();
    fill(255, 200);
    noStroke();
    ellipse(this.x, this.y, this.radio * 2);
    pop();
  }
}
