class Credits extends Phaser.Scene {
  constructor() {
    super("credits");
  }

  preload()
  {

  }

  create()
  {
    game.input.mouse.releasePointerLock();
    var menuImage = this.add.sprite(config.width/2, config.height/2, 'creditsImage');
    menuImage.setDisplaySize(config.width,config.height);
    menuImage.setOrigin(0.5,0.5); // The anchor sets the pivot point of the sprite. Setting than anchor to 0.5,0.5 means the pivot is centered
    menuImage.fixedToCamera = true;
    confirmSound = this.sound.add('confirmSound');
    var creditsButton = this.add.sprite(1516,890,'buttons',7);
    creditsButton.setInteractive();
    creditsButton.on('pointerover', () => { creditsButton.setFrame(6)});
    creditsButton.on('pointerout', () => { creditsButton.setFrame(7)});
    creditsButton.on('pointerdown', () =>
    {
      confirmSound.play();
      creditsButton.setFrame(8);
      this.scene.start("mainMenu");
    });
    if (music.key!== 'titleMusic')
    {
      music.stop();
      music = this.sound.add('titleMusic');
      music.loop = true;
      music.play();
    }
  }
  update ()
  {

  }
}
