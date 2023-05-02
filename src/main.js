let config = {
    type: Phaser.CANVAS,
    width: 700,
    height: 700,
    pixelArt: true,
    physics:{
        default: "arcade"
    },
    scene: [ Play ]
}

const game = new Phaser.Game(config);

let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;