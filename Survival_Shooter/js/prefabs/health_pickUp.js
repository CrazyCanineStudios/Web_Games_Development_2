class health_pickUp extends Phaser.GameObjects.Sprite{
  constructor(scene,x,y,pickupType){

    super(scene, x, y, "health_pickUp");

    this.pickupType = pickupType;
    scene.add.existing(this);
    switch (pickupType)
    {
      case"health":
        this.play("health_pu");
        break;
      case "ammo":
        this.setTexture("ammo_pu");
        break;
      default:
    }
    scene.physics.world.enableBody(this);
    this.setDisplaySize(17,27);
    scene.pickUps.add(this);
  }
  update()
  {
  }
}
