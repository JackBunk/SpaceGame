/**
 * Lab Goal: This lab was designed to teach you
 * how to find collisions with many objects
 * 
 * Lab Description: Detect Collision
 */

// Initialize variables
var bg1 = { x: 0, y: 0, w: 320, h: 450, s: 2, img: "bg1" };
var bg2 = { x: -320, y: 0, w: 320, h: 450, s: 2, img: "bg2" };
var rocket = { x: 160, y: 360, w: 30, h: 70, s: 10, img: "rocket" };
var asteroid = { x: randomNumber(30, 290), y: -100, w: 60, h: 60, s: randomNumber(3, 5), img: "meteor" };
var asteroid2 = { x: randomNumber(30, 290), y: -100, w: 60, h: 60, s: randomNumber(3, 5), img: "meteor2" };
var asteroid3 = { x: randomNumber(30, 290), y: -100, w: 60, h: 60, s: randomNumber(3, 5), img: "rock" };
var score = 0;

  // Draw initial elements
drawBackground();
drawRocket();
drawAsteroids();
drawScore();

// Start the game loop
timedLoop(50, function () {
  scrollBackground();
  moveAsteroid(asteroid);
  moveAsteroid(asteroid2);
  moveAsteroid(asteroid3);
// Check initial collisions
checkCollision(asteroid, rocket);
checkCollision(asteroid2, rocket);
checkCollision(asteroid3, rocket);
});

// Handle keyboard input
onEvent("screen1", "keydown", function (event) {
  if (event.key === "Left") {
    rocket.x -= rocket.s; // Move the rocket left
  }
  if (event.key === "Right") {
    rocket.x += rocket.s; // Move the rocket right
  }
  if (event.key === "Down") {
    rocket.y += rocket.s; // Move the rocket down
  }
  if (event.key === "Up") {
    rocket.y -= rocket.s; // Move the rocket up
  }
  setPosition(rocket.img, rocket.x, rocket.y, rocket.w, rocket.h);
});

// Function to draw the background
function drawBackground() {
  // Draw Background
  image(bg1.img, "assets/6062a.png");
  image(bg2.img, "assets/6062b.png");
  setProperty(bg1.img, "fit", "cover");
  setProperty(bg2.img, "fit", "cover");
}

// Function to draw the score
function drawScore() {
  textLabel("score", "Score: " + score);
  setPosition("score", 5, 20, 110, 30);
  setProperty("score", "text-color", "white");
}

// Function to draw the rocket
function drawRocket() {
  image(rocket.img, "assets/rocket.gif");
  setProperty(rocket.img, "fit", "fill");
  setPosition(rocket.img, rocket.x, rocket.y, rocket.w, rocket.h);
}

// Function to draw the asteroids
function drawAsteroids() {
  image(asteroid.img, "assets/meteor.png");
  setProperty(asteroid.img, "fit", "fill");
  setPosition(asteroid.img, asteroid.x, asteroid.y, asteroid.w, asteroid.h);
 
  image(asteroid2.img, "assets/meteor2.png");
  setProperty(asteroid2.img, "fit", "fill");
  setPosition(asteroid2.img, asteroid2.x, asteroid2.y, asteroid2.w, asteroid2.h);
 
  image(asteroid3.img, "assets/rock.png");
  setProperty(asteroid3.img, "fit", "fill");
  setPosition(asteroid3.img, asteroid3.x, asteroid3.y, asteroid3.w, asteroid3.h);
}

// Function to move an asteroid
function moveAsteroid(asteroid) {
  asteroid.y += asteroid.s;
  setPosition(asteroid.img, asteroid.x, asteroid.y, asteroid.w, asteroid.h);
  checkCollision(asteroid, rocket);
}

// Function to scroll the background
function scrollBackground() {
  bg1.x += bg1.s;
  bg2.x += bg2.s;
  setPosition(bg1.img, bg1.x, bg1.y, bg1.w, bg1.h);
  setPosition(bg2.img, bg2.x, bg2.y, bg2.w, bg2.h);
  if (bg1.x >= 320) {
    bg1.x = -320;
  }
  if (bg2.x >= 320) {
    bg2.x = -320;
  }
}

// Function to check for collisions and reset positions
function checkCollision(obj1, obj2) {
  var xOverlap = Math.max(0, Math.min(obj1.x + obj1.w, obj2.x + obj2.w) - Math.max(obj1.x, obj2.x));
  var yOverlap = Math.max(0, Math.min(obj1.y + obj1.h, obj2.y + obj2.h) - Math.max(obj1.y, obj2.y));
  if (xOverlap > 0 && yOverlap) {
    score += 2;
    setText("score", "Score: " + score);
    obj1.x = randomNumber(30, 290);
    obj1.y = -100; // Reset obj1's position to the top of the screen
    
  }
  if(score>=10){
    stopTimedLoop();
    setScreen("winScreen");
  
  }
  
  if (obj1.y >= 445) {
    score -= 1;
    setText("score", "Score: " + score);
    obj1.x = randomNumber(30, 290);
    obj1.y = -100; // Reset obj1's position to the top of the screen
  }
}



