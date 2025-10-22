<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "complaintsdb2";
$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}
$name = $_POST['name'] ?? '';
$location = $_POST['location'] ?? '';
$contact = $_POST['contact'] ?? '';
$complaint = $_POST['complaint'] ?? '';
if($name && $location && $contact && $complaint){
    $stmt = $conn->prepare("INSERT INTO complaints (name, location, contact, complaint) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $location, $contact, $complaint);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        echo "success";
    } else {
        echo "insert_failed: " . $conn->error;
    }
    $stmt->close();
} else {
    echo "error: missing fields";
}
$conn->close();
?>
