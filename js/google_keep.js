// add note section toggling

var toggle  = document.getElementById("toggle");
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

const headers = {
    headers: { 'Content-Type': 'application/json', 
    Authorization: localStorage.getItem('token')
  }
};

var note  = document.getElementById("user-note");
var title = document.getElementById("toggle");

// add note method

function insert ( ) {
  let data = {"title": title.value};

  data["description"] = note.value;
  console.log(headers)
  axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",
    data, headers  
  )
  .then(res=> {
    console.log(res)
  })
  getNotes();
};

// get note method

function getNotes() {
  axios.get("http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",
    headers  
  )
  .then(res=> {
    console.log(res.data)
    var nHTML = '';
    for(i=0; i<res.data.data.data.length; i++){
      nHTML += `<li>` + res.data.data.data[i].title
       + "      "+  res.data.data.data[i].description + `</li>` + `<button id=`+ res.data.data.data[i].id +` type="button" onclick="deleteNote(id=this.id)">Delete</button>`;
    }
    document.getElementById("item-list").innerHTML = '<ul>' + nHTML + '</ul>'  
  })
};

// delete note method

function deleteNote(id){
  let userId = localStorage.getItem('userId');
  axios.delete("http://fundoonotes.incubation.bridgelabz.com/api/user/"+userId+"/notes/"+id,
    headers  
  )
};