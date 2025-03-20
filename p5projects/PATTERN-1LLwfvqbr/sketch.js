function setup() {
  createCanvas(400, 400);
  background(255);
  noStroke();
  fill(0);
  let r1 = random(-1,1)
  let r2 = random(-1,1)
  let r3 = random(-1,1)
  let r4 = random(-1,1)
  for (let n = 0; n <= 50; n += 1) {
    let ang2 = map(n, 0, 50, 0, 2 * PI);
    for (let i = 0; i <= 100; i += 1) {
      let ang1 = map(i, 0, 100, 0, 2 * PI);
          console.log(ang1)

      circle(
        (sin(ang1*r1) * 150 *((cos(ang2*r2))) + width / 2),
        (cos(ang1*r3) * 150 *((sin(ang2*r4))) + height / 2),
        3*abs(sin(ang2))
      );
    }
  }
}
