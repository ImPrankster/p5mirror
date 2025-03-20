//board consts
const COLUMNS = 300;
const ROWS = 300;

//canvas consts
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

//board arrays
let board;
let next;

//contorl
let scaleSlider = document.getElementById("scaleRange");
let paintButton = document.getElementById("paintButton");
let joyStick;

//display related
const CHECKBOX_WIDTH = 5;

//app state true = "ON", false = "PAINT"
let appState = false;

//timing
const DEFAULT_INTERVAL = (1 / 120) * 20000;

function preload() {}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(60);
  colorMode(HSB);
  // Make the board
  board = new Array(COLUMNS);
  for (let i = 0; i < COLUMNS; i++) {
    board[i] = new Array(ROWS);
  }
  // Make the temp board for swapping
  next = new Array(COLUMNS);
  for (let i = 0; i < COLUMNS; i++) {
    next[i] = new Array(ROWS);
  }

  for (let xi = 0; xi < COLUMNS - 1; xi++) {
    for (let yi = 0; yi < ROWS - 1; yi++) {
      board[xi][yi] = random([true, false]);
    }
  }

  checkerBoard = new checkerBoard();
  updateBoard();

  joyStick = new JoyStick("joyDiv", {
    // The ID of canvas element
    title: "joystick",
    // width/height
    width: 80,
    height: 80,
    // Internal color of Stick
    internalFillColor: "#f0003c",
    // Border width of Stick
    internalLineWidth: 2,
    // Border color of Stick
    internalStrokeColor: "#ffffff",
    // External reference circonference width
    externalLineWidth: 1,
    //External reference circonference color
    externalStrokeColor: "#f0003c",
    // Sets the behavior of the stick
    autoReturnToCenter: true,
  });

  paintButton.onclick = () => {
    appState = !appState;
  };
}

function draw() {
  background(221, 18, 30);
  checkerBoard.display();
  checkerBoard.scale = scaleSlider.value;
  checkerBoard.driftX -= joyStick.GetPosX() - 40;
  checkerBoard.driftY -= joyStick.GetPosY() - 40;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = color(254, 100, 30);
  chromaticAberration(drawingContext, 3, 0);
}

// From https://p5js.org/examples/simulate-game-of-life.html p5.js example game of life
// The process of creating the new generation
function generate() {
  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < COLUMNS - 1; x++) {
    for (let y = 1; y < ROWS - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x + i][y + j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if (board[x][y] == 1 && neighbors < 2) next[x][y] = 0;
      // Loneliness
      else if (board[x][y] == 1 && neighbors > 3) next[x][y] = 0;
      // Overpopulation
      else if (board[x][y] == 0 && neighbors == 3) next[x][y] = 1;
      // Reproduction
      else next[x][y] = board[x][y]; // Stasis
    }
  }

  // Swap!
  let temp = board;
  board = next;
  next = temp;
}

//update function
function updateBoard() {
  setTimeout(updateBoard, DEFAULT_INTERVAL);
  if (!appState) {
    return;
  }
  generate();
  checkerBoard.update();
}

function mousePressed() {
  if (
    (mouseX < 110 && mouseY > 270) ||
    (mouseX > 250 && mouseY > 325) ||
    mouseX < 5 ||
    mouseY < 5 ||
    mouseX > CANVAS_WIDTH - 5 ||
    mouseY > CANVAS_HEIGHT - 5
  ) {
    return;
  }

  if (appState) {
    return;
  }

  let xi = parseInt(
    (mouseX -
      checkerBoard.driftX +
      ((COLUMNS - 1) * CHECKBOX_WIDTH * checkerBoard.scale) / 2 -
      CANVAS_WIDTH / 2) /
      (CHECKBOX_WIDTH * checkerBoard.scale)
  );

  let yi = parseInt(
    (mouseY -
      checkerBoard.driftY +
      ((ROWS - 1) * CHECKBOX_WIDTH * checkerBoard.scale) / 2 -
      CANVAS_HEIGHT / 2) /
      (CHECKBOX_WIDTH * checkerBoard.scale)
  );

  if (xi < 0 || yi < 0 || xi > 299 || yi > 299) {
    return;
  }

  board[xi][yi] = !board[xi][yi];
  checkerBoard.update();
  //console.log(xi, yi, board[xi][yi]);
}

// Define the check board
class checkerBoard {
  constructor() {
    this.checkBoxArr = new Array(COLUMNS);
    for (let xi = 0; xi < COLUMNS - 1; xi++) {
      this.checkBoxArr[xi] = new Array(ROWS);
      for (let yi = 0; yi < ROWS - 1; yi++) {
        this.checkBoxArr[xi][yi] = new checkBox(xi, yi);
        if (xi == 0 || xi == 298 || yi == 0 || yi == 298) {
          this.checkBoxArr[xi][yi].isBound = true;
        }
      }
    }
    this.driftX = 0;
    this.driftY = 0;
    this.scale = 1;
  }

  display() {
    push();
    translate(
      CANVAS_WIDTH / 2 -
        ((COLUMNS - 1) * CHECKBOX_WIDTH * this.scale) / 2 +
        this.driftX,
      CANVAS_HEIGHT / 2 -
        ((ROWS - 1) * CHECKBOX_WIDTH * this.scale) / 2 +
        this.driftY
    );
    scale(this.scale);
    noStroke();
    for (let xi = 0; xi < COLUMNS - 1; xi++) {
      for (let yi = 0; yi < ROWS - 1; yi++) {
        this.checkBoxArr[xi][yi].display();
      }
    }
    pop();
  }

  update() {
    for (let xi = 0; xi < COLUMNS - 1; xi++) {
      for (let yi = 0; yi < ROWS - 1; yi++) {
        this.checkBoxArr[xi][yi].toggle(board[xi][yi]);
      }
    }
  }
}

// Define the check box.
class checkBox {
  //constructor
  constructor(xIndex, yIndex, alive = false) {
    this.x = xIndex * CHECKBOX_WIDTH;
    this.y = yIndex * CHECKBOX_WIDTH;
    this.alive = alive;
    this.shade = random(60, 87);
    //this.pressActive = pressActive;
    this.isBound = false;
  }

  display() {
    if (!this.isBound) {
      if (this.alive) {
        fill(51, 80, this.shade);
      } else {
        noFill();
      }
      circle(this.x, this.y, CHECKBOX_WIDTH);
    } else {
      fill(0, 255, 255);
      circle(this.x, this.y, CHECKBOX_WIDTH);
    }
  }

  toggle(isAlive) {
    this.alive = isAlive;
  }
}

function chromaticAberration(ctx, intensity, phase) {
  /* Use canvas to draw the original image, and load pixel data by calling getImageData
    The ImageData.data is an one-dimentional Uint8Array with all the color elements flattened. The array contains data in the sequence of [r,g,b,a,r,g,b,a...]
    Because of the cross-origin issue, remember to run the demo in a localhost server or the getImageData call will throw error
    */
  var imageData = ctx.getImageData(0, 0, 800, 800);
  var data = imageData.data;

  for (var i = phase % 4; i < data.length; i += 4) {
    // Setting the start of the loop to a different integer will change the aberration color, but a start integer of 4n-1 will not work
    data[i] = data[i + 4 * intensity];
  }
  ctx.putImageData(imageData, 0, 0);
}

let clearBoard = () =>{
  for (let xi = 0; xi < COLUMNS - 1; xi++) {
    for (let yi = 0; yi < ROWS - 1; yi++) {
      board[xi][yi] = false;
    }
  }
  checkerBoard.update();
}
