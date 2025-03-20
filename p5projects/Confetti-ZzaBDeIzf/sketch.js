let confettiArr = [];
let pressTime = 0;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

  for (let i = 0; i < random(50, 70); i++) {
    confettiArr[i] = new confetti(random(width), random(height));
  }
}

function draw() {
  background(255);
  for (let i = 0; i < confettiArr.length; i++) {
    confettiArr[i].display();
    confettiArr[i].move();
    if (confettiArr[i].y > height) {
      confettiArr[i] = new confetti(random(width), 0);
    }
  }
}

function mousePressed() {
  //press mouse button to increase the density.
  for (let i = 0; i < random(50, 70); i++) {
    confettiArr.push(new confetti(random(width), random(height)));
  }
  //press 5 times resets the array
  if (pressTime >= 5) {
    let tempArr = [];
    for (let i = 0; i < random(50, 70); i++) {
      tempArr[i] = new confetti(random(width), random(height));
    }
    confettiArr = tempArr;
    pressTime = 0;
    return;
  }
  pressTime++;
}

class confetti {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSize = random(10, 20);
    this.ySize = 0.7 * this.xSize;
    this.hue = random(0, 255);
    this.time = 0;
    this.amp = random(5, 10);
    this.angReset = random(0, 2 * PI);//each confetti start rotating at a different place.
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.time+this.angReset);

    noStroke();
    fill(this.hue, 75, 75);

    let cXSize = this.xSize * sin(this.time + this.angReset);//mimic confetti rotation
    let cYSize = this.ySize * cos(this.time + this.angReset);

    rect(-cXSize / 2, -cYSize / 2, cXSize, cYSize);
    pop();
    this.time += this.amp / 100;
  }
  move() {
    this.y += this.amp / 2;
  }
}
