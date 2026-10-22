// Daftar kata yang akan digunakan
const words = [
    "TEKNOLOGI", "KOMPUTER", "PROGRAMMING", "DIGITAL", "INTERNET",
    "GITHUB", "JAVASCRIPT", "HTML", "CSS", "WEBSITE", "EDUKASI", "KREATIF",
    "INOVASI", "PRESTASI", "SEMANGAT", "BELAJAR", "KODE",
    "LOGIKA", "APLIKASI", "NETWORK", "SECURITY", "SOFTWARE", "KOGTIK", "OTN",
    "GADGET", "CERDAS", "ANALISIS", "SISTEM", "PERANGKAT", "JARINGAN"
];

// Durasi game (dalam detik)
const maxTime = 60;
let timeLeft = maxTime;
let score = 0;
let totalTyped = 0;
let correctTyped = 0;
let isPlaying = false;
let timer;

// Elemen DOM
const wordDisplay = document.getElementById('word-to-type');
const wordInput = document.getElementById('word-input');
const timeDisplay = document.getElementById('time');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const restartBtn = document.getElementById('btn-restart');

// Ambil kata secara acak
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    return wordsList[randomIndex];
}

// Mulai ulang game
function initGame() {
    clearInterval(timer);
    timeLeft = maxTime;
    score = 0;
    totalTyped = 0;
    correctTyped = 0;
    isPlaying = false;
    
    timeDisplay.innerText = timeLeft;
    wpmDisplay.innerText = score;
    accuracyDisplay.innerText = "0%";
    wordInput.value = "";
    wordInput.disabled = false;
    
    wordDisplay.innerText = getRandomWord();
    wordInput.focus();
}

// Timer hitung mundur
function startTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
        
        // Hitung kata per menit
        let timePassed = maxTime - timeLeft;
        if (timePassed > 0) {
            let wpm = Math.round((correctTyped) / (timePassed / 60));
            wpmDisplay.innerText = wpm;
        }
    } else {
        endGame();
    }
}

function endGame() {
