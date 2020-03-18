class SP_1_Intro extends Phaser.Scene {
  sentences;
  names;
  character1;
  character2Visible;
  i;
  actualText;
  levelToLoad;
  constructor() {
    super("sp_0");
  }
  preload()
  {
  }
  create() {
    game.input.mouse.releasePointerLock();
    var storyImage = this.add.sprite(config.width/2, config.height/2, 'storyImage');
    storyImage.setDisplaySize(config.width,config.height);
    storyImage.setOrigin(0.5,0.5); // The anchor sets the pivot point of the sprite. Setting than anchor to 0.5,0.5 means the pivot is centered
    storyImage.fixedToCamera = true;
    var dialogueButtons = this.add.sprite(config.width* 0.80, config.height* 0.75, 'dialogue_Buttons');
    dialogueButtons.play('anim_dialogue_Buttons');
    dialogueButtons.depth = 10;

    this.sentences = [
      "Thanks again for inviting me to the sleepover, Harry",
      "Don't mention it, Tom. I have something super cool to show you",
      "It's my latest invention, My Dream-inator, it can turn your thoughts into reality",
      "No way, so if I wanted a new baseball bat, I'd just need to think it",
      "Ahaha, This is awesome. We could do anything with this",
      "Harry, I can't sleep, the monsters won't leave me alone.",
      "Go away, Zoey. There's no such thing as monsters.",
      "What kind of monsters? It's not clowns is it, they give me the creeps.",
      "It is now and big monster teddy bears too",
      "No stop thinking about that you two, you're going to overload the ...",
      "You idiots, my machine is not responding - it's bringing the monsters to life",
      "What can we do?",
      "Uhh, I'm not sure. I've disabled the main power source but it's still working",
      "Eek, There's monsters outside beside that glowy thing",
      "Of course, the back up generator. It's being powered remotely. We'll need to go outside and turn it off.",
      "We'll have to get through those clown monsters out there. Lucky for us, I've got my new bat.",
    ];
    this.names = [
      "Tom",
      "Harry",
      "Harry",
      "Tom",
      "Tom",
      "Zoey",
      "Harry",
      "Tom",
      "Zoey",
      "Harry",
      "Harry",
      "Tom",
      "Harry",
      "Zoey",
      "Harry",
      "Tom",
    ];
    this.character1 = [
      'Tom_happy_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_bat_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Zoey_dialog',
      'Harry_dialog',
      'Harry_dialog',
    ];
    this.character2 = [
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',

    ];
    this.character2Visible = [false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.dialog.init();
    this.i = 0;
    this.levelToLoad = "sp_howToPlay";
    this.actualText = "";
    // Create world bounds
    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    if (Phaser.Input.Keyboard.JustDown(this.pause))
    {
      this.scene.start("mainMenu");
    }

    if (music.key!== 'characterSelectMusic')
    {
      music.stop();
      music = this.sound.add('characterSelectMusic');
      music.loop = true;
      music.play();
    }
  }
  update()
  {
    if (Phaser.Input.Keyboard.JustDown(this.skipButton))
    {
      this.scene.start(this.levelToLoad);
    }
    if (this.i<this.sentences.length)
    {
      if (this.actualText!==this.sentences[this.i])
      {
        this.dialog.setCharacter1(this.character1[this.i],true);
        this.dialog.setCharacter2(this.character2[this.i],this.character2Visible[this.i]);

        this.dialog.setName(this.names[this.i]);
        this.dialog.setText(this.sentences[this.i], true);
        this.actualText=this.sentences[this.i];
      }
      if (Phaser.Input.Keyboard.JustDown(this.spacebar))
      {
        this.i++;
      }
    }
    else
    {
      this.scene.start(this.levelToLoad);
    }
  }
}
