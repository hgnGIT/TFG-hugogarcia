//JAVASCRIPT TFG HUGO GARCIA NIETO EXPLORER

//la clase Sprite nos va a servir para el fondo
class Sprite {
  //las variables que hay que pasarle
    constructor({
      //posicion
      position,
      //ruta de la imagen
      imageSrc,
      //frames que va a tener (default 1)
      framesMaximos = 1,

      frameBuffer = 3,
      //escala para manipular el tamaño
      escala = 1,
    }) {
      //obtenemos los valores
      //de la posicion
      this.position = position
      //de la escala
      this.escala = escala
      //si se ha cargado
      this.loaded = false
      //la imagen del fondo
      this.image = new Image()
      //cuando carga escala el ancho
      this.image.onload = () => {
        this.width = (this.image.width / this.framesMaximos) * this.escala
        this.height = this.image.height * this.escala
        this.loaded = true
      }
      //ruta de la imagen
      this.image.src = imageSrc
      //frames maximos
      this.framesMaximos = framesMaximos
      //frame actual
      this.currentFrame = 0
      //frames entrando
      this.frameBuffer = frameBuffer
      //frames pasadas
      this.elapsedFrames = 0
    }
  
    //metodo para pinat el fondo en el canvas
    draw() {
       //si no es la imagen buscada, no ejecuta la función draw
      if (!this.image) return
  
      //recorte del sprite
      //cortamos el png del sprite según su ancho entre el numero de frames de la animación en cuestión
      const cropbox = {
        position: {
          x: this.currentFrame * (this.image.width / this.framesMaximos),
          y: 0,
        },
        width: this.image.width / this.framesMaximos,
        height: this.image.height,
      }
  
      //utilizamos el metodo drawImage para pintar el fondo
      c.drawImage(
        this.image,
        cropbox.position.x,
        cropbox.position.y,
        cropbox.width,
        cropbox.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }
  
    //metodo para actualizar el Sprite del canvas
    update() {
      //lo pintamos
      this.draw()
      //actualizamos los frames
      this.updateFrames()
    }
  
    //actualiamos los frames
    updateFrames() {
      //aumentamos los frames pasados
      this.elapsedFrames++
  
      //si hemos pasado un frame, el frame actual aumenta
      if (this.elapsedFrames % this.frameBuffer === 0) {
        if (this.currentFrame < this.framesMaximos - 1) this.currentFrame++
        else this.currentFrame = 0
      }
    }
  }