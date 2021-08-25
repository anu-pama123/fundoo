document.getElementById("icons").innerHTML =`
    <i style="list-style-type:none"><i class="fa fa-bell-o" aria-hidden="true"></i>
    <button id="Button1" class="collaborator-button" value="Click" onclick="switchVisible()"/>
    <i class="fa fa-user-plus" aria-hidden="true">
    </i>
    </button>
    <i class="fa fa-picture-o" aria-hidden="true"></i>
    <i class="fa fa-archive" aria-hidden="true"></i>
    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    <i class="fa fa-undo" aria-hidden="true"></i>
    <i class="fa fa-repeat" aria-hidden="true"></i>
    <input type="button" class="note" id="note" value="close" onclick="insert()" onclick="getEmail()" />
`
