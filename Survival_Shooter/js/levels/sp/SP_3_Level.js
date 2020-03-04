class SP_3_Level extends Phaser.Scene {
  spotlight;
  charLight;
  constructor() {
    super("sp_1");
  }

  create() {
    // Create world bounds
    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.physics.world.setBounds(0, 0, 3200, 3200); // The world bounds
    this.background = this.add.tileSprite(0, 0, 3200, 3200, "background");
    this.background.setOrigin(0, 0);
    const map = this.make.tilemap({ key: 'level2' });
    const tileset = map.addTilesetImage('level 1 tilemap', 'level2_atlas');
    const floors = map.createStaticLayer('Floors', tileset, 0, 0);
    const walls = map.createStaticLayer('Walls', tileset, 0, 0);
    const objects = map.createStaticLayer('Objects', tileset, 0, 0);
    this.players = this.add.group();
    this.projectiles = this.add.group();
    this.pickUps = this.add.group();
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
    player = new Player(this,256,736,player1Char,0);
    const platforms = map.createStaticLayer('Collisions', tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);
    reticle = this.physics.add.sprite(player.x,player.y, 'target');
    this.cameras.main.zoom =3;
    this.cameras.main.roundPixels = true;
    reticle.visible = false;
    this.physics.add.collider(player, platforms);
    this.spotlight = this.make.sprite({
      x: player.x,
      y: player.y,
      key: 'mask',
      add: false
    });
    this.charLight = this.make.sprite({
      x: player.x,
      y: player.y,
      key: 'character_mask',
      add: false
    });
    var healthPickup = new health_pickUp(this,276,584);
    floors.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotlight);
    walls.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotlight);
    objects.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotlight);
    player.mask = new Phaser.Display.Masks.BitmapMask(this, this.charLight);
    player.shadow.mask = new Phaser.Display.Masks.BitmapMask(this, this.charLight);

    // Create enemies group with collision
    this.enemies = this.add.group();
    this.physics.add.collider(this.enemies, platforms);
    var enemy = new Enemy(this, 288, 600);

// Locks pointer on mousedown
    game.canvas.addEventListener('mousedown', function () {
      game.input.mouse.requestPointerLock();
    });

    if (music.key!== 'level1Music')
    {
      music.stop();
      music = this.sound.add('level1Music');
      music.loop = true;
      music.play();
    }
    this.scene.launch('UIScene');
  }
  update()
  {
    if (Phaser.Input.Keyboard.JustDown(this.pause))
    {
      this.scene.stop('UIScene');
      this.scene.start("mainMenu");
    }
    this.charLight.x = this.spotlight.x;
    this.charLight.y = this.spotlight.y;
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

    // Call update on enemies
    for(var i = 0; i < this.enemies.getChildren().length; i++)
    {
        var enemy= this.enemies.getChildren()[i];
        enemy.update();
    }

    reticle.x = player.x;
    reticle.y = player.y;
    this.spotlight.x = player.x;
    this.spotlight.y = player.y;
    this.charLight.x = player.x;
    this.charLight.y = player.y;
  }
  shootBeam(x,y,direction) {
    var beam = new Beam(this,x,y,direction);
  }
}
