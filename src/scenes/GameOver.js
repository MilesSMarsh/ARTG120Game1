class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        this.load.image('good_end_screen', './assets/Bad_Ending.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //this.add.text(250, 250, 'Enter', menuConfig).setOrigin(0.5);
        this.screen = this.add.tileSprite(0,0,700,700, 'good_end_screen').setOrigin(0);

        //define keys
        keyENTER= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start('titleScene');    
        }
      }
}