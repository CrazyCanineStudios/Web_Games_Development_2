class Player extends Phaser.Physics.Arcade.Sprite
{
    cursorKeys;
    speed;
    characterNum;
    camera;
    constructor(scene,x,y,character,playerInput){

        super(scene, x, y, "player");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setCollideWorldBounds(true);
        this.body.setSize(90,120, 24, 50);
        this.setOrigin(0.5, 0.5).setDisplaySize(57.8, 79.2).setCollideWorldBounds(true).setDrag(500, 500);
        if (playerInput == null) playerInput = 0;
        this.cursorKeys = scene.playerInput[playerInput];
        scene.players.add(this);
        this.camera = scene.cameras.main;
        switch (character)
        {
            case "Tom":
                this.speed = 180;
                this.setTexture('player_tom');
                this.characterNum = 1;
                break;
            case  "Zoe":
                this.speed = 180;
                this.characterNum = 0;
                break;
            default:
                this.speed = 180;
                this.characterNum = 0;
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
if (this.characterNum === 0)
{
    if  (this.cursorKeys.left.isDown && this.body.x > this.camera.worldView.x + 50)
    {
        this.setVelocityX(-this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'player_run_left'){}
        else this.play("player_run_left");
    }

    else if (this.cursorKeys.right.isDown && this.body.right < this.camera.worldView.right - 50)
    {
        this.setVelocityX(this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'player_run_right'){}
        else this.play("player_run_right");
    }

    if  (this.cursorKeys.up.isDown && this.body.y > this.camera.worldView.y+ 50)
    {
        this.setVelocityY(-this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'player_run_up'){}
        else this.play("player_run_up");
    }

    else if (this.cursorKeys.down.isDown && this.body.bottom < this.camera.worldView.bottom - 50)
    {
        this.setVelocityY(this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'player_run_down'){}
        else this.play("player_run_down");
    }
}
else if (this.characterNum === 1)
{
    if  (this.cursorKeys.left.isDown && this.body.x > this.camera.worldView.x+ 50)
    {
        this.setVelocityX(-this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_left'){}
        else this.play("tom_run_left");
    }

    else if (this.cursorKeys.right.isDown && this.body.right < this.camera.worldView.right - 50)
    {
        this.setVelocityX(this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_right'){}
        else this.play("tom_run_right");
    }

    if  (this.cursorKeys.up.isDown && this.body.y > this.camera.worldView.y+ 50)
    {
        this.setVelocityY(-this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_up'){}
        else this.play("tom_run_up");
    }

    else if (this.cursorKeys.down.isDown && this.body.bottom < this.camera.worldView.bottom - 50)
    {
        this.setVelocityY(this.speed);
        if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_down'){}
        else this.play("tom_run_down");
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