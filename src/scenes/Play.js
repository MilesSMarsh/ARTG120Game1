class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){


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


    }





    create(){

        //variables



        //get input
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


        //set background color
        this.cameras.main.setBackgroundColor('#872f29')





        //create new instance of character
        this.p1Character = new Character(this, game.config.width/2, game.config.height- 50, 'walk_right', 0, 'right').setOrigin(0.5, 0);
        this.p1Character.setSize(30, 47, true);
        //create state machine for new character
        this.characterFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            damaged: new DamagedState()
        }, [this, this.p1Character]);




        //create new instance of boss
        this.boss = new Boss(this, game.config.width/2, 50, 'boss', 2).setOrigin(0.5);
        this.boss.setScale(5);
        this.boss.setSize(52, 50, true);
        this.boss.setBounce(1.01);
        //create state machine for boss
        this.bossFSM = new StateMachine('idle', {
            idle: new BossIdleState(),
            attack: new BossAttackState(),
            damaged: new BossDamagedState()
        }, [this, this.boss]);




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
            repeat: -1,
            frames: this.anims.generateFrameNumbers('attack_up', {start: 0, end: 3})
        });
        this.anims.create({
            key: 'attack-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('attack_down', {start: 0, end: 3})
        });
        this.anims.create({
            key: 'attack-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('attack_left', {start: 0, end: 3})
        });
        this.anims.create({
            key: 'attack-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('attack_right', {start: 0, end: 3})
        });





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
            frameRate: 8,
            repeat: 1,
            frames: this.anims.generateFrameNumbers('boss', {start: 2, end: 2})
        });


        this.physics.add.collider(this.p1Character, this.boss, function (character, boss){
            character.collided = true;
        });


    }
    
    update(){
        this.characterFSM.step();
        this.bossFSM.step();

    }

    //any other function








}