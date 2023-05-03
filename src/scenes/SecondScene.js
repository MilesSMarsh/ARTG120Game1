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
        this.load.image('meatball', './assets/meatball2.png');

        
    }
    create(){

        this.hasTomato = false;
        this.hasCarrot = false;
        this.hasCabbage = false;

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

        this.carrot = this.add.tileSprite(560,30,39,39, 'carrot');
        this.tomato = this.add.tileSprite(610,30,40,40, 'tomato');
        this.cabbage = this.add.tileSprite(660,30, 40,40, 'cabbage');

        //this.carrotEnemyTest = this.add.tileSprite(420,350,100,100, 'carrot');

        this.carrotEnemy= this.physics.add.group({
            key: 'carrot',
            repeat: 0,
            setXY: { x: 420, y: 250, stepX: 50 }
        });

        this.carrotEnemy.children.iterate(function (child) {

            child.setBounce(1);
            child.setVelocityX(Phaser.Math.FloatBetween(100, 200));
            child.setVelocityY(Phaser.Math.FloatBetween(100, 200));
            child.setCollideWorldBounds(true);
    
        });

        this.tomatoEnemy= this.physics.add.group({
            key: 'tomato',
            repeat: 0,
            setXY: { x: 450, y: 150}
        });

        this.tomatoEnemy.children.iterate(function (child) {

            child.setBounce(1);
            child.setVelocityX(Phaser.Math.FloatBetween(100, 200));
            child.setVelocityY(Phaser.Math.FloatBetween(100, 200));
            child.setCollideWorldBounds(true);
    
        });

        this.cabbageEnemy= this.physics.add.group({
            key: 'cabbage',
            repeat: 0,
            setXY: { x: 250, y: 250, stepX: 150 }
        });
        
        this.cabbageEnemy.children.iterate(function (child) {

        child.setBounce(1);
        child.setVelocityX(Phaser.Math.FloatBetween(100, 200));
        child.setVelocityY(Phaser.Math.FloatBetween(100, 200));
        child.setCollideWorldBounds(true);

        });

    
        
        //this.meatball= this.physics.add.group({
        //    key: 'meatball',
        //    repeat: 1,
        //    setXY: { x: 220, y: 100, stepX: 150 },
        //});
        //this.meatball.children.iterate(child =>
        //{    
        //    child.setBounceY(Phaser.Math.FloatBetween(0.5, 0.8));
        //});

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
        this.cartHitBox = this.add.rectangle(game.config.width, game.config.height ,35, 35, 0xffffff, 0.5);
        this.physics.add.existing(this.cartHitBox);

        //create new instance of character
        this.p1Character = new Character(this, game.config.width/2, game.config.height- 50, 'walk_right', 0, 'right', this.cartHitBox, 5).setOrigin(0.5, 0);
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

        this.physics.add.overlap(this.p1Character, this.meatball, this.hitMeatball, null, this);
        this.physics.add.overlap(this.p1Character, this.carrotEnemy, this.getCarrot, null, this);
        this.physics.add.overlap(this.p1Character, this.cabbageEnemy, this.getCabbage, null, this);
        this.physics.add.overlap(this.p1Character, this.tomatoEnemy, this.getTomato, null, this);
        
        //this.physics.add.overlap(this.p1Character, this.door, this.whatup, null, this);

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        
        this.physics.add.collider(this.carrotEnemy, this.platforms);
        this.physics.add.collider(this.tomatoEnemy, this.platforms);
        this.physics.add.collider(this.cabbageEnemy, this.platforms);

    }
    //any other functions
    update(){
        this.characterFSM.step();

        if(this.hasCabbage && this.hasCarrot && this.hasTomato){
            this.physics.add.overlap(this.p1Character, this.door, this.whatup, null, this);
 
        }

        //console.log(this.carrotEnemy.x);
        //this.physics.add.collider(this.platforms, this.hero, function (platforms, hero) {
            //console.log("touched the dude")
        //})
        //this.physics.add.collider(this.p1Character, this.platforms);

        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('playScene');
        }

        if (this.p1Character.currHealth == 4){
            //console.log("health");
            this.heart5.setVisible(false);
            this.heart4.setVisible(true);
            this.heart3.setVisible(true);
            this.heart2.setVisible(true);
            this.heart1.setVisible(true);
        }
        if (this.p1Character.currHealth == 3){
            //console.log("health");
            this.heart5.setVisible(false);
            this.heart4.setVisible(false);
            this.heart3.setVisible(true);
            this.heart2.setVisible(true);
            this.heart1.setVisible(true);
        }
        if (this.p1Character.currHealth == 2){
            //console.log("health");
            this.heart5.setVisible(false);
            this.heart4.setVisible(false);
            this.heart3.setVisible(false);
            this.heart2.setVisible(true);
            this.heart1.setVisible(true);
        }
        if (this.p1Character.currHealth == 1){
            //console.log("health");
            this.heart5.setVisible(false);
            this.heart4.setVisible(false);
            this.heart3.setVisible(false);
            this.heart2.setVisible(false);
            this.heart1.setVisible(true);
        }
        if (this.p1Character.currHealth == 0){
            //console.log("health");
            this.heart5.setVisible(false);
            this.heart4.setVisible(false);
            this.heart3.setVisible(false);
            this.heart2.setVisible(false);
            this.heart1.setVisible(false);
            //maybe play a cute little animation
            this.scene.start('gameOverScene');
        }
    }
    whatup (player, fridge) {
        console.log("touching");
        this.scene.start('playScene');
    };
    getCarrot (player, carrot) {
        console.log("got carrot");
        this.hasCarrot = true;
        carrot.disableBody(true, true);
        this.carrot.setVisible(false);
    }
    hitMeatball (player, meatball) {
        this.p1Character.currHealth -= 1;
    }
    getCabbage (player, cabbage) {
        console.log("got cabbage");
        this.hasCabbage = true;
        cabbage.disableBody(true, true);
        this.cabbage.setVisible(false);
    }
    getTomato (player, tomato) {
        console.log("got tomato");
        this.hasTomato = true;
        tomato.disableBody(true, true);
        this.tomato.setVisible(false);
    }
}
