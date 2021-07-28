const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const box = 30;
const rows = canvas.height / box;
const columns = canvas.width / box;

class Fruit {
  constructor() {
    this.x;
    this.y;
  }
  randomFood() {
    this.x = (Math.floor(Math.random() * columns - 1) + 1) * box;
    this.y = (Math.floor(Math.random() * rows - 1) + 1) * box;
  }

  draw() {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, box, box);
  }
}

class Snake {
  constructor(x = 0, y = 0, isSecondPlayer = false) {
    this.x = x;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.score = 0;
    this.tail = [];
    this.isSecondPlayer = isSecondPlayer;
  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.score - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) {
      this.x = 0;
    }

    if (this.y > canvas.height) {
      this.y = 0;
    }

    if (this.x < 0) {
      this.x = canvas.width;
    }

    if (this.y < 0) {
      this.y = canvas.height;
    }
  }

  changeDirection(direction) {
    console.log(this.isSecondPlayer, "/");
    if (this.isSecondPlayer) {
      if (direction == 65) {
        this.xSpeed = -box * 1;
        this.ySpeed = 0;
      } else if (direction == 87) {
        this.xSpeed = 0;
        this.ySpeed = -box * 1;
      } else if (direction == 68) {
        this.xSpeed = box * 1;
        this.ySpeed = 0;
      } else if (direction == 83) {
        this.xSpeed = 0;
        this.ySpeed = box * 1;
      }
    } else {
      if (direction == 37) {
        this.xSpeed = -box * 1;
        this.ySpeed = 0;
      } else if (direction == 38) {
        this.xSpeed = 0;
        this.ySpeed = -box * 1;
      } else if (direction == 39) {
        this.xSpeed = box * 1;
        this.ySpeed = 0;
      } else if (direction == 40) {
        this.xSpeed = 0;
        this.ySpeed = box * 1;
      }
    }
  }

  eat(fruit) {
    if (this.x == fruit.x && this.y == fruit.y) {
      this.score++;
      return true;
    }

    return false;
  }
}

Snake.prototype.draw = function () {
  ctx.fillStyle = "aqua";
  for (let i = 0; i < this.tail.length; i++) {
    ctx.fillRect(this.tail[i].x, this.tail[i].y, box, box);
  }

  ctx.fillRect(this.x, this.y, box, box);
};

Snake.prototype.checkCollision = function () {
  for (var i = 0; i < this.tail.length; i++) {
    if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
      this.score = 0;
      this.tail = [];
      alert("game over");
    }
  }
};

let snake = new Snake();
let fruit = new Fruit();
let snake2 = new Snake(570, 570, true);

let h1 = document.querySelector("h1");
function setup() {
  fruit.randomFood();

  window.setInterval(() => {
    console.log(snake, snake2);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();
    snake2.update();
    snake2.draw();

    if (snake.eat(fruit) || snake2.eat(fruit)) {
      fruit.randomFood();
    }

    snake.checkCollision();
    snake2.checkCollision();
    document.querySelector(".score1").innerText = snake.score;
    document.querySelector(".score2").innerText = snake2.score;
  }, 200);
}

document.addEventListener("keydown", (event) => {
  const direction = event.keyCode;
  snake.changeDirection(direction);
  snake2.changeDirection(direction);
});

setup();
