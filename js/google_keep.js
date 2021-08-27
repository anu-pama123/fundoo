// import {deleteNote} from './service.js';

let collabList=[];

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
    data["description"] = note.value
    data[""]
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
          <button id="Button1" class="collaborator-button" value="Click" onclick="switchVisible()"/>
            <i class="fa fa-user-plus" aria-hidden="true">
            </i>
          </button> 
          <i class="fa fa-picture-o" aria-hidden="true"></i>
          <i class="fa fa-archive" aria-hidden="true"></i>
          <i class="fa fa-ellipsis-v" aria-hidden="true"></i> 
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
  console.log('search-----------')
  var email  = document.getElementById("search-email");
  var nHTML = '';
  if(email.value.length > 2) {
    let data = { searchWord: email.value };
    axios.post("http://fundoonotes.incubation.bridgelabz.com/api/user/searchUserList",
      data, headerconfig  
    )
    .then(res=> { 
      var array = res.data.data.details;
      for(let i=0; i< res.data.data.details.length; i++) {
        console.log(array[i])
        nHTML += ` <li style="list-style-type:none"><div id="`+ res.data.data.details[i].email +`" onclick=addToCollabaratorList(id) >` + res.data.data.details[i].email+
          `</div> </li>`;
      }
      document.getElementById("colab-list").innerHTML = '<ul>' + nHTML + '</ul>' ;
    })
  } 
}; 

// add collaborator in collaborator page method

function addCollaborator() {
  var x = 0;
  let email = document.getElementById("search-email").value;
  console.log(email);
  var nHTML = '';
    nHTML += email;
    document.getElementById("collab-email").innerHTML = nHTML
};

// method for adding collaborator in addnote 

function addNoteCollaborator() {
  switchVisible();
  let email = document.getElementById("search-email").value;
  displayCollabListInMain();
}


function addToCollabaratorList(selectedEmail){
  collabList.push(selectedEmail)
  console.log(selectedEmail);
}

function displayCollabListInMain(){
  var colab  = document.getElementById("addnote-collab-h");
  let val ="";
  for(let i=0; i< collabList.length; i++){
    val += collabList[i] + ', ';
  }
  colab.innerHTML = val;
}
