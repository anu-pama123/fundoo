//email validation

function validator() {
    
    validateEmail();
    validateEmptyEmail();
}

const email = document.getElementById('email');
const emailError = document.getElementById('email-error');

function validateEmail() {
    console.log()
    let emailRegex = RegExp('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.][a-zA-Z]{2,3}){1,2}$');
    if (emailRegex.test(email.value))
        emailError.textContent = "";
    else emailError.textContent = "sorry, your user name must be between 6 and 30 character long";    
};

function validateEmptyEmail() {  
    if(email.value == "") emailError.textContent = "choose a gmail address";    
};