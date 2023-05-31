//funcion para determinar si los rectangulos del hitbox colisionan
//se la llama desde la funcion de animar
function rectanguloHitbox({rectangulo1, rectangulo2}){

    return(
        rectangulo1.hitbox.position.x + rectangulo1.hitbox.width >=
         rectangulo2.position.x && 
        rectangulo1.hitbox.position.x <= rectangulo2.position.x + rectangulo2.width &&
        rectangulo1.hitbox.position.y + rectangulo1.hitbox.height >=
         rectangulo2.position.y &&
        rectangulo1.hitbox.position.y <= rectangulo2.position.y + rectangulo2.height
    )

}

//funcion para decidir el ganador de la partida segun tiempo y salud
//muestra mensaje para empate, ganar jug1 o ganar jug2
function decidirGanador({jugador, enemigo, tiempoID}){

    clearTimeout(tiempoID)
    document.querySelector('#mostrarTexto').style.display = 'flex';
    if(jugador.salud === enemigo.salud) {
        document.querySelector('#mostrarTexto').innerHTML = 'EMPATE';  
        jugador.cambiarSprite('death')
        enemigo.cambiarSprite('death')
    }else if(jugador.salud > enemigo.salud){
        document.querySelector('#mostrarTexto').innerHTML = 'MUERTE '
        

    }else if(jugador.salud < enemigo.salud){
        document.querySelector('#mostrarTexto').innerHTML = 'MUERTE';
    }
    }


//el tiempo de juego es de 60 segundos
let tiempo = 61;
let tiempoID

//funcion para disminuir el tiempo
function restarTiempo(){
    //timeout simple para 1 segundo
    if(tiempo > 0) {
        tiempoID = setTimeout(restarTiempo, 1000)
        tiempo --
        //actualizamos el numero en el timer
        document.querySelector('#tiempo').innerHTML = tiempo
    }

    //si el tiempo llega a 0 decidimos ganador
    if(tiempo === 0){     
        decidirGanador({jugador, enemigo, tiempoID})   
    }
   
}

