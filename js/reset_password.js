function validator() {
    validateEmail();
    validateEmptyEmail();
    validatePassword();
    validateEmptyPassword();
    passwordSimilarity()
}

 //email validation

const email = document.getElementById('email');
const emailError = document.getElementById('email-error');

function validateEmail() {
    let emailRegex = RegExp('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.][a-zA-Z]{2,3}){1,2}$');
    if (emailRegex.test(email.value))
        emailError.textContent = "";
    else emailError.textContent = "sorry, your user name must be between 6 and 30 character long";    
};

function validateEmptyEmail() {  
    if(email.value == "") emailError.textContent = "choose a gmail address";    
};

// password validation

const pwd = document.getElementById('password');
const confirmpassword = document.getElementById('confirm-password')
const pwdError = document.getElementById('password-error');

function validateEmptyPassword() {  
    if(pwd.value == "") pwdError.textContent = "Enter a password";    
};

function validatePassword () {
    let pwdRegex = RegExp('^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[@#$%^&-+=!]){1}[a-zA-Z0-9@#$%^&-+=!]{8,}$');
    if (pwdRegex.test(pwd.value))
        pwdError.textContent = "";
    else pwdError.textContent = "use 8 character or more for your password";        
}

function passwordSimilarity() {
    if(confirmpassword.value != pwd.value) pwdError.textContent = "Those passwords didin't match.Try again";
}