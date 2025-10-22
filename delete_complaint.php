<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "complaintsdb2";
$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error){
    die("Connection failed");
}
$id = $_POST['id'] ?? '';
if($id){
    $stmt = $conn->prepare("DELETE FROM complaints WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
    echo "success";
} else {
    echo "error";
}
$conn->close();
?>
