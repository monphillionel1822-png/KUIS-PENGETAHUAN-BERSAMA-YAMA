// ==== Semua soal lengkap ====
const questions = [
  { soal: "Hewan berkaki 4 dan mempunyai belalai, apakah itu?", jawaban: "GAJAH" },
  { soal: "Buah berwarna kuning dan berbentuk panjang, apakah itu?", jawaban: "PISANG" },
  { soal: "Ibu kota Indonesia adalah?", jawaban: "JAKARTA" },
  { soal: "Hewan yang bisa hidup di darat dan air, apakah itu?", jawaban: "KATAK" },
  { soal: "Planet terdekat dengan Matahari adalah?", jawaban: "MERKURIUS" },
  { soal: "Lambang negara Indonesia adalah?", jawaban: "GARUDA" },
  { soal: "Warna bendera negara indonesia adalah?", jawaban: "MERAH PUTIH" },
  { soal: "Alat yang bisa memantau kejadian di rumah atau di kantor dan di tempat umum disebut?", jawaban: "CCTV" },
  { soal: "Makanan utama khas indonesia adalah?", jawaban: "NASI" },
  { soal: "Alat yang di gunakan untuk mengambil moment indah adalah?", jawaban: "KAMERA" },
  { soal: "Lawan kata dari pulang adalah ?", jawaban: "PERGI" },
  { soal: "Sebutkan nama hewan yang tidur di siang hari?", jawaban: "KELELAWAR" },
  { soal: "Sebutkan manusia yang paling lama jomblo di dunia?", jawaban: "MICHAEL" },
  { soal: "Siapakah presiden pertama indonesia?", jawaban: "SOEKARNO" },
  { soal: "Siapakah presiden kita saat ini 2025?", jawaban: "PRABOWO" },
  { soal: "Siapakah penjahit bendera merah putih indonesia?", jawaban: "FATMAWATI" },
  { soal: "Dimanakah umat islam umroh?", jawaban: "MAKKAH" },
  { soal: "Dimanakah umat kristiani beribadah?", jawaban: "GEREJA" },
  { soal: "Siapakah nama dari anak presiden soekarno yang pernah menjadi presiden indonesia ke 5?", jawaban: "MEGAWATI" }
];

let currentQuestionIndex;
let usedIndexes = [];
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
let questionCount = 0;
let timer;
let timeLeft = 15;

function showQuestion() {
  if (questionCount >= 10) {
    document.getElementById("question").innerText = `🎉 Ronde selesai! Skor akhir: ${score}`;
    document.getElementById("answerInput").style.display = "none";
    document.getElementById("message").innerText = "Ronde baru akan otomatis mulai dalam 5 detik...";
    clearInterval(timer);
    setTimeout(() => {
      score = 0;
      questionCount = 0;
      document.getElementById("answerInput").style.display = "inline";
      showQuestion();
    }, 5000);
    return;
  }

  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("timer").classList.remove("urgent");
  document.getElementById("timer").innerText = "Waktu tersisa: " + timeLeft + " detik";
  timer = setInterval(countdown, 1000);

  if (usedIndexes.length === questions.length) usedIndexes = [];
  do {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
  } while (usedIndexes.includes(currentQuestionIndex));
  usedIndexes.push(currentQuestionIndex);

  const question = questions[currentQuestionIndex];
  document.getElementById("question").innerText = question.soal;
  document.getElementById("answerInput").value = "";
  document.getElementById("answerInput").style.display = "inline";
  document.getElementById("message").innerText = "";
  document.getElementById("score").innerText = "Skor: " + score;
  document.getElementById("highscore").innerText = "🏆 Skor Tertinggi: " + highscore;
}

function submitAnswer() {
  clearInterval(timer);
  const answer = document.getElementById("answerInput").value.trim().toUpperCase();
  const correctAnswer = questions[currentQuestionIndex].jawaban.toUpperCase();
  const message = document.getElementById("message");

  if (answer === correctAnswer) {
    message.innerText = "✅ Benar!";
    score += 10;
  } else {
    message.innerText = `❌ Salah! Jawaban: ${correctAnswer}`;
    score -= 5;
  }

  questionCount++;
  updateHighscore();
  document.getElementById("score").innerText = "Skor: " + score;

  setTimeout(showQuestion, 2000);
}

function countdown() {
  timeLeft--;
  document.getElementById("timer").innerText = "Waktu tersisa: " + timeLeft + " detik";
  if (timeLeft <= 5) {
    document.getElementById("timer").classList.add("urgent");
  } else {
    document.getElementById("timer").classList.remove("urgent");
  }

  if (timeLeft <= 0) {
    clearInterval(timer);
    document.getElementById("message").innerText = `⏰ Waktu habis! Jawaban: ${questions[currentQuestionIndex].jawaban}`;
    score -= 5;
    questionCount++;
    updateHighscore();
    document.getElementById("score").innerText = "Skor: " + score;
    setTimeout(showQuestion, 2000);
  }
}

function updateHighscore() {
  if (score > highscore) {
    highscore = score;
    localStorage.setItem("highscore", highscore);
  }
  document.getElementById("highscore").innerText = "🏆 Skor Tertinggi: " + highscore;
}

// tampilkan soal pertama kali
showQuestion();


