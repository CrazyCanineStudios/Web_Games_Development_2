class WinScreen extends Phaser.Scene {
  constructor() {
    super("win");
  }

  preload()
  {

  }

  create()
  {
    gamePaused = false;
    game.input.mouse.releasePointerLock();
    var gameOverImage = this.add.sprite(config.width/2, config.height/2, 'winImage');
    gameOverImage.setDisplaySize(config.width,config.height);
    gameOverImage.setOrigin(0.5,0.5); // The anchor sets the pivot point of the sprite. Setting than anchor to 0.5,0.5 means the pivot is centered
    gameOverImage.fixedToCamera = true;
    confirmSound = this.sound.add('confirmSound');
    var creditsButton = this.add.sprite(1700,1000,'continueButton',1);
    creditsButton.setInteractive();
    creditsButton.on('pointerover', () => { creditsButton.setFrame(2)});
    creditsButton.on('pointerout', () => { creditsButton.setFrame(3)});
    creditsButton.on('pointerdown', () =>
    {
      confirmSound.play();
      creditsButton.setFrame(8);
      this.scene.start("credits");
    });
    if (music.key!== 'winMusic')
    {
      music.stop();
      music = this.sound.add('winMusic');
      music.loop = false;
      music.play();
    }
  }
  update ()
  {

  }
}
