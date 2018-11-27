/** 
 * Basic vector which takes parameters x and y
 */
function Vector2(x, y) {
  this.x = x;
  this.y = y;
  this.add = (other) => new Vector2(this.x + other.x, this.y + other.y);
  this.multiply = (n) => new Vector2(this.x * n, this.y * n);
  this.equals = (other) => this.x === other.x && this.y === other.y;
  this.toString = () => "<" + this.x + ", " + this.y + ">";
}

function Object2(position, velocity, scale) {
  this.position = position;
  this.velocity = velocity;
  this.scale = scale;
  this.move = function () {
    this.position += this.velocity;
  }
}

const winterTheme = {
  "drawSnowflake": function (ctx, snowflake, color = "white") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(snowflake.position.x, snowflake.position.y, snowflake.scale.x, 0, 2 * Math.PI);
    ctx.fill();
  },
  "drawBackground": function (canvas, backgroundColor = "black") {
    canvas.getContext("2d").fillStyle = backgroundColor;
    canvas.getContext("2d").fillRect(0, 0, canvas.width, canvas.height);
  },
  "createCanvas": function (width, height, backgroundColor = "black") {
    const newCanvas = document.createElement("canvas");
    newCanvas.width = width;
    newCanvas.height = height;
    this.drawBackground(newCanvas);
    return newCanvas;
  },  
  "main": function () {
    const canvas = this.createCanvas(500, 500);
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    // TODO: Clean up this messy code that draws snow flakes on a loop.
    let snowflakes = [];
    for (let i = 0; i < 10; i++) {
      let snowflake = new Object2(new Vector2(canvas.width * Math.random(), canvas.height * Math.random()), new Vector2(0, 1), new Vector2(5, 5));
      snowflakes.push(snowflake);
    }
    setInterval(() => {
      this.drawBackground(canvas);
      for (let i = 0; i < snowflakes.length; i++) {
        this.drawSnowflake(ctx, snowflakes[i]);
        if (snowflakes[i].position.y > canvas.height) {
          snowflakes[i].position = new Vector2(canvas.width * Math.random(), 0);
        } else {
          snowflakes[i].position.y++;
        }
      }
    }, 10);
  },
}