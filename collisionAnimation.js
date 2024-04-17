export class CollisionAnimation {
    constructor(game, x, y){
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 4;
        this.size = 0;
        this.maxSize = 100;
        this.image = document.getElementById('explosion');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width*0.5;
        this.y = y - this.height*0.5;
        this.frameTimer = 0;
        this.fps = Math.random()*5 + 10;
        this.maxInterval = 1000 / this.fps;
        this.markForDeletion = false;
    }
    update(deltaTime){
        this.x -= this.game.speed;
        if(this.frameTimer > this.maxInterval){
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.markForDeletion = true;
            this.frameTimer = 0;
        } else this.frameTimer += deltaTime;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
    }
}