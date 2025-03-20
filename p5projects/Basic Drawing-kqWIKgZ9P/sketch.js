let hueAdding = true;
let currentHue = 0;
let currentState = "";

let drawLine = (sc, sw) => {
  if (mouseIsPressed === true) {
    stroke(sc);
    strokeWeight(sw);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
};

let colorfulLine = () => {
  if (mouseIsPressed === true) {
    strokeWeight(20);
    stroke(currentHue, 100, 100);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }

  if (hueAdding == true) {
    currentHue += 5;
  } else {
    currentHue -= 5;
  }

  if (currentHue >= 255) {
    hueAdding = false;
  } else if (currentHue <= 0) {
    hueAdding = true;
  }
}

let drawUpdate = () => {};

let showIns = (w) => {
  fill(255);
  strokeWeight(2);
  stroke(0);
  rect(25, height-70, 200, 65);
  noStroke();
  textSize(15);
  fill(0);
  text((w === "d") ? "> "+ "D - Normal drawing mode":"" + "D - Normal drawing mode", 30, height - 55);
  text((w === "x") ? "> "+ "X - Draw colorful lines!":"" + "X - Draw colorful lines!", 30, height - 40);
  text((w === "e") ? "> "+ "E - Eraser":"" + "E - Eraser", 30, height - 25);
  fill(0, 75, 75);
  text((w === "c") ? "> "+ "C - Clear all!":"" + "C - Clear all!", 30, height - 10);
};

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  background(255);
}

function draw() {
  drawUpdate();
  showIns(currentState);
}

function keyPressed() {
  if (key === "C" || key === "c") {
    drawUpdate = () => {
      background(255);
    };
    currentState = "c";
    
  } else if (key === "E" || key === "e") {
    drawUpdate = () => {
      drawLine(255, 40);
    };
    currentState = "e";
    
  } else if (key === "D" || key === "d") {
    drawUpdate = () => {
      drawLine(0, 20);
    };
    currentState = "d";
    
  } else if (key === "X" || key === "x") {
    drawUpdate = () => {
      colorfulLine();
    };
    currentState = "x";
    
  }
}
