var config = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        parent: 'shooter-game',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1920,
            height: 1080
        },
        backgroundColor: 0x000000,
        plugins: {
            scene: [
                { key: 'DialogModalPlugin', plugin: DialogModalPlugin, mapping: 'dialog' }
            ]
        },
        scene: [Boot, MainMenu, Credits, SP_1_Intro,SP_2_Character_Select,SP_3_Level,MP_Level,User_Interface],
        pixelArt: true,
        // 1.1 set the physics to arcade
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        }
    },moveKeys, reticle,player1Char = "Tom", bullets, lastFired,player, moving, time, music,confirmSound,quickStart, game = new Phaser.Game(config);


