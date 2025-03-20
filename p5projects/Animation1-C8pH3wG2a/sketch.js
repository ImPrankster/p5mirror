let aniEllipse = () => {
  noStroke();
  fill(0,75,75)
  ellipse(50,50,20,30)
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw() {
  background(220);
  aniEllipse();
}