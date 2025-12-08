const questionsDB = {
    medium: [
        {
            type: "Decode",
            scenario: `Şirkət serverində gizli mesaj tapıldı. Mesaj iki mərhələdə şifrələnib:\n1. Tərs çevrilib\n2. Tək indeksdəki hərflər 2 vahid sağa sürüşdürülüb\n`,
            prompt: "Şifrəli mesaj: lnayetih\n (abcdefghijklmnopqrstuvwxyz)\nSizdən orijinal sözü tapmaq tələb olunur:",
            answer: "firewall",
            points: 15
        },
        {
            type: "Decode",
            scenario: `Server administratoru şifrəli hesabat göndərdi. Hərflər rəqəmlərlə əvəz olunub. (abcdefghijklmnopqrstuvwxyz)`,
            prompt: "Şifrəli mesaj: 120201311\nMesajı decode edin:",
            answer: "attack",
            points: 15
        },
        {
            type: "Decode",
            scenario: `Haker şirkətə Vigenère şifrəsi ilə mesaj göndərdi. Açar: SECURE. (abcdefghijklmnopqrstuvwxyz)`,
            prompt: "Şifrəli mesaj: fivqfvc\nMesajı decode edin:",
            answer: "network",
            points: 20
        }
    ]
};


let current = 0;
let totalScore = 0;
let currentQuestions = [];


function showMessage(msg, color="yellow") {
    const resultDiv = document.getElementById("result");
    resultDiv.style.color = color;
    resultDiv.innerText = msg;
}


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
    setTimeout(showQuestion, 1000); 
}


if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", function() {
        initGame('medium');
    });
} else {
    initGame('medium');
}
