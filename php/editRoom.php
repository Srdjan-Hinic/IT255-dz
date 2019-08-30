<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
    include("functions.php");
    if(isset($_POST['roomsize']) &&
        isset($_POST['beds']) &&
        isset($_POST['seaview']) &&
        isset($_POST['id'])){
        $data = array();
        $data['size'] = $_POST['roomsize'];
        $data['beds'] = $_POST['beds'];
        $data['sea_view'] = $_POST['seaview'];
        $data['id'] = $_POST['id'];
        echo editRoom($data);
    }

    ?>