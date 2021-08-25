// import {deleteNote} from './service.js';

const headerconfig = {
  headers: { 'Content-Type': 'application/json', 
  Authorization: localStorage.getItem('token')
}
};

function deleteNote(data) { 
  let baseurl = "http://fundoonotes.incubation.bridgelabz.com/api"; 
  return axios.post(`${baseurl}/notes/trashNotes`, data, headerconfig)
};

function trashNote(id) {
  let data = {
    "type": "module",
    noteIdList: [id],
    isDeleted: true,
  };
  deleteNote(data);
  getNotes();
};

window.addEventListener('DOMContentLoaded', (event) => {
  getNotes();
});

// add note method

var note = document.getElementById("user-note");
var title = document.getElementById("toggle");

function insert() {

  let data = {"title": title.value};
    data["description"] = note.value;
    axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",
    data, headerconfig 
  )
  .then(res=> {
  console.log(res+"-----------");
  console.log(res.data);
  })
  getNotes();
};

// get note method

function getNotes() {
  console.log(headerconfig)
  axios.get("http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",
  headerconfig 
  )
  .then(res=> {
    console.log(res.data)
    var nHTML = '';
    for(let i=0; i<res.data.data.data.length; i++) {
    if(res.data.data.data[i].isDeleted == false) {
    nHTML += `<div class="item-container">
                
                <div class="items"> 
                
                  <li style="list-style-type:none">` + res.data.data.data[i].title + " "+
                  `</li>` + 
                  `<li style="list-style-type:none">` + res.data.data.data[i].description + 
                  `</li>` + 
                   
                  `<button id=`+ res.data.data.data[i].id +` type="button" onclick="trashNote(id)">Delete
                  </button>
                  <div class="sub-buttons">
                    <i class="fa fa-bell-o" aria-hidden="true"></i>
                  </div>
                </div>
              </div>`;
  }
  }
  document.getElementById("item-list").innerHTML = '<ul>' + nHTML + '</ul>' ;
  })
};

// search method for collaborator

function search() {
  var email  = document.getElementById("person-email");
  if(email.value.length > 0) {
    let data = { searchWord: email.value };
    axios.post("http://fundoonotes.incubation.bridgelabz.com/api/user/searchUserList",
      data, headerconfig  
    )
    .then(res=> { 
      console.log(res + '++++++');
      console.log(res.data.details+ '--------------')


      let array=['anu.anupamacv'];
      displaySearch(array);
    })
  } 
}; 

function displaySearch(array) {
  var email  = document.getElementById("person-email");
  result_array = []
  console.log(array);
  for(let i=0; i< array.length; i++) {
    console.log(array[i])
    if(array[i].includes(email.value)) {
      result_array.push(array[i]);
    }
  }
  console.log(result_array, '++++++++++++');
}