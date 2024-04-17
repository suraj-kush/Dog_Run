class Layer {
    constructor(game, width, height, image, speedModifier){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speed = this.game.speed;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update(){
        this.x -= this.speed * this.speedModifier;
        if(this.x <= -this.width) this.x = 0;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game){
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer1image = document.getElementById('layer1');
        this.layer2image = document.getElementById('layer2');
        this.layer3image = document.getElementById('layer3');
        this.layer4image = document.getElementById('layer4');
        this.layer5image = document.getElementById('layer5');
        this.layer1 = new Layer(this.game, this.width, this.height, this.layer1image, 1);
        this.layer2 = new Layer(this.game, this.width, this.height, this.layer2image, 0.2);
        this.layer3 = new Layer(this.game, this.width, this.height, this.layer3image, 0.4);
        this.layer4 = new Layer(this.game, this.width, this.height, this.layer4image, 0.8);
        this.layer5 = new Layer(this.game, this.width, this.height, this.layer5image, 1);
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.speed = this.game.speed;
            layer.update();
        })
    }
    draw(ctx){
        this.backgroundLayers.forEach(layer => {
            layer.draw(ctx);
        })
    }
}