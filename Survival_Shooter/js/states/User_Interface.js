class User_Interface extends Phaser.Scene {

    // Referenced and apdated from https://labs.phaser.io/edit.html?src=src%5Cscenes%5Cui%20scene%20es6.js

    constructor ()
    {
        super({ key: 'UIScene',});

        this.score = 0;
    }
preload ()
{
    this.load.image('zoey_health', 'assets/sprites/user_interface/health/spr_player_zoey_health.png');
    this.load.image('tom_health', 'assets/sprites/user_interface/health/spr_player_tom_health.png');
    this.load.image('harry_health', 'assets/sprites/user_interface/health/spr_player_harry_health.png');
    this.load.image('health', 'assets/sprites/user_interface/health/spr_player_health_bar.png');
    this.load.image('health_mask', 'assets/sprites/user_interface/health/spr_health_mask.png');
    this.load.image('pauseScreen', 'assets/sprites/user_interface/spr_pause_screen.png');
    this.load.spritesheet('pauseButtons', 'assets/sprites/user_interface/spr_pause_buttons.png',{frameWidth: 649, frameHeight: 119});
}
    create ()
    {
        this.doOnce = true;
        this.value = 100;
        this.value2 = 100;
        this.p = 76 / 100;
        this.healthBar = this.add.sprite(config.width * 0.125,100, 'health');
        this.pauseScreen = this.add.sprite(config.width/2,config.height/2, 'pauseScreen');
        this.pauseScreen.depth = 100;
        this.player1HealthPortrait = this.add.sprite(config.width * 0.125,100, 'zoey_health');
        this.healthValue = this.add.text(this.healthBar.x - 150, 170, "Sugar Levels : " + this.value, { font: '32px Arial', fill: '#ffb428' });
        this.healthMask = this.make.sprite({
            x: this.healthBar.x,
            y: this.healthBar.y,
            key: 'health_mask',
            add: false
        });
        this.healthBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthMask);

        this.healthBar2 = this.add.sprite(config.width * 0.875,100, 'health');
        this.player2HealthPortrait = this.add.sprite(config.width * 0.875,100, 'zoey_health');
        this.healthValue2 = this.add.text(this.healthBar2.x - 150, 170, "Sugar Levels : " + this.value2, { font: '32px Arial', fill: '#ffb428' });
        this.ammoValue = this.add.text(this.healthBar.x - 150, 220, "Ammo : " + 5, { font: '32px Arial', fill: '#ffb428' });
        this.ammoValue2 = this.add.text(this.healthBar2.x - 150, 220, "Ammo : " + 5, { font: '32px Arial', fill: '#ffb428' });
        this.healthMask2 = this.make.sprite({
            x: this.healthBar2.x,
            y: this.healthBar2.y,
            key: 'health_mask',
            add: false
        });
        this.healthBar2.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthMask2);
        this.healthMask.opacity=0.2;
        //let info = this.add.text(25, 10, 'Score: 0', { font: '48px Arial', fill: '#ffb428' });

        if (this.value>100) this.value = 100;
        if (this.value2>100) this.value2 = 100;

        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('sp_1');

        //  Listen for events from it
        ourGame.events.on('decreaseHealth', function () { this.healthValue.setText("Sugar Levels : " + this.value); }, this);

        // Create the Lives display
        this.livesDisplay = this.add.text((config.width / 2) - 70, 50, "Lives : " + lives, { font: '32px Arial', fill: '#ffb428', align: 'center' });

        confirmSound = this.sound.add('confirmSound');
        this.singlePlayerButton = this.add.sprite(config.width/2,(config.height/2) - 50,'pauseButtons',3);
        this.singlePlayerButton.setInteractive();
        this.singlePlayerButton.depth = 101;
        this.singlePlayerButton.on('pointerover', () => { this.singlePlayerButton.setFrame(2)});
        this.singlePlayerButton.on('pointerout', () => { this.singlePlayerButton.setFrame(3)});
        this.singlePlayerButton.on('pointerdown', () =>
        {
            confirmSound.play();
            this.singlePlayerButton.setFrame(2);
            game.input.mouse.requestPointerLock();
            gamePaused = false;
            music.play();
            pauseMusic.stop();
        });
        this.creditsButton = this.add.sprite(config.width/2,(config.height/2) + 150,'pauseButtons',1);
        this.creditsButton.setInteractive();
        this.creditsButton.depth = 101;
        this.creditsButton.on('pointerover', () => { this.creditsButton.setFrame(0)});
        this.creditsButton.on('pointerout', () => { this.creditsButton.setFrame(1)});
        this.creditsButton.on('pointerdown', () =>
        {
            confirmSound.play();
            this.creditsButton.setFrame(8);
            player.scene.returnToMenu();
        });
    }
    update()
    {
        this.pauseScreen.setVisible(gamePaused);
        this.singlePlayerButton.setVisible(gamePaused);
        this.singlePlayerButton.input.enable = gamePaused;
        this.creditsButton.setVisible(gamePaused);

        if (this.doOnce)
        {
            switch(player.characterNum)
            {
                case 0:
                    //zoey
                    this.player1HealthPortrait.setTexture('zoey_health');
                    break;
                case  1: // 1 = tom
                    //tom
                    this.player1HealthPortrait.setTexture('tom_health');
                    break;
                case  2: // 2 = harry
                    this.player1HealthPortrait.setTexture('harry_health');
                    break;
                default:
                    this.player1HealthPortrait.setTexture('zoey_health');
            }
            if (player2!=null)
            {
                switch(player2.characterNum)
                {
                    case 0:
                        //zoey
                        this.player2HealthPortrait.setTexture('zoey_health');
                        break;
                    case  1: // 1 = tom
                        //tom
                        this.player2HealthPortrait.setTexture('tom_health');
                        break;
                    case  2: // 2 = harry
                        this.player2HealthPortrait.setTexture('harry_health');
                        break;
                    default:
                        this.player2HealthPortrait.setTexture('zoey_health');
                }
            }
            this.doOnce = false;
        }
        this.value = player.health;
        this.healthValue.setText("Sugar Levels : " + this.value);
        player.useStamina ? this.ammoValue.setText("Stamina: " + player.ammo) : this.ammoValue.setText("Ammo: " + player.ammo);
        this.healthMask.x = (this.healthBar.x - 200 ) + (this.value * 2) ;

        // Update the Lives display
        this.livesDisplay.setText("Lives : " + lives);

        if (player2!=null)
        {
            this.player2HealthPortrait.visible = true;
            this.healthBar2.visible=true;
            this.healthMask2.visible = true;
            this.healthValue2.visible = true;
            this.ammoValue2.visible = true;
            this.value2 = player2.health;
            player2.useStamina ? this.ammoValue2.setText("Stamina: " + player2.ammo) : this.ammoValue2.setText("Ammo: " + player2.ammo);
            this.healthValue2.setText("Sugar Levels : " + this.value2);
            this.healthMask2.x = (this.healthBar2.x - 200 ) + (this.value2 * 2) ;
        }
        else
        {
            this.player2HealthPortrait.visible = false;
            this.healthBar2.visible=false;
            this.healthMask2.visible = false;
            this.ammoValue2.visible = false;
            this.healthValue2.visible = false;
        }

    }
}