<?php
include("../config/connectdb.php");
header('Access-Control-Allow-Origin: *');
$sql_count = "SELECT COUNT(*) as total_orders FROM thanhtoan";
$stmt_count = $conn->prepare($sql_count);
$stmt_count->execute();
$total_orders = $stmt_count->fetch(PDO::FETCH_ASSOC);
$sql_count1 = "SELECT COUNT(*) as total_kh FROM dangky ";
$stmt_count1 = $conn->prepare($sql_count1);
$stmt_count1->execute();
$total_kh = $stmt_count1->fetch(PDO::FETCH_ASSOC);
$sql = "SELECT  *
        FROM thanhtoan 
        JOIN dangky ON thanhtoan.id_dangky = dangky.id_dangky ORDER BY thanhtoan.id_thanhtoan desc";

$stmt = $conn->prepare($sql);
$stmt->execute();
$orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
$response = array( 'total_orders' => $total_orders['total_orders'], 'orders' => $orders, 'total_kh'=> $total_kh['total_kh'] );

echo json_encode($response);


?>
