<?php
    session_start();
    require_once '/home/common/mail.php';
    processPageRequest();
    
  function writeMovieData($array){
    $myfile = fopen("./data/cart.db","w") or die("unable to open file");
    $arrLength = count($array);
    $arrString = implode(",",$array);
    fwrite($myfile,$arrString);
    fclose($myfile);
  }

  function checkout($name, $address) {
    $cart_form_message = include("templates/cart_form.html");
    $string = $mail_message;
    $result = sendMail(385362101, $address, $name ,"Your Receipt from myMovies!", $string);
    ob_end_flush();
  }

  function readMovieData(){
    $myfile = fopen("./data/cart.db","r") or die("unable to open file");
    if($myfile !== FALSE){
      $movie_File = fgets($myfile);
      $movies = array_filter(explode(",",$movie_File)); 
    }

    return $movies;
  }

    
  function addMovieToCart($movieID){
    $movies = readMovieData();
    array_push($movies,$movieID);
    writeMovieData($movies);
    displayCart();
  }

  function processPageRequest(){
    if(empty($_GET['action'])){
      displayCart();
    }else if($_GET['action'] == 'add'){
      addMovieToCart($_GET['movie_id']);
    }else if($_GET['action'] == 'remove'){
      removeMovieFromCart($_GET['movie_id']);
    }else if($_GET['action'] == 'checkout'){
      checkout($_SESSION['display_name'], $_SESSION['email']);
    }
    
  }

  function removeMovieFromCart($movieID) {
    $movies = readMovieData();
    $key_Of_Movie_To_Remove = array_search($movieID, $movies);
    unset($movies[$key_Of_Movie_To_Remove]);
    writeMovieData($movies);
    displayCart();
  }
 	
  function displayCart(){
    $movies = readMovieData();
    require_once("templates/cart_form.html");
  }
    

?>