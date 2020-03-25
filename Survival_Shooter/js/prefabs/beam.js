class Beam extends Phaser.GameObjects.Sprite{
  constructor(scene,x,y,direction,melee){

    super(scene, x, y, "beam");

    scene.add.existing(this);
    this.melee = melee;
    if (!melee)
    {
      this.play("beam_anim");
      scene.physics.world.enableBody(this);
      this.attackTime = 0;
      this.damage = 20;
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
        case  "down-right":
          this.body.velocity.y = 250;
          this.body.velocity.x = 250;
          break;
        case  "down-left":
          this.body.velocity.y = 250;
          this.body.velocity.x = -250;
          break;
        case  "up-left":
          this.body.velocity.y = -250;
          this.body.velocity.x = -250;
          break;
        case  "up-right":
          this.body.velocity.y = -250;
          this.body.velocity.x = 250;
          break;
        default:
          this.body.velocity.y = -250;
      }
    }
    else
    {
        //Melee attack
      this.melee = true;
      this.damage = 60;
        this.setTexture('melee_attack');
        scene.physics.world.enableBody(this);
        this.setVisible(false);
        this.body.setSize(50,50,8,5);
        this.setOrigin(0.5, 0.5);
        this.attackTime = 0;
    }

    scene.projectiles.add(this);
  }


  update(){

    if(this.y < 32 ){
      this.destroy();
    }
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
}
