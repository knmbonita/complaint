<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "complaintsdb2";
$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error){
    die(json_encode(["error" => $conn->connect_error]));
}
// Only show not-yet-resolved!
$sql = "SELECT id, name, location, contact, complaint, progress FROM complaints WHERE progress != 'Resolved' ORDER BY submitted_on DESC";
$res = $conn->query($sql);
$rows = [];
if($res && $res->num_rows){
  while($r = $res->fetch_assoc()){ $rows[] = $r; }
}
header('Content-Type: application/json');
echo json_encode($rows);
$conn->close();
?>
