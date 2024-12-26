<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

include(__DIR__ . "/../php_backend/config/connectdb.php");

if (isset($_GET['id_sanpham'])) {
    $id_sanpham = $_GET['id_sanpham'];
    $sql = "SELECT id_sanpham, ten_sanpham, gia_sanpham, hinhanh_sanpham, tomtat_sanpham,noidung_sanpham FROM sanpham WHERE id_sanpham = :id_sanpham";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_sanpham', $id_sanpham);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($product);
    } else {
        echo json_encode(array("message" => "Sản phẩm không tồn tại."));
    }
} else {
    echo json_encode(array("message" => "Thiếu id_sanpham."));
}
?>
