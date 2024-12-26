<?php
//include("../header/header.php");
header("Access-Control-Allow-Origin: *");
include(__DIR__ . "/../php_backend/config/connectdb.php");
  $sql = "SELECT * FROM danhmuc";
  $result = $conn->query($sql);
//$data= $result->fetchAll(PDO::FETCH_ASSOC);
//print_r($data); exit;
  $danhMuc = array();
  if ($result->rowCount() > 0) {
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      $danhMuc[] = $row;
     
    }
  }
  echo json_encode($danhMuc);

?>
