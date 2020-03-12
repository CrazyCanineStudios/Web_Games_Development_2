class Beam extends Phaser.GameObjects.Sprite{
  constructor(scene,x,y,direction,melee){

    super(scene, x, y, "beam");

    scene.add.existing(this);
    if (!melee)
    {
      this.play("beam_anim");
      scene.physics.world.enableBody(this);
      this.attackTime = 0;
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
        this.setTexture('melee_attack')
      this.attackTime = 2;
    }

    scene.projectiles.add(this);
  }


  update(){

    if(this.y < 32 ){
      this.destroy();
    }
    // Check if enough time has passed since the last attack
    if (this.attackTime > 60)
    {
      this.destroy();
    }
    // Increase the timer
    else {
      this.attackTime++;
    }
  }
}
