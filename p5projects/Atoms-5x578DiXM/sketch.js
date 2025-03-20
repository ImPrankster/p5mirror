let ang = 0;
let randomArr = [];
let randomHue = 0;

let atom = (r1, r2) => {
  circle(
    map(sin(ang + r1) , -1, 1, 50, width - 50),
    map(cos(ang + r2) , -1, 1, 50, height - 50),
    20
  );
};

function setup() {
  createCanvas(400, 400);
  colorMode(HSB)
  frameRate(12);
  for (let i = 0; i < random(10, 25); i++) {
    tArr = [];
    for (let i = 0; i < 2; i++) {
      tArr.push(random(10, 50));
    }
    randomArr.push(tArr);
  }
  randomHue = random(200, 255);
}

function draw() {
  background(randomHue, 65, 65);
  fill((255-randomHue), 78, 78);
  textSize(133);
  textStyle(BOLDITALIC);
  text('atoms', 0, 125 - (sin(ang * 0.5)*10) );
  noStroke();
  fill(255);
  circle(width / 2, height / 2, map(sin(ang * 0.5), -1, 1, 100, 125));
  randomArr.forEach((a) => {
    atom(a[0], a[1]);
  });
  ang += 0.05;
}