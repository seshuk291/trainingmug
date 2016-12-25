<?php 
$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["email"] = $session['email'];
    $response["name"] = $session['name'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'),$r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->customer->password;
    $email = $r->customer->email;
    $user = $db->getOneRecord("select userid, userName, email ,password from user_accounts where email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'success';
        $response['userName'] = $user['userName'];
        $response['userid'] = $user['userid'];
       
        $response['email'] = $user['email'];
       
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['userid'] = $user['userid'];
        $_SESSION['email'] = $email;
        $_SESSION['userName'] = $user['userName'];
        } else {
            $response['status'] = "error";
            $response['message'] = 'incorrect';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'nouser';
        }
    echoResponse(200, $response);
});
$app->post('/signUp', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('userName', 'email', 'password'),$r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    
    $userName = $r->customer->userName;

    $email = $r->customer->email;
    $contactno =  $r->customer->contactno;
    
   
    $password = $r->customer->password;
    $isUserExists = $db->getOneRecord("select 1 from user_accounts where  email='$email'");
    if(!$isUserExists){
        $r->customer->password = passwordHash::hash($password);
        $tabble_name = "user_accounts";
        $column_names = array('userName', 'email', 'contactno', 'password','termsNConditions');
        $result = $db->insertIntoTable($r->customer, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "success";
            $response["userid"] = $result;
            $response["contactno"] = $contactno;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["userid"];
           
            $_SESSION['name'] = $userName;
            $_SESSION['email'] = $email;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "failed";
            echoResponse(201, $response);
        }            
    }else{
        $response["status"] = "error";
        $response["message"] = "exists";
        echoResponse(201, $response);
    }
});
$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});
?>