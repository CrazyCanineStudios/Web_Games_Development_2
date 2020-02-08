class Boot extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload()
  {
    console.log("Boot State Started");
    this.load.image('menuImage','assets/sprites/menu.png');
    this.load.image('creditsImage','assets/sprites/spr_credits.png');
    this.load.image("background", "assets/sprites/backgrounds/bg_level_1.png");
    //
    this.load.image("crosshair", "assets/sprites/spr_crosshair.png");
    this.load.image("house", "assets/sprites/spr_ice_cream_store.png");
    this.load.spritesheet("player", "assets/sprites/spr_player_girl.png",{frameWidth: 204, frameHeight: 265});
    this.load.spritesheet("player_tom", "assets/sprites/spr_player_tom.png",{frameWidth: 204, frameHeight: 265});
    this.load.spritesheet("buttons", "assets/sprites/buttons.png",{frameWidth: 736, frameHeight: 276});
    this.load.spritesheet("backButtons", "assets/sprites/back_button.png",{frameWidth: 55, frameHeight: 24});
    this.load.spritesheet("continueButton", "assets/sprites/continue_button.png",{frameWidth: 195, frameHeight: 66});
    this.load.spritesheet("continueStoryButton", "assets/sprites/continueStoryButton.png",{frameWidth: 84, frameHeight: 24});
    this.load.audio('titleMusic', ['assets/sounds/music/mus_title.ogg']);
    this.load.audio('level1Music', ['assets/sounds/music/mus_level_1.ogg']);
    this.load.audio('confirmSound', ['assets/sounds/sound effects/snd_confirm.ogg']);
    this.load.image('level1_atlas','assets/sprites/tilemaps/level1_atlas.png');
    this.load.tilemapTiledJSON('level1', 'assets/maps/level1.json');
  }
  create() {
    this.add.text(20, 20, "The game is loading");
    music = this.sound.add('titleMusic');
    music.loop = true;
    music.play();
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
      this.anims.create({
          key: "tom_run_down",
          frames: this.anims.generateFrameNumbers("player_tom", {
              start: 0,
              end: 13
          }),
          frameRate: 12,
          repeat: -1
      });

      this.anims.create({
          key: "tom_run_up",
          frames: this.anims.generateFrameNumbers("player_tom", {
              start: 14,
              end: 27
          }),
          frameRate: 12,
          repeat: -1
      });
      this.anims.create({
          key: "tom_run_right",
          frames: this.anims.generateFrameNumbers("player_tom", {
              start: 28,
              end: 41
          }),
          frameRate: 12,
          repeat: -1
      });
      this.anims.create({
          key: "tom_run_left",
          frames: this.anims.generateFrameNumbers("player_tom", {
              start: 42,
              end: 55
          }),
          frameRate: 12,
          repeat: -1
      });
    if (quickStart) this.scene.start("sp_house");
    else this.scene.start("mainMenu");

  }
  update () {

  }
}
