// Daftar kata edukatif/umum untuk lomba (Bisa kamu ganti atau tambah sendiri)
const words = [
    "Teknologi", "Komputer", "Programming", "Digital", "Internet",
    "Github", "Javascript", "Website", "Edukasi", "Kreatif",
    "Inovasi", "Prestasi", "Semangat", "Belajar", "Kode",
    "Logika", "Aplikasi", "NETWORK", "SECURITY", "SOFTWARE"
];

let score = 0;
let timeLeft = 15; // Durasi awal game dalam detik
let timer;
let isPlaying = false;

// Ambil elemen DOM
const wordToType = document.getElementById('word-to-type');
const wordInput = document.getElementById('word-input');
const timeLeftDisplay = document.getElementById('time-left');
const scoreDisplay = document.getElementById('score');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreVal = document.getElementById('final-score-val');
const restartBtn = document.getElementById('restart-btn');

// Fungsi untuk mengambil kata acak
function showRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    wordToType.innerText = words[randomIndex];
}

// Fungsi untuk memulai hitung mundur waktu
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// Fungsi untuk memulai game pertama kali / reset
function startGame() {
    score = 0;
    timeLeft = 15; // Set ulang waktu lomba
    isPlaying = true;
    
    scoreDisplay.innerText = score;
    timeLeftDisplay.innerText = timeLeft;
    wordInput.value = '';
    
    gameScreen.classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
    
    showRandomWord();
    wordInput.focus();
    startTimer();
}

// Fungsi saat waktu habis (Game Over)
function endGame() {
    isPlaying = false;
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    finalScoreVal.innerText = score;
}

// Event listener saat pemain mengetik
wordInput.addEventListener('input', () => {
    if (!isPlaying) return;

    // Jika ketikan pemain sama dengan kata yang muncul (diubah ke uppercase agar adil)
    if (wordInput.value.toUpperCase() === wordToType.innerText) {
        score++;
        scoreDisplay.innerText = score;
        wordInput.value = ''; // Kosongkan kotak input
        showRandomWord();     // Ganti kata baru
        
        // Bonus waktu +2 detik setiap berhasil mengetik benar (opsional, biar makin menantang)
        timeLeft += 2;
        timeLeftDisplay.innerText = timeLeft;
    }
});

// Jalankan game saat tombol restart diklik
restartBtn.addEventListener('click', startGame);

// Otomatis mulai game saat halaman pertama kali dibuka
window.addEventListener('DOMContentLoaded', startGame);
