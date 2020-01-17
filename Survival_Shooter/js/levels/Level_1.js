class Level_1 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {

    // Create world bounds
    this.physics.world.setBounds(0, 0, 1600, 1200); // The world bounds

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    player = this.physics.add.sprite(config.width/2,config.height/2,"player");
    player.setOrigin(0.5, 0.5).setDisplaySize(204, 265).setCollideWorldBounds(true).setDrag(500, 500);
    reticle = this.physics.add.sprite(800, 700, 'crosshair');
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);
    moving = false;
    this.cameras.main.zoom = 0.5;

    this.anims.create({
      key: "player_run_down",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 13
      }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: "player_run_up",
      frames: this.anims.generateFrameNumbers("player", {
        start: 14,
        end: 27
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: "player_run_right",
      frames: this.anims.generateFrameNumbers("player", {
        start: 28,
        end: 41
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: "player_run_left",
      frames: this.anims.generateFrameNumbers("player", {
        start: 42,
        end: 55
      }),
      frameRate: 12,
      repeat: -1
    });

    // Creates object for input with WASD keys (Player 1 Setup)
      moveKeys = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    // Enables movement of player with WASD keys
    this.input.keyboard.on('keydown_W', function (event) {
      player.setAccelerationY(-800);
      moving = true;
      player.play("player_run_up");
    });
    this.input.keyboard.on('keydown_S', function (event) {
      player.setAccelerationY(800);
      moving = true;
      player.play("player_run_down");
    });
    this.input.keyboard.on('keydown_A', function (event) {
      player.setAccelerationX(-800);
      moving = true;
      player.play("player_run_left");
    });
    this.input.keyboard.on('keydown_D', function (event) {
      player.setAccelerationX(800);
      moving = true;
      player.play("player_run_right");
    });

    // Stops player acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_W', function (event) {
      if (moveKeys['down'].isUp)
      {
        moving = false;
        player.setAccelerationY(0);
      }
    });
    this.input.keyboard.on('keyup_S', function (event) {
      if (moveKeys['up'].isUp)
      {
        moving = false;
        player.setAccelerationY(0);
      }
    });
    this.input.keyboard.on('keyup_A', function (event) {
      if (moveKeys['right'].isUp)
      {
        moving = false;
        player.setAccelerationY(0);
      }
    });
    this.input.keyboard.on('keyup_D', function (event) {
      if (moveKeys['left'].isUp)
      {
        moving = false;
        player.setAccelerationY(0);
      }
    });
// Locks pointer on mousedown
    game.canvas.addEventListener('mousedown', function () {
      game.input.mouse.requestPointerLock();
    });

    // Exit pointer lock when Q or escape (by default) is pressed.
    this.input.keyboard.on('keydown_Q', function (event) {
      if (game.input.mouse.locked)
        game.input.mouse.releasePointerLock();
    }, 0, this);

    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
      if (this.input.mouse.locked)
      {
        // Move reticle with mouse
        reticle.x += pointer.movementX;
        reticle.y += pointer.movementY;

        // Only works when camera follows player
        var distX = reticle.x-player.x;
        var distY = reticle.y-player.y;

        // Ensures reticle cannot be moved offscreen
        if (distX > 800)
          reticle.x = player.x+800;
        else if (distX < -800)
          reticle.x = player.x-800;

        if (distY > 600)
          reticle.y = player.y+600;
        else if (distY < -600)
          reticle.y = player.y-600;
      }
    }, this);
  }

  update() {
    //player.anims.play('player_walk_down');
    // Camera position is average between reticle and player positions
    let avgX = ((player.x+reticle.x)/2)-400;
    let avgY = ((player.y+reticle.y)/2)-300;
    this.cameras.main.scrollX = avgX;
    this.cameras.main.scrollY = avgY;
    // Make reticle move with player
    reticle.body.velocity.x = player.body.velocity.x;
    reticle.body.velocity.y = player.body.velocity.y;

    function turnToFaceAim(reticle)
    {
      // Rotates player to face towards reticle
      //player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);
      let rotAngleX  = player.x-reticle.x;
      let rotAngleY  = player.y-reticle.y;

      let dist = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);

      if (rotAngleX > 0 && rotAngleX>rotAngleY && !moving)
      {
        player.play("player_run_left");
      }
      else if (rotAngleX <0 && rotAngleX<rotAngleY  && !moving)
      {
        player.play("player_run_right");
      }
      if (rotAngleY > 0 && rotAngleY>rotAngleX  && !moving)
      {
        player.play("player_run_up");
      }
      else if (rotAngleY <0 && rotAngleY<rotAngleX  && !moving)
      {
        player.play("player_run_down");
      }
    }

    //turnToFaceAim(reticle);

    function constrainVelocity(sprite, maxVelocity)
    {
      if (!sprite || !sprite.body)
        return;

      var angle, currVelocitySqr, vx, vy;
      vx = sprite.body.velocity.x;
      vy = sprite.body.velocity.y;
      currVelocitySqr = vx * vx + vy * vy;

      if (currVelocitySqr > maxVelocity * maxVelocity)
      {
        angle = Math.atan2(vy, vx);
        vx = Math.cos(angle) * maxVelocity;
        vy = Math.sin(angle) * maxVelocity;
        sprite.body.velocity.x = vx;
        sprite.body.velocity.y = vy;
      }
    }

    // Constrain velocity of player
    constrainVelocity(player, 500);

    function constrainReticle(reticle, radius)
    {
      var distX = reticle.x-player.x; // X distance between player & reticle
      var distY = reticle.y-player.y; // Y distance between player & reticle
      // Ensures reticle cannot be moved offscreen
      if (distX > 800)
        reticle.x = player.x+800;
      else if (distX < -800)
        reticle.x = player.x-800;

      if (distY > 600)
        reticle.y = player.y+600;
      else if (distY < -600)
        reticle.y = player.y-600;

      // Ensures reticle cannot be moved further than dist(radius) from player
      var distBetween = Phaser.Math.Distance.Between(player.x, player.y, reticle.x, reticle.y);
      if (distBetween > radius)
      {
        // Place reticle on perimeter of circle on line intersecting player & reticle
        var scale = distBetween/radius;

        reticle.x = player.x + (reticle.x-player.x)/scale;
        reticle.y = player.y + (reticle.y-player.y)/scale;
      }
    }
    // Constrain position of reticle
    constrainReticle(reticle, 550);
  }
}
