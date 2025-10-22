<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "complaintsdb2";
$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error){
    die(json_encode([]));
}
$sql = "SELECT id, name, location, contact, complaint, resolved_on FROM complaints WHERE progress = 'Resolved' ORDER BY resolved_on DESC";
$res = $conn->query($sql);
$rows = [];
if($res && $res->num_rows){
  while($r = $res->fetch_assoc()){
    $rows[] = [
      "id"=>$r["id"],
      "name"=>$r["name"],
      "location"=>$r["location"],
      "contact"=>$r["contact"],
      "complaint"=>$r["complaint"],
      "resolvedOn"=>$r["resolved_on"]
    ];
  }
}
header('Content-Type: application/json');
echo json_encode($rows);
$conn->close();
?>
