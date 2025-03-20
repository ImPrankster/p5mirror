/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
  
  
*/
let dancer;

function setup() {
  // no adjustments in the setup function needed...
  createCanvas(windowWidth, windowHeight);
  // ...except to adjust the dancer's name on the next line:
  dancer = new LeoDancer(width/2, height/2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only
  dancer.update();
  dancer.display(); 
  
}


// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class LeoDancer{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.ang = 0;
    this.armArr = [-25, 20, -100, -35, 100, -25, 50, 15];
    this.bodyArr = [0, -15, 0, -15, 0, 35, 0, 35];
    this.leftFootArr = [0, 35, -15, 50, -25, 75, -25, 100]
    this.rightFootArr = [0, 35, 15, 50, 25, 75, 25, 100]
    // add properties for your dancer here:
    //..
    //..
    //..
    
  }  
  update(){
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.ang += 0.1*random(0,4);
    //this.armArr.forEach((i,n,a)=>{a[n]=i+sin(this.ang)});
    this.armArr[0] = -25+sin(this.ang*0.8)*20
    this.armArr[1] = 15+cos(this.ang*0.5)*5
    this.armArr[6] = 15+map(sin(this.ang*0.5), -1, 1, -20, 20)
    this.armArr[7] = 15+map(cos(this.ang*0.5), -1, 1, -75, 20)
    this.rightFootArr[6] = 25+sin(this.ang*0.5)*15
    this.leftFootArr[6] = -25-sin(this.ang*0.1)*15
    this.bodyArr[6] = sin(this.ang*0.5)*5
    this.leftFootArr[0] = sin(this.ang*0.5)*5
    this.rightFootArr[0] = sin(this.ang*0.5)*5
  }
  display(){
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    
    
    // ******** //
    // ⬇️ draw your dancer here ⬇️
    
    noFill();
    stroke(255);
    strokeWeight(4);
    bezier(this.armArr[0], this.armArr[1], this.armArr[2], this.armArr[3], this.armArr[4], this.armArr[5], this.armArr[6], this.armArr[7])
    bezier(this.bodyArr[0], this.bodyArr[1], this.bodyArr[2], this.bodyArr[3], this.bodyArr[4], this.bodyArr[5], this.bodyArr[6], this.bodyArr[7])
    bezier(this.leftFootArr[0], this.leftFootArr[1], this.leftFootArr[2], this.leftFootArr[3], this.leftFootArr[4], this.leftFootArr[5], this.leftFootArr[6], this.leftFootArr[7])
    bezier(this.rightFootArr[0], this.rightFootArr[1], this.rightFootArr[2], this.rightFootArr[3], this.rightFootArr[4], this.rightFootArr[5], this.rightFootArr[6], this.rightFootArr[7])
    circle(cos(this.ang*0.5)*5, -45, 50)
    
    // ⬆️ draw your dancer here ⬆️
    
    
    
    
    // ******** //
    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()
   
    
    
    pop();
  }  
  drawReferenceShapes(){
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);                       
    rect(-100, -100, 200, 200);    
    fill(255);
    stroke(0);
  }
  
  
}





/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmomize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 

*/