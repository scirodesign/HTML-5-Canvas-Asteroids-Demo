function AsteroidObj (passedInStage,x,y,size,boolean,state) {
  this.size = size;
  this.shape = new createjs.Shape();
  if(state == null){
    this.state = 3;
  }else {
    this.state = state;
  }
  this.shape.graphics.beginStroke("white").setStrokeStyle(1).drawPolyStar(this.size, this.size, this.size*9, 6,-.5, -90);
  this.shape.x = x;
  this.shape.y = y;
  this.hitBoolean = true;
  this.shape.regX = -((size*9) );
  this.shape.regY = -((size*9) );
  this.shape.rotation = 0;

  this.shape.vx = (this.size - 3.3) * (Math.random() < 0.5 ? -1 : 1);
  this.shape.vy = (this.size - 3.3) * (Math.random() < 0.5 ? -1 : 1);
  this.shape.setBounds(0, 0, (size*9)*2, (size*9)*2);

  passedInStage.addChild(this.shape);

  asteroidArr.push(this);

  this.breakup = function(hitAsteroid, state){
    var smallerAst = new AsteroidObj(stage,hitAsteroid.shape.x, hitAsteroid.shape.y, state, false, state);
    setTimeout(function(){
      hitAsteroid.hitBoolean = true;
    }, 500);
  }


  this.explode = function(bullet, bulletIndex){
    if(this.hitBoolean === true && this.state >= 0){
      stage.removeChild(bullet.shape);
      bulletsOnScreen.splice(bulletIndex, 1);
      this.hitBoolean = false;
      this.shape.graphics.clear();
      this.state -= 1;

      particleExplosion(this.shape.x, this.shape.y,26,10);

      if(this.state == 2){
        this.shape.graphics.beginStroke("white").setStrokeStyle(1).drawPolyStar(this.state, this.state, this.state*9, 6,-.5, -90);
        this.breakup(this, this.state);
      }
      else if(this.state == 1 && this.state < 2){
        this.shape.graphics.beginStroke("white").setStrokeStyle(1).drawPolyStar(this.state, this.state, this.state*9, 6,-.5, -90);
        this.breakup(this, this.state);
      }
      else{
        stage.removeChild(this.shape);
        var GrabbedAstInd = _.indexOf(asteroidArr, this);
        asteroidArr.splice(GrabbedAstInd, 1);
      }
      this.shape.vx += Math.random() < 0.5 ? -1 : 1;
      this.shape.vy += Math.random() < 0.5 ? -1 : 1;
    }
  }






  //return StageObject
  return this;
}
