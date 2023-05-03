class Boss extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.velocity = 0;
        this.attacked = false;
        this.stateBlocker = false;
        this.body.setCollideWorldBounds(true);
        this.bossHealth = 30;

    }
}

class BossIdleState extends State{
    enter(scene, boss){
        boss.stateBlocker = false;
        boss.anims.play('idle');
        
        
    
    }

    execute(scene, boss){
        if(boss.attacked){
            this.stateMachine.transition('damaged');
            return;
        }
        scene.time.delayedCall((Math.random() * 10000), () => {
            this.stateMachine.transition('attack');
        });
    }
    

}

class BossAttackState extends State{
    enter(scene, boss){
        boss.anims.play('attack');
        boss.once('animationcomplete', () => {
            this.stateMachine.transition('idle');
        });
    }
    execute(scene, boss){
        if(boss.attacked && !boss.stateBlocker){
            this.stateMachine.transition('damaged');
            boss.stateBlocker = true;
            return;
        }
    }
}

class BossDamagedState extends State{
    enter(scene, boss){
        boss.anims.play('damaged');
        scene.time.delayedCall(300, () => {
            this.stateMachine.transition('idle');
            boss.attacked = false;
            boss.bossHealth -= 1;
            console.log(boss.bossHealth);
            return;
        });
    }
}