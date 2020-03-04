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
    var storyImage = this.add.sprite(config.width/2, config.height/2, 'storyImage');
    storyImage.setDisplaySize(config.width,config.height);
    storyImage.setOrigin(0.5,0.5); // The anchor sets the pivot point of the sprite. Setting than anchor to 0.5,0.5 means the pivot is centered
    storyImage.fixedToCamera = true;
    this.sentences = [
      "Thanks again for inviting me to the sleepover, Harry",
      "Don't mention it, Tom. Did you bring your baseball bat?",
      "Yeah, but it's pitch black outside. We can't exactly play baseball now",
      "We don't need to go outside, we can play baseball inside without breaking a thing. Thanks to the 'Fixer upper'",
      "Uhh. What in the  world is a fixer upper?",
      "It's my latest invention, it stores the atomic structure of the room, meaning I can press a button and the room will be restored",
      "Harry, Don't you dare. Mum's gonna be so cross",
      "Get lost, Zoey. No one invited you",
      "I don't mind ... she can stay",
      "Thanks Tommy",
      "What are you doing here anyway?",
      "I can't sleep, there are monsters out there",
      "Don't worry we can get rid of them for you",
      "Are you sure .. those monsters are real tough",
      "Not as tough as me",
      "Yeah fine. We'll help if you promise to go back to your room afterwards",
      "Let's show those monsters who's boss",
    ];
    this.names = [
      "Tom",
      "Harry",
      "Tom",
      "Harry",
      "Tom",
      "Harry",
      "Zoey",
      "Harry",
      "Tom",
      "Zoey",
      "Harry",
      "Zoey",
      "Tom",
      "Zoey",
      "Tom",
      "Harry",
      "Zoey",
    ];
    this.character1 = [
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
      'Zoey_dialog',
    ];
    this.character2 = [
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Harry_dialog',
      'Harry_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Tom_dialog',
      'Harry_dialog',
      'Harry_dialog',

    ];
    this.character2Visible = [false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.dialog.init();
    this.i = 0;
    this.levelToLoad = "sp_char_select";
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
        console.log(this.character1[this.i].toString());
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
