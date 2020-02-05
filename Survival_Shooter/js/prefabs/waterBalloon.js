class WaterBalloon extends Phaser.Physics.Arcade.Sprite
{
    born;
    speed;
    direction;
    xSpeed;
    ySpeed;
    delta;
    constructor(scene,x,y){

        super(scene,x,y,"crosshair");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setOrigin(0.5, 0.5).setDisplaySize(204, 265).setCollideWorldBounds(true).setDrag(500, 500);
        scene.projectiles.add(this);
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
    }
    update()
    {
        this.x += this.xSpeed * this.delta;
        this.y += this.ySpeed * this.delta;
        this.born += this.delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}