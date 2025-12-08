let currentLevel = "asan";
let currentChallenge = "Tərs Mətn";
let resultDiv;
let answerInput;


const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const alphabetMap = {};
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter, idx) => {
    alphabetMap[letter.toLowerCase()] = idx + 1;
});

function numberCipher(word) {
    const key = [2,5,1,4,3];
    let keyIndex = 0;
    const result = [];
    for (let ch of word) {
        let add = key[keyIndex % key.length];
        if (alphabetMap[ch.toLowerCase()]) result.push(alphabetMap[ch.toLowerCase()] + add);
        else if (!isNaN(ch)) result.push(Number(ch) + add);
        else result.push(ch);
        keyIndex++;
    }
    return result.join(' ');
}

function caesarEasy(str) {
    return str.split('').map(ch => {
        const isUpper = ch === ch.toUpperCase();
        const upperCh = ch.toUpperCase();
        if(alphabet.includes(upperCh)){
            let idx = alphabet.indexOf(upperCh);
            idx = (idx + 3) % 26;
            let newCh = alphabet[idx];
            return isUpper ? newCh : newCh.toLowerCase();
        }
        return ch;
    }).join('');
}

function caesarMedium(str) {
    return str.split('').map((ch,i) => {
        const isUpper = ch === ch.toUpperCase();
        const upperCh = ch.toUpperCase();
        if(alphabet.includes(upperCh)){
            let idx = alphabet.indexOf(upperCh);
            if(i % 2 === 0){ 
                idx = (idx - 5 + 26) % 26;
            } else {
                idx = (idx + 3) % 26;
            }
            let newCh = alphabet[idx];
            return isUpper ? newCh : newCh.toLowerCase();
        }
        return ch;
    }).join('');
}

function caesarHard(str) {
    const arr = str.split('').reverse();
    return arr.map((ch,i) => {
        const isUpper = ch === ch.toUpperCase();
        const upperCh = ch.toUpperCase();
        if(alphabet.includes(upperCh)){
            let idx = alphabet.indexOf(upperCh);
            if(i % 2 === 0){ 
                idx = (idx + 6) % 26;
            } else { 
                idx = (idx - 1 + 26) % 26;
            }
            let newCh = alphabet[idx];
            return isUpper ? newCh : newCh.toLowerCase();
        }
        return ch;
    }).join('');
}


function getCaesarResult(word, level){
    if(level === 'asan') return caesarEasy(word);
    if(level === 'orta') return caesarMedium(word);
    if(level === 'çətin') return caesarHard(word);
}


function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function(c){
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
    });
}


function rot13Reverse(str) {
    return str.split('').reverse().join('');
}


function rot13Hard(str) {
    let reversed = str.split('').reverse();
    for (let i = 1; i < reversed.length; i += 2) {
        let ch = reversed[i];
        if(/[a-zA-Z]/.test(ch)){
            const base = ch <= 'Z' ? 65 : 97;
            reversed[i] = String.fromCharCode((ch.charCodeAt(0) - base + 5) % 26 + base);
        }
    }
    return reversed.join('');
}


function getROT13Result(word, level){
    if(level === 'asan') return rot13(word);
    if(level === 'orta') return rot13Reverse(rot13(word));
    if(level === 'çətin') return rot13Hard(rot13(word));
}


function affineEncrypt(str) {
    const a = 5;
    const b = 8;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return str.split('').map(ch => {
        const isUpper = ch === ch.toUpperCase();
        const upper = ch.toUpperCase();

        if (!alphabet.includes(upper)) return ch;

        let x = alphabet.indexOf(upper);
        let e = (a * x + b) % 26;
        let newCh = alphabet[e];

        return isUpper ? newCh : newCh.toLowerCase();
    }).join('');
}

function affineHardShiftLeft(str) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return str.split('').map(ch => {
        const isUpper = ch === ch.toUpperCase();
        const up = ch.toUpperCase();

        if (!alphabet.includes(up)) return ch;

        let idx = alphabet.indexOf(up);
        idx = (idx - 1 + 26) % 26;
        let newCh = alphabet[idx];

        return isUpper ? newCh : newCh.toLowerCase();
    }).join('');
}

function getAffineResult(word, level) {
    if (level === "asan") {
        return affineEncrypt(word);
    }
    if (level === "orta") {
        return affineEncrypt(word).split("").reverse().join("");
    }
    if (level === "çətin") {
        let once = affineEncrypt(word);
        let twice = affineEncrypt(once);
        return affineHardShiftLeft(twice);
    }
}


function vigenereEncrypt(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    let keyIndex = 0;
    for (let ch of text) {
        const isUpper = ch === ch.toUpperCase();
        const upper = ch.toUpperCase();
        if (alphabet.includes(upper)) {
            let textIdx = alphabet.indexOf(upper);
            let keyCh = key[keyIndex % key.length].toUpperCase();
            let keyIdx = alphabet.indexOf(keyCh);
            let newIdx = (textIdx + keyIdx) % 26;
            let newCh = alphabet[newIdx];
            result += isUpper ? newCh : newCh.toLowerCase();
            keyIndex++;
        } else {
            result += ch;
        }
    }
    return result;
}

function getVigenereResult(word, level){
    if(level === 'asan') return vigenereEncrypt(word, 'KEY');
    if(level === 'orta') {
        let enc = vigenereEncrypt(word, 'KEY');
        let shifted = "";
        for (let c of enc) {
            if (c >= 'a' && c <= 'z') {
                shifted += String.fromCharCode(((c.charCodeAt(0) - 97 - 4 + 26) % 26) + 97);
            } else {
                shifted += c;
            }
        }
        return shifted;
    }
    if(level === 'çətin') {
        let enc = vigenereEncrypt(word, 'CRYPT');
        let reversed = enc.split("").reverse().join("");
        return numberCipher(reversed);
    }
}


function hillEncrypt(text, matrix) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let letters = text.toUpperCase().replace(/[0-9]/g, '');
    let numbers = text.replace(/[^0-9]/g, '');

    
    if (letters.length % 2 !== 0) letters += 'X';

    let nums = [];
    for (let ch of letters) {
        if (alphabet.includes(ch)) nums.push(alphabet.indexOf(ch));
    }
    let size = matrix.length;
    let result = '';
    for (let i = 0; i < nums.length; i += size) {
        let block = nums.slice(i, i + size);
        let encrypted = [];
        for (let row = 0; row < size; row++) {
            let sum = 0;
            for (let col = 0; col < size; col++) {
                sum += matrix[row][col] * block[col];
            }
            encrypted.push(sum % 26);
        }
        for (let num of encrypted) {
            result += alphabet[num];
        }
    }
    
    return result + numbers;
}

function getHillResult(word, level) {
    const matrix = [[1, 2], [3, 5]]; 
    let result = hillEncrypt(word, matrix);
    if (level === 'orta') {
        result = rot13(result);
    } else if (level === 'çətin') {
        result = result.split('').reverse().join('');
        result = rot13(result);
    }
    return result;
}


function getRSAResult(word, level) {
    if (level === 'asan') return "n=15, e=7";
    if (level === 'orta') return "n=221, φ(n)=192, e=5, d=77";
    if (level === 'çətin') {
        return "0";
    }
}


function createPlayfairMatrix(key) {
    key = key.toUpperCase().replace(/J/g, 'I');
    let matrix = [];
    let seen = new Set();
    
    for (let char of key) {
        if (char >= 'A' && char <= 'Z' && !seen.has(char)) {
            matrix.push(char);
            seen.add(char);
        }
    }
    
    for (let char of "ABCDEFGHIKLMNOPQRSTUVWXYZ") { 
        if (!seen.has(char)) {
            matrix.push(char);
            seen.add(char);
        }
    }
    
    let grid = [];
    for (let i = 0; i < 5; i++) grid.push(matrix.slice(i * 5, i * 5 + 5));
    return grid;
}


function findPosition(matrix, char) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === char) return [i, j];
        }
    }
    return null;
}


function playfairEncrypt(text, key) {
    let matrix = createPlayfairMatrix(key);
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
   
    let pairs = [];
    for (let i = 0; i < text.length; i += 2) {
        let a = text[i];
        let b = text[i + 1] || 'X';
        if (a === b) b = 'X';
        pairs.push([a, b]);
    }

    let result = '';
    for (let [a, b] of pairs) {
        let [r1, c1] = findPosition(matrix, a);
        let [r2, c2] = findPosition(matrix, b);
        if (r1 === r2) { 
            result += matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
        } else if (c1 === c2) { 
            result += matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];
        } else { 
            result += matrix[r1][c2] + matrix[r2][c1];
        }
    }
    return result.toLowerCase();
}


function shiftChar(char, shift) {
    let code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
    if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
    return char;
}


function mediumEncrypt(text, key) {
    let letters = text.replace(/\d/g, ''); 
    let numbers = text.replace(/\D/g, ''); 
    let pf = playfairEncrypt(letters, key).toLowerCase().split('');
    for (let i = 0; i < pf.length; i++) {
        if (i % 2 === 1) { 
            pf[i] = shiftChar(pf[i], -1);
        }
    }
    return pf.join('') + numbers;
}


function hardEncrypt(text, key) {
    let letters = text.replace(/\d/g, ''); 
    let numbers = text.replace(/\D/g, ''); 
    letters = letters.split('').reverse().join(''); 
    let pf = playfairEncrypt(letters, key).toLowerCase().split('');
    for (let i = 0; i < pf.length; i++) {
        if (i % 2 === 0) {
            pf[i] = shiftChar(pf[i], 2);
        } else { 
            pf[i] = shiftChar(pf[i], -1);
        }
    }
    return pf.join('') + numbers;
}

function getPlayfairResult(word, level) {
    if (level === 'asan') return playfairEncrypt(word, "ABC") + word.replace(/\D/g, '');
    if (level === 'orta') return mediumEncrypt(word, "CRYPT");
    if (level === 'çətin') return hardEncrypt(word, "CRYPT");
}


function shiftCharRight(str) {
    return str.replace(/[a-zA-Z]/g, function(c){
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + 1) % 26 + base);
    });
}

function base64Easy(word) {
    return btoa(word);
}

function base64Medium(word) {
    let rot13Word = rot13(word);
    let encoded = btoa(rot13Word);
    return encoded;
}

function base64Hard(word) {
    let letters = word.replace(/\d/g, ''); 
    let numbers = word.replace(/\D/g, ''); 
    let rot13Word = rot13(letters);
    let encoded = btoa(rot13Word);
    let reversed = encoded.split('').reverse().join('');
    let shifted = shiftCharRight(reversed);
    return shifted + numbers;
}

function getBase64Result(word, level) {
    if(level === 'asan') return base64Easy(word);
    if(level === 'orta') return base64Medium(word);
    if(level === 'çətin') return base64Hard(word);
}


function openRightSidebar(title, content) {
    const sidebarRight = document.getElementById("sidebar-right");
    if (!sidebarRight) return;

    document.getElementById("topic-title").innerText = title;
    document.getElementById("topic-content").innerHTML = content;
    sidebarRight.classList.add("show");
    document.body.style.overflow = "hidden";
}


function closeRightSidebar() {
    const sidebarRight = document.getElementById("sidebar-right");
    sidebarRight.classList.remove("show");
    document.body.style.overflow = "";
}



function setLevel(level) {
    currentLevel = level;

    const levelMsg = document.getElementById('level-msg');
    if(levelMsg){
        levelMsg.textContent = "Səviyyə dəyişdi: " + level.toUpperCase();
        levelMsg.style.display = "block";
        setTimeout(() => {
            levelMsg.style.display = "none";
        }, 3000);
    }

    openChallenge(currentChallenge);
}

function openChallenge(name) {
    currentChallenge = name;
    const sidebarRight = document.getElementById("sidebar-right");
    const title = document.getElementById("topic-title");
    const content = document.getElementById("topic-content");

    title.innerText = name;
    content.innerHTML = "";
    resultDiv.textContent = "";
    answerInput.value = "";

    
    const wordP = document.querySelector('p');
    const label = document.querySelector('label');
    const userAnswer = document.getElementById('userAnswer');
    const checkBtn = document.querySelector('.btn.btn-primary');
    const clearBtn = document.querySelector('.btn.btn-secondary');
    if (wordP) wordP.style.display = 'block';
    if (label) label.style.display = 'block';
    if (userAnswer) userAnswer.style.display = 'block';
    if (checkBtn) checkBtn.style.display = 'inline-block';
    if (clearBtn) clearBtn.style.display = 'inline-block';

   
    const securityProtocols = ['SSL/TLS', 'HTTPS', 'VPN', 'IPSec', 'Kerberos', 'RADIUS', 'PGP', 'S/MIME'];
    if (securityProtocols.includes(name)) {
        if (wordP) wordP.style.display = 'none';
        if (label) label.style.display = 'none';
        if (userAnswer) userAnswer.style.display = 'none';
        if (checkBtn) checkBtn.style.display = 'none';
        if (clearBtn) clearBtn.style.display = 'none';
    }

    
const frame = document.getElementById("simulationFrame");

if (frame) {
    frame.style.display = "none";
    frame.src = "";
}

if (name === "SSL/TLS") {
    content.innerHTML = "SSL/TLS üçün interaktiv simulyasiya:";
    
    if (frame) {
        frame.src = "/static/css/simulations/ssl_simulation_test.html";
        frame.style.display = "block";
    }
}

if (name === "HTTPS") {
    content.innerHTML = "HTTPS üçün interaktiv simulyasiya:";
    
    if (frame) {
        frame.src = "/static/css/simulations/https_simulation_test.html";
        frame.style.display = "block";
    }
}

if (name === "VPN") {
    content.innerHTML = "VPN üçün interaktiv simulyasiya:";
    
    if (frame) {
        frame.src = "/static/css/simulations/vpn_simulation_test.html";
        frame.style.display = "block";
    }
}

if (name === "IPSec") {
    content.innerHTML = "IPSec üçün interaktiv simulyasiya:";
    
    if (frame) {
        frame.src = "/static/css/simulations/ipsec_simulation_test.html";
        frame.style.display = "block";
    }
}

if (name === "Kerberos") {
    content.innerHTML = "Kerberos üçün interaktiv simulyasiya:";
    
    if (frame) {
        frame.src = "/static/css/simulations/kerberos_simulation_test.html";
        frame.style.display = "block";
    }
}

if (name === "RADIUS") {
    content.innerHTML = "RADIUS üçün interaktiv simulyasiya:";
    
    if (frame) {
        frame.src = "/static/css/simulations/radius_simulation_test.html";
        frame.style.display = "block";
    }
}

if (name === "PGP") {
    content.innerHTML = "PGP üçün interaktiv simulyasiya:";
    
    if (frame) {
        frame.src = "/static/css/simulations/pgp_simulation_test.html";
        frame.style.display = "block";
    }
}

if (name === "S/MIME") {
    content.innerHTML = "S/MIME üçün interaktiv simulyasiya:";
    
    if (frame) {
        frame.src = "/static/css/simulations/s_mime_simulation_test.html";
        frame.style.display = "block";
    }
}

    const challenges = {
    "Tərs Mətn": {
        asan: "Verilən sözü tərsinə çevirin.",
        orta: "Verilən sözü tərsinə çevirin, sonra cüt indeksdəki hər simvolu onun indeks nömrəsi ilə əvəz edin.",
        çətin: "Verilən sözü tərsinə çevirin, sonra tək indeksdəki hər simvolu onun əvvəlki simvolu ilə əvəz edin."
    },

    "Nömrəli Şifrələmə": {
        asan: "Hərfləri əlifba sırasına görə rəqəmləri ilə əvəz edin. Rəqəmlər olduğu kimi qalsın. (abcdefghijklmnopqrstuvwxyz)",
        orta: "Hərfləri əlifba sırasına görə rəqəmləri ilə əvəz edin, sonra hər rəqəmi 3 vahid artırın. (abcdefghijklmnopqrstuvwxyz)",
        çətin: "Hərfləri əlifba sırasına görə rəqəmləri ilə əvəz edin, sonra açardan istifadə edərək hər rəqəmə uyğun əlavə edin: 2,5,1,4,3.(abcdefghijklmnopqrstuvwxyz)"
    },

    "Sezar Şifrəsi": {
        asan: "Hərf olan hər simvolu 3 vahid sağa sürüşdürün. Rəqəmlər olduğu kimi qalsın. (abcdefghijklmnopqrstuvwxyz)",
        orta: "Tək indeksdəki hərfləri 3 vahid sağa, cüt indeksdəki hərfləri 5 vahid sola sürüşdürün. Rəqəmlər olduğu kimi qalsın. (abcdefghijklmnopqrstuvwxyz)",
        çətin: "Verilən sözü tərsinə çevirin, sonra cüt indeksdəki hərfləri 6 vahid sağa, tək indekdəki hərfləri 1 vahid sola sürüşdürün. (abcdefghijklmnopqrstuvwxyz)"
    },

    "ROT13": {
        asan: "Verilən sözü ROT13 ilə şifrələyin. Rəqəmlər olduğu kimi qalsın.",
        orta: "Verilən sözü ROT13 ilə şifrələyin, sonra alınan sözü tərsinə çevirin.",
        çətin: "Verilən sözü ROT13 ilə şifrələyin, alınan sözü tərsinə çevirin, sonra tək indeksdə olan simvolları 5 vahid sağa sürüşdürün."
    },

    "Affine Şifrəsi": {
        asan: "Verilən sözə Affine şifrəsini (a=5, b=8) bir dəfə tətbiq edin. Rəqəmlər olduğu kimi qalsın. (abcdefghijklmnopqrstuvwxyz)",
        orta: "Verilən sözə Affine şifrəsini (a=5, b=8) bir dəfə tətbiq edin, sonra alınan sözü tərsinə çevirin. (abcdefghijklmnopqrstuvwxyz)",
        çətin: "Verilən sözə Affine şifrəsini (a=5, b=8) iki dəfə tətbiq edin, sonra bütün hərfləri 1 vahid sola sürüşdürün. (abcdefghijklmnopqrstuvwxyz)"
    },

    "Playfair Şifrəsi": {
        asan: "Verilən sözə Playfair şifrəsini tətbiq edin. Rəqəmlər olduğu kimi qalsın. Açar: ABC, 5×5 cədvəl. (abcdefghijklmnopqrstuvwxyz)",
        orta: "Verilən sözə Playfair şifrəsini tətbiq edin. Daha sonra tək indeksdəki hərfləri 1 vahid sola sürüşdürün. Rəqəmlər olduğu kimi qalsın. Açar: CRYPT, 5×5 cədvəl. (abcdefghijklmnopqrstuvwxyz)",
        çətin: "Verilən sözü əvvəlcə tərs çevirin. Sonra Playfair şifrəsini tətbiq edin. Tək indeksdəki hərfləri 1 vahid sola, cüt indeksdəki hərfləri 2 vahid sağa sürüşdürün. Rəqəmlər olduğu kimi qalsın. Açar: CRYPT, 5×5 cədvəl. (abcdefghijklmnopqrstuvwxyz)"
    },
    
    "Vigenère Şifrəsi": {
        asan: "Verilən sözə Vigenère şifrəsini tətbiq edin. Açar: KEY. Rəqəmlər olduğu kimi qalsın. (abcdefghijklmnopqrstuvwxyz)",
        orta: "Verilən sözə Vigenère şifrəsini tətbiq edin, sonra hər hərfi 4 vahid sola sürüşdürün. Açar: KEY. Rəqəmlər olduğu kimi qalsın. (abcdefghijklmnopqrstuvwxyz)",
        çətin: "Verilən sözə Vigenère şifrəsini tətbiq edin, sözü tərs çevirin, sonra isə nömrəli şifrələmə tətbiq edin. Sözdəki rəqəmlərdən istifadə etməyin. Açar: CRYPT. (abcdefghijklmnopqrstuvwxyz)"
    },

    "Hill Şifrəsi": {
        asan: "Verilən sözü Hill şifrəsi ilə 2×2 açar matrisi istifadə edərək şifrələyin. Açar matrisi: [[1,2],[3,5]]. Rəqəmlər sözün sonunda əlavə olunacaq. (abcdefghijklmnopqrstuvwxyz)",
        orta: "Verilən sözü Hill şifrəsi ilə 2×2 açar matrisi istifadə edərək şifrələyin, sonra ROT13 tətbiq edin. Açar matrisi: [[1,2],[3,5]]. Rəqəmlər sözün sonunda əlavə olunacaq. (abcdefghijklmnopqrstuvwxyz)",
        çətin: "Verilən sözü Hill şifrəsi ilə 2×2 açar matrisi istifadə edərək şifrələyin, sonra sözü tərs çevirib ROT13 tətbiq edin. Açar matrisi: [[1,2],[3,5]]. Rəqəmlər sözün sonunda əlavə olunacaq. (abcdefghijklmnopqrstuvwxyz)"
    },

    "Base64": {
        asan: "Verilmiş sözü Base64-ə çevirin. ASCII cədvəlindən istifadə edin.",
        orta: "Verilmiş sözü əvvəlcə ROT13 ilə dəyişdirin. Rəqəmlər olduğu kimi qalsın. Sonra Base64-ə çevirin. ASCII cədvəlindən istifadə edin.",
        çətin: "Verilmiş sözə əvvəlcə ROT13 tətbiq edin, sonra Base64-ə çevirin, nəticəni tərs çevirin və hərfləri 1 vahid sağa sürüşdürün. Rəqəmləri sonunda saxlayın. ASCII cədvəlindən istifadə edin."
    }
};

    const data = challenges[name];
    if (data) {
        content.innerHTML = `<b>${currentLevel.toUpperCase()} səviyyə:</b><br>${data[currentLevel]}`;
    } 

    sidebarRight.classList.add("show");
    document.body.style.overflow = "hidden";
}

window.onload = function() {
    const hamburger = document.querySelector(".toggle-btn");
    const toggler = document.querySelector("#icon");
    const sidebar = document.querySelector("#sidebar");

    if (hamburger && toggler && sidebar) {
        hamburger.addEventListener("click", () => {
            sidebar.classList.toggle("expand");
            toggler.classList.toggle("bxs-chevrons-right");
            toggler.classList.toggle("bxs-chevrons-left");
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeRightSidebar();
        
    });

    const topicContent = document.getElementById('topic-content');
    answerInput = document.getElementById('userAnswer');
    const checkBtn = document.querySelector('.btn.btn-primary');
    const clearBtn = document.querySelector('.btn.btn-secondary');

    resultDiv = document.createElement('p');
    checkBtn.parentNode.parentNode.appendChild(resultDiv);

    const challengeWord = 'cryptokey2025';
    topicContent.innerHTML = `Sözü tərs çevirin: <strong id="challenge-word">${challengeWord}</strong>`;

    document.getElementById('challenge-word').addEventListener('click', () => {
        openChallenge(currentChallenge);
    });

    function reverseString(word) {
        return word.split('').reverse().join('');
    }

    function mediumChallenge(word) {
        let reversed = word.split('').reverse();
        for (let i = 0; i < reversed.length; i++) {
            if (i % 2 === 0) {
                reversed[i] = i.toString();
            }
        }
        return reversed.join('');
    }

    function hardChallenge(word) {
        let reversed = word.split('').reverse();
        for (let i = 1; i < reversed.length; i += 2) {
            reversed[i] = reversed[i - 1];
        }
        return reversed.join('');
    }

    function numericCipherEasy(word) {
        const result = [];
        for (let ch of word) {
            if (alphabetMap[ch.toLowerCase()]) result.push(alphabetMap[ch.toLowerCase()]);
            else result.push(ch);
        }
        return result.join(' ');
    }

    function numericCipherMedium(word) {
        const result = [];
        for (let ch of word) {
            if (alphabetMap[ch.toLowerCase()]) {
                let num = (alphabetMap[ch.toLowerCase()] + 3) % 26;
                if (num === 0) num = 26;
                result.push(num);
            } else if (!isNaN(ch)) result.push(Number(ch) + 3);
            else result.push(ch);
        }
        return result.join(' ');
    }

    function numericCipherHard(word) {
        const key = [2,5,1,4,3];
        let keyIndex = 0;
        const result = [];

        for (let ch of word) {
            let add = key[keyIndex % key.length];
            if (alphabetMap[ch.toLowerCase()]) result.push(alphabetMap[ch.toLowerCase()] + add);
            else if (!isNaN(ch)) result.push(Number(ch) + add);
            else result.push(ch);
            keyIndex++;
        }
        return result.join(' ');
    }

    function getChallengeResult(word, level) {
        if (currentChallenge === 'Nömrəli Şifrələmə') {
            if (level === 'asan') return numericCipherEasy(word);
            if (level === 'orta') return numericCipherMedium(word);
            if (level === 'çətin') return numericCipherHard(word);
        }
        else if(currentChallenge === 'ROT13') {
            return getROT13Result(word, level);
        }
        else if(currentChallenge === 'Affine Şifrəsi') {
            return getAffineResult(word, level);
        }
        else if(currentChallenge === 'Vigenère Şifrəsi') {
            return getVigenereResult(word, level);
        }
        else if(currentChallenge === 'Hill Şifrəsi') {
            return getHillResult(word, level);
        }
        else if(currentChallenge === 'RSA') {
            return getRSAResult(word, level);
        }
        else {
            if (level === 'asan') return reverseString(word);
            if (level === 'orta') return mediumChallenge(word);
            if (level === 'çətin') return hardChallenge(word);
        }
    }

    checkBtn.addEventListener('click', () => {
        const userAnswer = answerInput.value.trim();
        let correctAnswer;

        if(currentChallenge === "Sezar Şifrəsi") {
            correctAnswer = getCaesarResult(challengeWord, currentLevel);
        }
        else if(currentChallenge === 'Nömrəli Şifrələmə'){
            correctAnswer = getChallengeResult(challengeWord, currentLevel);
        }
        else if(currentChallenge === 'ROT13'){
            correctAnswer = getROT13Result(challengeWord, currentLevel);
        }
        else if(currentChallenge === 'Affine Şifrəsi'){
            correctAnswer = getAffineResult(challengeWord, currentLevel);
        }
        else if(currentChallenge === 'Vigenère Şifrəsi'){
            correctAnswer = getVigenereResult(challengeWord, currentLevel);
        }
        else if(currentChallenge === 'Hill Şifrəsi'){
            correctAnswer = getHillResult(challengeWord, currentLevel);
        }
        else if(currentChallenge === 'RSA'){
            correctAnswer = getRSAResult(challengeWord, currentLevel);
        }
        else if(currentChallenge === 'Playfair Şifrəsi'){
            correctAnswer = getPlayfairResult(challengeWord, currentLevel);
        }
        else if(currentChallenge === 'Base64'){
            correctAnswer = getBase64Result(challengeWord, currentLevel);
        }
        else {
            correctAnswer = getChallengeResult(challengeWord, currentLevel);
        }

        if(userAnswer === correctAnswer){
            resultDiv.textContent = "Düzdür ✅";
            resultDiv.style.color = 'green';
        } else {
            resultDiv.textContent = "Yanlışdır ❌";
            resultDiv.style.color = 'red';
        }
    });

    answerInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            checkBtn.click();
        }
    });

    [checkBtn, clearBtn].forEach(btn => {
        btn.style.backgroundColor = 'rgba(8 ,141 , 249, 1)';
        btn.style.border = '1px solid #fff';
        btn.style.color = '#fff';
        btn.style.transition = '0.3s';
        btn.style.borderRadius = '8px';
        btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = 'rgba(10, 105, 183, 1)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = 'rgba(8, 141, 249, 1)';
        });
    });
};


const uppercaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


const hillMatrix = [
    [1, 2],
    [3, 5]
];


function hillEncrypt2x2(plaintext) {
   
    plaintext = plaintext.toUpperCase();

    
    let letters = plaintext.replace(/[0-9]/g, '');
    let numbers = plaintext.replace(/[^0-9]/g, '');

   
    if (letters.length % 2 !== 0) letters += 'X';

    let ciphertext = '';

    for (let i = 0; i < letters.length; i += 2) {
        const a = uppercaseAlphabet.indexOf(letters[i]);
        const b = uppercaseAlphabet.indexOf(letters[i+1]);

        
        let c1 = (hillMatrix[0][0]*a + hillMatrix[0][1]*b) % 26;
        let c2 = (hillMatrix[1][0]*a + hillMatrix[1][1]*b) % 26;

        ciphertext += uppercaseAlphabet[c1] + uppercaseAlphabet[c2];
    }

    
    ciphertext += numbers;
    return ciphertext;
}


function encryptHill(plaintext, level) {
    let cipher = hillEncrypt2x2(plaintext);

    if (level === 'orta') {
        cipher = rot13(cipher);
    } else if (level === 'çətin') {
        cipher = cipher.split('').reverse().join(''); 
        cipher = rot13(cipher);
    }

    return cipher;
}

