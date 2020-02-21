class Beam extends Phaser.GameObjects.Sprite{
  constructor(scene,x,y,direction){

    super(scene, x, y, "beam");

    scene.add.existing(this);

    this.play("beam_anim");
    scene.physics.world.enableBody(this);
    switch (direction)
    {
      case "left":
        this.body.velocity.x = - 250;
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


    scene.projectiles.add(this);
  }


  update(){

    if(this.y < 32 ){
      this.destroy();
    }
  }
}
