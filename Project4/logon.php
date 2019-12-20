<?php
    processPageRequest();
    
    function authenticateUser($username,$password){
        $myfile = fopen("./data/credentials.db","r") or die("unable to open file");
        $aquired_file = fgets($myfile);
        $credential_array = explode(",",$aquired_file);
        if($username == $credential_array[0] && $password == $credential_array[1]){
            $username = $_POST["username"];
            $password = $_POST["password"];
            session_start();
            header("Location:./index.php");
            $_SESSION["display_name"] = $credential_array[2]; 
            $_SESSION["email"] = $credential_array[3];
        }
        else{
            $error_message = "Incorrect username and password given";
            displayLoginForm($error_message);
        } 
    }

    function displayLoginForm($message=""){
        require_once("templates/logon_form.html");
    }


    function processPageRequest(){
        session_unset();

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
	        $username = $_POST["username"];
            $password = $_POST["password"];

            authenticateUser($username,$password);
        }
        else{
            displayLoginForm();
        }

    }



?>