// if(document.getElementById("email")!=null){
//     const username=form2.value.trim();
 if(username===''){
    $("#email-error").text('Please enter a value');
}else if(isUsername(username)){
    $("#email-error").text('match');
}else{
     $("#email-error").text('Enter a valid input');
}
