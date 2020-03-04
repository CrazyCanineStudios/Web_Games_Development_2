class Enemy extends Phaser.Physics.Arcade.Sprite
{
    health = 100;
    damage = 20;

    constructor(scene, x, y)
    {
        super(scene, x, y, "Enemy");

        scene.add.existing(this);
        scene.enemies.add(this);
        scene.physics.world.enableBody(this);

        this.body.setCollideWorldBounds(true);
        this.body.setSize(32);

        this.setOrigin(0.5, 0.5).setCollideWorldBounds(true).setDrag(500, 500);

        // Set sprite texture
        this.setTexture('enemy');

    }

    update(){
        this.moveToTarget(player, 100, this.scene);
    }

    moveToTarget(target, speed, scene){
        if (Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y) > 32 )
        {
            this.rotation = (Phaser.Math.Angle.Between(target.x, target.y, this.x, this.y) - 1.5);
            scene.physics.moveTo(this, target.x, target.y, speed);
        }
        else {
            this.attack(target, this.damage);
        }
    }

    attack(target, damage)
    {
        console.log("Enemy attack");
        User_Interface.value -= damage;
    }

    takeDamage(amount)
    {
        this.health = this.health - amount;
    }
}