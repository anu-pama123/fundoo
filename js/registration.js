function validator(page_name='') {
    console.log(page_name)
    validateEmail();
    validateEmptyEmail();
    if(page_name=="reset_password" || page_name=="registration"){
        validatePassword();
        validateEmptyPassword();
    }
    if(page_name=="registration"){
        validatefirstName();
        validatesecondName();
        validateName();
    }

    let data = {
        "firstName": getElementById('first-name'),
        "lastName": getElementById('last-name'),
        "email": "jhdb@gmail.com",
        "service": "advance",
        "password": "jsbfvjhdbf"
    }
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


// name validation

const name = document.getElementById('first-name');
const lastname = document.getElementById('last-name');
const nameError = document.getElementById('name-error');    

function validateName() {
    if(name.value == "" && lastname.value == "") nameError.textContent = "Enter first and last names";
}

function validatefirstName() {
    if(name.value == "") nameError.textContent = "Enter first name";        
}

function validatesecondName() {
    if(lastname.value == "") nameError.textContent = "Enter second name";        
}

// password validation

const pwd = document.getElementById('password');
const confirmpassword = document.getElementById('confirm-password')
const pwdError = document.getElementById('password-error');

function validateEmptyPassword() {  
    if(pwd.value == "") pwdError.textContent = "Enter a password";    
};

function validatePassword () {
    let pwdRegex = RegExp('^[a-zA-Z0-9]{8,}$');
    if (pwdRegex.test(pwd.value))
        pwdError.textContent = "";
    else pwdError.textContent = "use 8 character or more for your password";        
}


