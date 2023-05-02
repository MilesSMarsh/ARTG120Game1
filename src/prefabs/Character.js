class Character extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.direction = direction;
        this.charVelocity = 100;

    }
    
}

    //vvvvvv character states vvvvvv
class IdleState extends State{
    enter(scene, character){
        character.setVelocity(0);

    }
    execute(scene, character){
        const {left, right, up , down, space, shift} = scene.keys;

        if(left.isDown || right.isDown || up.isDown || down.isDown ){
            this.stateMachine.transition('move');
            return;
        }
    }

}

class MoveState extends State{
    execute(scene, character){
        const { left, right, up, down, space, shift } = scene.keys;
        const HKey = scene.keys.HKey;

        // transition to idle if not pressing movement keys
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
        
    }
}

    //^^^^^^ character states ^^^^^^