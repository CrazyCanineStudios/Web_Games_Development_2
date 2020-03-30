class enemyBeam extends Phaser.GameObjects.Sprite{
  constructor(scene,x,y,direction,melee){

    super(scene, x, y, "enemy_beam");
    this.dealsDamageToEnemy = false;
    scene.add.existing(this);
    this.melee = melee;
    if (!melee)
    {
      this.play("enemy_beam_anim");
      scene.physics.world.enableBody(this);
      this.attackTime = 0;
      this.damage = 5;
      switch (direction) {
        case "left":
          this.body.velocity.x = -250;
          break;
        case  "right":
          this.body.velocity.x = 250;
          break;
        case  "up":
          this.body.velocity.y = -250;
          break;
        case  "down":
          this.body.velocity.y = 250;
          break;
        default:
          this.body.velocity.y = -250;
      }
    }
    else
    {
        //Melee attack
      this.melee = true;
      this.damage = 5;
        this.setTexture('melee_attack');
        this.setVisible(false);
        scene.physics.world.enableBody(this);
        this.body.setSize(32,32,8,5);
        this.setOrigin(0.5, 0.5);
        this.attackTime = 0;
    }

    scene.enemyProjectiles.add(this);
  }


  update(){

    if (this.melee)
    {
      // Check if enough time has passed since the last attack
      if (this.attackTime > 30)
      {
        this.destroy();
      }
      // Increase the timer
      else {
        this.attackTime++;
      }
    }
  }
  reverse()
  {
    this.damage = 80;
    this.body.velocity.y = -this.body.velocity.y;
    this.dealsDamageToEnemy = true;
  }
}
