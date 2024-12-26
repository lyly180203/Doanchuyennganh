<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include(__DIR__ . "/../php_backend/config/connectdb.php");

// Nhận dữ liệu từ yêu cầu POST
$data = json_decode(file_get_contents("php://input"));

// Kiểm tra dữ liệu nhận được từ yêu cầu POST
if(isset($data->id_sanpham)) {
    $id_sanpham = $data->id_sanpham;

    // Chuẩn bị câu lệnh SQL để xóa sản phẩm khỏi giỏ hàng
    $sql = "DELETE FROM cart WHERE id_sanpham = :id_sanpham";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_sanpham', $id_sanpham);

    if($stmt->execute()) {
        echo json_encode(array("message" => "Sản phẩm đã được xóa khỏi giỏ hàng"));
    } else {
        echo json_encode(array("message" => "Không thể xóa sản phẩm khỏi giỏ hàng"));
    }
} else {
    echo json_encode(array("message" => "Dữ liệu không hợp lệ"));
}

$conn = null;
?>
