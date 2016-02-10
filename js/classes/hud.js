function HUD(passedInStage,x,y,w,h){
  var hudContainer = new createjs.Container();
  var livesCounterDisplay = new createjs.Text("LIVES : "+playerShip.lives, "12px Arial", "#fff");
  livesCounterDisplay.textAlign = "right";
  hudContainer.addChild(livesCounterDisplay)
  hudContainer.width = w;
  hudContainer.height = h;
  hudContainer.x = x;
  hudContainer.y = y;
  passedInStage.addChild(hudContainer);



  this.livesCounterUpdate = function(){
    livesCounterDisplay.text = "LIVES :"+playerShip.lives;
  }



  //return StageObject
  return this;
}
