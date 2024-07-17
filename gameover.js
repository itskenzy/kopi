//background sound
let bgmSound = new Audio("./assets/Bg.mp3");
bgmSound.loop = true;
bgmSound.play();
bgmSound.volume = 0.4;


let playagain = document.getElementById("playagain");
let exitgame = document.getElementById("exitgame");
let zeroscore = document.getElementById("congratulations")


playagain.addEventListener("click",function(){
    window.location.href="./index.html"
})

exitgame.addEventListener("click",function(){
    window.location.href=("https://github.com/heryyy/mau-cokelat")
})

// creating random messages for winner
let randomWinningMessages = [
   "Wah congrats, untuk itu aku nanti belikan kopi spesial buat kamu ☕",
   "Wah kamu hebat sekali, aku bakal beliin kamu kopi nanti ☕",
   "Kok bisa kamu dapat segitu banyak? Aku belikan kopi spesial nanti ☕",
]


// creating random number for random winning and losing messages
let randnumForWinOrLose = Math.floor(Math.random()*5)

let scorespan = document.getElementById("scorespan");
let score = localStorage.getItem("score");

if (score>0) {
    zeroscore.innerHTML = randomWinningMessages[randnumForWinOrLose]
}

let playernameFromStorage = localStorage.getItem("playername")
scorespan.innerText =" Kamu Berhasil Mengumpulkan " + score + " kopi, coba lagi ya nanti kalau menang aku beliin kopi";

//creating chocolate shower only when socre is greater than zero
if (score>0){
    createChocolateShower();
    setInterval(createChocolateShower, 300);
}

function createChocolateShower() {
    const chocolate = document.createElement('div');
    chocolate.classList.add('chocolate');
    
    chocolate.style.left = Math.random() * 100 + "vw";
    chocolate.style.animationDuration = Math.random() * 2 + 3 + "s";
    
    chocolate.innerText = '☕🤎';
    
    document.body.appendChild(chocolate);
    
    setTimeout(() => {
                chocolate.remove();
                }, 5000);
  }
  