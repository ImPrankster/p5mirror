let interval = 10;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  cBg = new checkerBg(10);
  cBg.startUpdate();
}

function draw() {
  background(255);
  cBg.display();
}

class checkerBg {
  constructor(interval) {
    this.interval = interval;
    this.checkerArray = [];
    for (let i = 0; i < width; i += width / interval) {
      for (let j = 0; j < height; j += height / interval) {
        this.checkerArray.push(
          new checker(i, j, width / interval, height / interval)
        );
      }
    }
  }
  display() {
    this.checkerArray.map((element) => {
      element.display();
    });
  }
  startUpdate() {
    this.checkerArray.map((element) => {
      element.update();
    });
  }
}

class checker {
  constructor(x, y, w, h) {
    this.color = color(random(360), 75, 75);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  display() {
    fill(this.color);
    strokeWeight(10);
    stroke(255);
    rect(this.x, this.y, this.w, this.h);
  }
  update() {
    this.color = color(random(360), 60, 75);
    setTimeout(() => {
      this.update();
    }, 200);
  }
}
