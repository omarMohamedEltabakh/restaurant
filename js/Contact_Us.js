import { hideAllSection } from "./hideSbling.js";


export const uName = document.getElementById("uName");
const uNameCheck = uName.nextElementSibling;
const uEmail = document.getElementById("uEmail");
const uEmailCheck = uEmail.nextElementSibling;
const uPhone = document.getElementById("uPhone");
const uPhoneCheck = uPhone.nextElementSibling;
const uAge = document.getElementById("uAge");
const uAgeCheck = uAge.nextElementSibling;
const uPassword = document.getElementById("uPassword");
const uPasswordCheck = uPassword.nextElementSibling;
const repassword = document.getElementById("repassword");
const repasswordCheck = repassword.nextElementSibling;
const contact_usLink = document.getElementById("Contact");
export const form = document.querySelector(".form");

contact_usLink.addEventListener("click",function(){
    hideAllSection(".form")
    
    
    form.classList.replace("d-none","d-block");
    
})

let password;

function validateName() {
    const uNameInput = uName.value;
    const regex = /^[a-z ]{2,10}$/;
    if (!regex.test(uNameInput)) {
        uNameCheck.classList.replace("d-none", "d-block");
        return false;
    } else {
        uNameCheck.classList.replace("d-block", "d-none");
        return true;
    }
}

function validateEmail() {
    const uEmailInput = uEmail.value;
    const regex = /^[a-z0-9-_]{2,20}(@gmail.com)$/;
    if (!regex.test(uEmailInput)) {
        uEmailCheck.classList.replace("d-none", "d-block");
        return false;
    } else {
        uEmailCheck.classList.replace("d-block", "d-none");
        return true;
    }
}

function validateAge() {
    const uAgeInput = uAge.value;
    if (uAgeInput === "") {
        uAgeCheck.classList.replace("d-none", "d-block");
        return false;
    } else {
        uAgeCheck.classList.replace("d-block", "d-none");
        return true;
    }
}

function validatePhone() {
    const uPhoneInput = uPhone.value;
    if (!/01[0125][0-9]{8}/.test(uPhoneInput)) {
        uPhoneCheck.classList.replace("d-none", "d-block");
        return false;
    } else {
        uPhoneCheck.classList.replace("d-block", "d-none");
        return true;
    }
}

function validatePassword() {
    const uPasswordInput = uPassword.value;
    const regex = /^[a-zA-Z @.#$%^&8_-]{6,20}[0-9]{2,7}$/;
    password = uPasswordInput;
    if (!regex.test(uPasswordInput)) {
        uPasswordCheck.classList.replace("d-none", "d-block");
        return false;
    } else {
        uPasswordCheck.classList.replace("d-block", "d-none");
        return true;
    }
}

function validateRepassword() {
    const repasswordInput = repassword.value;
    if (repasswordInput !== password) {
        repasswordCheck.classList.replace("d-none", "d-block");
        return false;
    } else {
        repasswordCheck.classList.replace("d-block", "d-none");
        return true;
    }
}

function checkAllInputs() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isAgeValid = validateAge();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isRepasswordValid = validateRepassword();

    if (isNameValid && isEmailValid && isAgeValid && isPhoneValid && isPasswordValid && isRepasswordValid) {
        document.getElementById("submit").classList.remove("disabled");
    } else {
        document.getElementById("submit").classList.add("disabled");
    }
}

uName.addEventListener("input", checkAllInputs);
uEmail.addEventListener("input", checkAllInputs);
uAge.addEventListener("input", checkAllInputs);
uPhone.addEventListener("input", checkAllInputs);
uPassword.addEventListener("input", checkAllInputs);
repassword.addEventListener("input", checkAllInputs);
