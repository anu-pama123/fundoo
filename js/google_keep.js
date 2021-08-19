const sidebar = document.getElementById('sidebar');
const trigger = document.getElementById('trigger');

trigger.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar--open');
  trigger.querySelectorAll('i').forEach(icon => {
    icon.classList.toggle('fa-menu');
    icon.classList.toggle('fa-times');
  });  
});

// take a note section

var notes  = [];
var titleInput  = document.getElementById("user-note");
var messageBox  = document.getElementById("display");

function insert ( ) {
  notes.push( titleInput.value );
  clearAndShow();
}

function clearAndShow () {
  // Clear our fields
  titleInput.value = "";
 
  // Show our output
  messageBox.innerHTML = ""; 
  messageBox.innerHTML += "" + notes.join();
  
}