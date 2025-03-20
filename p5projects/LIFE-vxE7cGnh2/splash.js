const TIME = 2000;

let splashScreen = document.getElementById("splash");

setTimeout(() => {
  splashScreen.innerHTML = "<h2> Slider -> Scaling </br> Joystick -> Move around </br> God Mode -> Decide each cell's fate.</h2>"
}, 2*TIME);

setTimeout(() => {
  splashScreen.innerHTML = "<h2>Can you find them? </br> Block, Beehive, Blinker, Glider</h2>"
}, 4*TIME);

setTimeout(() => {
  splashScreen.remove();
  appState = true;
}, 6*TIME);
