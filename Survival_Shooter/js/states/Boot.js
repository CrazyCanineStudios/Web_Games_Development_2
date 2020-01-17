class Boot extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background", "assets/sprites/backgrounds/bg_level_1.png");
    //
    this.load.image("crosshair", "assets/sprites/spr_crosshair.png");
    this.load.spritesheet("player", "assets/sprites/spr_player_girl.png",{
      frameWidth: 204,
      frameHeight: 265
    });
  }
  create() {
    this.add.text(20, 20, "The game is loading");
    this.scene.start("playGame");
  }
  update () {

  }
}
