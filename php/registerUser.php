<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
    include("functions.php");
    
    if(isset($_POST['firstName']) &&
        isset($_POST['lastName']) &&
        isset($_POST['username']) &&
        isset($_POST['password']) &&
        isset($_POST['email'])){
        $firstname = $_POST['firstName'];
        $lastname = $_POST['lastName'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $email = $_POST['email'];
        echo register($username,$password,$firstname,$lastname,0,$email);
    }
?>