<?php

session_start(); // Connect to the existing session
require_once '/home/common/dbInterface.php'; // Add database functionality
processPageRequest(); // Call the processPageRequest() function


function createMessage($movieID){
    $movie = getMovieData($movieID);
    ob_start(); // Create an output buffer
    require_once './templates/movie_info.html';
    $message = ob_get_contents(); // Get the contents of the output buffer
    ob_end_clean(); // Clear the output buffer
    echo $message;
}

function processPageRequest(){
    if(!isset($_SESSION['display_name'])){
        header("location: ./logon.php");
    }
    if($_GET){
        $movieID = $_GET['movie_id'];
        if(isset($_GET['movie_id'])){
            createMessage($movieID);
        }
    }
    else{
       createMessage(0);
    }
}

?>