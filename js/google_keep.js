// import {deletessssNote} from './service.js';
const headerconfig = {
  headers: { 'Content-Type': 'application/json', 
              Authorization: localStorage.getItem('token')
          }
};
window.addEventListener('DOMContentLoaded', (event) => {
getNotes();

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

var note  = document.getElementById("user-note");
var title = document.getElementById("toggle");

// add note method

function insert() {
  let data = {"title": title.value};
  data["description"] = note.value;
  console.log(headconfig)
  axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",
    data, headerconfig  
  )
  .then(res=> {
    console.log(res)
  })
  getNotes();
};

// get note method

function getNotes() {
  axios.get("http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",
    headerconfig  
  )
  .then(res=> {
    console.log(res.data)
    var nHTML = '';
    for(let i=0; i<res.data.data.data.length; i++){
      nHTML += `<div class="item-container"><div class="items"> <li style="list-style-type:none">` + res.data.data.data[i].title
       + "      "+`</li>` +  `<li style="list-style-type:none">` +  res.data.data.data[i].description + `</li>` + `<button id=`+ res.data.data.data[i].id +` type="button" onclick="trashNote(id=this.id)">Delete</button></div></div>`;
    }
    document.getElementById("item-list").innerHTML = '<ul>' + nHTML + '</ul>'  
  })
};

// delete note method

// function deleteNote(id){
//   let userId = localStorage.getItem('userId');
//   console.log(userId);
//   console.log(id);
//   axios.delete("http://fundoonotes.incubation.bridgelabz.com/api/user/"+userId+"/notes/"+id,
//     headers  
//   )
// };

function trashNote(id) {
  console.log(id,"hello")
  let data = {
    noteIdList: [id],
    isDeleted: true,
  };
  service.deleteNote(data);
}

}) // doc