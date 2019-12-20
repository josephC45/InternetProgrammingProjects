<?php
    //THIS IS ALL APART OF PROJECT 5
    require_once '/home/common/mail.php'; //adds email functionality
    require_once '/home/common/dbInterface.php'; //adds email functionality

    processPageRequest();
    
    function authenticateUser($username,$password){
        $returnedValue = validateUser($username,$password);
        if(is_array($returnedValue)){
            session_start();
            $_SESSION['userId'] = $returnedValue[0];
            $_SESSION['display_name'] = $returnedValue[1];
            $_SESSION['email_address'] = $returnedValue[2];
	    header("Location:./index.php");
        }else{
            $message = "Incorrect credentials given.";
            displayLoginForm($message);
        }
    }

    function createAccount($username,$password,$display_name,$email_address){
        $userId = addUser($username,$password,$display_name,$email_address);
        if($userId > 0){
            sendValidationEmail($userId,$display_name,$email_address);
        }else{
            $error_message = "This username already exists";
            displayLoginForm($error_message);
        }
        
    }

    function validateAccount($userId){
        $returning_bool = activateAccount($userId);
        if($returning_bool){
            $success_message = "Your account has successfully been created";
            displayLoginForm($success_message);
        }
        else{
            $error_message = "There was a problem creating your account.";
            displayLoginForm($error_message);
        } 
    }

    function resetPassword($userId,$password){
        $bool_value = resetUserPassword($userId,$password);
        if($bool_value){
            $successful_reset_message = "Your password was reset";
            displayLoginForm($successful_reset_message);
        }else{
            $unsuccessful_reset_message = "Your password was NOT reset";
            displayLoginForm($unsuccessful_reset_message);
        }
    }

    function sendForgotPasswordEmail($username){
        $needed_value = getUserData($username);
        $bool_result = is_array(getUserData($username));
        if($bool_result){
            $email_message = "<div>
				 <h1>myMovies Xpress!</h1>
				 <p>Hello ". $needed_value[1] ." this message is from myMovies Xpress informing you that your password wants resetting.</p>
				 <a href='http://139.62.210.181/~cj42950/project5/logon.php?form=reset&user_id={$needed_value[0]}'>Reset Password Here</a>
			      </div>";
            $result = sendMail(385362101,$needed_value[2],$needed_value[1],"myMovies Xpress password reset",$email_message);
            var_dump($result);
        }
    }

    function sendValidationEmail($userId,$display_name,$email_address){
        
        $message = "<div>
		       <h1>myMovies Xpress!</h1><br>
        	       <p>Hello $display_name</p><br>
        	       <p>This message is used to validate your account!</p><br>
                       <a href='http://139.62.210.181/~cj42950/project5/logon.php?action=validate&user_id={$userId}'>Here</a>
		    </div>";
        
        $result = sendMail(385362101,$email_address,$display_name,"myMovies Xpress Account Validation Email", $message);
        var_dump($result);

    }

    function displayCreateAccountForm(){
        require_once("templates/create_form.html");
    }

    function displayForgotPasswordForm(){
        require_once("templates/forgot_form.html");
    }

    function displayResetPasswordForm(){
        require_once("templates/reset_form.html");
    }


    function displayLoginForm($message=""){
        require_once("templates/logon_form.html");
    }


    function processPageRequest(){
        session_unset();
      
	 
        if ($_SERVER["REQUEST_METHOD"] == "POST") {

	    $username = $_POST["username"];
            $password = $_POST["password"];
            $display_name = $_POST["display_name"];
            $email_address = $_POST["email_address"];
	    $userId = $_POST["user_id"];

            if(isset($_POST['action'])){
                if($_POST['action'] == 'create'){
                    createAccount($username,$password,$display_name,$email_address);
                }
		else if($_POST['action'] == 'forgot'){
                    sendForgotPasswordEmail($username);
                }
		else if($_POST['action'] == 'login'){
                    authenticateUser($username,$password);
                }
		else if($_POST['action'] == 'reset'){
                    resetPassword($userId,$password);
             	}
            }
            
        }

         else if(isset($_GET['action']) && $_GET['action'] == 'validate'){
            $userId = $_GET["user_id"];
            validateAccount($userId);
        }

        else if(isset($_GET['form'])){
            if($_GET['form'] == 'create'){
                displayCreateAccountForm();
            }
	    else if($_GET['form'] == 'forgot'){
                displayForgotPasswordForm();
            }
	    else if($_GET['form'] == 'reset'){
		$userId = $_GET["user_id"];
                displayResetPasswordForm($userId);
            }
        }

        else if(empty($_POST['action']) && empty($_GET['action'])){
            displayLoginForm();
        }
    
   }

?>