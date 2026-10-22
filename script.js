// kata yang akan digunakan (ku kehilangan ide buat cari kata-katanya loh rek)
const words = [
    "TEKNOLOGI", "KOMPUTER", "PROGRAMMING", "DIGITAL", "INTERNET",
    "GITHUB", "JAVASCRIPT", "HTML", "CSS", "WEBSITE", "EDUKASI", "KREATIF",
    "INOVASI", "PRESTASI", "SEMANGAT", "BELAJAR", "KODE",
    "LOGIKA", "APLIKASI", "NETWORK", "SECURITY", "SOFTWARE", "KOGTIK", "OTN8",
    "GADGET", "CERDAS", "SISTEM", "PERANGKAT", "JARINGAN", "KEREN"
];

// variabel game
var batasWaktu = 60;
var waktuSisa = batasWaktu;
var skorWpm = 0;
var totalKetikan = 0;
var ketikanBenar = 0;
var statusMain = false;
var hitungMundur;

// elemen dari html
var tampilKata = document.getElementById('word-to-type');
var kolomInput = document.getElementById('word-input');
var teksWaktu = document.getElementById('time');
var teksWpm = document.getElementById('wpm');
var teksAkurasi = document.getElementById('accuracy');
var tombolUlang = document.getElementById('btn-restart');
var teksRekor = document.getElementById('high-score');

// Acak kata - SEKARANG SUDAH FIX MENGGUNAKAN ARRAY 'words'
function acakKataSekarang() {
    var angkaAcak = Math.floor(Math.random() * words.length);
    return words[angkaAcak];
}

// Setting awal
function mulaiUlangGame() {
    clearInterval(hitungMundur);
    waktuSisa = batasWaktu;
    skorWpm = 0;
    totalKetikan = 0;
    ketikanBenar = 0;
    statusMain = false;
    
    if (teksWaktu) teksWaktu.innerText = waktuSisa;
    if (teksWpm) teksWpm.innerText = skorWpm;
    if (teksAkurasi) teksAkurasi.innerText = "0%";
    
    kolomInput.value = "";
    kolomInput.disabled = false;
    
    // save rekor tertinggi di browser
    var cekRekorLama = localStorage.getItem('typingHighScore') || 0;
    if (teksRekor) teksRekor.innerText = cekRekorLama;
    
    if (tampilKata) tampilKata.innerText = acakKataSekarang();
    kolomInput.focus();
}

// logika waktu timer
function jalankanTimer() {
    if (waktuSisa > 0) {
        waktuSisa = waktuSisa - 1;
        teksWaktu.innerText = waktuSisa;
        
        var waktuBerjalan = batasWaktu - waktuSisa;
        if (waktuBerjalan > 0) {
            var hitungWpm = Math.round((ketikanBenar) / (waktuBerjalan / 60));
            teksWpm.innerText = hitungWpm;
        }
    } else {
        gameSelesai();
    }
}

// pas waktunya udah abis
function gameSelesai() {
    clearInterval(hitungMundur);
    statusMain = false;
    kolomInput.disabled = true;
    
    var hasilAkhirWpm = Math.round((ketikanBenar) / (batasWaktu / 60));
    teksWpm.innerText = hasilAkhirWpm;
    tampilKata.innerText = "GAME OVER! WAKTU HABIS.";

    var rekorTertinggi = localStorage.getItem('typingHighScore') || 0;
    if (hasilAkhirWpm > parseInt(rekorTertinggi)) {
        localStorage.setItem('typingHighScore', hasilAkhirWpm);
        teksRekor.innerText = hasilAkhirWpm;
        tampilKata.innerText = "REKOR BARU TERCAPAI!";
    }
}

// cek fungsi
function cekKetikanUser() {
    if (statusMain == false && kolomInput.value.length > 0) {
        statusMain = true;
        hitungMundur = setInterval(jalankanTimer, 1000);
    }

    var isiInput = kolomInput.value;
    var kataTarget = tampilKata.innerText;

    if (isiInput.charAt(isiInput.length - 1) === ' ') {
        var kataBersih = isiInput.trim().toUpperCase();
        totalKetikan = totalKetikan + 1;

        if (kataBersih === kataTarget) {
            ketikanBenar = ketikanBenar + 1;
            skorWpm = skorWpm + 1;
        }

        var hitungAkurasi = Math.round((ketikanBenar / totalKetikan) * 100);
        teksAkurasi.innerText = hitungAkurasi + "%";
        
        tampilKata.innerText = acakKataSekarang();
        kolomInput.value = "";
    }
}

kolomInput.addEventListener('input', cekKetikanUser);
tombolUlang.addEventListener('click', mulaiUlangGame);

window.addEventListener('load', mulaiUlangGame);
