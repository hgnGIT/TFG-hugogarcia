//JAVASCRIPT TFG HUGO GARCIA NIETO EXPLORER
//clase para un bloque con el que nos podemos chocar
class bloqueColision {
    constructor({ position, height = 16 }) {
      //la posicion será la actual
      this.position = position
      //el ancho es 16 porque ese es el ancho de las plataformas
      this.width = 16
      //la altura será 16 por default
      this.height = height
    }
  
    //metodo para pintar la plataforma
    draw() {
      //para verlo en pruebas
      c.fillStyle = 'rgba(255, 110, 110, 0.9)'
      //lo pintamos con sus atributos
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
  
    //lo llamamos en update
    update() {
      this.draw()
    }
  }