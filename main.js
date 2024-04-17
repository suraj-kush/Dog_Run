//paraphrase 'iitbhu'

import Player from "./player.js";
import InputHandler from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemy.js";
import { UI } from "./UI.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.speed = 0;
      this.maxSpeed = 6;
      this.groundMargin = 80; 
      this.player = new Player(this);
      this.debug = false;
      this.input = new InputHandler(this);
      this.Background = new Background(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.enemiesInterval = 1000;
      this.enemiesTimer = 0;
      this.collisions = [];
      this.particles = [];
      this.floatingMessages = [];
      this.maxParticle = 200;
      this.score = 0;
      this.fontColor = "black";
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      this.highScore = 0;
      this.gameOver = false;
      this.maxLives = 3 ;
      this.lives = this.maxLives;
      this.maxTime = 1000 * 60;
      this.time = this.maxTime;
    }
    update(deltaTime) {
      this.Background.update();
      this.player.update(this.input.keys, deltaTime);
      this.time -= deltaTime;
      if (this.time <= 0) {
        this.gameOver = true;
        this.time = 0;
      }

      if (this.enemiesTimer > this.enemiesInterval) {
        this.addEnemy();
        this.enemiesTimer = 0;
      } else this.enemiesTimer += deltaTime;

      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

      this.particles.forEach((particle) => {
        particle.update();
      });
      this.particles = this.particles.filter(
        (particle) => !particle.markForDeletion
      );
      if (this.particles.length > this.maxParticle)
        this.particles = this.particles.slice(0, this.maxParticle);

      this.collisions.forEach((collision) => {
        collision.update(deltaTime);
      });
      this.collisions = this.collisions.filter(
        (collision) => !collision.markForDeletion
      );

      this.floatingMessages.forEach((message) => {
        message.update();
        message.timer++;
      });
      this.floatingMessages = this.floatingMessages.filter(
        (message) => !message.markForDeletion
      );
    }
    draw(ctx) {
      this.Background.draw(ctx);
      this.player.draw(ctx);
      this.enemies.forEach((enemy) => {
        enemy.draw(ctx);
      });
      this.particles.forEach((particle) => {
        particle.draw(ctx);
      });
      this.collisions.forEach((collision) => {
        collision.draw(ctx);
      });
      this.floatingMessages.forEach((message) => {
        message.draw(ctx);
      });
      this.UI.draw(ctx);

    }
    addEnemy() {
      if (this.speed > 0 && Math.random() > 0.5) {
        this.enemies.push(new GroundEnemy(this));
      } else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
  }

  let game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timestamp) {
    if (!game.gameOver) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
    } else if(game.input.keys.includes('Enter')){
        game = new Game(canvas.width, canvas.height);
    }
    requestAnimationFrame(animate);
  }
  animate(0);
});
