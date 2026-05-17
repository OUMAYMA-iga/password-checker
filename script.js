const passwordInput = document.getElementById('passwordInput');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');
const tipsList = document.getElementById('tipsList');

passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    const result = checkPassword(password);
    updateUI(result);
});

function checkPassword(password) {
    let score = 0;
    let tips = [];

    if (password.length === 0) {
        return { score: 0, label: 'Start typing to check your password', color: '#e0e0e0', tips: [] };
    }

    // Length check
    if (password.length >= 8) {
        score += 1;
    } else {
        tips.push('❌ Use at least 8 characters');
    }

    if (password.length >= 12) {
        score += 1;
    } else {
        tips.push('💡 12+ characters makes it much stronger');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
        score += 1;
    } else {
        tips.push('❌ Add uppercase letters (A, B, C...)');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
        score += 1;
    } else {
        tips.push('❌ Add lowercase letters (a, b, c...)');
    }

    // Number check
    if (/[0-9]/.test(password)) {
        score += 1;
    } else {
        tips.push('❌ Add numbers (1, 2, 3...)');
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
        score += 1;
    } else {
        tips.push('❌ Add special characters (!, @, #, $...)');
    }

    // Common passwords check
    const commonPasswords = ['password', '123456', 'qwerty', 'abc123', '111111'];
    if (commonPasswords.includes(password.toLowerCase())) {
        return { score: 0, label: '🚨 This is a very common password!', color: '#ff0000', tips: ['❌ Never use common passwords like "password" or "123456"'] };
    }

    // Score to label
    if (score <= 2) {
        return { score: 25, label: '🔴 Weak Password', color: '#ff4444', tips };
    } else if (score <= 3) {
        return { score: 50, label: '🟠 Fair Password', color: '#ff9800', tips };
    } else if (score <= 4) {
        return { score: 75, label: '🟡 Good Password', color: '#ffeb3b', tips };
    } else {
        return { score: 100, label: '🟢 Strong Password!', color: '#4caf50', tips: ['✅ Great password! Keep it safe and never share it!'] };
    }
}

function updateUI(result) {
    strengthFill.style.width = result.score + '%';
    strengthFill.style.background = result.color;
    strengthText.textContent = result.label;
    strengthText.style.color = result.color;

    tipsList.innerHTML = '';
    result.tips.forEach(function(tip) {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });
}