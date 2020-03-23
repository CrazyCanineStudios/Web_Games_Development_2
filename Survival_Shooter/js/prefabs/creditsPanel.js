class CreditsPanel extends Phaser.GameObjects.Sprite
{
  timeTillDestroy = 0;
  lastOne = false;
  num = 1;
  actualTime = 1300;
  constructor(scene,x,y,image,num,lastOne)
  {
    super(scene, x, y,image);
    this.setOrigin(0.5,0.5); // The anchor sets the pivot point of the sprite. Setting than anchor to 0.5,0.5 means the pivot is centered
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.body.velocity.y = -50;
    scene.creditsGroup.add(this);
    this.num = num;
    this.lastOne = lastOne;
    if (this.lastOne === true)
    {
        this.actualTime = 1150;
    }
  }

  update()
  {
      if (this.timeTillDestroy >= (this.actualTime * this.num))
      {
          if (this.lastOne ===true)
          {
              this.scene.scene.start("mainMenu");
          }
          else
          {
              console.log("Destroy");
              this.destroy();
          }

      }
      // Increase the timer
      else
      {
          if (this.lastOne ===true)
          {
              //console.log(this.timeTillDestroy + "/" + (this.actualTime * this.num);
          }
        this.timeTillDestroy++;
      }
    }
}
