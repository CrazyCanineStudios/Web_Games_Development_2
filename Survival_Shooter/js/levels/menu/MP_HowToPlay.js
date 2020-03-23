class MP_HowToPlay extends Phaser.Scene {
  constructor() {
    super("mp_howToPlay");
  }

  preload()
  {

  }

  create()
  {

    game.input.mouse.releasePointerLock();
    var menuImage = this.add.sprite(config.width/2, config.height/2, 'howToPlay');
    menuImage.setDisplaySize(config.width,config.height);
    menuImage.setOrigin(0.5,0.5); // The anchor sets the pivot point of the sprite. Setting than anchor to 0.5,0.5 means the pivot is centered
    menuImage.fixedToCamera = true;
    confirmSound = this.sound.add('confirmSound');

    var continueButton = this.add.sprite(1600,1000,'buttons',9);
    continueButton.setInteractive();
    continueButton.on('pointerover', () => { continueButton.setFrame(9)});
    continueButton.on('pointerout', () => { continueButton.setFrame(10)});
    continueButton.on('pointerdown', () =>
    {
      confirmSound.play();
      continueButton.setFrame(11);
      this.scene.start("sp_char_select");
    });
    if (music.key!== 'characterSelectMusic')
    {
      music.stop();
      music = this.sound.add('characterSelectMusic');
      music.loop = true;
      music.play();
    }
  }
  update ()
  {

  }
}
