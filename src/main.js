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
    scene: [ Play ]
}

const game = new Phaser.Game(config);