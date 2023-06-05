//clase para los personajes encima del canvas ( serán JUGADOR Y ENEMIGO)
//se usa para el fondo, la tienda y los dos personajes
class Sprite {
            
    //creamos el constructor
    constructor({position, imgSrc,escala = 1, framesMax = 1, offset = {x:0,y:0}}){

        //obtenemos la posicion del jugador / enemigo
        this.position = position;
        //establecemos el tamaño del sprite
        this.width = 50;
        this.height = 150;
        this.img = new Image()
        //utilizamos la funcion Image para definir el Sprite
        this.img.src = imgSrc
        //escalamos el sprite
        this.escala = escala
        //para el numero maximo de frames
        this.framesMax = framesMax
        //frame inicial
        this.frameActual = 0
        //frames que ya han pasado
        this.framesPasadas = 0
        this.framesMantener = 8,
        this.offset = offset

    }

    //METODOS DE SPRITE

    //con esta funcion 'dibujamos' (colocamos en el canvas)
    //al jugador o al enemigo
    draw() {
        //El método dibuja una imagen, lona, o un vídeo sobre el lienzo.
        //El método también puede dibujar partes de una imagen, y / o aumentar / reducir el tamaño de la imagen.
        c.drawImage(
            this.img,
            this.frameActual * (this.img.width/ this.framesMax),
            0,
            this.img.width / this.framesMax,
            this.img.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y, 
            (this.img.width  / this.framesMax)* this.escala,
            this.img.height * this.escala)
    }   

    animarFrames(){

        //aumentamos los frames cada ms
        this.framesPasadas++

        //para volver al frame inicial
        if(this.framesPasadas % this.framesMantener === 0){

        if(this.frameActual < this.framesMax -1){
        this.frameActual++;
        }else{
            this.frameActual  = 0
        }
    }
    }

    //gracias a esta funcion  actualizamos al jugador cuando se mueve
    update(){
        this.draw(); 
        this.animarFrames()

    }
    }

// ⠀⠀⠀⢠⣾⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⣰⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⢰⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣄⣀⣀⣤⣤⣶⣾⣿⣿⣿⡷
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀
// ⣿⣿⣿⡇⠀⡾⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀
// ⣿⣿⣿⣧⡀⠁⣀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠉⢹⠉⠙⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣀⠀⣀⣼⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛-⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⣿⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⠿⠋⢃⠈⠢⡁⠒⠄⡀⠈⠁⠀⠀⠀⠀⠀⠀⠀
// ⣿⣿⠟⠁⠀⠀⠈⠉⠉⠁⠀⠀⠀⠀⠈⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀


//la clase jugador extiende a Sprite y se usa para los jugadores (jugador y enemigo)
class Jugador extends Sprite{
    
    //los valores del constructor se los pasamos en index.js
    //aqui tienen valores predeterminados de 1 y 0 
    constructor({
        position, 
        velocity, 
        color = 'red', 
        imgSrc,
        escala = 1,
        framesMax = 1,
        offset = {x:0,y:0},
        sprites,
        ataquesHitbox = {offset:{}, width:undefined, height:undefined}
        }){

    //llama a las funciones del padre (Sprite) y sus valores
    super(
        {
            position,
            imgSrc,
            escala,
            framesMax,
            offset
        }
    )

        //obtenemos la posicion del jugador / enemigo
        this.position = position;
        //obtenemos la velocidad del jugador o enemigo
        this.velocity = velocity;
        //añadimos un ancho y alto para cada sprite
        this.width = 50;
        this.height = 150;
        //guardamos la ultima tecla, esta variable se usa para el sensor de movimiento
        this.ultimaTecla
        //creamos un rectangulo que nos permitirá registrar golpes
        this.hitbox = {
            position: {
                x: position.x,
                y: position.y
            },
            //añadimos un offet para que el hitbox del enemigo este mirando hacia la izquierda
            offset : ataquesHitbox.offset,
            width: ataquesHitbox.width,
            height: ataquesHitbox.height,

        }
        //variable para el color
        this.color = color
        //variable para comprobar si esta atacando algun jugador
        this.ataca
        //variable para registrar la salud de cada jugador
        this.salud=100
        this.frameActual = 0
        this.framesPasadas = 0
        this.framesMantener = 8
        this.sprites = sprites
        //nuestro personaje no está muerto
        this.muerto = false

        for(const sprite in this.sprites){

            sprites[sprite].img = new Image()
            sprites[sprite].img.src = sprites[sprite].imgSrc

        }
        }


        //gracias a esta funcion  actualizamos al jugador cuando se mueve
        update(){
        this.draw(); 

        //si el personaje no esta muerto, lo anima
        if(!this.muerto )this.animarFrames()

        //colocamos el hitbox en su posicion segun el offset de cada personaje
        this.hitbox.position.x = this.position.x + this.hitbox.offset.x;
        this.hitbox.position.y = this.position.y + this.hitbox.offset.y;

        //cambiamos la posicion
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //colocamos al personaje correctamente sobre el canvas
        if (this.position.y + this.height + this.velocity.y >= canvas.height -96) {
            this.velocity.y = 0;
            this.position.y =330
        }else this.velocity.y += gravity;

        }

        //con esta funcion hacemos que aparezca el hitbox del ataque durante 100 ms
        atacar() {
        this.cambiarSprite('attack1')
        this.ataca = true
        }

        //recibir daño
        takeHit(){      
            this.salud -= 10
            //si la salud es menos o igual a 0 muere
            if(this.salud <= 0 || this.salud <= 0 ){
                this.cambiarSprite('death')
                jugador.ataca = false
                enemigo.ataca = false
            //si todavia le queda salud se activa la animacion de recibir golpes
            }else{
                this.cambiarSprite('takeHit')
            }

        }

        //con estos if sobrescribiremos cualquier animacion cuando se realice un ataque o muerte
        cambiarSprite(sprite){

            //sobreescribimos una muerte
            if(this.img === this.sprites.death.img){

                if(this.frameActual === this.sprites.death.framesMax -1) this.muerto = true
                
                return}
                             
            //sobreescribimos un ataque
            if(this.img === this.sprites.attack1.img &&
                this.frameActual < this.sprites.attack1.framesMax -1) 
                    return

                if(this.img === this.sprites.takeHit.img 
                    && this.frameActual < this.sprites.takeHit.framesMax -1)

                    return

                    
            // con este switch segun el valor que le pasemos:
            //si la animacion actual no es la misma que estamos pasandole
            //cambiamos la animacion
            //cambiamos los frames
            //colocamos el frame inicial a 0 para que la animacion se desarrolle desde el principio
            switch(sprite) {
                
                //para la animacion default
                case 'idle':
                        if(this.img !== this.sprites.idle.img){
                        this.img = this.sprites.idle.img
                        this.framesMax = this.sprites.idle.framesMax
                        this.frameActual = 0
                    }
                break
                //para la animacion de correr
                case 'run':
                        if(this.img !== this.sprites.run.img){
                        this.img = this.sprites.run.img
                        this.framesMax = this.sprites.run.framesMax
                        this.frameActual = 0
                    }
                break

                //para la animacion de saltar
                case 'jump':
                        if(this.img !== this.sprites.jump.img){
                        this.img = this.sprites.jump.img
                        this.framesMax = this.sprites.jump.framesMax
                        this.frameActual = 0
                        }
                break

                //para la animacion de caer
                case 'fall':
                        if(this.img !== this.sprites.fall.img){
                        this.img = this.sprites.fall.img
                        this.framesMax = this.sprites.fall.framesMax
                        this.frameActual = 0
                        }
                break

                //para la animacion de atacar
                case 'attack1':
                        if(this.img !== this.sprites.attack1.img){
                        this.img = this.sprites.attack1.img
                        this.framesMax = this.sprites.attack1.framesMax
                        this.frameActual = 0
                        }
                break

                //para la animacion de recibir un golpe
                case 'takeHit':
                        if(this.img !== this.sprites.takeHit.img){
                        this.img = this.sprites.takeHit.img
                        this.framesMax = this.sprites.takeHit.framesMax
                        this.frameActual = 0
                        }
                break

                //para la animacion de morir
                case 'death':
                        if(this.img !== this.sprites.death.img){
                        this.img = this.sprites.death.img
                        this.framesMax = this.sprites.death.framesMax
                        this.frameActual = 0
                        }
                break               
                }
            }
}