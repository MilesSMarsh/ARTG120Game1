class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //load sprites
        this.load.spritesheet('arrows', './assets/arrows.png',{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('boss', './assets/Boss.png',{
            frameWidth: 64,
            frameHeight: 64
        });
    }
    create(){
        //get input
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


        //set background color
        this.cameras.main.setBackgroundColor('#872f29')

        this.p1Character = new Character(this, game.config.width/2, game.config.height- 50, 'arrows', 0).setOrigin(0.5, 0);
        this.boss = new Boss(this, game.config.width/2, 50, 'boss', 2).setOrigin(0.5);
        this.boss.setScale(5);


        this.characterFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState()
        }, [this, this.p1Character]);

        this.bossFSM = new StateMachine('idle', {
            idle: new BossIdleState(),
            attack: new BossAttackState()
        }, [this, this.boss]);


        //animation creation for character
        this.anims.create({
            key: 'up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('arrows', {start: 0, end: 0})
        });
        this.anims.create({
            key: 'down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('arrows', {start: 1, end: 1})
        });
        this.anims.create({
            key: 'right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('arrows', {start: 2, end: 2})
        });
        this.anims.create({
            key: 'left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('arrows', {start: 3, end: 3})
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
            repeat: -1,
            frames: this.anims.generateFrameNumbers('boss', {start: 2, end: 2})
        });



    }
    //any other functions
    update(){
        this.characterFSM.step();
        this.bossFSM.step();
    }
}