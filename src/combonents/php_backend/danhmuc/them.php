<?php
include("../config/connectdb.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['ten_danhmuc']) && !empty($data['ten_danhmuc'])) {
            $ten_danhmuc = $data['ten_danhmuc'];
            $sql = "INSERT INTO danhmuc (ten_danhmuc) VALUES ('$ten_danhmuc')";
            // Thực thi câu lệnh SQL
            $conn->exec($sql);    
            // Lấy id của bản ghi vừa thêm
            $id_danhmuc = $conn->lastInsertId();
            echo json_encode([
                'success' => true,
                'message' => 'Danh mục đã được thêm thành công!',
            ]);
           
    } else {
        echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ hoặc thiếu tên danh mục']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi khi thêm danh mục: ' . $e->getMessage()]);
}
?>
