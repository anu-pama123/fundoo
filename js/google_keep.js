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
}

// take a note section

// var note  = document.getElementById("note");
// var title = document.getElementById("toggle")

// function insert ( ) {
  
// axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes", {
//   data: {
//     "title": title.value,
//    "description" : note.value
//   }
// })
// .then(res=> {
//   console.log(res)
// })
// }
let notesList = [];

var note  = document.getElementById("user-note");
var title = document.getElementById("toggle")
// const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': localStorage.getItem('token')
// };

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
}

function getNotes() {
  axios.get("http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",
    headers  
  )
  .then(res=> {
    console.log(res.data.data.data);
    notesList = res.data.data.data;
  })
  console.log("---------");
  const list = document.getElementById("12345");
  const listContainer = document.getElementById("test123")
  function makeElem(item, index){
    const {title, description} = item;
    let li = document.createElement('li');
    li.innerHTML = `<strong>title:</strong> ${title}<br><strong>description:</strong> ${description}`;
    return li;
  }
  const listFragment = document.createDocumentFragment();
  for (var i = 0; i < notesList; i++){
    try {
      const listElement = makeElem(notesList[i], i);
      listFragment.append(listElement);
  } catch (Error) {
      console.log(Error);
  }
  }
  // notesList.forEach(item, index => {
  //   try {
  //     const listElement = makeElem(item, index);
  //     listFragment.append(listElement);
  // } catch (Error) {
  //     console.log(Error);
  // }
  // });
  listContainer.append(listFragment);
  list.append(listContainer);
}

// window.onload = getNotes();


// var notes  = [];
// var titleInput  = document.getElementById("user-note");
// var messageBox  = document.getElementById("display");

// function insert ( ) {
//   notes.push( titleInput.value );
//   clearAndShow();
// }

// function clearAndShow () {
//   // Clear our fields
//   titleInput.value = "";
 
//   // Show our output
//   messageBox.innerHTML = ""; 
//   messageBox.innerHTML += "" + notes.join();
  
// }