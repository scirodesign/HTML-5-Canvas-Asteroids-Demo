var radian = ((playerShip.shape.rotation-90) * Math.PI)/180;
var XSpeed =  Math.cos(radian);
var YSpeed =  Math.sin(radian);
if(playerShip.shape.vx <= maxXSpeed){
  playerShip.shape.vx += XSpeed * acceleration;
}
if(playerShip.shape.vy <= maxYSpeed){
  playerShip.shape.vy += YSpeed * acceleration;
}
