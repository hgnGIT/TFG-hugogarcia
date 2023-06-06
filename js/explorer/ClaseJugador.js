//JAVASCRIPT TFG HUGO GARCIA NIETO EXPLORER

//clase jugador que extiende a Sprite
class Player extends Sprite {
    //las variables que utiliza
    constructor({
      //posicion
      position,
      //los arrays de los bloques de colision
      arrayColisionBloques,
      arrayColisionPlataformas,
      //la imagen del sprite
      imageSrc,
      //los frames maximos
      framesMaximos,
      //la escala del personaje
      escala = 0.5,
      //las animaciones disponibles
      animaciones,
    }) {
      //hereda la imagen el framesMaximos y la escala del Sprite creado
      super({ imageSrc, framesMaximos, escala })
      //obtenemos la posicion
      this.position = position
       //obtenemos el movimiento
      this.velocity = {
        x: 0,
        y: 1,
      }
      //obtenemos los arrays de los bloques
      this.arrayColisionBloques = arrayColisionBloques
      this.arrayColisionPlataformas = arrayColisionPlataformas
      //los bloques en los que puede andar nuestro personaje
      this.hitbox = {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        //ancho y alto del personaje
        width: 10,
        height: 10,
      }
      //animaciones que puede realizar el personaje
      this.animaciones = animaciones
      //la posicion default es hacia la derecha
      this.lastDirection = 'right'
  
      //para cambiar las animaciones
      for (let key in this.animaciones) {
        const image = new Image()
        image.src = this.animaciones[key].imageSrc
        this.animaciones[key].image = image
      }
  
      //la camara 
      this.camerabox = {
        //la posicion es la actual del personaje
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        //altura de la camara
        width: 200,
        //anchura de la camara
        height: 80,
      }
    }
  
    //metodo para cambiar el sprite segun la ultima tecla usada
    switchSprite(key) {
      if (this.image === this.animaciones[key].image || !this.loaded) return
      this.currentFrame = 0
      this.image = this.animaciones[key].image
      this.frameBuffer = this.animaciones[key].frameBuffer
      this.framesMaximos = this.animaciones[key].framesMaximos
    }
  
    //metodo para actualizar la camara
    updateCamerabox() {
      this.camerabox = {
        position: {
          x: this.position.x - 50,
          y: this.position.y,
        },
        width: 200,
        height: 80,
      }
    }
  
    //metodo para comprobar si nos hemos chocado con una pared y frena al personaje
    checkForHorizontalCanvasCollision() {
      if (
        this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
        this.hitbox.position.x + this.velocity.x <= 0
      ) {
        this.velocity.x = 0
      }
    }
  
    //metodo para mover la camara a la derecha
    shouldPanCameraToTheLeft({ canvas, camera }) {
      const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
      const scaledDownCanvasWidth = canvas.width / 4
  
      if (cameraboxRightSide >= 576) return
  
      if (
        cameraboxRightSide >=
        scaledDownCanvasWidth + Math.abs(camera.position.x)
      ) {
        camera.position.x -= this.velocity.x
      }
    }
  
    //metodo para mover la camara a la izquierda
    shouldPanCameraToTheRight({ canvas, camera }) {
      if (this.camerabox.position.x <= 0) return
  
      if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
        camera.position.x -= this.velocity.x
      }
    }
  
    //metodo para mover la camara hacia abaho
    shouldPanCameraDown({ canvas, camera }) {
      if (this.camerabox.position.y + this.velocity.y <= 0) return
  
      if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
        camera.position.y -= this.velocity.y
      }
    }
  
    //metodo para mover la camara hacia arriba
    shouldPanCameraUp({ canvas, camera }) {
      if (
        this.camerabox.position.y + this.camerabox.height + this.velocity.y >=
        432
      )
        return
  
      const scaledCanvasHeight = canvas.height / 4
  
      if (
        this.camerabox.position.y + this.camerabox.height >=
        Math.abs(camera.position.y) + scaledCanvasHeight
      ) {
        camera.position.y -= this.velocity.y
      }
    }
  
    //metodo para actualizar al personaje
    update() {
      //actualizamos frames
      this.updateFrames()
      //actualizamos el hitbox
      this.updateHitbox()
      //actualizamos el espacio que ocupa la camara
      this.updateCamerabox()
      //dibujamos al personaje en el mapa
      this.draw()
      //la posicion se actualiza con el movimiento de la velocidad
      this.position.x += this.velocity.x
      //actualizamos el hitbox
      this.updateHitbox()
      //buscamos una colision horizontal
      this.checkForHorizontalCollisions()
      //aplicamos la gravedad
      this.applyGravity()
      //actualizamos el hitbox
      this.updateHitbox()
      //bucamos una colision vertical
      this.checkForVerticalCollisions()
    }
  
    //actualizamos el hitbox
    updateHitbox() {
      this.hitbox = {
        position: {
          x: this.position.x + 35,
          y: this.position.y + 26,
        },
        width: 14,
        height: 27,
      }
    }
  
    //buscamos colisiones horizontales
    checkForHorizontalCollisions() {
      for (let i = 0; i < this.arrayColisionBloques.length; i++) {
        const collisionBlock = this.arrayColisionBloques[i]
  
        if (
          collision({
            object1: this.hitbox,
            object2: collisionBlock,
          })
        ) {
          if (this.velocity.x > 0) {
            this.velocity.x = 0
  
            const offset =
              this.hitbox.position.x - this.position.x + this.hitbox.width
  
            this.position.x = collisionBlock.position.x - offset - 0.01
            break
          }
  
          if (this.velocity.x < 0) {
            this.velocity.x = 0
  
            const offset = this.hitbox.position.x - this.position.x
  
            this.position.x =
              collisionBlock.position.x + collisionBlock.width - offset + 0.01
            break
          }
        }
      }
    }
  
    //aumentamos la velicidad con la gravedad
    applyGravity() {
      this.velocity.y += gravity
      this.position.y += this.velocity.y
    }
  
    //buscamos colisiones verticales
    checkForVerticalCollisions() {
      for (let i = 0; i < this.arrayColisionBloques.length; i++) {
        const collisionBlock = this.arrayColisionBloques[i]
  
        if (
          collision({
            object1: this.hitbox,
            object2: collisionBlock,
          })
        ) {
          if (this.velocity.y > 0) {
            this.velocity.y = 0
  
            const offset =
              this.hitbox.position.y - this.position.y + this.hitbox.height
  
            this.position.y = collisionBlock.position.y - offset - 0.01
            break
          }
  
          if (this.velocity.y < 0) {
            this.velocity.y = 0
  
            const offset = this.hitbox.position.y - this.position.y
  
            this.position.y =
              collisionBlock.position.y + collisionBlock.height - offset + 0.01
            break
          }
        }
      }
  
      // platform collision blocks
      for (let i = 0; i < this.arrayColisionPlataformas.length; i++) {
        const platformCollisionBlock = this.arrayColisionPlataformas[i]
  
        if (
          platformCollision({
            object1: this.hitbox,
            object2: platformCollisionBlock,
          })
        ) {
          if (this.velocity.y > 0) {
            this.velocity.y = 0
  
            const offset =
              this.hitbox.position.y - this.position.y + this.hitbox.height
  
            this.position.y = platformCollisionBlock.position.y - offset - 0.01
            break
          }
        }
      }
    }
  }
  