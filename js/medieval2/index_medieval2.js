

////////////////////////////////
//JAVASCRIPT DEL JUEGO DE PELEAS
////////////////////////////////

//HUGO GARCIA NIETO - TFG 2º DAW

//seleccionamos el canvas y su contexto
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//cambiamos el tamaño del canvas
canvas.width = 1024;
canvas.height = 576;

//hacemos que el canvas tenga forma de rectangulo
c.fillRect(0, 0, canvas.width, canvas.height);

//añadimos una gravedad para que los personajes caigan tras saltar
const gravity = 0.7

//el fondo será una instanciacion de la clase sprite
const fondo = new Sprite(
    {
        position: {
            x:0,
            y:0
        },
        imgSrc: '../img/assets-fondo/background_medi.png',
        // escala:3.20
        
    }
);

//la tienda tambien será una instanciacion de la clase sprite, incluye escala y framesMax

    
//jugador será una instanciacion de la clase Jugador
//la clase jugador extiende a la clase Sprite
const jugador = new Jugador({
    //posicion inicial
    position: {
        x:100,
        y:0
    },
    //velocidad inicial
    velocity:{
        x:0,
        y:10
    },
    offset: {
        x:0,
        y:0
    },
    imgSrc: '../img/assets-sprites/mago_guerrero/Idle.png',
    //la animacion de estar de pie del samurai tiene 8 frames
    framesMax : 11,
    //escalamos al samurai
    escala:3.5,
    //movemos el hitbox para que coincida con la animacion
    offset:{
        x:215,
        y:229
    },
    //asi obtendremos todas las imagenes de las animaciones (están en la carpeta img)
    //tambien asigaremos el numero de frames maximo para cada animacion
    sprites:{
        //al no hacer nada (default)
        idle:{
            imgSrc : '../img/assets-sprites/mago_guerrero/Idle.png',
            framesMax :  10
        },
        //al correr
        run:{
            imgSrc : '../img/assets-sprites/mago_guerrero/Run.png',
            framesMax :  8
        },
        //al saltar
        jump:{
            imgSrc : '../img/assets-sprites/mago_guerrero/Jump.png',
            framesMax :  3
        } ,
        //al caer
        fall:{
            imgSrc : '../img/assets-sprites/mago_guerrero/Fall.png',
            framesMax :  3
        } ,
        //al atacar
        attack1:{
            imgSrc : '../img/assets-sprites/mago_guerrero/Attack3.png',
            framesMax :  8
        },
        //al recibir daño
        takeHit:{
            imgSrc : '../img/assets-sprites/mago_guerrero/Take_Hit.png',
            framesMax :  3
        },
        //al morir
        death:{
            imgSrc : '../img/assets-sprites/mago_guerrero/Death.png',
            framesMax :  7
        }

    },

    //declaramos el hitbox, que será el espacio en el cual los golpes del samurai
    //tendrán efecto (estará a la derecha)
    ataquesHitbox:{
        offset:{
            x:-40,
            y:50
        },
        width:140,
        height:50
    }

})

//enemigo será una instanciacion de la clase Jugador
const enemigo = new Jugador({
    //posicion inicial
    position: {
        x:400,
        y:0
    },
    //velocidad inicial
    velocity:{
        x:0,
        y:0
    },
    color: 'blue',
    offset: {
        x: -50,
        y:0
    },
    //ruta imagen animacion
    imgSrc: '../img/assets-sprites/mago/Idle.png',
    //la animacion default tiene 4 frames
    framesMax : 10,
    //cambiamos el tamaño
    escala:3,
    //el offset es la diferencia entre el hitbox y el sprite del personaje
    offset:{
        x:100,
        y:377
    },
    //animaciones y sus frames para el ninja
    sprites:{
        //si no nos movemos(default)
        idle:{
            imgSrc : '../img/assets-sprites/mago/Idle.png',
            framesMax :  8
        },
        //al correr
        run:{
            imgSrc : '../img/assets-sprites//mago/Run.png',
            framesMax :  8
        },
        //al saltar
        jump:{
            imgSrc : '../img/assets-sprites/mago/Jump.png',
            framesMax :  2
        },
        //al caer
        fall:{
            imgSrc : '../img/assets-sprites//mago/Fall.png',
            framesMax :  2
        },
        //al atacar
        attack1:{
            imgSrc : '../img/assets-sprites/mago/Attack1.png',
            framesMax :  8
        },
        //al recibir daño
        takeHit:{
            imgSrc :'../img/assets-sprites/mago/Take_Hit.png',
            framesMax :  3
        },
        //cuando ninja muere
        death:{
            imgSrc : '../img/assets-sprites/mago/Death.png',
            framesMax :  7
        }

    },
    //declaramos el hitbox del ninja (estará a la izquierda)
    ataquesHitbox:{
        offset:{
            x:-70,
            y:50
        },
        width:171,
        height:50
    }
})

//declaramos las teclas que vamos a utilizar
const teclas = {
    a: {
        pulsado: false
    },

    d: {
        pulsado: false
    },

    ArrowRight:{
        pulsado: false
    },

    ArrowLeft :{
        pulsado: false
    }
}

//reducimos  un segundo del timer cada 1000ms
restarTiempo();

//funcion para que los jugadores se puedan mover en el canvas
function animar(){

    //animamos cada frame(bucle infinito para refrescar cada ms)
    window.requestAnimationFrame(animar);

    //refrescamos el fondo y la tienda
    fondo.update();

    c.fillStyle = 'rgba(255, 255, 255, 0.07)'
    c.fillRect(0, 0, canvas.width, canvas.height);

    //refrescamos a los personajes enemigo y jugador
    jugador.update();
    enemigo.update();

   

    //establecemos la velocidad en el eje x a 0 (para que el jugador se quede quieto)
    jugador.velocity.x = 0;
    enemigo.velocity.x = 0;

    if (teclas.a.pulsado && jugador.ultimaTecla === "a" && jugador.position.x > -15) {
        jugador.velocity.x = -5;
        jugador.cambiarSprite("run");
    } else if (teclas.d.pulsado && jugador.ultimaTecla === "d" && jugador.position.x < (canvas.width - jugador.width -54) ) {
        jugador.velocity.x = 5;
        jugador.cambiarSprite("run");
    } else {
        jugador.cambiarSprite("idle");
    }



    if (teclas.ArrowLeft.pulsado && enemigo.ultimaTecla === "ArrowLeft" && enemigo.position.x > -230) {
        enemigo.velocity.x = -5;
        enemigo.cambiarSprite("run");
        } else if (teclas.ArrowRight.pulsado && enemigo.ultimaTecla === "ArrowRight" && enemigo.position.x < (canvas.width - enemigo.width -270)) {
            enemigo.velocity.x = 5;
            enemigo.cambiarSprite("run");
        } else {
            enemigo.cambiarSprite("idle");
        }



    //si la velocidad hacia arriba es mayor que cero saltamos
    if(jugador.velocity.y < 0){
        jugador.cambiarSprite('jump')
    //si la velocidad hacia arriba es menor que cero estamos cayendo
    }else if(jugador.velocity.y > 0){
        jugador.cambiarSprite('fall')
    }


    //si la velocidad en el axis y es > 0 saltamos
    if(enemigo.velocity.y < 0){
        enemigo.cambiarSprite('jump')
    //si la velocidad en el axis y es < 0  caemos
    }else if(enemigo.velocity.y > 0){
        enemigo.cambiarSprite('fall')
    }
    
    //detectar colisiones
    if(
    //para el jugador
     rectanguloHitbox({
        //si los rectangulos del hitbox colisionan
        rectangulo1 : jugador,
        rectangulo2:enemigo})
        &&
        //y el frame es el cuarto (esto es para que el daño sea cuando la espada conecta)
        jugador.ataca && jugador.frameActual === 4 && tiempo > 0)
         {
            //recibimos golpe(animacion y daño)
            enemigo.takeHit()
            //quitamos la propiedad de ataque
            jugador.ataca = false
            //cambiamos el tamaño de la salud del enemigo
            document.querySelector('#salud-enemigo').style.width = enemigo.salud + '%';
    }

    //cancelamos la propiedad de ataque cuando se aplica el daño
    if(jugador.ataca && jugador.frameActual === 4){
        jugador.ataca = false
    }
    
    //para el enemigo
    if(
        rectanguloHitbox({
            //si los rectangulos del hitbox colisionan
            rectangulo1 : enemigo,
            rectangulo2: jugador})
             &&
             //y el frame es el segundo (esto es para que el daño sea cuando la espada conecta)
             enemigo.ataca && enemigo.frameActual == 2 && tiempo > 0)
         {
            //recibimos golpe(animacion y daño)
            jugador.takeHit()
            //quitamos la propiedad de ataque
            enemigo.ataca = false
            document.querySelector('#salud-jugador').style.width = jugador.salud + '%';
    }

    //cancelamos la propiedad de ataque cuando se aplica el daño
    if(enemigo.ataca && enemigo.frameActual === 2){
        enemigo.ataca = false
    }

    //terminar juego según la salud
    if(enemigo.salud <= 0 || jugador.salud <= 0){
        decidirGanador({jugador, enemigo,tiempoID})
    }

}

//llamamos a la funcion de animar
animar();

//switch que reacciona cuando pulsamos una tecla (controles)
window.addEventListener('keydown', (event) => {

    if (!jugador.muerto && !enemigo.muerto){
    switch(event.key){
        //teclas del jugador (maysc y minsc)

        //pulsar d (derecha)
        case 'd':
            teclas.d.pulsado = true;
            jugador.ultimaTecla = 'd'
        break
        //pulsar a (izquierda)
        case 'a':
            teclas.a.pulsado = true;
            jugador.ultimaTecla = 'a'
        break
        //pulsar w (salto)
        case 'w':
            if (jugador.velocity.y === 0) jugador.velocity.y = -15;
        break
        // pulsar D (derecha)
        case 'D':
            teclas.d.pulsado = true;
            jugador.ultimaTecla = 'd'
        break
        // pulsar A (izquierda)
        case 'A':
            teclas.a.pulsado = true;
            jugador.ultimaTecla = 'a'
        break
        // pulsar W (salto)
        case 'W':
            if (jugador.velocity.y === 0) jugador.velocity.y = -15;
        break

        case ' ':
            jugador.atacar()
            event.preventDefault();
        break

        //controles enemigo
        //pulsar flecha derecha
        case 'ArrowRight':
            teclas.ArrowRight.pulsado = true;
            enemigo.ultimaTecla = 'ArrowRight';
            
            
        break

        //pulsar flecha izquierda
        case 'ArrowLeft':
            teclas.ArrowLeft.pulsado = true;
            enemigo.ultimaTecla = 'ArrowLeft'
        break
        //pulsar flecha arriba (saltar)
        case 'ArrowUp':
            if (enemigo.velocity.y === 0) enemigo.velocity.y = -15;
            event.preventDefault();
        break
        //pulsar flecha hacia abajo (ataque)
        case 'ArrowDown':
            enemigo.atacar()
            event.preventDefault();
        break

    }
        
    }
})

//switch que reacciona al dejar de pulsar una tecla
window.addEventListener('keyup', (event) => {

    switch(event.key){
        //dejamos de pulsar d (para de correr derecha)
        case 'd':
            teclas.d.pulsado = false;
        break
        //dejamos de pulsar a (para de correr izq)
        case 'a':
            teclas.a.pulsado = false;
        break
        //dejamos de pulsar D (para de correr derecha)
        case 'D':
            teclas.d.pulsado = false;
        break
        //dejamos de pulsar A(para de correr izq)
        case 'A':
            teclas.a.pulsado = false;
        break
    }
        switch(event.key){
        //dejamos de pulsar la flecha derecha (para de correr derecha)
        case 'ArrowRight':
            teclas.ArrowRight.pulsado = false;
        break
        //dejamos de pulsar la flecha izquierda (para de correr izquierda)
        case 'ArrowLeft':
            teclas.ArrowLeft.pulsado = false;
        break

    }
    console.log(event.key);
})

