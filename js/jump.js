/**
 * JAVASCRIPT DEL JUEGO DE T-REX SAMURAI
 * HUGO GARCIA NIETO 2023
 */

//
//DECLARACION DE VARIABLES//
//

//declaramos el canvas
let board;
//ancho del canvas
let boardWidth = 850;
//alto del canvas
let boardHeight = 350;
//delcaramos el contexto
let context;

//ancho del trex
let dinoWidth = 88;
//alto del trex
let dinoHeight = 94;
//posicion del trex
let dinoX = 50;
//colocamos el trex al final de la página
let dinoY = boardHeight - dinoHeight;
//obtenemos el sprite del trex
let dinoImg;

//creamos los obstaculos
let cactusArray = [];

//declaramos los anchos de los 3 ctipos de obstaculos
let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

//declaramos el alto de los obstaculos
let cactusHeight = 70;
//donde van a aparecer los obstaculos
let cactusX = 800;
//colocamos los obstaculos en el suelo
let cactusY = boardHeight - cactusHeight;

//declaramos los sprites de los cactus
let cactus1Img;
let cactus2Img;
let cactus3Img;

//con esto desplazamos al trex a la derecha
let velocityX = -10;
//no se mueve en vertical a no ser que salte
let velocityY = 0;
//gravedad para que caiga el trex
let gravity = .4;

//bandera para detectar el fin del juego
let gameOver = false;
//declaramos la puntuacion
let score = 0;

//declaramos el objeto del trex con los atributos declarados antes
let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

//se ejecutará cuando cargue la página
window.onload = function() {

    //obtenemos el canvas
    board = document.getElementById("board");
    //obtenemos los valores de altura y anchura
    board.height = boardHeight;
    board.width = boardWidth;
    //le pasamos 2d al contexto
    context = board.getContext("2d"); //used for drawing on the board
    //utilizamos la funcion Image para establecer el sprite del trex
    dinoImg = new Image();
    dinoImg.src = "./img/assets-jump/dino.png";
    //cuando cargue el sprite, le aplicamos los valores para colocarlo en el canvas
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    //repetimos el proceso con el resto de sprites
    cactus1Img = new Image();
    cactus1Img.src = "./img/assets-jump/cactus1.png";
    cactus2Img = new Image();
    cactus2Img.src = "./img/assets-jump/cactus2.png";
    cactus3Img = new Image();
    cactus3Img.src = "./img/assets-jump/cactus3.png";

    //creamos un bucle para recorrer los frames
    requestAnimationFrame(update);
    //cada 0.9 segundos ponemos un obstaculo nuevo
    setInterval(placeCactus, 900); 
    //movemos el trex al apretar una tecla (solo detectamos el espacio)
    document.addEventListener("keydown", moveDino);
}

//funcion para mover al trex
function update() {
    //bucle infinito para que no paren de cargar frames
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    //limpia el rectangulo 
    context.clearRect(0, 0, board.width, board.height);

    //para acelerarnos cuando caemos debido a la gravedad
    velocityY += gravity;
    //hacemos que no se pase del suelo
    dino.y = Math.min(dino.y + velocityY, dinoY); 
    //pintamos al trex en el canvas
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    //recorremos el array de obstaculos
    for (let i = 0; i < cactusArray.length; i++) {
        //obtenemos el obstaculo actual
        let cactus = cactusArray[i];
        //hacemos que vengan hacia la izquierda
        cactus.x += velocityX;
        //los pintamos en el canvas
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        //si se detecta una colision y nos chocamos
        if (detectCollision(dino, cactus)) {
            //termina el juego
            gameOver = true;
            //cargamos el sprite del trex muerto
            dinoImg.src = "./img/assets-jump/dino-dead.png";
            //lo pintamos en el canvas muerto
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    //colocamos el contador en una esquina, sube 1 cada ms
    context.fillStyle="white";
    context.font="normal normal bold 35px Courier New";
    score++;
    context.fillText(score, 50, 50);
}

//funcion para animar al dinosaurioS
function moveDino(e) {
    //si esta muerto finalizamos la funcion
    if (gameOver) {
        return;
    }
    //si esta vivo, se pulsa espacio y está en el suelo
    if ((e.code == "Space") && dino.y == dinoY) {
        //saltamos cambiando la posicion en el eje Y
        velocityY = -10;
    }

}

//funcion para pintar los obstaculo
function placeCactus() {
    //si el jugador no ha muerto
    if (gameOver) {
        return;
    }

    //declaramos el objeto del obstaculo
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height: cactusHeight
    }

    //probabilidad de colocar obstaculo
    let placeCactusChance = Math.random(); //0 - 0.9999...

    if (placeCactusChance > .90) { //10% de probabilidad de que aparezca el de 3
        //variables para el obstaculo triple
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .60) { //40% del de dos
        //variables para el obstaculo doble
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .30) { //70% del obstaculo simple
        //variables para el obstaculo simple
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    //cuando hemos colocado 5 obstaculos, borramos los datos del array
    if (cactusArray.length > 5) {
        cactusArray.shift(); 
    }
}

//funcion para detectar la colisión con el cactus
//'a' es el trex y 'b' es el obstaculo
function detectCollision(a, b) {
     //la esquina izquierda del trex no toca la esquina derecha del obstaculo
    return a.x < b.x + b.width &&  
    //la esquina derecha del trex pasa la esquina izquierda del obstaculo
      a.x + a.width > b.x &&   
      //la esquina izquierda del trex no toca la parte de abajo del obstaculo
      a.y < b.y + b.height &&  
      //la esquina izquierda del trex pasa la esquina izquierda superior del obstaculo
      a.y + a.height > b.y;    
}

//event listener para que la página no baje cuando le damos al espacio
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case ' ':
            event.preventDefault();
        break   
    }
})
