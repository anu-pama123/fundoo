document.getElementById("icons").innerHTML =`
    <i style="list-style-type:none"><i class="fa fa-bell-o" aria-hidden="true"></i>
    <button id="Button1" class="collaborator-button" value="Click" onclick="switchVisible()"/>
    <i class="fa fa-user-plus" aria-hidden="true">
    </i>
    </button>

    <div class="btn-group dropup" id="color-palette-dropdown">
        <button type="button" id="btn-colors" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa fa-picture-o" aria-hidden="true"></i>
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
    <i class="fa fa-picture-o" aria-hidden="true"></i>
    <button class="archive-button" id="archive-button" onclick="isArchive()">
        <i class="fa fa-picture-o" aria-hidden="true"></i>       
    </button>
    <i class="fa fa-archive" aria-hidden="true"></i>
    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    <i class="fa fa-undo" aria-hidden="true"></i>
    <i class="fa fa-repeat" aria-hidden="true"></i>
    <input type="button" class="note" id="note" value="close" onclick="insert()" onclick="getEmail()" />
`

