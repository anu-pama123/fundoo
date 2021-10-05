// add note section toggling

var toggle = document.getElementById("toggle");
var content = document.getElementById("content");
var navState=0;

toggle.addEventListener("click", function() {
    content.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
});

function noteSwitchVisible() {
    if (document.getElementById('Div1')) {

        if (document.getElementById('Div1').style.display == 'none') {
            document.getElementById('Div1').style.display = 'block';
            document.getElementById('Div2').style.display = 'none';
        }
        else {
            document.getElementById('Div1').style.display = 'none';
            document.getElementById('Div2').style.display = 'block';
        }
    } 
}
// side bar opening and closing method

function openNav() {
    console.log(document.getElementById("mySidenav").style.width)
    document.getElementById("mySidenav").style.width =document.getElementById("mySidenav").style.width==="250px"?"0px":"250px";
    document.getElementById("main").style.marginLeft =document.getElementById("main").style.marginLeft==="250px"?"0px":"250px";
    // document.getElementById("item-list").style.width="100%";
    // document.getElementById("Div1").style.width="100%"
    // document.getElementById("Div1").style.width="80%"

}
    
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    // document.getElementById("Div1").style.width="80%"
}

// collaborator icon opening method

function switchVisible() {
    if (document.getElementById('Div1')) {

        if (document.getElementById('Div1').style.display == 'none') {
            document.getElementById('Div1').style.display = 'block';
            document.getElementById('Div2').style.display = 'none';
        }
        else {
            document.getElementById('Div1').style.display = 'none';
            document.getElementById('Div2').style.display = 'block';
        }
    }
}

// update note collaborator opening method

function collabSwitchVisible() {
    if (document.getElementById('popup-collab-section')) {

        if (document.getElementById('popup-inner-content').style.display == 'none') {
            document.getElementById('popup-inner-content').style.display = 'block';
            document.getElementById('popup-collab-inner').style.display = 'none';
        }
        else {
            document.getElementById('popup-inner-content').style.display = 'none';
            document.getElementById('popup-collab-inner').style.display = 'block';
        }
    }
}

// owner email adding section in collaborator

console.log(email);

window.addEventListener('DOMContentLoaded', (event) => {
    getEmail();
    getFirstName(); 
});

function getEmail() {
    let email = localStorage.getItem('email');
    var nHTML = '';
    nHTML += email;
    document.getElementById("default-email").innerHTML = nHTML 
    document.getElementById("popup-default-email").innerHTML = nHTML 
    document.getElementById("signout-default-email").innerHTML = nHTML 
}

function getFirstName() {
    let name = localStorage.getItem('firstName');
    var nHTML = '';
    nHTML += name;
    document.getElementById("signout-default-name").innerHTML = nHTML 
}

function clearAccount() {
    let account = localStorage.clear();
}





