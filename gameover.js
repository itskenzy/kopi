// Background sound
let bgmSound = new Audio("./assets/Bg.mp3");
bgmSound.loop = true;
bgmSound.play();
bgmSound.volume = 0.4;

let playagain = document.getElementById("playagain");
let exitgame = document.getElementById("exitgame");
let zeroscore = document.getElementById("congratulations");

playagain.addEventListener("click", function() {
    window.location.href = "./index.html";
});

exitgame.addEventListener("click", function() {
    window.location.href = "https://github.com/heryyy/mau-cokelat";
});

// Creating random messages for winner
let randomWinningMessages = [
    "Wah congrats, untuk itu aku nanti belikan kopi spesial buat kamu ☕",
    "Wah kamu hebat sekali, aku bakal beliin kamu kopi nanti ☕",
    "Kok bisa kamu dapat segitu banyak? Aku belikan kopi spesial nanti ☕"
];

// Creating random number for random winning messages
let randnumForWin = Math.floor(Math.random() * randomWinningMessages.length);
let scorespan = document.getElementById("scorespan");
let score = parseInt(localStorage.getItem("score"), 10);
let winningScore = 10; // Skor yang dibutuhkan untuk menang

if (score >= winningScore) {
    zeroscore.innerHTML = randomWinningMessages[randnumForWin];
    scorespan.innerText = "Kamu Berhasil Mengumpulkan " + score + " kopi, selamat! Kamu menang!";
    createChocolateShower();
    setInterval(createChocolateShower, 300);
} else {
    zeroscore.innerHTML = "yahh belum beruntung, coba lagi ya!, kalau berhasil nanti dapet kopi";
    scorespan.innerText = "kamu Berhasil Mengumpulkan " + score + " kopi, butuh " + (winningScore - score) + " kopi lagi untuk menang.";
}

let playernameFromStorage = localStorage.getItem("playername");

// Function to create chocolate shower only when score is greater than zero
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
