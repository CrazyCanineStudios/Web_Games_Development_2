class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainMenu");
  }

  preload()
  {

  }

  create()
  {

    game.input.mouse.releasePointerLock();
    var menuImage = this.add.sprite(config.width/2, config.height/2, 'menuImage');
    menuImage.setDisplaySize(config.width,config.height);
    menuImage.setOrigin(0.5,0.5); // The anchor sets the pivot point of the sprite. Setting than anchor to 0.5,0.5 means the pivot is centered
    menuImage.fixedToCamera = true;
    confirmSound = this.sound.add('confirmSound');
    var singlePlayerButton = this.add.sprite(1529,308,'buttons',1);
    singlePlayerButton.setInteractive();
    singlePlayerButton.on('pointerover', () => { singlePlayerButton.setFrame(0)});
    singlePlayerButton.on('pointerout', () => { singlePlayerButton.setFrame(1)});
    singlePlayerButton.on('pointerdown', () =>
    {
      confirmSound.play();
      singlePlayerButton.setFrame(2);
      this.scene.start("sp_0");
    });
    var multiplayerButton = this.add.sprite(1545,595,'buttons',4);
    multiplayerButton.setInteractive();
    multiplayerButton.on('pointerover', () => { multiplayerButton.setFrame(3)});
    multiplayerButton.on('pointerout', () => { multiplayerButton.setFrame(4)});
    multiplayerButton.on('pointerdown', () =>
    {
      confirmSound.play();
      multiplayerButton.setFrame(5);
      //this.scene.start("playMulitplayer");
    });
    var creditsButton = this.add.sprite(1516,890,'buttons',7);
    creditsButton.setInteractive();
    creditsButton.on('pointerover', () => { creditsButton.setFrame(6)});
    creditsButton.on('pointerout', () => { creditsButton.setFrame(7)});
    creditsButton.on('pointerdown', () =>
    {
      confirmSound.play();
      creditsButton.setFrame(8);
      this.scene.start("credits");
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
