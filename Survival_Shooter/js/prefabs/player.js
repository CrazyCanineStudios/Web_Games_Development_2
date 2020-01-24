class Player extends Phaser.Physics.Arcade.Sprite
{
    cursorKeys;
    speed;
    constructor(scene,x,y,character,playerInput){

        super(scene, x, y, "player");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setOrigin(0.5, 0.5).setDisplaySize(204, 265).setCollideWorldBounds(true).setDrag(500, 500);
        if (playerInput == null) playerInput = 0;
        this.cursorKeys = scene.playerInput[playerInput];
        scene.players.add(this);
        switch (character)
        {
            case "Tom":
                this.speed = 200;
                break;
            case  "Zoe":
                this.speed = 300;
                break;
            default:
                this.speed = 300;
        }
    }
    update()
    {
        this.depth = this.y + this.height / 2;
        this.movePlayer();
        this.constrainVelocity();
    }

    movePlayer()
    {
        this.setVelocity(0);

        if  (this.cursorKeys.left.isDown)
        {
            this.setVelocityX(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'player_run_left'){}
            else this.play("player_run_left");
        }

        else if (this.cursorKeys.right.isDown)
        {
            this.setVelocityX(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'player_run_right'){}
            else this.play("player_run_right");
        }

        if  (this.cursorKeys.up.isDown)
        {
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'player_run_up'){}
            else this.play("player_run_up");
        }

        else if (this.cursorKeys.down.isDown)
        {
            this.setVelocityY(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'player_run_down'){}
            else this.play("player_run_down");
        }
    }

    constrainVelocity()
    {
        var angle, currVelocitySqr, vx, vy;
        vx = this.body.velocity.x;
        vy = this.body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;

        if (currVelocitySqr > this.speed * this.speed)
        {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * this.speed;
            vy = Math.sin(angle) * this.speed;
            this.body.velocity.x = vx;
            this.body.velocity.y = vy;
        }
    }
}