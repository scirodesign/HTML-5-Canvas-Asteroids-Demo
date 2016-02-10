requirejs.config({
    baseUrl: 'js',
    paths: {
      app: '../app/gears',
      jquery:'lib/jquery',
      stats:'lib/stats.min',
      underscore: 'lib/underscore',
      easel: 'lib/easel',
      gsap: 'lib/TweenMax.min',
      sobject: 'classes/Asteroid',
      player: 'classes/Player',
      particle: 'classes/Particle',
      hud: 'classes/hud',
      mathhelper: 'lib/mathhelper'
    }
});
require([
  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});
