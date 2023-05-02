class Dude extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //load sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('fridge', './assets/fridge.png');
        this.load.image('dummy', './assets/Training_Dummy.png');
        this.load.image('ui', './assets/ui.png');
        this.load.image('heart', './assets/heart.png');  
    }
    create(){
        //get input
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


        //set background color
        this.cameras.main.setBackgroundColor('#872f29')
        //this.heart0 = this.add.image(0, 0, 'heart');

        //this.add.rectangle(0, 100, 100, 100, 0x4b8be2).setOrigin(0, 0);
        //this.heart0 = this.add.tileSprite(0,0,30,30, 'heart');
        this.add.image(0,0, 'ui').setOrigin(0);
        this.heart1 = this.add.tileSprite(50,30,30,30, 'heart');
        this.heart2 = this.add.tileSprite(80,30,30,30, 'heart');
        this.heart3 = this.add.tileSprite(110,30,30,30, 'heart');
        this.heart4 = this.add.tileSprite(140,30,30,30, 'heart');
        this.heart5 = this.add.tileSprite(170,30,30,30, 'heart');
        //this.add.image(0,0, 'ui').setOrigin(0);

        //this.ui = this.physics.add.staticGroup();
        this.fridge = this.physics.add.staticGroup();
        this.dummy = this.physics.add.staticGroup();

        //this.heart0 = this.add.tileSprite(50,55,30,30, 'heart');
        //this.add.image(100,200, 'heart');

        //this.heart = this.physics.add.staticGroup();
        //this.heart.create(100,200, 'heart');

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.fridge.create(400, 568, 'fridge').setScale(2).refreshBody();
        //this.fridge = this.physics.add.sprite(400, 568, 'fridge');
        this.dummy.create(150, 300, 'dummy');
        //this.ui.create(0,0, 'ui').setOrigin(0);

        this.p1Character = new Character(this, game.config.width/2, game.config.height- 50, 'rocket').setOrigin(0.5, 0);

        //this.physics.add.collider(this.p1Character, this.fridge);
        this.physics.add.overlap(this.p1Character, this.fridge, this.whatup, null, this);
        this.physics.add.collider(this.p1Character, this.dummy);
        this.physics.add.overlap(this.p1Character, this.dummy, this.bounce, null, this);
       
        this.characterFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState()
        }, [this, this.p1Character]);

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        console.log("made it to first scene");

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

        this.add.text(200, 100, 'Controls:', menuConfig).setOrigin(0.5);
        this.add.text(200, 150, 'Arrow Keys to Move', menuConfig).setOrigin(0.5);
        this.add.text(200, 200, 'Space to Attack', menuConfig).setOrigin(0.5);
        this.add.text(400, 500, 'Touch Fridge to Move to Next Zone', menuConfig).setOrigin(0.5);
        let leave_check = false;

    }
    //any other functions
    update(){
        this.characterFSM.step();

        //this.physics.add.overlap(this.player, this.stars, this.whatup, null, this);

        //this.physics.add.collider(this.fridge, this.p1Character, function (fridge, p1Character) {
              //leave_check = true;
        //})
        //if (Phaser.Input.Keyboard.JustDown(keyENTER) && leave_check == true) {
            //this.scene.start('secondRoomScene');    
          //}

        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
                this.scene.start('secondScene');
        }
    }


    whatup (player, fridge) {
        console.log("touching");
        this.scene.start('secondScene');
    };

    bounce (player, dummy) {
        console.log("bounce");
    }
}








}