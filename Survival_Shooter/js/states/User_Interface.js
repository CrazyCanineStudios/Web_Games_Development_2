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
        this.decreaseHealth = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.increaseHealth = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.value = 100;
        this.p = 76 / 100;
        var healthBar = this.add.sprite(200,100, 'health');
        var healthPortrait = this.add.sprite(200,100, 'zoey_health');
        this.healthValue = this.add.text(50, 170, "Sugar Levels : " + this.value, { font: '32px Arial', fill: '#ffb428' });
        this.healthMask = this.make.sprite({
            x: healthBar.x,
            y: healthBar.y,
            key: 'health_mask',
            add: false
        });
        healthBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthMask);
        //let info = this.add.text(25, 10, 'Score: 0', { font: '48px Arial', fill: '#ffb428' });

        if (this.value>100) this.value = 100;
        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('sp_1');

        //  Listen for events from it
        ourGame.events.on('decreaseHealth', function () {

            this.healthValue.setText("Sugar Levels : " + this.value);
        }, this);
    }
    update()
    {
        this.healthValue.setText("Sugar Levels : " + this.value);
        if (Phaser.Input.Keyboard.JustDown(this.decreaseHealth))
        {
            console.log(this.value);
            if (this.value>0) this.value-=10;
        }
        if (Phaser.Input.Keyboard.JustDown(this.increaseHealth))
        {
            console.log(this.value);
            if (this.value<100) this.value+=10;
        }
        this.healthMask.x = 2 * this.value;
    }
}