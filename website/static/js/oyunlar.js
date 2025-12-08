// ===== Suallar bazası =====
const questionsDB = {
    easy: [
        {type:"Tərs", prompt:"Verilən sözü tərs çevirin: 'cipher'", answer:"rehpic", points:5},
        {type:"Nömrəli", prompt:"Verilən sözə nömrəli şifrələmə tətbiq edin: 'encode' (abcdefghijklmnopqrstuvwxyz)", answer:"51431545", points:5},
        {type:"Sezar", prompt:"Verilən sözdə cüt indeksdəki simvolları 3 vahid sağa, tək indeksdəki simvolları 3 vahid sola sürüşdürün: 'keyspace' (abcdefghijklmnopqrstuvwxyz)", answer:"nbbpsxfb", points:15},
        {type:"ROT13", prompt:"Verilən sözü ROT13 ilə şifrələyin: 'ciphertext' (abcdefghijklmnopqrstuvwxyz)", answer:"pvcuregrkg", points:10},
        {type:"Affine", prompt:"Verilən sözü Affine şifrəsi ilə şifrələyin (a=3, b=5): 'enigma' (abcdefghijklmnopqrstuvwxyz)", answer:"rsdxpf", points:15}
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
        document.getElementById("question").innerText = currentQuestions[current].prompt;
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
    if(userAnswer === currentQuestions[current].answer.toLowerCase()){
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
        initGame('easy');
    });
} else {
    initGame('easy');
}
