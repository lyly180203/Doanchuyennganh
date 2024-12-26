<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Kết nối đến cơ sở dữ liệu
include(__DIR__ . "/../php_backend/config/connectdb.php");

// Truy vấn dữ liệu từ bảng đánh giá
$sql = "SELECT * FROM danhgia";
$result = $conn->query($sql);

$danhgia = array();
if ($result->rowCount() > 0) {
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $danhgia[] = $row;
    }
} else {
    echo json_encode(array("message" => "Không có dữ liệu"));
    exit;
}

echo json_encode($danhgia);
$conn = null;
?>
