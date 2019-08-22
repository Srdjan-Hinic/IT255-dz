<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
    include("functions.php");

    if(isset($_POST['roomsize']) &&
        isset($_POST['beds']) &&
        isset($_POST['seaview'])){
        $roomsize = $_POST['roomsize'];
        $beds = $_POST['beds'];
        $seaview = $_POST['seaview'];
        echo addRoomFunc($roomsize,$beds,$seaview);
    }
?>