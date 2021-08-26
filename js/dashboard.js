// add note section toggling

var toggle = document.getElementById("toggle");
var content = document.getElementById("content");

toggle.addEventListener("click", function() {
    content.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
});

// sidebar open and close section

const sidebar = document.getElementById('sidebar');
const trigger = document.getElementById('trigger');

trigger.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--open');
    trigger.querySelectorAll('i').forEach(icon => {
        icon.classList.toggle('fa-menu');
        icon.classList.toggle('fa-times');
    }); 
});

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



