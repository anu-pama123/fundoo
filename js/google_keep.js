const headerconfig= {
  headers: { 'Content-Type': 'application/json', 
  Authorization: localStorage.getItem('token')
}
};

let collabList=[];
let searchResults=[];
let displayColabList=[];
let notesList = [];
let updateCollabList=[];
let displayUpdateCollabList=[];
let popupCollab = [];
let selectedItem;

function trashNote(id) {
  let data = {
    "type": "module",
    noteIdList: [id],
    isDeleted: true,
  };
  postService("/notes/trashNotes", data, headerconfig);
  callGetNotes();
};


window.addEventListener('DOMContentLoaded', (event) => {
  callGetNotes();
});

// add note method

var note = document.getElementById("user-note");
var title = document.getElementById("toggle");
var archive = false;

function insert() {
    let rgb = document.getElementById("note-section").style.backgroundColor;
    let data = {"title": title.value};
      data["description"] = note.value;
      // data["isArchived"] = archive;
      if(collabList.length>0){
        data["collaberators"] = [JSON.stringify(collabList)];
      }
      if(rgb){
        data["color"] = '#' + rgb.slice(4,-1).split(',').map(x => (+x).toString(16).padStart(2,0)).join('')
      }
      postService("/notes/addNotes", data, headerconfig)
      .then(res=> {
      console.log(res.data.daa.data);
      callGetNotes();
      })
      .catch((err) => {
        console.log(err);
      })
  clearNote();
};

// get note method

function callGetNotes() {
  getService("/notes/getNotesList", headerconfig)
  .then(res=> {
    var nHTML = '';
    notesList = res.data.data.data;
    for(let i=0; i<res.data.data.data.length; i++) {
      if(res.data.data.data[i].isDeleted == false && res.data.data.data[i].isArchived == false) {
        let displayEmail = [];
        let resCollaberators =[];
        resCollaberators = res.data.data.data[i].collaborators;
        let selectedColor = res.data.data.data[i].color;
        if(resCollaberators!==undefined && resCollaberators.length>0){
          for(let j=0; j<resCollaberators.length; j++){
            displayEmail.push(resCollaberators[j].email)
        
          }
        }
        let colHTML=``;
        for(let j=0; j<displayEmail.length; j++){
          colHTML+=`<div style="list-style-type:none" class="display-email-section">`+ displayEmail[j].charAt(0)+`</div>`
        }
        nHTML += `<div class="notes" id=`+String(res.data.data.data[i].id)+`" style="background-color:`+res.data.data.data[i].color+`">
                    <div class="items" id="item-color" >                                       
                      <div class="s3-btn" name="Open"  id=`+i+` onclick="updateNotePopupOpen(id, name='update_note');">`+
                      `<li id="update-title" class="update-title"  style="list-style-type:none">` + res.data.data.data[i].title + " "+
                        `</li>` + 
                        `<li id="update-note" class="update-note" style="list-style-type:none">` + res.data.data.data[i].description + 
                        `</li>` + 
                        `<div class="display_email-section-container">
                          <div class="display-email-inner" >` + colHTML +
                          `</div>
                        </div>` + 
                      `</div>  
                      <div class="sub-buttons" id="display-buttons">
                        <span class="material-icons-outlined">
                          add_alert
                        </span>
                        <button class="collaborator-button" value="Click" id=`+i+` onclick="displayNotePopupOpen(id, name='display_note')">
                        <span class="material-icons-outlined">
                          person_add_alt
                        </span>
                        </button>
                        <div class="btn-group dropup" id="color-palette-dropdown">
                          <span type="button" id=`+i+`  onclick="setSelectedItem(id)" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="material-icons-outlined">
                              palette
                            </span>
                          </span>
                          <div class="color-palette dropdown-menu" id ="color-palette">
                          <div class="bg-white circled" onclick="addColorInDisplay('white')"></div>
                          <div class="bg-red" onclick="addColorInDisplay('red')"></div>
                          <div class="bg-orange" onclick="addColorInDisplay('orange')"></div>
                          <div class="bg-yellow" onclick="addColorInDisplay('yellow')"></div>
                          <div class="bg-green" onclick="addColorInDisplay('green')"></div>
                          <div class="bg-turquoise" onclick="addColorInDisplay('turquoise')"></div>
                          <div class="bg-blue" onclick="addColorInDisplay('blue')"></div>
                          <div class="bg-dark-blue" onclick="addColorInDisplay('dark-blue')"></div>
                          <div class="bg-purple" onclick="addColorInDisplay('purple')"></div>
                          <div class="bg-pink" onclick="addColorInDisplay('pink')"></div>
                          <div class="bg-brown" onclick="addColorInDisplay('brown')"></div>
                          <div class="bg-grey" onclick="addColorInDisplay('grey')"></div>
                          </div>
                          </div>
                          <span class="material-icons-outlined">
                            photo
                          </span>
                          <button class="archive-button" id=`+res.data.data.data[i].id+` onclick="isDisplaynoteArchive(id)">
                          <span class="material-icons-outlined">
                            archive
                          </span>  
                          </button>
                          
                          <button id=`+ res.data.data.data[i].id +` type="button" class="delete-buttton" onclick="trashNote(id)">
                            <span class="material-icons-outlined">
                              delete
                            </span>
                          </button>
                          </div>
                          </div> 
                     </div>     
                              
                        `;
      }
    }
    document.getElementById("item-list").innerHTML = nHTML;
    // document.getElementById("item-list").backgroundColor = selectedColor;
  })
  .catch((err) => {
    console.log(err);
  })
}

// search method for collaborator

function search() {
  var email  = document.getElementById("search-email");
  var nHTML = '';
  if(email.value.length > 2) {
    let data = { searchWord: email.value };
    postService("/user/searchUserList", data, headerconfig)
    .then(res=> { 
      searchResults = res.data.data.details;
      for(let i=0; i< res.data.data.details.length; i++) {
        nHTML += ` <li style="list-style-type:none"><div id="`+ i +`" onclick=addToCollabaratorList(id) >` + res.data.data.details[i].email+
          `</div> </li>`;
      }
      document.getElementById("colab-list").innerHTML = '<ul>' + nHTML + '</ul>' ;
    })
    .catch((err) => {
      console.log(err);
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
    val+=`<div style="list-style-type:none" class="display-email-section">`+ displayColabList[i]+`</div>`
  }
  colab.innerHTML = val;
}

function isArchive() {
  archive = !archive;
}

// display note section popup Open method

function displayNotePopupOpen(i, name='display_note') {
   document.getElementById("popup").style.display="block";
   document.getElementById("popup-collab-inner").style.display="block";
  document.getElementById("popup-inner-content").style.display="none";
  document.getElementById("overlay").style.display="block";
  
  popupOpen(i);
}

function updateNotePopupOpen(i, name='update_note') {
  document.getElementById("popup").style.display="block";
  document.getElementById("overlay").style.display="block";
  document.getElementById("popup-collab-inner").style.display="none";
  popupOpen(i);
}

function popupOpen(i){
  selectedItem = notesList[i];
  console.log(selectedItem);
  let colHTML=``;
  for(let i=0; i<selectedItem.collaborators.length; i++) {
    colHTML+=`<div style="list-style-type:none" class="display-email-section">`+ selectedItem.collaborators[i].email.charAt(0)+`</div>`
  }
  popupCollab = selectedItem.collaborators;
  var nHTML = '';
  nHTML += `                                                          
           <input type="text" class="popup-title" autocomplete="off" placeholder="`+ selectedItem.title + " "+`" class="popup-title" id="popup-title">` + 
          `</input>` + 
          `<input type="text" class="popup-note" autocomplete="off" placeholder="`+ selectedItem.description + `" class="popup-description" id="popup-description">` + 
          `</input>` +   
           `<div type="button" class="popup-collab" id="popup-collab-section"> `+colHTML +`</div>
            <div class="btn-group dropup" id="popup-palette-dropdown">
                          <span class="material-icons-outlined">
                            add_alert
                          </span>
                          <span class="material-icons-outlined" onclick="collabSwitchVisible()" >
                            person_add_alt
                          </span> 
                          <span type="button" id=`+selectedItem.id+` onclick="addColorInUpdate(id)" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="background-color:inherit">
                            <span id="popup-pallet" class="material-icons-outlined">
                              palette
                            </span>
                          </span>
                          <div class="color-palette dropdown-menu" id ="color-palette">
                          <div class="bg-white circled" onclick="addColorInDisplay('white')"></div>
                          <div class="bg-red" onclick="addColorInDisplay('red')"></div>
                          <div class="bg-orange" onclick="addColorInDisplay('orange')"></div>
                          <div class="bg-yellow" onclick="addColorInDisplay('yellow')"></div>
                          <div class="bg-green" onclick="addColorInDisplay('green')"></div>
                          <div class="bg-turquoise" onclick="addColorInDisplay('turquoise')"></div>
                          <div class="bg-blue" onclick="addColorInDisplay('blue')"></div>
                          <div class="bg-dark-blue" onclick="addColorInDisplay('dark-blue')"></div>
                          <div class="bg-purple" onclick="addColorInDisplay('purple')"></div>
                          <div class="bg-pink" onclick="addColorInDisplay('pink')"></div>
                          <div class="bg-brown" onclick="addColorInDisplay('brown')"></div>
                          <div class="bg-grey" onclick="addColorInDisplay('grey')"></div>
                          </div>
                          
            <span class="material-icons-outlined">
              photo
            </span>
            <span class="material-icons-outlined" id="popup-archive">
              archive
            </span>  
            <span class="material-icons-outlined">
              more_vert
            </span> 
              <span class="popup-close" id="`+ selectedItem.id + `" onclick="addPopupNotes(id), popupClose();" >close
              </span>
            </span>`+ 
          
       `
                  
  `
  console.log(selectedItem.id);
  document.getElementById("popup-inner-content").innerHTML = nHTML; 
  document.getElementById("popup").style.backgroundColor = selectedItem.color;
}

// display note section Popup Close method

function popupClose(){
  document.getElementById("popup").style.display="none";
  document.getElementById("overlay").style.display="none";
}

// display note section color pallet

function setSelectedItem(i){
  selectedItem = notesList[i];
}

function addColorInDisplay(color) {
  let colorMap = {
    'white': "#ffffff",
    'red' : "#ffc0cb", 
    'orange' : "#ffa500", 
    'yellow' : "#ffff00", 
    'green' : "#00ff00",
    'turquoise' : "#40e0d0",
    'blue' : "#0000ff", 
    'purple' : " #800080", 
    'pink' : " #ffc0cb", 
    'brown' : " #a52a2a", 
    'grey' : "#bbbbbb"
    }
  console.log("=================",color);
  let id = selectedItem.id;
  console.log(id)
  console.log(colorMap[color]);
  document.getElementById(String(id)).style.backgroundColor = color;
  let data = {"noteIdList": [id]};
  data["color"] = colorMap[color];
  postService("/notes/changesColorNotes", data, headerconfig)
  .then(res=> {
  console.log(res.data);
  }) 
  .catch((err) => {
    console.log(err);
  })
  callGetNotes();
}

function addColorInUpdate(id) {
  document.querySelectorAll(".color-palette div").forEach((element) => {
    element.addEventListener("click", () => {
      document.querySelectorAll(".color-palette div").forEach((element) => {
      element.classList.remove("selected-color");
    });
    element.classList.add("selected-color");
    document.getElementById("popup").style.backgroundColor = window
    .getComputedStyle(element, null)
    .getPropertyValue("background-color");
    let rgb = document.getElementById("item-color").style.backgroundColor;
    let data = {"noteIdList": [id]};
    data["color"]='#' + rgb.slice(4,-1).split(',').map(x => (+x).toString(16).padStart(2,0)).join('');
    postService("/notes/changesColorNotes", data, headerconfig)
    .then(res=> {
    console.log(res.data);
    }) 
    .catch((err) => {
      console.log(err);
    })
    callGetNotes();
  });
  });
}
  
// archive in display note section
  
function isDisplaynoteArchive(id) {
  let data = {
  noteIdList:[id], 
  isArchived: true
  };
  postService("/notes/archiveNotes",data, headerconfig);
  callGetNotes();
}

// popup update note section

function addPopupNotes(i) {
  var popupTitle = document.getElementById("popup-title");
  var popupNote = document.getElementById("popup-description");
  
  let data = {"noteId": i};
  data["title"] = popupTitle.value;
  data["description"] = popupNote.value;
  // data["collaborators"] = [JSON.stringify(popupCollab)];
  console.log(data)
  postService("/notes/updateNotes", data, headerconfig )
  .then(res=> {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  })
  callGetNotes();
}

//popup update color section

function clearNote() {
  location.reload(); 
}

// search method for collaborator

function popupSearch() {
  var email  = document.getElementById("popup-search-email");
  var nHTML = '';
  if(email.value.length > 2) {
    let data = { searchWord: email.value };
    postService("/user/searchUserList", data, headerconfig)
    .then(res=> { 
      searchResults = res.data.data.details;
      for(let i=0; i< res.data.data.details.length; i++) {
        nHTML += ` <li style="list-style-type:none"><div id="`+ i +`" onclick=addToUpdateCollabaratorList(id) >` + res.data.data.details[i].email+
          `</div> </li>`;
      }
      document.getElementById("popup-collab-list").innerHTML = '<ul>' + nHTML + '</ul>' ;
    })
    .catch((err) => {
      console.log(err);
    })
  } 
}; 

// method for adding collaborator in update note

function updateNoteCollaborator() {
  collabSwitchVisible();
  displayUpdateCollabListInMain();
  updateCollabListInMain()
}

function addToUpdateCollabaratorList(i){
  popupCollab.push(searchResults[i])
}

function displayUpdateCollabInCollab () {
  
  var colab  = document.getElementById("popup-search-email");
  let colHTML=``;
  for(let i=0; i<popupCollab.length; i++) {
    colHTML+=`<div style="list-style-type:none" class="display-email-section">`+ popupCollab[i].email+`</div>`
  }
  colab.innerHTML = colHTML;
  
}


function displayUpdateCollabListInMain(){
  var colab  = document.getElementById("popup-collab-section");
  let colHTML=``;
  for(let i=0; i<popupCollab.length; i++) {
    colHTML+=`<div style="list-style-type:none" class="display-email-section">`+ popupCollab[i].email.charAt(0)+`</div>`
  }
  colab.innerHTML = colHTML;
}

function updateCollabListInMain(i) {
  let data = selectedItem;
  data.collaborators = popupCollab
  // data["collaborators"] = [JSON.stringify(popupCollab)];
  postService("/notes/"+selectedItem.id+"/AddcollaboratorsNotes", data, headerconfig )
  .then(res=> {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  })
  callGetNotes();
}
