class Enemy extends Phaser.Physics.Arcade.Sprite
{
    // Construct an enemy
    constructor(scene, x, y)
    {
        super(scene, x, y, "Enemy");

        scene.add.existing(this);
        scene.enemies.add(this);
        scene.physics.world.enableBody(this);

        this.body.setCollideWorldBounds(true);
        this.body.setSize(32);

        this.health = 100;
        this.damage = 20;
        this.speed = 100;

        this.setOrigin(0.5, 0.5).setCollideWorldBounds(true).setDrag(500, 500);

        // Set sprite texture
        this.setTexture('enemy');
    }

    update(){
        this.moveToTarget(player, this.speed, this.scene);
    }

    moveToTarget(target, speed, scene){
        if (Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y) > 32 )
        {
            this.rotation = (Phaser.Math.Angle.Between(target.x, target.y, this.x, this.y) + 1.5);
            scene.physics.moveTo(this, target.x, target.y, speed);
        }
        else {
            this.attack(target, this.damage);
        }
    }

    // When the enemy deals damage
    attack(target, damage)
    {
        console.log("Enemy attacks" + target);
        User_Interface.value -= damage;
    }

    // When the enemy takes damage
    takeDamage(amount)
    {
        if(this.health > amount){
            this.health = this.health - amount;
            console.log("Enemy Health: " + this.health);
        }
        else{
            this.die();
        }
    }

    // When the enemy dies
    die(){
        this.destroy()
    }
}