class Enemy extends Phaser.Physics.Arcade.Sprite
{
    enemyAngle;
    // Construct an enemy
    constructor(scene, x, y, isRanged)
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
        this.busy = false;
        this.busyTime = 0;

        this.isRanged = isRanged;
        this.direction = null;

        if(this.isRanged) {
            this.targetRange = 256;
            this.attackRange = 64;
        }
        else {
            this.targetRange = 128;
            this.attackRange = 32;
        }

        // Can't get players group (yet), so target is set to player for now
        this.target = null;
        this.players = scene.players;

        // Set sprite texture
        this.setTexture('enemy');
        this.setSize(32, 32);
        this.hurtSound = scene.sound.add('enemy_hurt_sound');
    }

    // Actions every frame
    update()
    {
        if (!this.busy)
        {
            this.tint =0xffffff;
            // Find a target player, depending on if co-op or not
            this.getTarget();

            // If a target has been found, move towards it
            if (this.target)
            {
                this.moveToTarget(this.target, this.speed, this.scene);
                this.rangedAttack(this.direction);
            }
        }
        else {
            this.tint = 0xff0000;
            if (this.busyTime > 30) {
                this.busy = false;
            }
            // Increase the timer
            else {
                this.busyTime++;
            }
        }
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

        if (distance < this.targetRange && distance > this.attackRange)
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

                // Notify direction as left
                this.direction = "left";
            }
            else if (this.x <= target.x && target.x>target.y)
            {
                //console.log("Moving right");
                if (this.anims.isPlaying && this.anims.currentAnim.key === 'enemy_run_right'){}
                else this.play("enemy_run_right");

                // Notify direction as right
                this.direction = "right";
            }
            if (this.y > target.y && target.y>target.x)
            {
                //console.log("Moving up");
                if (this.anims.isPlaying && this.anims.currentAnim.key === 'enemy_run_up'){}
                else this.play("enemy_run_up");

                // Notify direction as up
                this.direction = "up";
            }
            else if (this.y <= target.y && target.y>target.x)
            {
                //console.log("Moving down");
                if (this.anims.isPlaying && this.anims.currentAnim.key === 'enemy_run_down'){}
                else this.play("enemy_run_down");

                // Notify direction as down
                this.direction = "down";
            }
        }
    }

    // Deal melee damage
    attack(target, damage)
    {
        if(!this.isRanged)
        {
            // Check if enough time has passed since the last attack
            if (this.attackTime > 60) {
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
    }

    // Shoot a ranged bullet
    rangedAttack(direction)
    {
        if(this.isRanged)
        {
            // Check if enough time has passed since the last attack
            if (this.attackTime > 100) {
                // Reset the timer
                this.attackTime = 0;

                var enemyBullet = new enemyBeam(this.scene, this.x, this.y, direction, false);
            }
            // Increase the timer
            else {
                this.attackTime++;
            }
        }
    }

    // When the enemy takes damage
    takeDamage(amount)
    {
        if(this.health > amount && !this.busy)
        {
            this.busy = true;
            switch (this.direction)
            {
                case "left":
                    this.body.velocity.x = +300;
                    break;
                case  "right":
                    this.body.velocity.x = -300;
                    break;
                case  "down":
                    this.body.velocity.y = -300;
                    break;
                case  "up":
                    this.body.velocity.y = +300;
                    break;
                default:
            }
            this.health = this.health - amount;
            console.log("Enemy Health: " + this.health);
            this.busyTime = 0;
        }
        else{
            if (!this.busy)
            {
                this.hurtSound.stop();
                this.hurtSound.play();
                this.die();
            }
        }
    }

    // When the enemy dies
    die()
    {
        this.dropLoot();
        this.destroy();
    }

    // Drop loot with a 1 in 3 chance of either health or ammo;
    dropLoot(){
        let value = Phaser.Math.Between(0, 2);

        switch (value) {
            case 0:
                let healthPickup = new health_pickUp(this.scene, this.x, this.y, "health");
                break;

            case 1:
                let ammoPickup = new health_pickUp(this.scene, this.x, this.y, "ammo");
                break;

            case 2:
                break;

            default:
                break;
        }
    }
}