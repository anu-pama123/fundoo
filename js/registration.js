var axios = require("axios");
function validator(page_name='', urlPostfix="") {
    console.log(page_name)
    const email = document.getElementById('email');
    let data = {"email": email.value};
    
    validateEmail();
    validateEmptyEmail();

    if(page_name=="reset_password" || page_name=="registration" || page_name=="sign_in"){
        const pwd = document.getElementById('password');
        const confirmpassword = document.getElementById('confirm-password')
        validatePassword();
        validateEmptyPassword();
        data["password"] = pwd.value;
        data["service"] = "advance";
    }
    if(page_name=="registration"){
        const name = document.getElementById('first-name');
        const lastname = document.getElementById('last-name');
        validatefirstName();
        validatesecondName();
        validateName();
        data["firstName"] = name.value;
        data["lastName"] = lastname.value;
    }
    const baseurl = "http://fundoonotes.incubation.bridgelabz.com/api/";

    // const headers = {
    //     'Content-Type': 'application/json',
        
    //   };
      
    axios.post(baseurl+urlPostfix, 
        data
        // headers:headers
    )
    .then(res=> {
        console.log(res)
    })
}

//email validation

function validateEmail() {
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    let emailRegex = RegExp('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.][a-zA-Z]{2,3}){1,2}$');
    if (emailRegex.test(email.value))
        emailError.textContent = "";
    else emailError.textContent = "sorry, your user name must be between 6 and 30 character long";    
};

function validateEmptyEmail() { 
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
 
    if(email.value == "") emailError.textContent = "choose a gmail address";    
};


// name validation    

function validateName() {
    const name = document.getElementById('first-name');
    const lastname = document.getElementById('last-name');
    const nameError = document.getElementById('name-error');    

    if(name.value == "" && lastname.value == "") nameError.textContent = "Enter first and last names";
}

function validatefirstName() {
    const name = document.getElementById('first-name');
    const lastname = document.getElementById('last-name');
    const nameError = document.getElementById('name-error');    

    if(name.value == "") nameError.textContent = "Enter first name";        
}

function validatesecondName() {
    const name = document.getElementById('first-name');
    const lastname = document.getElementById('last-name');
    const nameError = document.getElementById('name-error');    

    if(lastname.value == "") nameError.textContent = "Enter second name";        
}

// password validation

function validateEmptyPassword() {  
    const pwd = document.getElementById('password');
    const confirmpassword = document.getElementById('confirm-password')
    const pwdError = document.getElementById('password-error');
    if(pwd.value == "") pwdError.textContent = "Enter a password";    
};

function validatePassword () {
    const pwd = document.getElementById('password');
    const confirmpassword = document.getElementById('confirm-password')
    const pwdError = document.getElementById('password-error');
    let pwdRegex = RegExp('^[a-zA-Z0-9]{8,}$');
    if (pwdRegex.test(pwd.value))
        pwdError.textContent = "";
    else pwdError.textContent = "use 8 character or more for your password";        
}





