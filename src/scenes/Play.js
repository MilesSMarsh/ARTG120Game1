class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){


        //sean's loads
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('ui', './assets/ui.png');
        this.load.image('heart', './assets/heart.png');
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




*/
        this.load.spritesheet('boss', './assets/Boss.png',{
            frameWidth: 64,
            frameHeight: 64
        });


    }





    create(){

        //variables



        //get input
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


        //set background color
        this.cameras.main.setBackgroundColor('#dfff00');

        //sean's stuff
        this.add.image(0,0, 'ui').setOrigin(0);
        this.heart1 = this.add.tileSprite(50,30,30,30, 'heart');
        this.heart2 = this.add.tileSprite(80,30,30,30, 'heart');
        this.heart3 = this.add.tileSprite(110,30,30,30, 'heart');
        this.heart4 = this.add.tileSprite(140,30,30,30, 'heart');
        this.heart5 = this.add.tileSprite(170,30,30,30, 'heart');


        this.line = this.physics.add.staticGroup();

        this.line.create(350, 50, 'line').setOrigin(0.5);

        //create hitbox for attack
        this.cartHitBox = this.add.rectangle(game.config.width, game.config.height ,35, 35, 0xffffff, 0.5);
        this.physics.add.existing(this.cartHitBox);
        this.physics.world.remove(this.cartHitBox.body);



        //create new instance of character
        this.p1Character = new Character(this, game.config.width/2, game.config.height- 50, 'walk_right', 0, 'right', this.cartHitBox).setOrigin(0.5, 0);
        this.p1Character.setSize(30, 47, true);
        //create state machine for new character
        this.characterFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            damaged: new DamagedState(),
            attacking: new AttackState()
        }, [this, this.p1Character]);


        

        this.physics.add.collider(this.p1Character, this.line);





        //create new instance of boss
        this.boss = new Boss(this, game.config.width/2, 300, 'boss', 2).setOrigin(0.5);
        this.boss.setScale(5);
        this.boss.setSize(52, 50, true);
        this.boss.setBounce(0.5);
        //create state machine for boss
        this.bossFSM = new StateMachine('idle', {
            idle: new BossIdleState(),
            attack: new BossAttackState(),
            damaged: new BossDamagedState()
        }, [this, this.boss]);

        this.physics.add.collider(this.boss, this.line);


        //create overlap for hitbox and boss
        this.physics.add.overlap(this.cartHitBox, this.boss, this.p1Character.handleAttackOverlap(this.boss), undefined, this);


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




        //animation creation for boss
        this.anims.create({
            key: 'idle',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('boss', {start: 0, end: 1})
        });
        this.anims.create({
            key: 'attack',
            frameRate: 4,
            repeat: 1,
            frames: this.anims.generateFrameNumbers('boss', {start: 2, end: 3})
        });
        this.anims.create({
            key: 'damaged',
            frameRate: 1,
            repeat: 1,
            frames: this.anims.generateFrameNumbers('boss', {start: 2, end: 2})
        });


        this.physics.add.collider(this.p1Character, this.boss, function (character, boss){
            character.collided = true;
        });

        //sean add
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }
    
    update(){
        this.characterFSM.step();
        this.bossFSM.step();
        this.p1Character.moveHitBox();

        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('goodEndingScene');
        }

    }

    //any other function








}