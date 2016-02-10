function Particle(passedInStage, size, X, Y, VX, VY, life, eVX,eVY,behaviorBoolean){
if(bulletsOnScreen.length < maxBullets){
  this.size = size;
  this.vx = VX + eVX;
  this.vy = VY + eVY;
  this.life = life;
  this.shape = new createjs.Shape()
  this.shape.graphics.beginFill("white").drawCircle(0, 0, this.size);
  this.shape.x = X;
  this.shape.regX = size/2;
  this.shape.regY = size/2;
  this.shape.y = Y;
  this.shape.setBounds(0, 0, size, size);
  if(behaviorBoolean != null){
    this.active = behaviorBoolean;
  }

  bulletsOnScreen.push(this);
  passedInStage.addChild(this.shape);
}



}
