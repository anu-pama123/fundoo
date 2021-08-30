let collabList=[];
let searchResults=[];
let displayColabList=[];
let notesList = [];
// let archive = false;

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
var archive =document.getElementById("archive-button");

function insert() {
  let rgb = document.getElementById("note-section").style.backgroundColor;
  let data = {"title": title.value};
    data["description"] = note.value;
    data["collaberators"] = collabList;
    data["isArchived"] = archive;
    data["color"] = '#' + rgb.slice(4,-1).split(',').map(x => (+x).toString(16).padStart(2,0)).join('')
    axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",
    data, headerconfig 
  )
  .then(res=> {
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
    var nHTML = '';
    notesList = res.data.data.data;
    for(let i=0; i<res.data.data.data.length; i++) {
      if(res.data.data.data[i].isDeleted == false) {
        let colString ="";
        for(let j=0; j<res.data.data.data[i].collaborators.length; j++){
          colString += res.data.data.data[i].collaborators[i].email, " ,";
        }
        nHTML += `<div class="item-container" >
                    <div class="items" style="background-color:`+res.data.data.data[i].color+`">                                       
                      <button class="s3-btn" name="Open" style="background-color:`+res.data.data.data[i].color+`" id=`+i+` onclick="popupOpen(id);">
                        <li style="list-style-type:none">` + res.data.data.data[i].title + " "+
                        `</li>` + 
                        `<li style="list-style-type:none">` + res.data.data.data[i].description + 
                        `</li>` + 
                        `<li style="list-style-type:none">` + colString +
                        `</li>` + 
                      `</button>
                      <div class="sub-buttons">
                        <i class="fa fa-bell-o" aria-hidden="true"></i>
                        <button id="Button1" class="collaborator-button" value="Click" onclick="switchVisible()">
                          <i class="fa fa-user-plus" aria-hidden="true">
                          </i>
                        </button>
                        <i class="fa fa-picture-o" aria-hidden="true"></i>
                        <i class="fa fa-archive" aria-hidden="true"></i>
                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i> 
                        <button id=`+ res.data.data.data[i].id +` type="button" class="delete-buttton" onclick="trashNote(id)">Delete
                        </button>
                      </div>
                    </div>                      
                  </div>                                
                `;
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
      searchResults = res.data.data.details;
      for(let i=0; i< res.data.data.details.length; i++) {
        nHTML += ` <li style="list-style-type:none"><div id="`+ i +`" onclick=addToCollabaratorList(id) >` + res.data.data.details[i].email+
          `</div> </li>`;
      }
      document.getElementById("colab-list").innerHTML = '<ul>' + nHTML + '</ul>' ;
    })
  } 
}; 

// add collaborator in collaborator page method

function addCollaborator() {
  let email = document.getElementById("search-email").value;
  console.log(email);
  var nHTML = '';
    nHTML += email;
    document.getElementById("collab-email").innerHTML = nHTML
};

// method for adding collaborator in addnote 

function addNoteCollaborator() {
  switchVisible();
  displayCollabListInMain();
}

function addToCollabaratorList(i){
  collabList.push(searchResults[i])
  let selectedEmail = searchResults[i].email;
  displayColabList.push(selectedEmail[0]);
}

function displayCollabListInMain(){
  var colab  = document.getElementById("addnote-collab-h");
  let val ="";
  for(let i=0; i< displayColabList.length; i++){
    val += displayColabList[i] + '   ';
  }
  colab.innerHTML = val;
}

function isArchive() {
  archive = !archive;
}

isArchive();

// display note section popup Open method

function popupOpen(i){
  let selectedItem = notesList[i];
  console.log(selectedItem)
  document.getElementById("popup").style.display="block";
  document.getElementById("overlay").style.display="block";
  var nHTML = '';
  nHTML += `                                                             
    <button class="s3-btn" name="Open" style="background-color:`+selectedItem.color+`" id=`+i+` onclick="popupOpen(id);">
      <li style="list-style-type:none">` + selectedItem.title + " "+
      `</li>` + 
      `<li style="list-style-type:none">` + selectedItem.description + 
      `</li>` + 
      
    `</button>
    <div class="sub-buttons">
      <i class="fa fa-bell-o" aria-hidden="true"></i>
      <button id="Button1" class="collaborator-button" value="Click" onclick="switchVisible()">
        <i class="fa fa-user-plus" aria-hidden="true">
        </i>
      </button>
      <i class="fa fa-picture-o" aria-hidden="true"></i>
      <i class="fa fa-archive" aria-hidden="true"></i>
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i> 
      <button id=`+ selectedItem.id +` type="button" class="delete-buttton" onclick="trashNote(id)">Delete
      </button>
    </div>                  
  `
  document.getElementById("popup-inner-content").innerHTML = nHTML;  
}

// display note section Popup Close method

function popupClose(){
  document.getElementById("popup").style.display="none";
  document.getElementById("overlay").style.display="none";
}

