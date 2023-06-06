//JAVASCRIPT TFG HUGO GARCIA NIETO EXPLORER

//comprueba la colision con el suelo
function collision({ object1, object2 }) {
    return (
      object1.position.y + object1.height >= object2.position.y &&
      object1.position.y <= object2.position.y + object2.height &&
      object1.position.x <= object2.position.x + object2.width &&
      object1.position.x + object1.width >= object2.position.x
    )
  }
  
  //comprueba la colision con las plataformas
  function platformCollision({ object1, object2 }) {
    return (
      object1.position.y + object1.height >= object2.position.y &&
      object1.position.y + object1.height <=
        object2.position.y + object2.height &&
      object1.position.x <= object2.position.x + object2.width &&
      object1.position.x + object1.width >= object2.position.x
    )
  }