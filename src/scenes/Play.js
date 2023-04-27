class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //load sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('wall', './assets/wall.png');
    }
    create(){
        //make the screen/objects
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        walls = this.physics.add.staticGroup();

        this.p1Character = new Character(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        //this.wallTest = new Wall(this, game.config.width/2, borderUISize + borderPadding, 'wall').setOrigin(0.5, 0);

        walls.create(0, game.config.height, 'wall').setScale(2).refreshBody();

    }
    update(){
        //progress the game state
        this.p1Character.update();

        
        
    }
    //any other functions
    checkCollision(character, wall) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
    }
}