var config = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        backgroundColor: 0x000000,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
      },
        scene: [Boot, MainMenu,Credits,Level_1],
        pixelArt: true,
        // 1.1 set the physics to arcade
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        }
    },moveKeys, reticle, bullets, lastFired, moving, time, music,confirmSound,quickStart = true,
    game = new Phaser.Game(config);


