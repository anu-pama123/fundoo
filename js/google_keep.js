let collabList=[];
let searchResults=[];
let displayColabList=[];
let notesList = [];

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
                    <div class="items" id="item-color" style="background-color:`+res.data.data.data[i].color+`">                                       
                      <button class="s3-btn" name="Open" style="background-color:`+res.data.data.data[i].color+`" id=`+i+` onclick="popupOpen(id);">
                        <li style="list-style-type:none">` + res.data.data.data[i].title + " "+
                        `</li>` + 
                        `<li style="list-style-type:none">` + res.data.data.data[i].description + 
                        `</li>` + 
                        `<li style="list-style-type:none">` + colString +
                        `</li>` + 
                      `</button>
                      <div class="sub-buttons">
                        <span class="material-icons-outlined">
                          add_alert
                        </span>
                        <button id="Button1" class="collaborator-button" style="background-color:`+res.data.data.data[i].color+`" value="Click" onclick="switchVisible()">
                        <span class="material-icons-outlined">
                          person_add_alt
                        </span>
                        </button>
                        <div class="btn-group dropup" id="color-palette-dropdown">
                          <button type="button" id=`+res.data.data.data[i].id+` style="background-color:`+res.data.data.data[i].color+`" onclick="addColorInDisplay(id)" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="material-icons-outlined">
                              palette
                            </span>
                          </button>
                          <div class="color-palette dropdown-menu" id ="color-palette">
                          <div class="bg-white circled"></div>
                          <div class="bg-red"></div>
                          <div class="bg-orange"></div>
                          <div class="bg-yellow"></div>
                          <div class="bg-green"></div>
                          <div class="bg-turquoise"></div>
                          <div class="bg-blue"></div>
                          <div class="bg-dark-blue"></div>
                          <div class="bg-purple"></div>
                          <div class="bg-pink"></div>
                          <div class="bg-brown"></div>
                          <div class="bg-grey"></div>
                          </div>
                          </div>

                          <span class="material-icons-outlined">
                            photo
                          </span>
                          <button class="archive-button" id=`+res.data.data.data[i].id+` style="background-color:`+res.data.data.data[i].color+`" onclick="isDisplaynoteArchive(id)">
                          <span class="material-icons-outlined">
                            archive
                          </span>  
                          </button>
                          <span class="material-icons-outlined">
                            more_vert
                          </span> 
                          <button id=`+ res.data.data.data[i].id +` style="background-color:`+res.data.data.data[i].color+`" type="button" class="delete-buttton" onclick="trashNote(id)">Delete
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

// display note section color pallet

function addColorInDisplay(id) {
  document.querySelectorAll(".color-palette div").forEach((element) => {
    element.addEventListener("click", () => {
      document.querySelectorAll(".color-palette div").forEach((element) => {
      element.classList.remove("selected-color");
    });
    element.classList.add("selected-color");
    document.getElementById("item-color").style.backgroundColor = window
    .getComputedStyle(element, null)
    .getPropertyValue("background-color");
    let rgb = document.getElementById("item-color").style.backgroundColor;
    let data = {"noteIdList": [id]};
    data["color"]='#' + rgb.slice(4,-1).split(',').map(x => (+x).toString(16).padStart(2,0)).join('');
    axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
    data, headerconfig 
    )
    .then(res=> {
    console.log(res.data);
    }) 
  });
  });
  }
  
  // archive in display note section
  
  function isDisplaynoteArchive(id) {
  let data = {
  noteIdList:[id], 
  isArchived: archive
  };
  archiveDisplayNote(data);
  // getNotes();
  }
  
  function archiveDisplayNote(data) {
  return axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes", data, headerconfig)
  }
  