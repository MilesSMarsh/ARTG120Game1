class Boss extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);

    }
}

class BossIdleState extends State{
    enter(scene, boss){
        boss.anims.play('idle');
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
}

class BossDamagedState extends State{
    enter(scene, boss){
        boss.anims.play('damaged');
        boss.once('animationcomplete', () => {
            this.stateMachine.transition('idle');
        });
    }
}