const rand = (max = 1) => Math.random() * max;

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
function Object2(position, velocity, scale, color = "white") {
  this.position = position;
  this.velocity = velocity;
  this.scale = scale;
  this.color = color;
  this.move = function () {
    this.position = this.position.add(this.velocity);
  }
  
  this.drawSquare = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.position.x - this.scale.x, this.position.y - this.scale.y);
    ctx.lineTo(this.position.x + this.scale.x, this.position.y - this.scale.y);
    ctx.lineTo(this.position.x + this.scale.x, this.position.y + this.scale.y);
    ctx.lineTo(this.position.x - this.scale.x, this.position.y + this.scale.y);
    ctx.closePath();
    ctx.fill();
  }

  this.drawCircle = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.scale.x, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
  
  this.drawImage = function (ctx, imgPath) {
    let img = new Image();
    img.src = imgPath;
    ctx.drawImage(img, this.position.x - img.width / 2, this.position.y - img.height / 2);
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
    snowflake.drawCircle(ctx);
  },
  "createRandomSnowflake": function (canvas) {
    let randSize = rand(5) + 1;
    let snowflakePosition = new Vector2(rand(canvas.width), rand(canvas.height));
    let snowflakeVelocity = new Vector2(rand(2) - 1, rand(5) + 1);
    let snowflakeSize = new Vector2(randSize, randSize);
    let snowflake = new Object2(snowflakePosition, snowflakeVelocity, snowflakeSize);
    return snowflake;
  },
  "createSnowflakes": function (canvas, numSnowflakes) {
    let snowflakes = [];
    for (let i = 0; i < numSnowflakes; i++) {
      snowflakes.push(this.createRandomSnowflake(canvas));
    }
    return snowflakes;
  },
  "update": function (canvas, snowflakes) {
    window.requestAnimationFrame(() => this.update(canvas, snowflakes));
    drawBackground(canvas, backgroundColor = "skyblue");
    for (let i = 0; i < snowflakes.length; i++) {
      this.drawSnowflake(canvas.getContext("2d"), snowflakes[i]);
      if (snowflakes[i].position.y > canvas.height || 
          snowflakes[i].position.x < -snowflakes[i].scale.x ||
          snowflakes[i].position.x > canvas.width + snowflakes[i].scale.x) {
        snowflakes[i].position = new Vector2(rand(canvas.width), -snowflakes[i].scale.y);
      } else if (snowflakes[i].position.y < -snowflakes[i].scale.y) {
        snowflakes[i].position = new Vector2(rand(canvas.width), canvas.height);
      } else {
        snowflakes[i].velocity = snowflakes[i].velocity.add(new Vector2((GetAxis("Horizontal") * snowflakes[i].scale.x) / 50, (GetAxis("Vertical") * snowflakes[i].scale.y) / 50));
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
    let snowflakes = this.createSnowflakes(canvas, 50);

    // Update the snowflakes
    this.update(canvas, snowflakes);
  },
}