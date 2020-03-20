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
    this.creditsGroup = this.add.group({runChildUpdate: true});
    var creditsBG = this.add.sprite(config.width/2, config.height/2, 'creditsBackground');
    var credits = new CreditsPanel(this,config.width/2,config.height/2,"creditsImage",1,false);
    var credits2 = new CreditsPanel(this,config.width/2,credits.y + config.height,"credits2",2,true);
    //var credits3 = new CreditsPanel(this,config.width/2,credits2.y + config.height,"credits2",3,true);
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
