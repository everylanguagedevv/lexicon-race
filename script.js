// Daftar kata edukatif/umum untuk lomba (Bisa kamu ganti atau tambah sendiri)
const words = [
    "TEKNOLOGI", "KOMPUTER", "PROGRAMMING", "DIGITAL", "INTERNET",
    "GITHUB", "JAVASCRIPT", "HTML", "CSS", "WEBSITE", "EDUKASI", "KREATIF",
    "INOVASI", "PRESTASI", "SEMANGAT", "BELAJAR", "KODE",
    "LOGIKA", "APLIKASI", "NETWORK", "SECURITY", "SOFTWARE", "KOGTIK", "OTN", "GADGET", "CERDAS", "PYTHON", "C++", "PHP"
];

let score = 0;
let timeLeft = 20; // Durasi awal game dalam detik
let timer;
let isPlaying = false;

// Selektor Elemen DOM dari HTML
const typographyDeck = document.getElementById('word-to-type');
const interactiveInput = document.getElementById('word-input');
const durationPanel = document.getElementById('time-left');
const scorePanel = document.getElementById('score');
const primaryGameView = document.getElementById('game-screen');
const failureOverlay = document.getElementById('game-over-screen');
const scoreTallyFinal = document.getElementById('final-score-val');
const actionReset = document.getElementById('restart-btn');

// Fungsi untuk memilih dan menampilkan kata acak dari library
function deployRandomWord() {
    const selectorSeed = Math.floor(Math.random() * wordsLibrary.length);
    typographyDeck.innerText = wordsLibrary[selectorSeed];
}

// Fungsi pengatur jalannya hitung mundur waktu game per 1 detik
function processCountdown() {
    clockInterval = setInterval(() => {
        remainingTime--;
        durationPanel.innerText = remainingTime + "s";

        // Jika waktu habis, matikan interval dan pemicu fungsi game over
        if (remainingTime <= 0) {
            clearInterval(clockInterval);
            triggerFailureState(); 
        }
    }, 1000);
}

// Fungsi utama untuk mereset dan memulai ulang sesi game baru
function initializeSession() {
    activeScore = 0;
    remainingTime = 20; 
    executionState = true;
    
    scorePanel.innerText = activeScore;
    durationPanel.innerText = remainingTime + "s";
    interactiveInput.value = '';
    
    // Logika transisi penukaran visibilitas layar (sembunyikan game over, buka gameplay)
    primaryGameView.classList.remove('hidden');
    failureOverlay.classList.add('hidden'); 
    
    deployRandomWord();
    interactiveInput.focus();
    clearInterval(clockInterval); // Mencegah terjadinya penumpukan proses interval clock ganda
    processCountdown();
}

// Fungsi saat kalah (Hanya dipicu saat waktu benar-benar 0 detik)
function triggerFailureState() {
    executionState = false;
    // Penukaran layar tegas: sembunyikan gameplay, tampilkan layar Game Over dan poin akhir
    primaryGameView.classList.add('hidden');
    failureOverlay.classList.remove('hidden');
    scoreTallyFinal.innerText = activeScore;
}

// Handler pemantau ketikan pemain secara real-time
interactiveInput.addEventListener('input', () => {
    if (!executionState) return;

    // Evaluasi jika ketikan dibersihkan spasi & diubah ke kapital cocok dengan papan kata
    if (interactiveInput.value.trim().toUpperCase() === typographyDeck.innerText) {
        activeScore++;
        scorePanel.innerText = activeScore;
        interactiveInput.value = ''; // Kosongkan kembali kolom input ketikan
        deployRandomWord();          // Ganti kata baru selanjutnya
        
        // Sistem reward kompetitif: bonus tambahan waktu +2 detik tiap berhasil ketik benar
        remainingTime += 2;
        durationPanel.innerText = remainingTime + "s";
    }
});

// Jalankan fungsi reset game ketika tombol di klik
actionReset.addEventListener('click', initializeSession);

// Memastikan visual game siap berjalan rapi hanya saat dokumen DOM selesai dimuat utuh
window.addEventListener('DOMContentLoaded', () => {
    failureOverlay.classList.add('hidden'); // Memastikan kondisi awal screen kalah tersembunyi mutlak
    initializeSession();
});