let currentHue = 0;
let hueAdding = true;
let isMousePressed = false;

let iPadShape = (x,y)=>{
  //iPad BG
  fill(0);
  rect(x,y, 200, 170, 15, 15, 15, 15);
  
  fill(currentHue,50,75);
  rect(x+5,y+5, 190, 160, 10, 10, 10, 10);
  fill(255);
  textSize(20);
  let today = new Date();
  let nowTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  text(nowTime, x+60, y+74);
  
  this.mousePressed = ()=>{
    isMousePressed = true
  }
  this.mouseReleased = ()=>{
    isMousePressed = false
  }
}

let chargingPad = ()=>{
  fill(0);
  ellipse(290,280,75,50);
}

function setup(){
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw(){
  background(220);
  noStroke()
  
  //Desk
  fill(26,34,57);
  quad(0,230,290,230,600,height,0,height);
  
  
  //add to hue
  if(hueAdding == true){
    currentHue += 5
  }else{
    currentHue -= 5
  }
  //decide if the hue value is going up or down
  if(currentHue >= 360){
    hueAdding = false
  }
  if(currentHue <= 0){
    hueAdding = true
  }
  
  chargingPad();
  if (isMousePressed){
    iPadShape(mouseX-50,mouseY-50);
  }else{
    iPadShape(50,100);
  }
  
  fill(255);
  textSize(20);
  text("Try pick up the iPad!", 105, 386);
}