let config = {
    type: Phaser.CANVAS,
    width: 1000,
    height: 800,
    scene: [ Play ]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;