class SP_3_Level extends Phaser.Scene {
  constructor() {
    super("sp_1");
  }
  preload()
  {
  }
  create() {
    // Create world bounds
    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.physics.world.setBounds(0, 0, 3200, 3200); // The world bounds
    const map = this.make.tilemap({ key: 'level2' });
    const tileset = map.addTilesetImage('level 1 tilemap', 'level2_atlas');
    const floors = map.createStaticLayer('Floors', tileset, 0, 0);
    const walls = map.createStaticLayer('Walls', tileset, 0, 0);
    const details = map.createStaticLayer('Details', tileset, 0, 0);
    const objects = map.createStaticLayer('Objects', tileset, 0, 0);
    this.darkness = this.add.sprite(0,0, 'darkness');
    this.darkness.setOrigin(0.5, 0.5);
    this.darkness.depth=7;
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
    var healthPickup = new health_pickUp(this,276,584,"health");
    var ammoPickup = new health_pickUp(this,276,650,"ammo");

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

    this.player = player;

    // Create enemies group with collision
    this.enemies = this.add.group({classType: Enemy, runChildUpdate: true});
    this.physics.add.collider(this.enemies, this.enemies);

    // Create the enemies' projectile group
    this.enemyProjectiles = this.add.group({classType: enemyBeam, runChildUpdate: true});
    this.physics.add.collider(this.enemyProjectiles, platforms, function (enemyProjectile, platform) {enemyProjectile.destroy();});

    // When a player and an enemy's projectile overlap
    this.physics.add.overlap(this.enemyProjectiles, player, function (enemyProjectile, player) {enemyProjectile.destroy(); player.takeDamage(enemyProjectile.damage);});

    // Create the Boss enemy
    var boss = new Boss(this, 1650, 300);

      // Create the melee enemies; setting its Scene, X, Y, and if it is Ranged
      this.enemies.create(this.enemy1 = new Enemy(this, 288, 600, false));
      this.enemies.create(this.enemy2 = new Enemy(this, 100, 750, false));
      this.enemies.create(this.enemy3 = new Enemy(this, 128, 450, false));
      this.enemies.create(this.enemy4 = new Enemy(this, 512, 200, false));
      this.enemies.create(this.enemy5 = new Enemy(this, 258, 172, true));
      this.enemies.create(this.enemy6 = new Enemy(this, 512, 128, false));
      this.enemies.create(this.enemy7 = new Enemy(this, 786, 128, false));
      this.enemies.create(this.enemy8 = new Enemy(this, 1020, 200, false));
      this.enemies.create(this.enemy9 = new Enemy(this, 1120, 200, false));
      this.enemies.create(this.enemy10 = new Enemy(this, 868, 464, true));
      this.enemies.create(this.enemy11 = new Enemy(this, 1268, 350, false));
      this.enemies.create(this.enemy12 = new Enemy(this, 860, 752, false));
      this.enemies.create(this.enemy13 = new Enemy(this, 976, 624, false));
      this.enemies.create(this.enemy14 = new Enemy(this, 1200, 600, false));
      this.enemies.create(this.enemy15 = new Enemy(this, 1522, 570, true));
      this.enemies.create(this.enemy16 = new Enemy(this, 1522, 720, true));

    // When an enemy and a wall collide
    this.physics.add.collider(this.enemies, platforms);

    // When an enemy and a player projectile collide
    this.physics.add.collider(this.enemies, this.projectiles, function(enemy, projectile){enemy.takeDamage(projectile.damage); projectile.destroy();});
    this.physics.add.collider(this.enemyProjectiles, this.projectiles, function(enemyProjectile, projectile)
        {
          if (projectile.melee)
          {
            enemyProjectile.reverse();
            projectile.destroy();
          }
        }
    );
    this.physics.add.collider(this.enemyProjectiles, this.enemies, function(enemyProjectile, enemy)
        {
          if (enemyProjectile.dealsDamageToEnemy)
          {
            enemy.takeDamage(enemyProjectile.damage)
            enemyProjectile.destroy();
          }
        }
    );
    this.physics.add.collider(platforms, this.projectiles, function(projectile){projectile.destroy();});

    // When the enemy and a player collide
    this.physics.add.overlap(this.enemies, this.players, function(enemy, player) {enemy.attack(player, enemy.damage);});
    // When the player and a pick up collide
    this.physics.add.overlap(this.pickUps, this.players, function(pickup, player)
    {
      if (pickup.pickupType === "health" && player.health<100)
      {
        player.health +=10;
        player.pickupSound.stop();
        player.pickupSound.play();
        pickup.destroy();
      }
      if (pickup.pickupType === "ammo" && !player.useStamina && player.ammo<100)
      {
        player.ammo +=10;
        pickup.destroy();
      }
    });

    // Create the win condition barrier
    barrier = this.add.sprite(1728, 208, 'barrier');
    this.physics.world.enableBody(barrier);
    barrier.body.setSize(64,64,8,5);
    barrier.body.setImmovable();
    this.physics.add.collider(player, barrier);

    let generator = this.add.sprite(1724, 200, 'ammo_pu');
    this.physics.world.enableBody(generator);
    generator.body.setSize(32,32,8,5);
    generator.body.setImmovable();
    this.physics.add.collider(player, generator, function (player, generator) {player.scene.win();});

    this.scene.launch('UIScene');
  }
  update()
  {
    if (Phaser.Input.Keyboard.JustDown(this.pause))
    {
      this.scene.stop('UIScene');
      this.scene.start("mainMenu");
    }
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

    reticle.x = player.x;
    reticle.y = player.y;
    this.darkness.x = player.x;
    this.darkness.y = player.y;
  }
  shootBeam(x,y,direction,melee) {
    var beam = new Beam(this,x,y,direction,melee);
  }

  // When the player win the game
  win()
  {
    this.scene.stop('UIScene');
    this.scene.start("win");
  }
}
