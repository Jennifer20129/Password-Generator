const passwordInput = document.getElementById("password");

const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

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

function generatePassword() {

    let characters = "";

    if (uppercaseCheckbox.checked) {
        characters += uppercaseLetters;
    }

    if (lowercaseCheckbox.checked) {
        characters += lowercaseLetters;
    }

    if (numbersCheckbox.checked) {
        characters += numberCharacters;
    }

    if (symbolsCheckbox.checked) {
        characters += symbolCharacters;
    }


    if (characters.length === 0) {

        message.textContent = "Please select at least one option.";

        passwordInput.value = "";
        strengthFill.style.width = "0%";
        strengthFill.className = "";
        strengthText.textContent = "-";
        strengthText.className = "";

        return;
    }


    let password = "";

    const passwordLength = Number(lengthInput.value);


    for (let i = 0; i < passwordLength; i++) {

        const randomIndex = Math.floor(
            Math.random() * characters.length
        );

        password += characters[randomIndex];
    }


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