<?php
    session_start(); // Connect to the existing session
    require_once '/home/common/mail.php'; // Add email functionality
    require_once '/home/common/dbInterface.php'; // Add database functionality
    processPageRequest(); // Call the processPageRequest() function
    
  function checkout($name, $address) {
    $checkout_message = displayCart(true);
    $email = sendMail(385362101, $address, $name ,"Receipt from myMovies",$checkout_message); 
    var_dump($email);
  }

  function addMovieToCart($movieID){
    $existing_movies = movieExistsInDB($movieID);
    if($existing_movies == 0){
      $movie = file_get_contents('http://www.omdbapi.com/?apikey=c9e105a7&i='.$movieID.'&type=movie&r=json');
      $array = json_decode($movie, true);
      $movie_that_needs_adding = addMovie($array['imdbID'],$array['Title'],$array['Year'], $array['Rating'], $array['Runtime'],$array['Genre'], $array['Actors'], $array['Director'], $array['Writer'], $array['Plot'], $array['Poster']);
    }
    addMovieToShoppingCart($_SESSION['userId'],$movie_that_needs_adding);
    echo displayCart();
  }

  function processPageRequest(){
    if(!isset($_SESSION['display_name'])){
      header("location: ./logon.php");
    }
    
    if($_GET){
      $display_name = $_SESSION['display_name'];
      $email_address = $_SESSION['email_address'];
      $movieID = $_GET['movie_id'];

      if(isset($_GET['action'])){
        if($_GET['action'] == 'add'){
          addMovieToCart($movieID);
          echo displayCart();
        }
        else if($_GET['action'] == 'checkout'){
          checkout($display_name,$email_address);
        }
        else if($_GET['action'] == 'remove'){
          removeMovieFromCart($movieID);
          echo displayCart();
        }
        else if($_GET['action'] == 'update'){
	  $order = $_GET['order'];
          updateMovieListing($order);
        }
      }
    }
    else{
      echo displayCart();
    }
    
  }

  function removeMovieFromCart($movieID) {
   removeMovieFromShoppingCart($_SESSION['userId'],$movieID);
   echo displayCart();
  }

  function updateMovieListing($order){
    $_SESSION['order'] = $order;
    $movie_list = createMovieList(false);
    echo $movie_list;
  }

  function createMovieList($forEmail=false){
    if(isset($_SESSION['order'])){
      $movieIDArray = getMoviesInCart($_SESSION['userId'],$_SESSION['order']);
    }
    else{
      $movieIDArray = getMoviesInCart($_SESSION['userId']);
    }
    ob_start();                                 // create output buffer
    require_once './templates/movie_list.html';
    $message = ob_get_contents();              // Get the contents of the output buffer
    ob_end_clean();
    return $message;                        // clear the output buffer
  }
 	
  function displayCart($forEmail=false){
    $moviesInCart = countMoviesInCart($_SESSION['userId']);
    $movie_list = createMovieList($forEmail);
    ob_start();                              // Create an output buffer
    require_once './templates/cart_form.html';
    $message = ob_get_contents();           // Get the contents of the output buffer
    ob_end_clean();                        // Clear the output buffer
    return $message;
  }
    

?>