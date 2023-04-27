class Character extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 5;
        this.mrLeft = true;
        this.mrRight = true;
        this.mrUp = true;
        this.mrDown = true;

    }

    update(){

        //movement restrictions------------------------

        //game borders
        if(this.x <= borderPadding + this.width){
            this.mrLeft = false;
        }else{this.mrLeft = true;}
        if(this.x >= game.config.width - borderUISize){
            this.mrRight = false;
        }else{this.mrRight = true;}
        if(this.y <=  borderPadding){
            this.mrUp = false;
        }else{this.mrUp = true;}
        if(this.y >= game.config.height - borderPadding){
            this.mrDown = false;
        }else{this.mrDown = true;}

        //movement restrictions------------------------

        //movement
        if(keyLEFT.isDown && this.mrLeft) {
            this.x -= this.moveSpeed;
        }
        if(keyRIGHT.isDown && this.mrRight){
            this.x += this.moveSpeed;
        }
        if(keyUP.isDown && this.mrUp){
            this.y -= this.moveSpeed;
        }
        if(keyDOWN.isDown && this.mrDown){
            this.y += this.moveSpeed;
        }

        
    }

}