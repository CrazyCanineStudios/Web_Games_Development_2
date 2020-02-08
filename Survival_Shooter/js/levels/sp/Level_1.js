class Level_1 extends Phaser.Scene {
  constructor() {
    super("sp_house");
  }

  create() {
    // Create world bounds
    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.physics.world.setBounds(0, 0, 1600, 1200); // The world bounds
    this.background = this.add.tileSprite(0, 0, 1600, 1200, "background");
    this.background.setOrigin(0, 0);
    const map = this.make.tilemap({ key: 'level1' });
    const tileset = map.addTilesetImage('interior_atlas', 'level1_atlas');
    const floors = map.createStaticLayer('Floors', tileset, 0, 0);
    const walls = map.createStaticLayer('Walls', tileset, 0, 0);
    this.players = this.add.group();
    this.projectiles = this.add.group();
    this.playerInput = [];
    this.playerInput [0] = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D,
      'attack': Phaser.Input.Keyboard.KeyCodes.SPACE,
      'special': Phaser.Input.Keyboard.KeyCodes.X
    });
    this.playerInput [1] = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
      'attack': Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO,
      'special': Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE
    });
    this.player = new Player(this,config.width/2,config.height/2 + 100,"Zoe",0);
    this.player2 = new Player(this,config.width/2 + 70,config.height/2 + 100,"Tom",1);
    var bullet = new WaterBalloon(this,this.player.x,this.player.y + 5);
    const platforms = map.createStaticLayer('Collisions', tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);
    reticle = this.physics.add.sprite(this.player.x,this.player.y, 'target');
    this.cameras.main.zoom =2;
    reticle.visible = false;
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player2, platforms);

// Locks pointer on mousedown
    game.canvas.addEventListener('mousedown', function () {
      game.input.mouse.requestPointerLock();
    });
    if (Phaser.Input.Keyboard.JustDown(this.pause))
    {
      this.scene.start("mainMenu");
    }

    if (music.key!== 'level1Music')
    {
      music.stop();
      music = this.sound.add('level1Music');
      music.loop = true;
      music.play();
    }
  }
  update()
  {
    this.cameras.main.startFollow(reticle);
    for(var i = 0; i < this.players.getChildren().length; i++)
    {
      var player = this.players.getChildren()[i];
      player.update();
    }
    for(var i = 0; i < this.projectiles.getChildren().length; i++)
    {
      var projectile= this.projectiles.getChildren()[i];
      projectile.update();
    }

    if (this.player.body.x > this.player2.body.x)
    {
      console.log(this.player.body.x + " is bigger than " + this.player2.body.x);
      var difference = (this.player.body.x + this.player2.body.x)/2;
      this.averagePlayerPosX = difference;
    }
    else if (this.player.body.x < this.player2.body.x)
    {
      console.log(this.player.body.x + " is smaller than " + this.player2.body.x);
      var difference = (this.player2.body.x + this.player.body.x)/2;
      this.averagePlayerPosX = difference;
    }
    else if (this.player.body.x === this.player2.body.x)
    {
      console.log(this.player.body.x + " is the same as " + this.player2.body.x);
      this.averagePlayerPosX = this.player.body.x;
    }

    if (this.player.body.y > this.player2.body.y)
    {
      console.log(this.player.body.y + " is bigger than " + this.player2.body.y);
      var difference = (this.player.body.y + this.player2.body.y)/2;
      this.averagePlayerPosY = difference;
    }
    else if (this.player.body.y < this.player2.body.y)
    {
      console.log(this.player.body.y + " is smaller than " + this.player2.body.y);
      var difference = (this.player2.body.y + this.player.body.y)/2;
      this.averagePlayerPosY = difference;
    }
    else if (this.player.body.y === this.player2.body.y)
    {
      console.log(this.player.body.y + " is the same as " + this.player2.body.y);
      this.averagePlayerPosY = this.player.body.y;
    }
    reticle.x = this.averagePlayerPosX;
    reticle.y = this.averagePlayerPosY;
  }
}
