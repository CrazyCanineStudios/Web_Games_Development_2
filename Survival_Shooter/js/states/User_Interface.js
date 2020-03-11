class User_Interface extends Phaser.Scene {

    // Referenced and apdated from https://labs.phaser.io/edit.html?src=src%5Cscenes%5Cui%20scene%20es6.js

    constructor ()
    {
        super({ key: 'UIScene',});

        this.score = 0;
    }
preload ()
{
    this.load.image('zoey_health', 'assets/sprites/zoey_health.png');
    this.load.image('health', 'assets/sprites/health.png');
    this.load.image('health_mask', 'assets/sprites/health_mask.png');
}
    create ()
    {
        this.value = 100;
        this.value2 = 100;
        this.p = 76 / 100;
       this.healthBar = this.add.sprite(200,100, 'health');
        var healthPortrait = this.add.sprite(200,100, 'zoey_health');
        this.healthBar2 = this.add.sprite(config.width - config.width/5,100, 'health');
        var healthPortrait2 = this.add.sprite(config.width - config.width/5,100, 'zoey_health');
        this.healthValue = this.add.text(50, 170, "Sugar Levels : " + this.value, { font: '32px Arial', fill: '#ffb428' });
        this.healthValue2 = this.add.text(config.width - config.width/5, 170, "Sugar Levels : " + this.value2, { font: '32px Arial', fill: '#ffb428' });
        this.healthMask = this.make.sprite({
            x: this.healthBar.x,
            y: this.healthBar.y,
            key: 'health_mask',
            add: false
        });
        this.healthMask2 = this.make.sprite({
            x: this.healthBar2.x,
            y: this.healthBar2.y,
            key: 'health_mask',
            add: false
        });
        this.healthBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthMask);
        this.healthBar2.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthMask2);
        //let info = this.add.text(25, 10, 'Score: 0', { font: '48px Arial', fill: '#ffb428' });

        if (this.value>100) this.value = 100;
        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('sp_1');

        //  Listen for events from it
        ourGame.events.on('decreaseHealth', function () { this.healthValue.setText("Sugar Levels : " + this.value); }, this);
    }
    update()
    {
        this.value = player.health;
        this.value2 = player2.health;
        this.healthValue.setText("Sugar Levels : " + this.value);
        this.healthValue2.setText("Sugar Levels : " + this.value2);
        this.healthMask.x = this.healthBar.x * (this.value/100);
        this.healthMask2.x = this.healthBar2.x *(this.value2/100);
    }
}