function Player(passedInStage, x,y) {
  this.shape = new createjs.Shape()
  this.shape.graphics.beginStroke("white").moveTo(0, 15).lineTo(15, 15).lineTo(7.5, 0).lineTo(0, 15);
  this.shape.regX = 7.5;
  this.shape.regY = 7.5;
  this.shape.vx = 0;
  this.shape.vy = 0;
  this.shape.x = x;
  this.shape.y = y;
  this.shape.setBounds(0, 0, 30, 15);
  this.lives = 3;
  this.active = true;



  passedInStage.addChild(this.shape);



  this.newLife = function(){
    this.shape.graphics.beginStroke("white").moveTo(0, 15).lineTo(15, 15).lineTo(7.5, 0).lineTo(0, 15);
    this.shape.vx = 0;
    this.shape.vy = 0;
    TweenMax.to(this.shape, .2, {alpha:0, repeat:10});
  }


  this.playerToAsteroidCheck = function(){
    for(var i=0; i<asteroidArr.length; i++){
        var gA = asteroidArr[i];
        if(this.shape.x < gA.shape.x + gA.shape.getBounds().width &&
                 this.shape.x + this.shape.getBounds().width > gA.shape.x &&
                 this.shape.y-this.shape.regY < gA.shape.y + gA.shape.getBounds().height &&
                 this.shape.y-this.shape.regY + this.shape.getBounds().height > gA.shape.y && this.active != false){
                this.explode();

          return true;
        }
      }
  }

  this.explode = function (){
    if(this.active === true){
      this.active = false;
      this.shape.graphics.clear();
      var explosionDiversityInt = Math.random()*5;
      for(var i=0; i<explosionDiversityInt; i++){
        particleExplosion(this.shape.x, this.shape.y,26,10);
      }
    this.playerHasDied();
    }

  }

  this.playerHasDied = function(){
      this.active = false;
      this.lives -= 1;
      hudLives.livesCounterUpdate();
      if(this.lives > 0){
        this.newLife();
      }
  }

  this.move = function (vx,vy){
    this.shape.vx *= .999;
    this.shape.vy *= .999;
    this.shape.x += this.shape.vx;
    this.shape.y += this.shape.vy

    if (this.shape.x > SW){
      this.shape.x =  1;
    }
    if (this.shape.x < 0){
      this.shape.x = SW - 1;
    }
    if (this.shape.y > SH){
      this.shape.y = 1;
    }
    if (this.shape.y < 0){
      this.shape.y = SH - 1;
    }

  }

  //return StageObject
  return this;
}
