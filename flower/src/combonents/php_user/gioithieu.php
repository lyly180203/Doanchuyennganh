<?php
//include("../header/header.php");
header("Access-Control-Allow-Origin: *");
include(__DIR__ . "/../php_backend/config/connectdb.php");
  $sql = "SELECT * FROM gioithieu";
  $result = $conn->query($sql);
//$data= $result->fetchAll(PDO::FETCH_ASSOC);
//print_r($data); exit;
  $gioithieu= array();
  if ($result->rowCount() > 0) {
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      $gioithieu[] = $row;
     
    }
  }
  echo json_encode($gioithieu);

?>
