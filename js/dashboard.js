// add note section toggling

var toggle = document.getElementById("toggle");
var content = document.getElementById("content");
var navState=0;

toggle.addEventListener("click", function() {
    content.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
});

// sidebar open and close section
function changeNavState(){
    if(navState==0){
        navState=1;
        openNav()
    }else{
        navState=0;
        closeNav();
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
  
  function closeNav() {
      console.log("=============");
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

// collaborator icon opening section

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

// owner email adding section in collaborator

console.log(email);

window.addEventListener('DOMContentLoaded', (event) => {
    getEmail();
});
function getEmail() {
    let email = localStorage.getItem('email');
    console.log(email);
    var nHTML = '';
    nHTML += email;
    document.getElementById("default-email").innerHTML = nHTML 
}



