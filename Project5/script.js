function addMovie(movieID){
    window.location.replace("./index.php?action=add&movie_id=" + movieID);
    return true;
}

function validateCreateAccountForm(){
    let flag = true;
    let email_value = document.getElementById("email_address").value.split("");
    let confirm_email_value = document.getElementById("confirm_address").value.split("");
    let username_value = document.getElementById("username").value.split("");
    let password_value = document.getElementById("password").value.split("");
    let confirm_password_value = document.getElementById("confirm_password").value.split("");
        
    for(var i = 0; i < 15; i++){
        if(email_value[i] === ' ' || confirm_email_value[i] === ' ' || username_value[i] === ' ' || password_value[i] === ' ' || confirm_password_value[i] === ' '){
            alert("Spaces were found in your values. Pls revise");
            flag = false;
            return flag;
        }   
    }
    
    if(document.getElementById("email_address").value != document.getElementById("confirm_address").value){
        alert("Email and Confirm Email do not match.");
        return false;
    }

    else if(document.getElementById("password").value != document.getElementById("confirm_password").value){
        alert("Password and Confirm Password do not match");
        return false;
    }
    
    return flag;
}

function validateResetPasswordForm(){
    let bool_flag = true;
    let reset_password = document.getElementById("password").value.split("");
    let confirm_reset_password = document.getElementById("confirm_password").value.split("");

    for(let i = 0; i < 15; i++){
        if(reset_password[i] === ' ' || confirm_reset_password[i] === ' '){
            alert("Spaces are not allowed in passwords.");
            bool_flag = false;
            return bool_flag;
        }
    }

    if(document.getElementById("password").value != document.getElementById("confirm_password").value){
        alert("Both, password and confirm password do not match.");
        bool_flag = false;
        return bool_flag;
    }

    return bool_flag;
}

function confirmRemove(title,movieID){
    let removeMoviePrompt = confirm("You are about to remove " + title);
    if (removeMoviePrompt) {
        window.location.replace("./index.php?action=remove&movie_id=" + movieID);
        return true;
    } else {
        return false;
    }
}

function confirmCheckout(){
    let checkoutPrompt = confirm("You are agreeing to checkout from myMovies Xpress.");
    if (checkoutPrompt) {
        window.location.replace("./index.php?action=checkout");
        return true;
    } else {
        return false;
    }
}

function confirmLogout(){
    let logoutPrompt = confirm("You are now logging off of myMovies Xpress.");
    if (logoutPrompt) {
        window.location.replace("./logon.php?action=logoff");
        return true;
    } else {
        return false;
    }
}

function confirmCancel(form){
    let cancelPrompt = confirm("Do you wish to cancel/exit out of this page?");
    if(cancelPrompt && (form === 'create' || form === 'forgot' || form === 'reset')){
        window.location.replace("./logon.php");
        return true;
    }else if(cancelPrompt && form === 'search'){
        window.location.replace("./index.php");
        return true;
    }
    else{
        return false;
    }
}

function changeMovieDisplay(){
    let neededElement = document.getElementById("select_order");
    let elementValue = neededElement.options[neededElement.selectedIndex].value;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        document.getElementById("shopping_cart").innerHTML= this.responseText;
    }
    xmlhttp.open("GET", "./index.php?action=update&order=" + elementValue, true);
    xmlhttp.send();
}

function displayMovieInformation(movieID){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        document.getElementById("modalWindowContent").innerHTML= this.responseText;
        showModalWindow();
    }
    xmlhttp.open("GET", "./movieinfo.php?movie_id=" + movieID, true);
    xmlhttp.send();
}

function showModalWindow()
{
    var modal = document.getElementById('modalWindow');
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() 
    { 
        modal.style.display = "none";
    }

    window.onclick = function(event) 
    {
        if (event.target == modal) 
        {
            modal.style.display = "none";
        }
    }
 
    modal.style.display = "block";
}

