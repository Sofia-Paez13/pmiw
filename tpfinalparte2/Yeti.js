class Yeti {
  constructor(listaImgs) {
    this.imagenes = listaImgs;
    this.reiniciar();
  }

  reiniciar() {
    this.x = width / 2;
    this.y = 110;       
    this.z = 0.2;       
    this.vida = 13;     
    this.frameActual = 0;
    this.tiempoAnim = 0;
    this.radioColision = 30;
    this.derrotado = false;
    this.llegoAlJugador = false;
    this.introTerminada = false;
  }

  actualizarIntro() {
    this.z += 0.003; 
    this.z = constrain(this.z, 0.2, 0.4);

    this.y = lerp(110, 170, (this.z - 0.2) / 0.2);

    this.tiempoAnim++;
    if (this.tiempoAnim % 5 === 0) {
      this.frameActual = (this.frameActual + 1) % this.imagenes.length;
    }

    if (this.z >= 0.4) {
      this.introTerminada = true;
    }
  }

  actualizarCombate(posYJugador) {
    if (this.derrotado || this.llegoAlJugador) return;

    let amplitudX = 130 + (this.z * 90);
    this.x = width / 2 + sin(frameCount * 0.025) * amplitudX;
    this.z += 0.0006; 
    this.z = constrain(this.z, 0.4, 1);
    this.y = lerp(170, 360, (this.z - 0.4) / 0.6);
    this.radioColision = lerp(35, 60, this.z);
    let tamDibujo = lerp(80, 230, this.z);
    let parteInferiorYeti = this.y + (tamDibujo / 2);

    if (parteInferiorYeti >= posYJugador || this.z >= 1) {
      this.llegoAlJugador = true;
    }

    this.tiempoAnim++;
    if (this.tiempoAnim % 6 === 0) {
      this.frameActual = (this.frameActual + 1) % this.imagenes.length;
    }
  }

  mostrar() {
    let imgFrame = this.imagenes[this.frameActual];
    if (imgFrame && !this.derrotado) {
      imageMode(CENTER);
      let tamDibujo = lerp(80, 230, this.z);
      image(imgFrame, this.x, this.y, tamDibujo, tamDibujo);
      imageMode(CORNER);
    }
  }

  recibirDanio() {
    this.vida--;
    if (this.vida <= 0) {
      this.derrotado = true;
    }
  }

  colisionaCon(proyectil) {
    let d = dist(proyectil.x, proyectil.y, this.x, this.y);
    return d < (proyectil.radio + this.radioColision);
  }
}
