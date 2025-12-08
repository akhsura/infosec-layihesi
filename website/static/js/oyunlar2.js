// ===== Çətin səviyyə suallar =====
const questionsDB = {
    hard: [
        {
            type: "Decode",
            scenario: `Gizli mesaj tapıldı. Mesaj beş mərhələdə şifrələnib:\n1. Tərs çevrilib\n2. ROT13 ilə şifrələnib\n3. Playfair şifrəsi ilə şifrələnib (açar: CRYPTO)\n4. Vigenère şifrəsi ilə şifrələnib (açar: KING)\n5. Son mesaj`,
            prompt: "Şifrəli mesaj: DMLZGQOVT\n (abcdefghijklmnopqrstuvwxyz)\nSizdən orijinal sözü tapmaq tələb olunur:",
            answer: "cryptoking",
            points: 25
        },
        {
    type: "DecodeEncode",
    scenario: `Haker şirkətə mesaj göndərdi. Mesajın şifrələnmə ardıcıllığı:
1. Sezar şifrəsi (hərflər 1 vahid sağa sürüşdürülüb) + tərs çevrilmə ilə tapın
2. Tapdığınız sözü Hill şifrəsi ilə encode edin (2x2 açar matrisi: [[3,3],[2,5]])
3. Son olaraq Base64 ilə encode edin`,
    prompt: "Şifrəli mesaj: holupquzsd\n(abcdefghijklmnopqrstuvwxyz)\nAddım-addım decode edin və son mesajı Base64 ilə encode edin:",
    hillKey: [[3,3],[2,5]],  
    answer: "ZmxudHVlY2lmZQ==",
    points: 25
}

    ]
};

// ===== Qlobal dəyişənlər =====
let current = 0;
let totalScore = 0;
let currentQuestions = [];

// ===== Mesaj göstərmək funksiyası =====
function showMessage(msg, color="yellow") {
    const resultDiv = document.getElementById("result");
    resultDiv.style.color = color;
    resultDiv.innerText = msg;
}

// ===== Oyunu başlat =====
function initGame(level) {
    currentQuestions = questionsDB[level];
    current = 0;
    totalScore = 0;
    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").innerText = "";

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", submitAnswer);

    showQuestion();
}

// ===== Sualları göstər =====
function showQuestion() {
    if(current < currentQuestions.length) {
        const q = currentQuestions[current];
        document.getElementById("scenario").innerText = q.scenario;
        document.getElementById("question").innerText = q.prompt;
        document.getElementById("answer").value = "";
        showMessage(`Sual ${current+1} / ${currentQuestions.length} | Toplam bal: ${totalScore}`, "lightblue");
    } else {
        document.getElementById("quiz").style.display = "none";
        const maxScore = currentQuestions.reduce((a,b)=>a+b.points,0);
        const color = totalScore === maxScore ? "lightgreen" : "orange";
        showMessage(`Oyun bitdi! Sizin nəticəniz: ${totalScore} / ${maxScore} bal`, color);
    }
}

// ===== Cavabı yoxla =====
function submitAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const correctAnswer = currentQuestions[current].answer.toLowerCase();

    if(userAnswer === correctAnswer){
        totalScore += currentQuestions[current].points;
        showMessage(`Düzgün cavab! +${currentQuestions[current].points} bal`, "lightgreen");
    } else {
        showMessage(`Yanlış cavab! Düzgün cavab: ${currentQuestions[current].answer}`, "red");
    }
    current++;
    setTimeout(showQuestion, 1000); // 1 saniyə sonra növbəti sual
}

// ===== DOM hazır olduqda oyunu başlat =====
if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", function() {
        initGame('hard');
    });
} else {
    initGame('hard');
}
