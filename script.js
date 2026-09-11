const passwordInput = document.getElementById("password");

const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const toggleBtn = document.getElementById("toggleBtn");

const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");
const message = document.getElementById("message");



const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";

const numberCharacters = "0123456789";

const symbolCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?";



lengthInput.addEventListener("input", function () {

    lengthValue.textContent = lengthInput.value;

});


function getRandomIndex(max) {

    const randomBuffer = new Uint32Array(1);

    crypto.getRandomValues(randomBuffer);

    
    const limit = Math.floor(0xFFFFFFFF / max) * max;

    let randomValue = randomBuffer[0];

    while (randomValue >= limit) {

        crypto.getRandomValues(randomBuffer);
        randomValue = randomBuffer[0];
    }

    return randomValue % max;
}


function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = getRandomIndex(i + 1);

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}



function generatePassword() {

    const selectedSets = [];

    if (uppercaseCheckbox.checked) {
        selectedSets.push(uppercaseLetters);
    }

    if (lowercaseCheckbox.checked) {
        selectedSets.push(lowercaseLetters);
    }

    if (numbersCheckbox.checked) {
        selectedSets.push(numberCharacters);
    }

    if (symbolsCheckbox.checked) {
        selectedSets.push(symbolCharacters);
    }


    if (selectedSets.length === 0) {

        message.textContent = "Please select at least one option.";

        passwordInput.value = "";
        strengthFill.style.width = "0%";
        strengthFill.className = "";
        strengthText.textContent = "-";
        strengthText.className = "";

        return;
    }


    const passwordLength = Number(lengthInput.value);

    if (passwordLength < selectedSets.length) {

        message.textContent = `Length must be at least ${selectedSets.length} for the selected options.`;

        return;
    }


    const allCharacters = selectedSets.join("");

    const passwordChars = [];


    
    selectedSets.forEach(function (set) {

        passwordChars.push(set[getRandomIndex(set.length)]);
    });


    
    for (let i = passwordChars.length; i < passwordLength; i++) {

        passwordChars.push(allCharacters[getRandomIndex(allCharacters.length)]);
    }


    
    shuffleArray(passwordChars);

    const password = passwordChars.join("");


    passwordInput.value = password;

    message.textContent = "";

    checkStrength(password);
}


function checkStrength(password) {

    let strength = 0;

    if (password.length >= 8) {
        strength++;
    }

    if (password.length >= 12) {
        strength++;
    }

    if (/[A-Z]/.test(password)) {
        strength++;
    }

    if (/[a-z]/.test(password)) {
        strength++;
    }

    if (/[0-9]/.test(password)) {
        strength++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
    }


    const percent = (strength / 6) * 100;

    let level;

    if (strength <= 2) {

        level = "weak";
        strengthText.textContent = "Weak";

    } else if (strength <= 4) {

        level = "medium";
        strengthText.textContent = "Medium";

    } else {

        level = "strong";
        strengthText.textContent = "Strong";
    }


    strengthText.className = level;

    strengthFill.className = level;

    strengthFill.style.width = percent + "%";
}



generateBtn.addEventListener("click", generatePassword);



copyBtn.addEventListener("click", async function () {

    if (passwordInput.value === "") {

        message.textContent = "Generate a password first.";

        return;
    }


    await navigator.clipboard.writeText(passwordInput.value);

    const originalText = copyBtn.textContent;

    copyBtn.textContent = "Copied!";

    copyBtn.classList.add("copied");

    message.textContent = "Password copied!";


    setTimeout(function () {

        copyBtn.textContent = originalText;

        copyBtn.classList.remove("copied");

    }, 1500);

});



toggleBtn.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        toggleBtn.textContent = "Hide";

    } else {

        passwordInput.type = "password";

        toggleBtn.textContent = "Show";

    }

});