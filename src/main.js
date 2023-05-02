let config = {
    type: Phaser.CANVAS,
    width: 700,
    height: 700,
    pixelArt: true,
    physics:{
        default: "arcade",
        arcade : {
            //debug: true
        }
    },
    scene: [ TitleScreen, Dude, SecondScene, Play, GameOver, GoodEnding ]
}

const game = new Phaser.Game(config);

let keyENTER, keySPACE;