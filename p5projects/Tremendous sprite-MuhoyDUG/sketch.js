let isPressed = false;

let newRect = () => {
  if (isPressed){
    fill(255,255,51)
  }else{
    fill(0)
  }
  rect(50,50,50,50);
  this.mousePressed = ()=>{
    isPressed = !isPressed;
  }
}

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);
  newRect();
}