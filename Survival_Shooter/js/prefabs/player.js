class Player extends Phaser.Physics.Arcade.Sprite
{
    cursorKeys;
    speed;
    characterNum;
    camera;
    shadow;
    facingDir;
    constructor(scene,x,y,character,playerInput){

        super(scene, x, y, "player");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setCollideWorldBounds(true);
        this.body.setSize(32,32,8,5);
        this.setOrigin(0.5, 0.5).setCollideWorldBounds(true).setDrag(500, 500);
        if (playerInput == null) playerInput = 0;
        this.cursorKeys = scene.playerInput[playerInput];
        scene.players.add(this);
        this.camera = scene.cameras.main;
        this.shadow = scene.add.sprite(this.x,this.y + 15, 'shadow');
        this.facingDir = "left";
        switch (character)
        {
            case "Tom":
                this.speed = 180;
                this.setTexture('player_tom');
                this.characterNum = 1;
                break;
            case  "Zoey":
                this.speed = 180;
                this.characterNum = 0;
                break;
            case  "Harry":
                this.speed = 180;
                this.setTexture('player_harry');
                this.characterNum = 2;
                break;
            default:
                this.speed = 180;
                this.characterNum = 0;
        }
        this.alive = true;
    }
    update()
    {
        this.shadow.x = this.x;
        this.shadow.y = this.y + 15;
        this.depth = this.y + this.height / 2;
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.attack))
        {
            this.scene.shootBeam(this.x,this.y,this.facingDir);
        }
        this.movePlayer();
        this.constrainVelocity();
    }

    movePlayer()
    {
        this.setVelocity(0);
if (this.characterNum === 0)
{
    if  (this.cursorKeys.left.isDown && this.body.x > this.camera.worldView.x + 50)
    {
        this.facingDir = "left";
        this.setVelocityX(-this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'zoey_run_left'){}
        else this.play("zoey_run_left");
    }

    else if (this.cursorKeys.right.isDown && this.body.right < this.camera.worldView.right - 50)
    {
        this.facingDir = "right";
        this.setVelocityX(this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'zoey_run_right'){}
        else this.play("zoey_run_right");
    }

    if  (this.cursorKeys.up.isDown && this.body.y > this.camera.worldView.y+ 50)
    {
        this.facingDir = "up";
        this.setVelocityY(-this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'zoey_run_up'){}
        else this.play("zoey_run_up");
    }

    else if (this.cursorKeys.down.isDown && this.body.bottom < this.camera.worldView.bottom - 50)
    {
        this.facingDir = "down";
        this.setVelocityY(this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'zoey_run_down'){}
        else this.play("zoey_run_down");
    }
}
else if (this.characterNum === 1)
{
    if  (this.cursorKeys.left.isDown && this.body.x > this.camera.worldView.x+ 50)
    {
        if (this.cursorKeys.up.isDown && this.body.y > this.camera.worldView.y+ 50)
        {
            this.shadow.y = this.y + 10;
            this.setVelocityX(-this.speed);
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_up_left'){}
            else this.play("tom_run_up_left");
        }
        else if (this.cursorKeys.down.isDown && this.body.bottom < this.camera.worldView.bottom - 50)
        {
            this.setVelocityX(-this.speed);
            this.setVelocityY(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_down_left'){}
            else this.play("tom_run_down_left");
        }
        else
        {
            this.facingDir = "left";
            this.setVelocityX(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_left'){}
            else this.play("tom_run_left");
        }
    }
    else if (this.cursorKeys.right.isDown && this.body.right < this.camera.worldView.right - 50)
    {
        if (this.cursorKeys.up.isDown && this.body.y > this.camera.worldView.y+ 50)
        {
            this.setVelocityX(this.speed);
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_up_right'){}
            else this.play("tom_run_up_right");
        }
        else if (this.cursorKeys.down.isDown && this.body.bottom < this.camera.worldView.bottom - 50)
        {
            this.setVelocityX(this.speed);
            this.setVelocityY(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_down_right'){}
            else this.play("tom_run_down_right");
        }
        else
        {
            this.facingDir = "right";
            this.setVelocityX(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_right'){}
            else this.play("tom_run_right");
        }
    }
    if  (this.cursorKeys.up.isDown && this.body.y > this.camera.worldView.y+ 50)
    {
        if (this.cursorKeys.right.isDown && this.body.right < this.camera.worldView.right - 50)
        {
            this.setVelocityX(this.speed);
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_up_right'){}
            else this.play("tom_run_up_right");
        }
        else if (this.cursorKeys.left.isDown && this.body.x > this.camera.worldView.x+ 50)
        {
            this.setVelocityX(-this.speed);
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_up_left'){}
            else this.play("tom_run_up_left");
        }
        else
        {
            this.facingDir = "up";
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_up'){}
            else this.play("tom_run_up");
        }

    }
    else if (this.cursorKeys.down.isDown && this.body.bottom < this.camera.worldView.bottom - 50)
    {
        if (this.cursorKeys.right.isDown && this.body.right < this.camera.worldView.right - 50)
        {
            this.setVelocityX(this.speed);
            this.setVelocityY(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_down_right'){}
            else this.play("tom_run_down_right");
        }
        else if (this.cursorKeys.left.isDown && this.body.x > this.camera.worldView.x+ 50)
        {
            this.setVelocityX(-this.speed);
            this.setVelocityY(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_down_left'){}
            else this.play("tom_run_down_left");
        }
        else
        {
            this.facingDir = "down";
            this.setVelocityY(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_down'){}
            else this.play("tom_run_down");
        }
    }
}
else if (this.characterNum === 2)
{
    if  (this.cursorKeys.left.isDown && this.body.x > this.camera.worldView.x+ 50)
    {
        if (this.cursorKeys.up.isDown && this.body.y > this.camera.worldView.y+ 50)
        {
            this.shadow.y = this.y + 10;
            this.setVelocityX(-this.speed);
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_up_left'){}
            else this.play("harry_run_up_left");
        }
        else if (this.cursorKeys.down.isDown && this.body.bottom < this.camera.worldView.bottom - 50)
        {
            this.setVelocityX(-this.speed);
            this.setVelocityY(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_down_left'){}
            else this.play("harry_run_down_left");
        }
        else
        {
            this.facingDir = "left";
            this.setVelocityX(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_left'){}
            else this.play("harry_run_left");
        }
    }
    else if (this.cursorKeys.right.isDown && this.body.right < this.camera.worldView.right - 50)
    {
        if (this.cursorKeys.up.isDown && this.body.y > this.camera.worldView.y+ 50)
        {
            this.setVelocityX(this.speed);
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_up_right'){}
            else this.play("harry_run_up_right");
        }
        else if (this.cursorKeys.down.isDown && this.body.bottom < this.camera.worldView.bottom - 50)
        {
            this.setVelocityX(this.speed);
            this.setVelocityY(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_down_right'){}
            else this.play("harry_run_down_right");
        }
        else
        {
            this.facingDir = "right";
            this.setVelocityX(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_right'){}
            else this.play("harry_run_right");
        }
    }
    if  (this.cursorKeys.up.isDown && this.body.y > this.camera.worldView.y+ 50)
    {
        if (this.cursorKeys.right.isDown && this.body.right < this.camera.worldView.right - 50)
        {
            this.setVelocityX(this.speed);
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_up_right'){}
            else this.play("harry_run_up_right");
        }
        else if (this.cursorKeys.left.isDown && this.body.x > this.camera.worldView.x+ 50)
        {
            this.setVelocityX(-this.speed);
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_up_left'){}
            else this.play("harry_run_up_left");
        }
        else
        {
            this.facingDir = "up";
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_up'){}
            else this.play("harry_run_up");
        }

    }
    else if (this.cursorKeys.down.isDown && this.body.bottom < this.camera.worldView.bottom - 50)
    {
        if (this.cursorKeys.right.isDown && this.body.right < this.camera.worldView.right - 50)
        {
            this.setVelocityX(this.speed);
            this.setVelocityY(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_down_right'){}
            else this.play("harry_run_down_right");
        }
        else if (this.cursorKeys.left.isDown && this.body.x > this.camera.worldView.x+ 50)
        {
            this.setVelocityX(-this.speed);
            this.setVelocityY(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_down_left'){}
            else this.play("harry_run_down_left");
        }
        else
        {
            this.facingDir = "down";
            this.setVelocityY(this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'harry_run_down'){}
            else this.play("harry_run_down");
        }
    }
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