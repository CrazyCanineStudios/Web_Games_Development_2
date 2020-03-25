class Player extends Phaser.Physics.Arcade.Sprite
{
    cursorKeys;
    speed;
    characterNum;
    camera;
    shadow;
    facingDir;
    health;
    ammo;
    useStamina;
    pickupSound;
    attacking;
    invicible;
    busyTime = 0;
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
        this.facingDir = "right";
        this.ammo = 100;
        this.attackTime = 60;
        this.actualAttackTime = 60;
        this.busyTime = 0;
        this.invicible = false;
        this.pickupSound = scene.sound.add('tom_pickup_Sound');
        switch (character)
        {
            case "Tom":
                this.actualAttackTime = 30;
                this.speed = 180;
                this.setTexture('player_tom');
                this.pickupSound = scene.sound.add('tom_pickup_Sound');
                this.characterNum = 1;
                this.useStamina = true;
                break;
            case  "Zoey":
                this.actualAttackTime = 10;
                this.speed = 180;
                this.characterNum = 0;
                break;
            case  "Harry":
                this.actualAttackTime = 10;
                this.speed = 180;
                this.setTexture('player_harry');
                this.pickupSound = scene.sound.add('harry_pickup_Sound');
                this.characterNum = 2;
                break;
            default:
                this.actualAttackTime = 30;
                this.speed = 180;
                this.characterNum = 0;
        }
        this.alive = true;
        this.attackSound = scene.sound.add('melee_attack');
        this.health = 100;
    }
    update()
    {
        this.shadow.x = this.x;
        this.shadow.y = this.y + 15;
        this.depth = this.y + this.height / 2;
        // Increase the timer
        this.attackTime < this.actualAttackTime ?  this.attackTime++ :  this.attacking = false;
        if (this.invicible)
        {
            this.tint =0xff0000;
        }
            if (this.busyTime > 30)
            {
                this.tint = 0xffffff;
                this.invicible = false;
            }
            // Increase the timer
            else
            {
                this.busyTime++;
            }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.attack))
        {
            // Check if enough time has passed since the last attack
            if (this.attackTime >= this.actualAttackTime)
            {
                switch (this.characterNum)
                {
                    case 0:
                        //zoey
                        if (this.ammo>0)
                        {
                            this.attackSound.stop();
                            this.attackSound = this.scene.sound.add('gun_attack');
                            this.attackSound.play();
                            this.scene.shootBeam(this.x,this.y,this.facingDir,false);
                            this.ammo--;
                        }
                        break;
                    case  1: // 1 = tom
                        //tom
                        switch (this.facingDir)
                        {
                            case "left":
                                this.play("tom_attack_left");
                                break;
                            case  "right":
                                this.play("tom_attack_right");
                                break;
                            case  "up":
                                this.play("tom_attack_up");
                                break;
                            case  "down":
                                this.play("tom_attack_down");
                                break;
                            case  "down-right":
                                this.play("tom_attack_down_right");
                                break;
                            case  "down-left":
                                this.play("tom_attack_down_left");
                                break;
                            case  "up-left":
                                this.play("tom_attack_up_left");
                                break;
                            case  "up-right":
                                this.play("tom_attack_up_right");
                                break;
                            default:
                                this.play("tom_attack_down");
                        }
                            this.attackSound.stop();
                            this.attackSound = this.scene.sound.add('melee_attack');
                            this.attackSound.play();
                        this.scene.shootBeam(this.x,this.y,this.facingDir,true);
                        this.attacking = true;
                        break;
                    case  2: // 2 = harry
                        if (this.ammo>0)
                        {
                            this.attackSound.stop();
                            this.attackSound = this.scene.sound.add('gun_attack');
                            this.attackSound.play();
                            this.scene.shootBeam(this.x,this.y,this.facingDir,false);
                            this.ammo--;
                        }
                        break;
                    default:
                        if (this.ammo>0)
                        {
                            this.attackSound.stop();
                            this.attackSound = this.scene.sound.add('gun_attack');
                            this.attackSound.play();
                            this.scene.shootBeam(this.x,this.y,this.facingDir,false);
                            this.ammo--;
                        }
                }
                // Reset the timer
                this.attackTime = 0;
            }
        }
        if (!this.attacking) this.movePlayer();
        this.constrainVelocity();
    }

    // When the player takes damage
    takeDamage(amount)
    {
        if(this.health > amount && this.invicible ===false)
        {
            this.health = this.health - amount;
            console.log("Player Health: " + this.health);
            switch (this.facingDir)
            {
                case "left":
                    this.setVelocityX(300);
                    break;
                case  "right":
                    this.setVelocityX(-300);
                    break;
                case  "down":
                    this.setVelocityY(-300);
                    break;
                case  "up":
                    this.setVelocityY(300);
                    break;
                default:
            }
            this.busyTime = 0;
            this.invicible = true;
        }
        else if (this.health<=amount && this.invicible ===false)
        {
            this.die();
        }
    }

    // When the player dies
    die()
    {
        if (lives > 1)
        {
            // Take away one life and reset health
            lives -= 1;
            this.health = 100;

            // Reset locations
            player.x = 256;
            player.y = 736;

            if(player2){
                player2.x = 288;
                player2.y = 736;
            }
        }
        else{
            this.scene.scene.stop('UIScene');
            this.scene.scene.start("game_over");
        }


        //this.destroy()
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
            this.facingDir = "up-left";
            this.shadow.y = this.y + 10;
            this.setVelocityX(-this.speed);
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_up_left'){}
            else this.play("tom_run_up_left");
        }
        else if (this.cursorKeys.down.isDown && this.body.bottom < this.camera.worldView.bottom - 50)
        {
            this.facingDir = "down-left";
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
            this.facingDir = "up-right";
            this.setVelocityX(this.speed);
            this.setVelocityY(-this.speed);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'tom_run_up_right'){}
            else this.play("tom_run_up_right");
        }
        else if (this.cursorKeys.down.isDown && this.body.bottom < this.camera.worldView.bottom - 50)
        {
            this.facingDir = "down-right";
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