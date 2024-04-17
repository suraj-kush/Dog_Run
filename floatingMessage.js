export class FloatingMessage{
    constructor(value, x, y, floatingX, floatingY){
        this.value = value;
        this.x = x;
        this.y = y;
        this.floatingX = floatingX;
        this.floatingY = floatingY;
        this.markForDeletion = false;
        this.timer = 0;
    }
    update(){
        this.x += (this.floatingX - this.x) * 0.03;
        this.y += (this.floatingY - this.y) * 0.03;
        this.timer++;
        if(this.timer > 100) this.markForDeletion = true;
    }
    draw(ctx){
        ctx.font = `20px Hetvetica`;
        ctx.fillStyle = 'white';
        ctx.fillText(this.value, this.x, this.y);
        ctx.fillStyle = 'black';
        ctx.fillText(this.value, this.x-2, this.y-2);
    }
}