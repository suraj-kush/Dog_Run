export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Hetvetica';
        this.healthImage = document.getElementById('heart');
    }
    draw(ctx){
        ctx.save();
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 2;
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.textAlign = 'left';
        ctx.fillStyle = this.game.fontColor;
        ctx.fillText(`Score: ${this.game.score}`, 20, 50);
        ctx.font = `${this.fontSize*0.8}px ${this.fontFamily}`;
        ctx.fillText(`Time: ${(this.game.time * 0.001).toFixed(1)}`, 20, 80);
        for(let i=0 ; i<this.game.lives; i++){
         ctx.drawImage(this.healthImage, i*25+20, 95, 20, 20);
        }
        if(this.game.gameOver){
            ctx.font = `${this.fontSize*2}px ${this.fontFamily}`;
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over, your score : ' + this.game.score, this.game.width*0.5, this.game.height*0.5);
            ctx.fillStyle = 'blue';
            ctx.font = `${this.fontSize*0.8}px ${this.fontFamily}`;
            ctx.fillText(`Press Enter to Restart`, this.game.width*0.5, this.game.height*0.5+50);
        }
        ctx.restore();
    }
}