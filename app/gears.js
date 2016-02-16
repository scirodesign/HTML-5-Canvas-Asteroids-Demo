// app.js
define([
    'jquery',
    'underscore',
    'easel',
    'sobject',
    'player',
    'gsap',
    'mathhelper',
    'stats',
    'particle',
    'hud'
], function($, _){
    return {
        initialize: function(){

          var stats = new Stats();
          stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb
          stats.domElement.style.position = 'absolute';
          stats.domElement.style.left = '0px';
          stats.domElement.style.top = '0px';
          document.body.appendChild( stats.domElement );


          stage = new createjs.Stage("game");
          var canvas = document.getElementById('game');
          var asteroidAmt = 3;
          var masterStageList = [];
          window.asteroidArr = [];
          window.acceleration = 1;
          window.playerShip;
          window.hudLives;
          var Friction = 0.02;
          var maxYSpeed = 5;
          var maxXSpeed = 5;

          bulletsOnScreen = [];
          maxBullets = 400;
          var bulletLife = 80;

          window.SH = canvas.height;
          window.SW = canvas.width;

          context = canvas.getContext('2d');
          createjs.Ticker.addEventListener("tick", tick);
          createjs.Ticker.setInterval(30);
          createjs.Ticker.setFPS(60);

          init();

          function init(){
            playerShip = new Player(stage, SW/2, SH/2);
            for(var i=0; i<asteroidAmt; i++){
              var asteroid = new AsteroidObj(stage,_.random(0, SH),_.random(0, SW),3);
            }
            hudLives = new HUD(stage,SW - 100,10, 100,40);
            //masterStageList.push(asteroidArr);

          }

          var keystrokes = []; // Or you could call it "key"
          var keystrokesU = []; // Or you could call it "key"
          onkeydown = onkeyup = function(e){

              e = e || event; // to deal with IE
              keystrokes[e.keyCode] = e.type == 'keydown';
              keystrokesU[e.keyCode] = e.type == 'keyup';

              ///console.log(keystrokes)
              if(keystrokesU[32] && playerShip.active == true){
                var vector = radianDirConv(playerShip.shape.rotation);
                var bullet = new Particle(stage,1.5,playerShip.shape.x,playerShip.shape.y, vector[0]*5,vector[1]*5, bulletLife, playerShip.shape.vx, playerShip.shape.vy);

              }
              if(keystrokes[37] && playerShip.active == true){
                playerShip.shape.rotation -= 7;
              }

              if(keystrokes[39] && playerShip.active == true){
                playerShip.shape.rotation += 7;

              }
              if(keystrokes[38] && playerShip.active == true){

                var radian = ((playerShip.shape.rotation-90) * Math.PI)/180;
                var XSpeed =  Math.cos(radian);
                var YSpeed =  Math.sin(radian);
                playerShip.shape.vx += XSpeed;
                playerShip.shape.vy += YSpeed;


              }
              if(keystrokes[40] && playerShip.active == true){

                var radian = ((playerShip.shape.rotation-90) * Math.PI)/180;
                var XSpeed =  -Math.cos(radian);
                var YSpeed =  -Math.sin(radian);
                  playerShip.shape.vx += XSpeed;
                  playerShip.shape.vy += YSpeed;

              }

          }


          function tick(event) {
            stats.begin();

              moveAsteroids();
              playerShip.move();
              playerShip.playerToAsteroidCheck();
              if(bulletsOnScreen.length > 0 ){
                moveBullets(stage);
                collideBulletAst();
              }


            stage.update();
            stats.end();
          }


        }
    };
});
