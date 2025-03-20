function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  drawEmoji();
}

function drawEmoji(){
  push();
  translate(width/2,height/2);
  strokeWeight(4);
  stroke(0)
  textFont('menlo');
  textSize(64);
  textAlign(CENTER);
  text('Day 5', 0,0);
  noStroke(0);
  textSize(16);
  text("You should take better care", 0, 60);
      text("of your self!", 0, 80);
  pop();
}