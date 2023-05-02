class Character extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.direction = direction;
        this.charVelocity = 200;
        this.collided = false;

    }
    
}

    //vvvvvv character states vvvvvv
class IdleState extends State{
    enter(scene, character){
        character.setVelocity(0);
        character.anims.play(`walk-${character.direction}`, true);
        character.anims.stop();

    }
    execute(scene, character){
        const {left, right, up , down, space, shift} = scene.keys;

        if(character.collided){
            this.stateMachine.transition('damaged');
            return;
        }
        if(left.isDown || right.isDown || up.isDown || down.isDown ){
            this.stateMachine.transition('move');
            return;
        }
        if(space.isDown){
            this.stateMachine.transition('attacking');
            return;
        }

        
    }

}

class MoveState extends State{
    execute(scene, character){
        const { left, right, up, down, space, shift } = scene.keys;
        //if run into boss
        if(character.collided){
            this.stateMachine.transition('damaged');
            return;
        }

        //attack
        if(space.isDown){
            this.stateMachine.transition('attacking');
            return;
        }

        // transition to idle if not pressing movement keys or attacking
        if(!(left.isDown || right.isDown || up.isDown || down.isDown)) {
            this.stateMachine.transition('idle');
            return;
        }

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0);
        if(up.isDown) {
            moveDirection.y = -1;
            character.direction = 'up';
        } else if(down.isDown) {
            moveDirection.y = 1;
            character.direction = 'down';
        }
        if(left.isDown) {
            moveDirection.x = -1;
            character.direction = 'left';
        } else if(right.isDown) {
            moveDirection.x = 1;
            character.direction = 'right';
        }
        // normalize movement vector, update character position, and play proper animation
        moveDirection.normalize();
        character.setVelocity(character.charVelocity * moveDirection.x, character.charVelocity * moveDirection.y);
        character.anims.play(`walk-${character.direction}`, true);
    }
}

class DamagedState extends State{
    enter(scene, character){
        console.log('oof');
        character.setTint('0xFF0000');
        character.anims.play(`walk-${character.direction}`);
        character.anims.stop();

        switch(character.direction) {
            case 'up':
                character.setVelocityY(character.charVelocity*2);
                break;
            case 'down':
                character.setVelocityY(-character.charVelocity*2);
                break;
            case 'left':
                character.setVelocityX(character.charVelocity*2);
                break;
            case 'right':
                character.setVelocityX(-character.charVelocity*2);
                break;
        }

        scene.time.delayedCall(300, () => {
            character.clearTint();
            this.stateMachine.transition('idle');
            character.collided = false;
            return;
        });
    }
}

class AttackState extends State{
    enter(scene, character) {
        console.log('attacking');
        character.setVelocity(0);
        character.anims.play(`attack-${character.direction}`);
        character.once('animationcomplete', () => {
            this.stateMachine.transition('idle');
        });
    }
}





    //^^^^^^ character states ^^^^^^