<?php
header("Access-Control-Allow-Origin: *");
include("../config/connectdb.php");
  $sql = "SELECT * FROM dangky";
  $result = $conn->query($sql);
  $user = array();
  if ($result->rowCount() > 0) {
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      $user[] = $row;
     
    }
  }
  echo json_encode($user);

?>
