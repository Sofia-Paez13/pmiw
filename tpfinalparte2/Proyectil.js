class Proyectil {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velY = 10;
    this.radio = 15;
    this.activo = true;
    this.impactando = false;
    this.frameImpacto = 0;
    this.tiempoAnim = 0;
  }

  actualizar() {
    if (!this.impactando) {
      this.y -= this.velY;
      if (this.y < 0) {
        this.activo = false;
      }
    } else {
      this.tiempoAnim++;
      if (this.tiempoAnim % 5 === 0) {
        this.frameImpacto++;
        if (this.frameImpacto > 2) {
          this.activo = false;
        }
      }
    }
  }

  mostrar(listaSprites) {
    if (listaSprites && listaSprites.length > 0) {
      imageMode(CENTER);
      
      if (!this.impactando) {
        image(listaSprites[0], this.x, this.y, 30, 30);
      } else {
        let indiceSprite = constrain(this.frameImpacto, 1, 2);
        image(listaSprites[indiceSprite], this.x, this.y, 40, 40);
      }
      
      imageMode(CORNER);
    }
  }

  iniciarImpacto() {
    this.impactando = true;
    this.frameImpacto = 1;
    this.tiempoAnim = 0;
  }
}
