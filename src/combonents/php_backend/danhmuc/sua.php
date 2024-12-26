<?php 
include("../config/connectdb.php");
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Nhận dữ liệu từ React
    $data = json_decode(file_get_contents('php://input'), true);

    // Kiểm tra xem dữ liệu có hợp lệ không
    if (isset($data['ten_danhmuc']) && !empty($data['ten_danhmuc']) && isset($data['id_danhmuc'])) {
        $ten_danhmuc = $data['ten_danhmuc'];
        $id_danhmuc = $data['id_danhmuc'];

        // Câu lệnh SQL để cập nhật danh mục
        $sql = "UPDATE danhmuc SET ten_danhmuc = '$ten_danhmuc' WHERE id_danhmuc = '$id_danhmuc'";
        $stmt = $conn->prepare($sql);

        // Thực thi câu lệnh SQL
        if ($stmt->execute()) {
            echo json_encode([  
                'success' => true,
                'updatedCategory' => [
                    'id_danhmuc' => $id_danhmuc,
                    'ten_danhmuc' => $ten_danhmuc
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Không thể cập nhật danh mục']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ hoặc thiếu ID danh mục']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi khi cập nhật danh mục: ' . $e->getMessage()]);
}
?>
