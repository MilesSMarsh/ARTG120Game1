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
        this.load.image('spikes', './assets/spikes.png');

       




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

        this.spikeWall = this.physics.add.staticGroup();
        this.spikeWall.create(350, 695, 'spikes').setOrigin(0.5);
        this.spikeWall.create(350, 60, 'spikes').setScale(-1);

        //create hitbox for attack
        this.cartHitBox = this.add.rectangle(game.config.width, game.config.height ,35, 35, 0xffffff, 0);
        //this.physics.add.existing(this.cartHitBox);
        //this.physics.world.remove(this.cartHitBox.body);



        //create new instance of character
        this.p1Character = new Character(this, game.config.width/2, 500, 'walk_right', 0, 'right', this.cartHitBox, 5).setOrigin(0.5, 0);
        this.p1Character.setSize(30, 47, true);


        //create state machine for new character
        this.characterFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            damaged: new DamagedState(),
            attacking: new AttackState()
        }, [this, this.p1Character]);


        //create collider for character and ui
        this.physics.add.collider(this.p1Character, this.line);

        this.physics.add.collider(this.p1Character, this.spikeWall, function(character, spike){
            character.collided = true;
        });





        //create new instance of boss
        this.boss = new Boss(this, game.config.width/2, 300, 'boss', 2).setOrigin(0.5);
        this.boss.setScale(5);
        this.boss.setSize(52, 50, true);
        this.boss.setBounce(0.8);


        //create state machine for boss
        this.bossFSM = new StateMachine('idle', {
            idle: new BossIdleState(),
            attack: new BossAttackState(),
            damaged: new BossDamagedState()
        }, [this, this.boss]);


        //create collider for boss and ui
        this.physics.add.collider(this.boss, this.line);

        this.physics.add.collider(this.boss, this.spikeWall, function(boss, spike){
            boss.attacked = true;
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
            frames: this.anims.generateFrameNumbers('boss', {start: 2, end: 2})
        });


        this.physics.add.collider(this.p1Character, this.boss, function (character, boss){
            character.collided = true;
            character.bossCollide = true;
        });

        this.physics.add.collider(this.cartHitBox, this.boss, function (obj, boss){
            if(!boss.stateBlocker){
                boss.attacked = true;
            }
        });

        //sean add
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }
    
    update(){
        this.characterFSM.step();
        this.bossFSM.step();
        this.p1Character.moveHitBox();
        //create overlap for hitbox and boss
        //this.physics.add.overlap(this.cartHitBox, this.boss, this.p1Character.handleAttackOverlap(this.boss), null, this);
        

        if(this.boss.bossHealth <= 0) {
            this.scene.start('goodEndingScene');
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



}



