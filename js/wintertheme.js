let rand = (max = 1) => Math.random() * max;

/**
 * Basic 2D Vector
 * @param {number} x 
 * @param {number} y 
 */
function Vector2(x, y) {
  this.x = x;
  this.y = y;
  this.add = (other) => new Vector2(this.x + other.x, this.y + other.y);
  this.multiply = (n) => new Vector2(this.x * n, this.y * n);
  this.equals = (other) => this.x === other.x && this.y === other.y;
  this.toString = () => "<" + this.x + ", " + this.y + ">";
}

/**
 * Basic 2D Object
 * @param {Vector2} position 
 * @param {Vector2} velocity 
 * @param {Vector2} scale 
 */
function Object2(position, velocity, scale) {
  this.position = position;
  this.velocity = velocity;
  this.scale = scale;
  this.move = function () {
    this.position = this.position.add(this.velocity);
  }
}

function drawBackground(canvas, backgroundColor = "black") {
  canvas.getContext("2d").fillStyle = backgroundColor;
  canvas.getContext("2d").fillRect(0, 0, canvas.width, canvas.height);
}

function createCanvas (width, height, backgroundColor = "black") {
  const newCanvas = document.createElement("canvas");
  newCanvas.width = width;
  newCanvas.height = height;
  drawBackground(newCanvas, backgroundColor);
  return newCanvas;
}

const winterTheme = {
  "drawSnowflake": function (ctx, snowflake, color = "white") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(snowflake.position.x, snowflake.position.y, snowflake.scale.x, 0, 2 * Math.PI);
    ctx.fill();
  },
  "createRandomSnowflake": function (canvas) {
    let snowflakePosition = new Vector2(rand(canvas.width), rand(canvas.height));
    let snowflakeVelocity = new Vector2(rand(2) - 1, rand(5) + 1);
    let snowflakeSize = new Vector2(rand(5) + 1, rand(5) + 1);
    let snowflake = new Object2(snowflakePosition, snowflakeVelocity, snowflakeSize);
    return snowflake;
  },
  "createSnowflakes": function (canvas, amount) {
    let snowflakes = [];
    for (let i = 0; i < amount; i++) {
      snowflakes.push(this.createRandomSnowflake(canvas));
    }
    return snowflakes;
  },
  "update": function (canvas, snowflakes) {
    drawBackground(canvas, backgroundColor = "skyblue");
    for (let i = 0; i < snowflakes.length; i++) {
      this.drawSnowflake(canvas.getContext("2d"), snowflakes[i]);
      if (snowflakes[i].position.y > canvas.height || 
          snowflakes[i].position.x < -snowflakes[i].scale.x ||
          snowflakes[i].position.x > canvas.width + snowflakes[i].scale.x) {
        snowflakes[i].position = new Vector2(rand(canvas.width), 0);
      } else {
        snowflakes[i].move();
      }
    }
  },
  "main": function () {
    // Create the canvas to draw on
    const canvas = createCanvas(500, 500, backgroundColor = "skyblue");

    // Add the canvas to the website
    document.body.appendChild(canvas);

    // Create the snowflakes
    const snowflakes = this.createSnowflakes(canvas, 50);

    // Update the snowflakes
    setInterval(() => {
      this.update(canvas, snowflakes);
    }, 10);
  },
}