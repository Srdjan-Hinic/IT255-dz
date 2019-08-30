<?php
include("config.php");
 
 
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     die();
}
  
function checkIfLoggedIn(){
    global $conn;
    if(isset($_SERVER['HTTP_TOKEN'])){
        $token = $_SERVER['HTTP_TOKEN'];
        $result = $conn->prepare("SELECT * FROM users WHERE token=?");
        $result->bind_param("s",$token);
        $result->execute();
        $result->store_result();
        $num_rows = $result->num_rows;
        if($num_rows > 0)
        {
            return true;
        }
        else{   
            return false;
        }
    }
    else{
        return false;
    }
} 
 
function login($username, $password){
    global $conn;
    $rarray = array();
    $errors = "";
    if($username=="null"){
        $errors .= "Username is empty\r\n";
    }
    if($password=="null"){
        $errors .= "Password is empty\r\n";
    }
    if(checkLogin($username,$password)){
        $id = sha1(uniqid());
        $result2 = $conn->prepare("UPDATE users SET token=? WHERE username=?");
        $result2->bind_param("ss",$id,$username);
        $result2->execute();
        $rarray['token'] = $id;
        $rarray['admin'] = checkAdmin1($id);
    } else{
        header('HTTP/1.1 401 Unauthorized');
        $errors .= "Invalid username or password\r\n";
        $rarray['error'] = json_encode($errors);
    }
    return json_encode($rarray);
}
 
function checkLogin($username, $password){
    global $conn;
    $password = md5($password);
    $result = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?");
    $result->bind_param("ss",$username,$password);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{   
        return false;
    }
}
function checkAdmin1($id){
    global $conn;
    // $result = $conn->prepare("SELECT * FROM users WHERE token=?");
    return $conn->query("SELECT privileges FROM users WHERE token = '$id'")->fetch_object()->privileges;
}
function checkAdmin($id){
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT * from users where token='$id'");
    $num_rows = $result->num_rows;
    $user = array();
    if($num_rows > 0)
    {
        $result2 = $conn->query("SELECT * from users where token='$id'");
        while($row = $result2->fetch_assoc()) {
            $one_user = array();
            $one_user['privileges'] = $row['privileges'];
            array_push($user,$one_user);
        }
    }
    $rarray['user'] = $user;
    return json_encode($rarray);
}
 
function register($username, $password, $firstname, $lastname,$privilegies,$email){
    global $conn;
    $rarray = array();
    $errors = "";

    if(checkIfUserExists($username)){
        $errors .= "Username already exists\r\n";
    }
    if(checkIfEmailExists($email)){
        $errors .= "Email already in use\r\n";
    }
    if(strlen($username) < 5 || $username == ''){
        $errors .= "Username must be at least 5 characters long\r\n";
    }
    if(strlen($password) < 5 || $password == ''){
        $errors .= "Password must be at least 5 characters long\r\n";
    }
    if(strlen($firstname) < 3 || $firstname == ''){
        $errors .= "Name must be at least 3 characters long\r\n";
    }
    if(strlen($lastname) < 3 || $lastname == ''){
        $errors .= "Last name must be at least 3 characters long\r\n";
    }
    if($errors == ""){
        $stmt = $conn->prepare("INSERT INTO users (name, last_name, username, password,privileges,email) VALUES (?, ?, ?, ?,?,?)");
        $pass =md5($password);
        $stmt->bind_param("ssssis", $firstname, $lastname, $username, $pass,$privilegies,$email);
        if($stmt->execute()){
            $id = sha1(uniqid());
            $result2 = $conn->prepare("UPDATE users SET token=? WHERE username=?");
            $result2->bind_param("ss",$id,$username);
            $result2->execute();
            $rarray['token'] = $id;
        }else{
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error";
        }
    } else{
        header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }
    
    return json_encode($rarray);
}
 
function checkIfUserExists($username){
    global $conn;
    $result = $conn->prepare("SELECT * FROM users WHERE username=?");
    $result->bind_param("s",$username);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{   
        return false;
    }
}

function checkIfEmailExists($email){
    global $conn;
    $result = $conn->prepare("SELECT * FROM users WHERE email=?");
    $result->bind_param("s",$email);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{   
        return false;
    }
}

function addRoomFunc($size,$beds,$seaView) {
    global $conn;
    $rarray = array();
    $errors = "";
    
    if (10 > $size) {
        $errors .= "The room must be larger than 10\r\n";
    }
    if (1 > $beds) {
        $errors .= "There must be at least 1 bed in the room!\r\n";
    }
 
    if ($errors == "") {
        $stmt = $conn->prepare("INSERT INTO rooms (size,beds,sea_view) VALUES (?,?,?)");
        $stmt->bind_param("iii",$size,$beds,$seaView);

        if ($stmt->execute()) {
        }else {
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error";
        }
    }else {
        header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }   
    
    return json_encode($rarray);

}
function getRooms(){
    global $conn;
    $rarray = array();
        $result = $conn->query("SELECT * FROM rooms");
        $num_rows = $result->num_rows;
        $rooms = array();
        if($num_rows > 0)
        {
            // $result2 = $conn->query("SELECT room_name, room_img, room_desc, price, night,(SELECT available FROM availability WHERE room_id=rooms.room_id) as ava FROM rooms");
            while($row = $result->fetch_assoc()) {
                $one_room = array();
                $one_room['id'] = $row['id'];
                $one_room['size'] = $row['size'];
                $one_room['beds'] = $row['beds'];
                $one_room['sea_view'] = $row['sea_view'];
                array_push($rooms,$one_room);
            }
        }
        $rarray['rooms'] = $rooms;
        return json_encode($rarray);
}

function editRoom($data){
    global $conn;
    $rarray = array();
        $stmt = $conn->prepare("UPDATE rooms SET size=?, beds=?, sea_view=? WHERE id=?");
        $stmt->bind_param("iiii", $data['size'], $data['beds'], $data['sea_view'],$data['id']);
        if($stmt->execute()){
            $rarray['success'] = "updated";
        }else{
            $rarray['error'] = "Database connection error";
        }
    return json_encode($rarray);
}

function deleteRoom($id){
    global $conn;
    $rarray = array();
        $result = $conn->prepare("DELETE FROM rooms WHERE id=?");
        $result->bind_param("i",$id);
        $result->execute();
        $rarray['success'] = "Deleted successfully"; 
    return json_encode($rarray);
}
?>