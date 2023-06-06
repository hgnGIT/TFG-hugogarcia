//JAVASCRIPT TFG HUGO GARCIA NIETO EXPLORER
//SCRIPT PRINCIPAL PARA EL JUEGO EXPLORER
//SELECCIONAMOS EL CANVAS
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//LE ASIGNAMOS UN ALTO Y ANCHO
canvas.width = 1024
canvas.height = 576

//dividimos el canvas en 4
const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
}

//crearemos un array bidimensional
//mientras que sea menor que la longitud
//las filas son de 36, buscamos una colision cada 36 espacios recorridos
const colisiones_con_suelo2D = []
for (let i = 0; i < colisiones_con_suelo.length; i += 36) {
  //creamos un subarray, con slice sacamos una fila, desde 0 hasta 36
  //como hemos hecho i+=36, saltará a la siguiente fila
  colisiones_con_suelo2D.push(colisiones_con_suelo.slice(i, i + 36))
}

//creamos un array para guardar los bloques con los que puedes colisionar
const arrayColisionBloques = []
//vamos a recorrerlo por cada fila
colisiones_con_suelo2D.forEach((row, y) => {
  //buscamos simbolos de 202
  //cada vez que haya un 202 dibujamos un bloque de colisión
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      //añadimos el bloque al array de bloques de colisión
      arrayColisionBloques.push(
        //creamos el bloque con la posición correspondiente por 16
        new bloqueColision({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      )
    }
  })
})

//crearemos un array bidimensional
//mientras que sea menor que la longitud
//las filas son de 36, buscamos una colision cada 36 espacios recorridos
const colisiones_con_plataforma2D = []
for (let i = 0; i < colisiones_con_plataforma.length; i += 36) {
    //creamos un subarray, con slice sacamos una fila, desde 0 hasta 36
  //como hemos hecho i+=36, saltará a la siguiente fila
  colisiones_con_plataforma2D.push(colisiones_con_plataforma.slice(i, i + 36))
}

//creamos un array para guardar los bloques de plataformas con los que puedes colisionar 
const arrayColisionPlataformas = []
//buscamos según filas, y la 'y' es la altura, y es el index
colisiones_con_plataforma2D.forEach((row, y) => {
  //buscamos según filas, y la 'x' es la posicion horizontal
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      //añadimos el bloque al array de bloques de colisión
      arrayColisionPlataformas.push(
        new bloqueColision({
          //creamos el bloque con la posición correspondiente por 16
          position: {
            x: x * 16,
            y: y * 16,
          },
          //altura de 4 para que el personaje pueda estar encima
          height: 4,
        })
      )
    }
  })
})

//creamos la gravedad
const gravity = 0.1

//instanciamos a nuestro personaje
const player = new Player({

  //lo colocamos en el fondo
  position: {
    x: 104,
    y: 300,
  },
  //añadimos los bloques de colision al personaje
  arrayColisionBloques,
  arrayColisionPlataformas,

  //añadimos los sprites al personaje
  //sprite default
  imageSrc: '../img/assets-sprites/explorer/Idle.png',
  //tiene un total de 8 frames
  framesMaximos: 8,

  //las distintas animaciones que puede realizar 
  animaciones: {
    //animacion estática
    Idle: {
      imageSrc: '../img/assets-sprites/explorer/Idle.png',
      //tiene 8 frames
      framesMaximos: 8,
      frameBuffer: 4,
    },
    //animacion de correr
    Run: {
      imageSrc: '../img/assets-sprites/explorer/Run.png',
      framesMaximos: 8,
      frameBuffer: 5,
    },
    //animacion de saltar
    Jump: {
      imageSrc: '../img/assets-sprites/explorer/Jump.png',
      framesMaximos: 2,
      frameBuffer: 3,
    },
    //animacion de caer
    Fall: {
      imageSrc: '../img/assets-sprites/explorer/Fall.png',
      framesMaximos: 2,
      frameBuffer: 3,
    },
    //animacion de caer a la izquierda
    FallLeft: {
      imageSrc: '../img/assets-sprites/explorer/FallLeft.png',
      framesMaximos: 2,
      frameBuffer: 3,
    },
    //animacion de correr a la izquierda
    RunLeft: {
      imageSrc: '../img/assets-sprites/explorer/RunLeft.png',
      framesMaximos: 8,
      frameBuffer: 5,
    },
    //animacion estática a la izquierda
    IdleLeft: {
      imageSrc: '../img/assets-sprites/explorer/IdleLeft.png',
      framesMaximos: 8,
      frameBuffer: 4,
    },
    //animacion de saltar a la izquierda
    JumpLeft: {
      imageSrc: '../img/assets-sprites/explorer/JumpLeft.png',
      framesMaximos: 2,
      frameBuffer: 3,
    },
  },
})

//teclas pulsadas, se usa para cambiar la animacion
const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
}

//el fondo será un sprite que ocupa todo el canvas 
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  //ruta de la imagen
  imageSrc: '../img/assets-fondo/bgexp.png',
})

//alto de la imagen de fondo
const backgroundImageHeight = 432

//la camara empieza en el suelo y nos sigue cuando saltamos en el eje y
const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
}

//funcion para animar personajes, fondo etc
function animate() {
  //con esto hacemos un bucle infinito
  window.requestAnimationFrame(animate)
  //rellenamos el canvas
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  //The CanvasRenderingContext2D.save() method of the Canvas 2D API saves the entire state of the canvas by pushing the current state onto a stack.
  c.save()
  //escalamos para que se divida en 4
  c.scale(4, 4)
  c.translate(camera.position.x, camera.position.y)
  background.update()

  //buscamos si el jugador se ha chocado con algo
  player.checkForHorizontalCanvasCollision()
  //actualizamos la posición del personaje
  player.update()

  //para detectar para que lado deberia moverse el personaje
  //la velocidad incial es 0
  player.velocity.x = 0

  if (keys.d.pressed) {
    //al pulsar para la dercha el personaje cambia a la animación de correr
    player.switchSprite('Run')
    //el jugador se desplaza en el eje x hacia la derecha
    player.velocity.x = 2
    //registramos la última direccion del personaje
    player.lastDirection = 'right'
    // la camara irá hacia la izquierda
    player.shouldPanCameraToTheLeft({ canvas, camera })

  } else if (keys.a.pressed) {
    //al pulsar para la dercha el personaje cambia a la animación de correr
    player.switchSprite('RunLeft')
    //el jugador se desplaza en el eje x hacia la izquierda
    player.velocity.x = -2
    //registramos la última direccion del personaje
    player.lastDirection = 'left'
    // la camara irá hacia la derecha
    player.shouldPanCameraToTheRight({ canvas, camera })

    //cuando el jugador se para
  } else if (player.velocity.y === 0) {
    //si la última posición fue la derecha la animación estática es la derecha
    if (player.lastDirection === 'right') player.switchSprite('Idle')
    //y en el caso opuesto es la izquierda
    else player.switchSprite('IdleLeft')
  }

  //para detectar para que lado salta el personaje

  //si el jugador esta cayendo
  if (player.velocity.y < 0) {
    //la camara debe moverse hacia abajo
    player.shouldPanCameraDown({ camera, canvas })
    //cambiamos la animacion de caida según la útltima posicion
    if (player.lastDirection === 'right') player.switchSprite('Jump')
    else player.switchSprite('JumpLeft')

    //si el jugador está saltando
  } else if (player.velocity.y > 0) {
    //la camara se movera hacia arriba
    player.shouldPanCameraUp({ camera, canvas })
    //cambiamos la animacion de salto según la útltima posicion
    if (player.lastDirection === 'right') player.switchSprite('Fall')
    else player.switchSprite('FallLeft')
  }

  //con c.restore reseteamos la animación
  c.restore()
}

//llamamos a la funcion de animar
animate()


//event listeners para cuando se presiona una tecla, para wasd, flechas y espacio
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    //para la derecha
    case 'd':
      keys.d.pressed = true
      break
    //para la izquuerda
    case 'a':
      keys.a.pressed = true
      break
    //para saltar
    case 'w':
      if(player.velocity.y===0)player.velocity.y = -4
      event.preventDefault();
      break
    //para la derecha
    case 'D':
      keys.d.pressed = true
      break
    //para la izquierda
    case 'A':
      keys.a.pressed = true
      break
    //para saltar
    case 'W':
      if(player.velocity.y===0)player.velocity.y = -4
      event.preventDefault();
      break
    //para la izquierda con flecha
    case 'ArrowLeft':
      keys.a.pressed = true
      break
    //para la derecha con flecha
    case 'ArrowRight':
      keys.d.pressed = true
      break
     //para saltar
    case ' ':
      if(player.velocity.y===0)player.velocity.y = -4
      event.preventDefault();
      break
      //para saltar
      case 'ArrowUp':
        if(player.velocity.y===0)player.velocity.y = -3.6
      event.preventDefault();
      break
      //para evitarque baje la pantalla con la flecha ed abajo
      case 'ArrowDown':
      event.preventDefault();
      break
  }
})


//event listener para cuando se deja de pulsar una tecla
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    //levantamos derecha
    case 'd':
      keys.d.pressed = false
      break
    //levantamos izquierda
    case 'a':
      keys.a.pressed = false
      break
     //levantamos derecha
      case 'D':
      keys.d.pressed = false
      break
     //levantamos izquierda
    case 'A':
      keys.a.pressed = false
      break
     //levantamos flecha derecha
    case 'ArrowRight':
      keys.d.pressed = false
      break
     //levantamos flecha izquierda
    case 'ArrowLeft':
      keys.a.pressed = false
      break
  }
})