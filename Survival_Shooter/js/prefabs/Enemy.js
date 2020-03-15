class Enemy extends Phaser.Physics.Arcade.Sprite
{
    enemyAngle;
    // Construct an enemy
    constructor(scene, x, y)
    {
        super(scene, x, y, "Enemy");

        // Initialise
        scene.add.existing(this);
        scene.enemies.add(this);
        scene.physics.world.enableBody(this);
        this.setOrigin(0.5, 0.5).setCollideWorldBounds(true).setDrag(500, 500);
        this.body.setCollideWorldBounds(true);
        this.body.setSize(32);

        this.attackTime = 60;
        this.health = 100;
        this.damage = 10;
        this.speed = 100;

        // Can't get players group (yet), so target is set to player for now
        this.target = null;
        this.players = scene.players;

        // Set sprite texture
        this.setTexture('enemy');
        this.setSize(32, 32);
    }

    // Actions every frame
    update()
    {
        // Find a target player, depending on if co-op or not
        this.getTarget();

        // If a target has been found, move towards it
        if (this.target)
        this.moveToTarget(this.target, this.speed, this.scene);
    }

    // Find a target
    getTarget()
    {
        if (player2!=null)
        {
            // Check which is the closest out of the group
            var distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
            var distance2 = Phaser.Math.Distance.Between(this.x, this.y, player2.x, player2.y);

            if (distance < distance2) {
                // Set this as the new target
                this.target = player;
            }
            else {
                this.target = player2;
            }
        }
        else
        {
            this.target = player;
        }
    }

    // Rotate and move towards a target
    moveToTarget(target, speed, scene)
    {
        // Stop if within a certain distance
        var distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);

        if (distance < 128 && distance > 32)
        {
            //this.rotation = (Phaser.Math.Angle.Between(target.x, target.y, this.x, this.y) + 1.5);
            //this.enemyAngle = this.rotation * 100;
            scene.physics.moveTo(this, target.x, target.y, speed);
            //console.log("TargetX : " + target.x + " Target Y : " + target.y);
            if (this.x > target.x  && target.x>target.y)
            {
                //console.log("Moving left");
                if (this.anims.isPlaying && this.anims.currentAnim.key === 'enemy_run_left'){}
                else this.play("enemy_run_left");
            }
            else if (this.x <= target.x && target.x>target.y)
            {
                //console.log("Moving right");
                if (this.anims.isPlaying && this.anims.currentAnim.key === 'enemy_run_right'){}
                else this.play("enemy_run_right");
            }
            if (this.y > target.y && target.y>target.x)
            {
                //console.log("Moving up");
                if (this.anims.isPlaying && this.anims.currentAnim.key === 'enemy_run_up'){}
                else this.play("enemy_run_up");
            }
            else if (this.y <= target.y && target.y>target.x)
            {
                //console.log("Moving down");
                if (this.anims.isPlaying && this.anims.currentAnim.key === 'enemy_run_down'){}
                else this.play("enemy_run_down");
            }
        }
    }

    // When the enemy deals damage
    attack(target, damage)
    {
        // Check if enough time has passed since the last attack
        if (this.attackTime > 60)
        {
            // Reset the timer
            this.attackTime = 0;

            // Deal damage
            target.takeDamage(damage);
            console.log("Enemy Attacks")
        }
        // Increase the timer
        else {
            this.attackTime++;
        }
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
    die()
    {
        this.destroy()
    }
}