document.getElementById("icons").innerHTML =`
    <span class="material-icons-outlined">
        add_alert
    </span>
    <button id="Button1" class="collaborator-button" value="Click" onclick="switchVisible()"/>
        <span class="material-icons-outlined">
            person_add_alt
        </span>
    </button>
    
    <div class="btn-group dropup" id="color-palette-dropdown">
        <span type="button" id="btn-colors" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="material-icons-outlined">
                palette
            </span>
        </span>
        <div class="color-palette dropdown-menu" id ="color-palette">
            <div class="bg-white circled" onclick="addColorInAddnote('white')"></div>
            <div class="bg-red" onclick="addColorInAddnote('red')"></div>
            <div class="bg-orange" onclick="addColorInAddnote('orange')"></div>
            <div class="bg-yellow" onclick="addColorInAddnote('yellow')"></div>
            <div class="bg-green" onclick="addColorInAddnote('green')"></div>
            <div class="bg-turquoise" onclick="addColorInAddnote('turquoise')"></div>
            <div class="bg-blue" onclick="addColorInAddnote('blue')"></div>
            <div class="bg-dark-blue" onclick="addColorInAddnote('dark-blue')"></div>
            <div class="bg-purple" onclick="addColorInAddnote('purple')"></div>
            <div class="bg-pink" onclick="addColorInAddnote('pink')"></div>
            <div class="bg-brown" onclick="addColorInAddnote('brown')"></div>
            <div class="bg-grey" onclick="addColorInAddnote('grey')"></div>
        </div>
    </div>
    <span class="material-icons-outlined">
        photo
    </span>

    <button class="archive-button" id="archive-button" onclick="isArchive()">
        <span class="material-icons-outlined">
            archive
        </span>     
    </button>
    
    <span class="material-icons-outlined">
        more_vert
    </span>
    <span class="note-closing">
    <input type="button" class="note" id="note-close" value="close" onclick="insert()" onclick="getEmail()"/>
    </span>
`

let colorMap = {
    'white': "#ffffff",
    'red' : "#f28b82", 
    'orange' : "#fbbc04",
    'yellow' : "#fff475", 
    'green' : "#ccff90", 
    'turquoise' : "#a7ffeb",
    'blue' : "#cbf0f8",
    'dark-blue' : "#aecbfa", 
    'purple' : "#d7aefb", 
    'pink' : "#fdcfe8", 
    'brown' : "#e6c9a8", 
    'grey' : "#e8eaed"
}

function addColorInAddnote(color) {
    selectedColor=colorMap[color];
    console.log(selectedColor);
    document.getElementById("note-section").style.backgroundColor = selectedColor;
}