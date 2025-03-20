let ang = 0;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw() {
  background(255);
  for(let i = 1; i <= 13; i ++){
    fill(map(i, 0, 16, 0, 255), 75, 75)
    creatureBody(i*25, 200+noise(i+ang)*15, 1);
  }
  fill(225, 75, 75)
  creatureBody(350, 200+noise(14+ang)*15, 1.5);
  fill(0)
  textSize(32);
  text('\' '+'>'+'\'', 355, 210+sin(ang)*5+noise(14+ang)*15);
  ang += 0.07;
}

let creatureLeg = (x, y, a)=>{
  push();
  
  translate(x, y);
  footX = sin(a)*30;
  ankleX = map(footX, -30, 30, -5, 20);
  footY = 40;
  ankleY = map(footX, -30, 30, 2, -3)+20;
  stroke(0);
  strokeWeight(4);
  line(ankleX, ankleY, footX, footY);
  line(ankleX, ankleY, 0, 0);
  ellipse(footX, footY, 15, 13);
  ellipse(ankleX, ankleY, 10, 10);
  
  pop();
}
let creatureBody = (x, y, s)=>{
  push();
  
  translate(x, y);
  stroke(0);
  strokeWeight(4);
  ellipse(0, 0-13*(s-1), 50*s, 45*s);
  creatureLeg(10, 15, ang-PI);
  creatureLeg(-10, 15, ang);
  
  pop();
}