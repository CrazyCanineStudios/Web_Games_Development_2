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
        scene: [Boot, MainMenu,MP_HowToPlay,Credits, SP_1_Intro,SP_HowToPlay,SP_2_Character_Select,SP_3_Level,MP_Level,User_Interface],
        pixelArt: true,
        // 1.1 set the physics to arcade
        physics: {
            default: "arcade",
            arcade: {
                debug: true
            }
        }
    }, moveKeys, reticle, player1Char = "Tom", bullets, lastFired, player, player2, lives = 5, moving, time, music,confirmSound,quickStart = false, game = new Phaser.Game(config);


