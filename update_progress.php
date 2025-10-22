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
$progress = $_POST['progress'] ?? '';
if($id && $progress){
    if($progress === "Resolved") {
        $stmt = $conn->prepare("UPDATE complaints SET progress=?, resolved_on=NOW() WHERE id=?");
        $stmt->bind_param("si", $progress, $id);
    } else {
        $stmt = $conn->prepare("UPDATE complaints SET progress=?, resolved_on=NULL WHERE id=?");
        $stmt->bind_param("si", $progress, $id);
    }
    $stmt->execute();
    $stmt->close();
    echo "success";
} else {
    echo "error";
}
$conn->close();
?>
