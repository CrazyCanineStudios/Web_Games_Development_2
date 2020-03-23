class SP_2_Character_Select extends Phaser.Scene {
    levelToLoad;
    pause;
    index;
    tomSelect;
    zoeySelect;
    harrySelect;
    playerInput;
    confirmSound;
    phase = 1;
    player1Chosen;
    currentPos;
    constructor() {
        super("sp_char_select");
    }
    preload()
    {
    }
    create() {
        this.currentPos =0;
        this.phase = 1;
        game.input.mouse.releasePointerLock();
        this.confirmSound = this.sound.add('confirmSound');
        this.index = 1;
        var storyImage = this.add.sprite(config.width/2, config.height/2, 'charSelect');
        storyImage.setDisplaySize(config.width,config.height);
        storyImage.setOrigin(0.5,0.5); // The anchor sets the pivot point of the sprite. Setting than anchor to 0.5,0.5 means the pivot is centered

        this.tomSelect = this.add.sprite(config.width/6, config.height/1.7, 'tom_char_select',0);
        this.tomSelect.setInteractive();
        this.tomSelect.on('pointerover', () => { this.index = 1;});
        this.tomSelect.on('pointerdown', () =>
        {
            this.Continue();
        });
        
        this.zoeySelect = this.add.sprite(config.width/2, config.height/1.7, 'zoey_char_select',0);
        this.zoeySelect.setInteractive();
        this.zoeySelect.on('pointerover', () => { this.index = 2;});
        this.zoeySelect.on('pointerdown', () =>
        {
            this.Continue();
        });
        this.harrySelect = this.add.sprite(config.width/1.2, config.height/1.7, 'harry_char_select',0);
        this.harrySelect.setInteractive();
        this.harrySelect.on('pointerover', () => { this.index = 3;});
        this.harrySelect.on('pointerdown', () =>
        {
            this.Continue();
        });
        this.playerInput = [];
        this.playerInput [0] = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'attack': Phaser.Input.Keyboard.KeyCodes.SPACE,
            'special': Phaser.Input.Keyboard.KeyCodes.X
        });
        this.playerInput [1] = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'attack': Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO,
            'special': Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE
        });


        // Create world bounds
        this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        if (music.key!== 'characterSelectMusic')
        {
            music.stop();
            music = this.sound.add('characterSelectMusic');
            music.loop = true;
            music.play();
        }
        this.levelToLoad = "sp_1";
    }
    update()
    {
        switch (this.index)
        {
            case 0:
                this.tomSelect.setFrame(0);
                this.harrySelect.setFrame(0);
                this.zoeySelect.setFrame(0);
                break;
            case 1:
                this.tomSelect.setFrame(1);
                this.harrySelect.setFrame(0);
                this.zoeySelect.setFrame(0);
                break;
            case 2:
                this.tomSelect.setFrame(0);
                this.harrySelect.setFrame(0);
                this.zoeySelect.setFrame(1);
                break;
            case 3:
                this.tomSelect.setFrame(0);
                this.harrySelect.setFrame(1);
                this.zoeySelect.setFrame(0);
                break;
            default:
                this.tomSelect.setFrame(0);
                this.harrySelect.setFrame(0);
                this.zoeySelect.setFrame(0);
        }
        if (this.phase>1)
        {
            switch (this.player1Chosen)
            {
                case 0:
                    this.tomSelect.setFrame(2);
                    break;
                case 1:
                    this.tomSelect.setFrame(2);
                    break;
                case 2:
                    this.zoeySelect.setFrame(2);
                    break;
                case 3:
                    this.harrySelect.setFrame(2);
                    break;
                default:
                    this.tomSelect.setFrame(2);
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.pause))
        {
            this.scene.start("mainMenu");
        }
        if ((Phaser.Input.Keyboard.JustDown(this.playerInput[0].right)) || (Phaser.Input.Keyboard.JustDown(this.playerInput[1].right)))
        {
            if (this.index<3)
            {
                this.currentPos = this.index;
                this.index++;
            }
            else
            {
                this.currentPos = this.index;
                this.index = 1;
            }
        }
        if ((Phaser.Input.Keyboard.JustDown(this.playerInput[0].left)) || (Phaser.Input.Keyboard.JustDown(this.playerInput[1].left)))
        {
            if (this.index>1)
            {
                this.currentPos = this.index;
                this.index--;
            }
            else
            {
                this.currentPos = this.index;
                this.index = 3;
            }
        }
        console.log("This index : " + this.currentPos);
        if (this.phase>1 && this.index===this.player1Chosen)
        {
            switch (this.player1Chosen)
            {
                case 0:
                    if (this.currentPos === 3) this.index=2;
                    else if (this.currentPos === 2) this.index=3;
                    break;
                case 1: // Tom
                    if (this.currentPos === 3) this.index=2;
                    else if (this.currentPos === 2) this.index=3;
                    break;
                case 2:
                    if (this.currentPos === 1) this.index=3;
                    else if (this.currentPos === 3) this.index=1;
                    break;
                case 3:
                    if (this.currentPos === 1) this.index=2;
                    else if (this.currentPos === 2) this.index=1;
                    break;
                default:
                    this.index=1;
            }
        }
        if ((Phaser.Input.Keyboard.JustDown(this.playerInput[0].attack)) || (Phaser.Input.Keyboard.JustDown(this.playerInput[1].attack)))
        {
            this.Continue();
        }
    }
    Continue()
    {
        switch (this.index)
        {
            case 1:
                this.confirmSound.play();
                if (this.phase ===1)
                {
                    player1Char = "Tom";
                    if (!mpIntro) this.scene.start("sp_1");
                    this.player1Chosen = 1;
                    this.phase++;
                }
                else if (this.phase ===2 && player1Char!=="Tom")
                {
                    player2Char = "Tom";
                    if (mpIntro) this.scene.start("mp_1");
                }
                break;
            case 2:
                this.confirmSound.play();
                if (this.phase ===1)
                {
                    player1Char = "Zoey";
                    if (mpIntro ===false) this.scene.start("sp_1");
                    this.player1Chosen = 2;
                    this.phase++;
                }
                else if (this.phase ===2 && player1Char!=="Zoey")
                {
                    player2Char = "Zoey";
                    if (mpIntro ===true) this.scene.start("mp_1");
                }
                break;
            case 3:
                this.confirmSound.play();
                if (this.phase ===1)
                {
                    player1Char = "Harry";
                    if (mpIntro ===false) this.scene.start("sp_1");
                    this.player1Chosen = 3;
                    this.phase++;
                }
                else if (this.phase ===2  && player1Char!=="Harry")
                {
                    player2Char = "Harry";
                    if (mpIntro ===true) this.scene.start("mp_1");
                }
                break;
            default:
                this.confirmSound.play();
                if (this.phase ===1)
                {
                    player1Char = "Tom";
                    if (mpIntro ===false) this.scene.start("sp_1");
                    this.player1Chosen = 0;
                    this.phase++;
                }
                else if (this.phase ===2 && player1Char!=="Tom")
                {
                    player2Char = "Tom";
                    if (mpIntro ===true) this.scene.start("mp_1");
                }
        }
    }
}
