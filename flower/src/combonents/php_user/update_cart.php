<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include(__DIR__ . "/../php_backend/config/connectdb.php");

$data = json_decode(file_get_contents("php://input"));

// Kiểm tra dữ liệu nhận được từ yêu cầu PUT
if(isset($data->id_sanpham, $data->soluong_sanpham)) {
    $id_sanpham = $data->id_sanpham;
    $soluong_sanpham = $data->soluong_sanpham;

    $sql_update = "UPDATE cart SET soluong_sanpham = :soluong_sanpham, thanhtien = gia_sanpham * :soluong_sanpham WHERE id_sanpham = :id_sanpham";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bindParam(':soluong_sanpham', $soluong_sanpham);
    $stmt_update->bindParam(':id_sanpham', $id_sanpham);

    if($stmt_update->execute()) {
        echo json_encode(array("message" => "Sản phẩm đã được cập nhật trong giỏ hàng"));
    } else {
        echo json_encode(array("message" => "Không thể cập nhật sản phẩm trong giỏ hàng"));
    }
} else {
    echo json_encode(array("message" => "Dữ liệu không hợp lệ"));
}

$conn = null;
?>
