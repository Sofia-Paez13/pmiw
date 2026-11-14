class BarraVida {
  constructor(listaImgs) {
    this.imagenes = listaImgs;
    this.vidaMax = 13;
  }

  mostrar(vidaActual, x, y, w, h) {
    let vidaSegura = constrain(vidaActual, 0, this.vidaMax);
    
    let indice = floor(map(vidaSegura, this.vidaMax, 0, 0, this.imagenes.length - 1));
    indice = constrain(indice, 0, this.imagenes.length - 1);

    if (this.imagenes[indice]) {
      push();
      noSmooth();
      imageMode(CENTER);
      image(this.imagenes[indice], x, y, w, h);
      pop();
    }
  }
}
