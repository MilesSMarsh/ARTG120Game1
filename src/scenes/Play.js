class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //load sprites
        this.load.image('rocket', './assets/rocket.png');
    }
    create(){
        //get input
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


        //set background color
        this.cameras.main.setBackgroundColor('#872f29')

        this.p1Character = new Character(this, game.config.width/2, game.config.height- 50, 'rocket').setOrigin(0.5, 0);
       
        this.characterFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState()
        }, [this, this.p1Character]);

    }
    //any other functions
    update(){
        this.characterFSM.step();
    }
}