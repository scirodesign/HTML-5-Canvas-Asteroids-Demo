function radianDirConv(rotation){
  var radian = ((rotation-90) * Math.PI)/180;
  var XSpeed =  Math.cos(radian);
  var YSpeed =  Math.sin(radian);
  var vectorMov = [XSpeed,YSpeed];
  return vectorMov;
}

function collideBulletAst() {
  for(var i = 0; i<asteroidArr.length; i++){
    var gA = asteroidArr[i];
    for(var B = 0; B < bulletsOnScreen.length; B++){
      var gB = bulletsOnScreen[B];
      if(gB.shape.x < gA.shape.x + gA.shape.getBounds().width &&
               gB.shape.x + gB.shape.getBounds().width > gA.shape.x &&
               gB.shape.y-gB.shape.regY < gA.shape.y + gA.shape.getBounds().height &&
               gB.shape.y-gB.shape.regY + gB.shape.getBounds().height > gA.shape.y && gB.active != false){
               gA.explode(gB,B);
        return true;
      }

    }
  }
}



function moveAsteroids() {

for(var i=0; i<asteroidArr.length; i++){
  var grabbedAsteroid = asteroidArr[i];
  grabbedAsteroid.shape.x += grabbedAsteroid.shape.vx;
  grabbedAsteroid.shape.y += grabbedAsteroid.shape.vy;

  if(grabbedAsteroid.shape.x - grabbedAsteroid.shape.getBounds().width > SW){
    grabbedAsteroid.shape.x = 0;
  }
  if(grabbedAsteroid.shape.x + grabbedAsteroid.shape.getBounds().width < 0){
    grabbedAsteroid.shape.x = SW;
  }
  if(grabbedAsteroid.shape.y - grabbedAsteroid.shape.getBounds().height > SH){
    grabbedAsteroid.shape.y = 0;
  }
  if(grabbedAsteroid.shape.y + grabbedAsteroid.shape.getBounds().height < 0){
    grabbedAsteroid.shape.y = SH;
  }

}

}
function particleExplosion(x,y,Amount,length){
  for(var i=0; i<Amount; i++){
  var randomVector = radianDirConv(Math.random() * 360);
  new Particle(stage,1.5,x,y, randomVector[0]*5,randomVector[1]*5, length +  Math.random()*20, Math.random(), Math.random(), false);
}
}
function moveBullets(passedInStage) {
  for(var i=0; i<bulletsOnScreen.length;i++){
    var gP = bulletsOnScreen[i];
    gP.shape.x = gP.vx + gP.shape.x;
    gP.shape.y = gP.vy + gP.shape.y;
    if(gP.shape.x > SW && gP.active != false){
      gP.shape.x = 1;
    }
    if(gP.shape.x < 0 && gP.active != false){
      gP.shape.x = SW - 1;
    }
    if(gP.shape.y > SH && gP.active != false){
      gP.shape.y = 1;
    }
    if(gP.shape.y < 0 && gP.active != false){
      gP.shape.y = SH - 1;
    }

    gP.life -= 1;
    if(gP.life <=0){
      passedInStage.removeChild(gP.shape);
      bulletsOnScreen.splice(i, 1);
    }
  }
}
