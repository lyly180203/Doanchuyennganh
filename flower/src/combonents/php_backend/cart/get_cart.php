<?php
include("../config/connectdb.php");
header('Access-Control-Allow-Origin: *');
$sql = "SELECT * 
        FROM thanhtoan 
        JOIN dangky ON thanhtoan.id_dangky = dangky.id_dangky";

$stmt = $conn->prepare($sql);
$stmt->execute();
$orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($orders);


?>
