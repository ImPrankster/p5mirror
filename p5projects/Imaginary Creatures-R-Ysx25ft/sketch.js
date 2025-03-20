// Code for a bouncing ball animation in p5 Js
function setup() {
  createCanvas(400, 400);
  // frameRate(12)
}
u = 0
x = 200
y = 100
y_top = 100
last_ch = 60
h = 400
w = 400

function draw() {

  c_w = 60
  area = PI * 60 * 60
  g = 9.8
  dt = 0.03
  v = u + g * dt
  y = y + v
  background(220);
  min_cw = 24
  if (y > 0 && y < (h - (last_ch / 2))) {
    frameRate(60)
    // falling stage, // squish along the width here
    squish_factor = 1 - abs(v) / 25
    c_w = c_w * squish_factor
    if (c_w < min_cw) {
      c_w = min_cw
    }
    c_h = area / (PI * c_w)
    last_ch = c_h
  } else if (y < (h - (min_cw))) {
    // collision stage, squish on the opposite axis here
    frameRate(60)
    c_h = 2 * (h - y)
    // last_ch = c_h 
    c_w = area / (PI * c_h)
  }
  ellipse(x, y + v, c_w, c_h)

  if (y > h - min_cw) {
    g = -g;
    v = -v
  }

  u = v

}