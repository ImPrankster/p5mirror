function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  noStroke()
  
  fill(color(205, 170, 80))
  triangle(mouseX,mouseY,0,height,width,height);
}