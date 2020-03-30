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
        scene: [Boot, MainMenu,MP_HowToPlay,Credits,GameOver,SP_1_Intro,SP_HowToPlay,SP_2_Character_Select,SP_3_Level,MP_Level,User_Interface,WinScreen],
        pixelArt: true,
        // 1.1 set the physics to arcade
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        }
    },gamePaused = false, reticle, player1Char = "Tom",player2Char = "Harry",pauseMusic,mpIntro, player, player2, lives = 3, moving, time, music,confirmSound, barrier, quickStart = false, game = new Phaser.Game(config);


