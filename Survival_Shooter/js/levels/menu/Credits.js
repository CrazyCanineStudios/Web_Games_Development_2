class Credits extends Phaser.Scene
{
  constructor() {
    super("credits");
  }
  preload()
  {
    this.load.image('credits1',"assets/sprites/credits/credits1.png");
    this.load.image('credits2',"assets/sprites/credits/credits2.png");
    this.load.image('credits3',"assets/sprites/credits/credits3.png");
    this.load.image('credits4',"assets/sprites/credits/credits4.png");
    this.load.image('credits5',"assets/sprites/credits/credits5.png");
    this.load.image('credits6',"assets/sprites/credits/credits6.png");
  }

  create()
  {
    this.skip = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skip2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.skip3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    game.input.mouse.releasePointerLock();
    this.creditsGroup = this.add.group({runChildUpdate: true});
    this.add.sprite(config.width/2, config.height/2, 'creditsBackground');
    var credits = new CreditsPanel(this,config.width/2,config.height/2,"credits1",1,false);
    var credits2 = new CreditsPanel(this,config.width/2,credits.y + config.height,"credits2",2,false);
    var credits3 = new CreditsPanel(this,config.width/2,credits2.y + config.height,"credits3",3,false);
    var credits4 = new CreditsPanel(this,config.width/2,credits3.y + config.height,"credits4",4,false);
    var credits5 = new CreditsPanel(this,config.width/2,credits4.y + config.height,"credits5",5,false);
    var credits6 = new CreditsPanel(this,config.width/2,credits5.y + config.height,"credits6",6,true);
    confirmSound = this.sound.add('confirmSound');
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
    if ((Phaser.Input.Keyboard.JustDown(this.skip)) || (Phaser.Input.Keyboard.JustDown(this.skip2)) || (Phaser.Input.Keyboard.JustDown(this.skip3)))
    {
      this.scene.stop('UIScene');
      this.scene.start("mainMenu");
    }
  }
}
