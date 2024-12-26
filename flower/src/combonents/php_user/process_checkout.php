<?php

include '../php_backend/config/connectdb.php'; // Include database connection
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_dangky'], $data['total_price'], $data['payment_status'], $data['hinhthuc_thanhtoan'], $data['diadiem'], $data['cart_items'])) {
    $id_dangky = $data['id_dangky'];
    $total_price = $data['total_price'];
    $payment_status = $data['payment_status'];
    $payment_method = $data['hinhthuc_thanhtoan'];
    $delivery_address = $data['diadiem'];
    $cart_items = $data['cart_items'];
    $payment_code = uniqid('PAY_');
    // Chuyển danh sách sản phẩm thành một chuỗi
    $product_details = array_map(function($item) {
       
        return $item['ten_sanpham'] . ', số lượng: ' . $item['soluong_sanpham'];
    }, $cart_items);
    $slsp = array_sum(array_map(function($item) {
        return isset($item['soluong_sanpham']) ? (int)$item['soluong_sanpham'] : 0;
    }, $cart_items));
    

    $product_string = implode(', ', $product_details);

    try {
        // Insert checkout details into `thanhtoan` table
        $sql = "INSERT INTO thanhtoan (id_dangky, code_thanhtoan, thanhtoan_status, hinhthuc_thanhtoan, diadiem, gia_thanhtoan, ten_sanpham,soluong) 
                VALUES (:id_dangky, :code_thanhtoan, :thanhtoan_status, :hinhthuc_thanhtoan, :diadiem, :gia_thanhtoan, :ten_sanpham, :soluong_sanpham)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_dangky', $id_dangky, PDO::PARAM_INT);
        $stmt->bindParam(':code_thanhtoan', $payment_code, PDO::PARAM_STR);
        $stmt->bindParam(':thanhtoan_status', $payment_status, PDO::PARAM_STR);
        $stmt->bindParam(':hinhthuc_thanhtoan', $payment_method, PDO::PARAM_STR);
        $stmt->bindParam(':diadiem', $delivery_address, PDO::PARAM_STR);
        $stmt->bindParam(':gia_thanhtoan', $total_price, PDO::PARAM_INT);
        $stmt->bindParam(':soluong_sanpham', $slsp, PDO::PARAM_INT);
        $stmt->bindParam(':ten_sanpham', $product_string, PDO::PARAM_STR);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Đặt hàng thành công']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi khi đặt hàng']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Thiếu thông tin yêu cầu']);
}
?>
