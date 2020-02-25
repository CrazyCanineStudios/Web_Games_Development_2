class health_pickUp extends Phaser.GameObjects.Sprite{
  constructor(scene,x,y){

    super(scene, x, y, "health_pickUp");

    scene.add.existing(this);
    this.play("health_pu");
    this.setDisplaySize(17,27);
    scene.physics.world.enableBody(this);
    scene.pickUps.add(this);
  }
  update()
  {
  }
}
