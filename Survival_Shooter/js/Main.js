var config = {
  width: 1920,
  height: 1080,
  backgroundColor: 0x000000,
  scene: [Boot, Level_1],
  pixelArt: true,
  // 1.1 set the physics to arcade
  physics: {
    default: "arcade",
    arcade:{
        debug: false
    }
  }
}

var player;
var moveKeys;
var reticle;
var bullets;
var lastFired;
var moving;
var time;
var game = new Phaser.Game(config);
