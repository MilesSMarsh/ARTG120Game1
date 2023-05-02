class SecondScene extends Phaser.Scene{
    constructor(){
        super("secondScene");
    }
    preload(){
        //load sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('ground', './assets/wall.png');
        this.load.image('ui', './assets/ui.png');
        this.load.image('door', './assets/door.png');
        this.load.image('carrot', './assets/Carrot.png');
        this.load.image('tomato', './assets/Tomato.png');
        this.load.image('cabbage', './assets/Cabbage.png');
        this.load.image('aisle', './assets/aisle.png');
        this.load.image('cash_register', './assets/cash_register.png');
        this.load.image('line', './assets/line.png');

        /*
        //load walking spritesheets
        this.load.spritesheet('walk_right', './assets/spritesheets/Move_Right.png',{
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet('walk_left', './assets/spritesheets/Move_Left.png',{
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet('walk_up', './assets/spritesheets/Move_Up.png',{
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet('walk_down', './assets/spritesheets/Move_Down.png',{
            frameWidth: 100,
            frameHeight: 100
        });




        //load attack sprite sheets
        this.load.spritesheet('attack_right', './assets/spritesheets/Attack_Right.png',{
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet('attack_left', './assets/spritesheets/Attack_Left.png',{
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet('attack_down', './assets/spritesheets/Attack_Down.png',{
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet('attack_up', './assets/spritesheets/Attack_Up.png',{
            frameWidth: 100,
            frameHeight: 100
        });





        this.load.spritesheet('boss', './assets/Boss.png',{
            frameWidth: 64,
            frameHeight: 64
        });
        */
    }
    create(){
        //get input
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


        //set background color
        this.cameras.main.setBackgroundColor('#3f00ff')

        this.add.image(0,0, 'ui').setOrigin(0);
        this.heart1 = this.add.tileSprite(50,30,30,30, 'heart');
        this.heart2 = this.add.tileSprite(80,30,30,30, 'heart');
        this.heart3 = this.add.tileSprite(110,30,30,30, 'heart');
        this.heart4 = this.add.tileSprite(140,30,30,30, 'heart');
        this.heart5 = this.add.tileSprite(170,30,30,30, 'heart');

        this.carrot = this.add.tileSprite(560,30,100,100, 'carrot');
        this.tomato = this.add.tileSprite(610,30,100,100, 'tomato');
        this.cabbage = this.add.tileSprite(660,30,100,100, 'cabbage');


        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();
        //this.ui = this.physics.add.staticGroup();
        this.door = this.physics.add.staticGroup();
        this.line = this.physics.add.staticGroup();

        //this.ui.create(0,0, 'ui').setOrigin(0);
        this.door.create(100,100, 'door').setScale(2).refreshBody();
        this.line.create(350, 50, 'line').setOrigin(0.5);

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.platforms.create(600, 568, 'aisle')

        //  Now let's create some ledges
        this.platforms.create(600, 400, 'aisle');
        //this.platforms.create(50, 250, 'aisle');
        this.platforms.create(750, 400 - 168, 'aisle');

        this.platforms.create(100, 600, 'cash_register');

        //this.obsticle = new Object(this, game.config.width/2, game.config.height, 'wall').setOrigin(0.5, 0);  
        //this.p2Character = new Character(this, game.config.width/2, game.config.height+ 50, 'rocket').setOrigin(0.5, 0); 
        //this.physics.add.collider(this.p1Character, this.platforms);  
        
        //this.physics.add.overlap(this.p1Character, this.door, this.whatup, null, this);
       
        //create new instance of character
        this.p1Character = new Character(this, game.config.width/2, game.config.height- 50, 'walk_right', 0, 'right').setOrigin(0.5, 0);
        this.p1Character.setSize(30, 47, true);
        //create state machine for new character
        this.characterFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            damaged: new DamagedState(),
            attacking: new AttackState()
        }, [this, this.p1Character]);

        console.log("made it to second scene");
                //this.obsticle = new Object(this, game.config.width/2, game.config.height, 'wall').setOrigin(0.5, 0);  
        //this.p2Character = new Character(this, game.config.width/2, game.config.height+ 50, 'rocket').setOrigin(0.5, 0); 
        this.physics.add.collider(this.p1Character, this.platforms);  
        this.physics.add.collider(this.p1Character, this.line);
        
        this.physics.add.overlap(this.p1Character, this.door, this.whatup, null, this);

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        /*
                //animation creation for character walk
                this.anims.create({
                    key: 'walk-up',
                    frameRate: 8,
                    repeat: -1,
                    frames: this.anims.generateFrameNumbers('walk_up', {start: 0, end: 2})
                });
                this.anims.create({
                    key: 'walk-down',
                    frameRate: 8,
                    repeat: -1,
                    frames: this.anims.generateFrameNumbers('walk_down', {start: 0, end: 2})
                });
                this.anims.create({
                    key: 'walk-right',
                    frameRate: 8,
                    repeat: -1,
                    frames: this.anims.generateFrameNumbers('walk_right', {start: 0, end: 2})
                });
                
                this.anims.create({
                    key: 'walk-left',
                    frameRate: 8,
                    repeat: -1,
                    frames: this.anims.generateFrameNumbers('walk_left', {start: 0, end: 2})
                });
        
        
        
        
        
                //animation creation for character attack
                this.anims.create({
                    key: 'attack-up',
                    frameRate: 8,
                    frames: this.anims.generateFrameNumbers('attack_up', {start: 0, end: 3})
                });
                this.anims.create({
                    key: 'attack-down',
                    frameRate: 8,
                    frames: this.anims.generateFrameNumbers('attack_down', {start: 0, end: 3})
                });
                this.anims.create({
                    key: 'attack-left',
                    frameRate: 8,
                    frames: this.anims.generateFrameNumbers('attack_left', {start: 0, end: 3})
                });
                this.anims.create({
                    key: 'attack-right',
                    frameRate: 8,
                    frames: this.anims.generateFrameNumbers('attack_right', {start: 0, end: 3})
                });
                */

    }
    //any other functions
    update(){
        this.characterFSM.step();

        //this.physics.add.collider(this.platforms, this.hero, function (platforms, hero) {
            //console.log("touched the dude")
        //})
        //this.physics.add.collider(this.p1Character, this.platforms);

        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('playScene');
        }
    }
    whatup (player, fridge) {
        console.log("touching");
        this.scene.start('playScene');
    };
}