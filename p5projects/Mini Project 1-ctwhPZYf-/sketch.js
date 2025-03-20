let currentX = 100;
let currentY = 100;
let currentHue = 0;
let hueAdding = true;
let directions = ['up','down','left','right'];
let cDirection = "left";
const cVelocity = 1;

let heartShape = (x, y, size)=>{
  //From the p5.js example
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

let setNewLocation = ()=>{
  switch(cDirection) {
    case 'up':
      currentX += cVelocity;
      break;
    case 'down':
      currentX -= cVelocity;
      break;
    case 'left':
      currentY -= cVelocity;
      break;
    case 'right':
      currentY += cVelocity;
      break;
  }
}

let addNewShape = ()=>{
  setNewLocation();
  let x = currentX;
  let y = currentY;
  if(hueAdding == true){
    currentHue += 5
  }else{
    currentHue -= 5
  }
  let h = currentHue
  strokeWeight(4);
  stroke(10);
  fill(h,91,96);
  heartShape(x,y,25);
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  setInterval(()=>{cDirection = random(directions)},1000);
}

function draw() {
  background(255);
  if(currentX <= 0 || currentX >= 400 || currentY <= 0 || currentY >= 400){
    if(currentX <= 0){ cDirection =  }
    if(currentX >= 400){ currentX -= cVelocity }
    if(currentY <= 0){ currentY += cVelocity }
    if(currentY >= 400){ currentY -= cVelocity }
    return;
  }
  addNewShape();
  if(currentHue >= 360){
    hueAdding = false
  }
  if(currentHue <= 0){
    hueAdding = true
  }
}