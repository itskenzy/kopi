// Menyesuaikan ukuran basket dan elemen lainnya saat ukuran layar berubah
window.addEventListener('resize', function () {
  if (window.innerWidth <= 600) {
      basket.style.width = '35%';
  } else {
      basket.style.width = '10%';
  }
});

// Background music
let bgmSound = new Audio("./assets/Bg.mp3");
bgmSound.loop = true;
bgmSound.play();
bgmSound.volume = 0.4;

let timer = document.getElementById("time");
let scorespan = document.getElementById("score");
let timeoutId;
let score = 0;

// Timer part
let referenceTime = undefined;
function ResetTime() {
let Time = 30;
timer.innerText = Time;
referenceTime = setInterval(() => {
  Time -= 1;
  timer.innerText = Time;
  if (Time === 0) {
    localStorage.setItem('score', score);
    window.location.href = './gameover.html';
  }
}, 1000);
}
ResetTime();

// Basket movement 
let isDragging = false;
let offsetX;

let basketdiv = document.getElementById("basketdiv");
let basket = document.getElementById("basket");

function startDragging(event, isTouch) {
isDragging = true;
offsetX = isTouch ? event.touches[0].clientX - basket.getBoundingClientRect().left : event.clientX - basket.getBoundingClientRect().left;
}

function moveBasket(event, isTouch) {
if (isDragging) {
  const clientX = isTouch ? event.touches[0].clientX : event.clientX;
  const newX = clientX - offsetX;

  // Prevent basket from moving off the left and right edges
  const minLeft = 0;
  const maxRight = window.innerWidth - basket.clientWidth;
  basket.style.left = `${Math.min(maxRight, Math.max(minLeft, newX))}px`;
}
}

function stopDragging() {
isDragging = false;
}

// Event listeners for mobile
if (window.innerWidth <= 600) {
basket.addEventListener("touchstart", (event) => startDragging(event, true));
document.addEventListener("touchmove", (event) => moveBasket(event, true));
document.addEventListener("touchend", stopDragging);
}

// Event listeners for desktop
else {
basket.addEventListener("mousedown", (event) => startDragging(event, false));
document.addEventListener("mousemove", (event) => moveBasket(event, false));
document.addEventListener("mouseup", stopDragging);
}

// Images which will fall are given in an array
let desserts = [
"./assets/c1.png",
"./assets/c2.png",
"./assets/c3.png",
"./assets/c4.png",
];

let sweetsId = 0;
let sweetsContainer = document.getElementById("sweets");

// Creating a function for random desserts which will fall from the sky
function createSweets() {
let randomSweets = desserts[Math.floor(Math.random() * desserts.length)];

// Image tag is created and adding source, id, class to it
let newSweet = document.createElement("img");
newSweet.src = randomSweets;
newSweet.alt = randomSweets;
newSweet.className = "skygift";
newSweet.id = "sweets-" + sweetsId;
newSweet.style.position = "absolute";
newSweet.style.width = "10vw"; // Using vw for responsive width
sweetsContainer.appendChild(newSweet);

// Viewport of the screen
let translateRandomNumber = Math.floor(Math.random() * (window.innerWidth - newSweet.clientWidth));
newSweet.style.left = `${translateRandomNumber}px`;

function check() {
  if (newSweet.getBoundingClientRect().bottom >= window.innerHeight) {
    sweetsContainer.removeChild(newSweet); // Remove sweet that crossed the bottom viewport
    sweetsId++;
    score -= 1;
    scorespan.innerText = `Score: ${score}`;
  } else if (collisionBetweenBasketAndDessert(newSweet, basket)) {
    collision(newSweet);
  }
}
setInterval(check, 50); // Increased interval to improve performance
}

setInterval(createSweets, 1600);

// During collision
function collision(newSweet) {
newSweet.style.display = "none";
score++;
scorespan.innerText = `Score: ${score}`;

// During collision sound 
let collisionSound = new Audio("./assets/collisionsound.mp3");
collisionSound.play();
collisionSound.volume = 0.8;
}

// Collision detection
function collisionBetweenBasketAndDessert(element1, element2) {
let DessertFallingFromSky = element1.getBoundingClientRect();
let movableBasket = element2.getBoundingClientRect();

return !(DessertFallingFromSky.right <= movableBasket.left || // Conditions checking for no overlap
  DessertFallingFromSky.left >= movableBasket.right || 
  DessertFallingFromSky.bottom <= movableBasket.top ||
  DessertFallingFromSky.top >= movableBasket.bottom);
}
