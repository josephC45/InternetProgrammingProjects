<?php

session_start();
processPageRequest();

//Simply displays the search form
function displaySearchForm(){
    require_once("./templates/search_form.html");
}

//Displays all the movies related to the movie title that was typed in.
function displaySearchResults($searchString){
    $results = file_get_contents('http://www.omdbapi.com/?apikey=c9e105a7&s='.urlencode($searchString).'&type=movie&r=json');
    $array = json_decode($results, true)["Search"];
    require_once("./templates/results_form.html");
    
}

//Determines whether to display the search form again since there were no results or to display all of the movies corresponding with your search by means of a ternary operation.
function processPageRequest() {
    empty($_POST) ? displaySearchForm() : displaySearchResults($_POST['searchString']);
}

?>