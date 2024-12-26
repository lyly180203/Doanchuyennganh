<?php
include("../config/connectdb.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Lấy dữ liệu từ request
    $data = json_decode(file_get_contents('php://input'), true);

    // Khởi tạo câu lệnh SQL
    $sql = "SELECT * FROM dangky WHERE 1=1";

    // Xây dựng điều kiện tìm kiếm động
    if (!empty($data['name'])) {
        $name = $data['name'];
        $sql .= " AND name LIKE '%$name%'";
    }

    if (!empty($data['phone'])) {
        $phone = $data['phone'];
        $sql .= " AND phone LIKE '%$phone%'";
    }


    $stmt = $conn->query($sql);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Kiểm tra kết quả
    if (count($users) > 0) {
        echo json_encode(['success' => true, 'data' => $users]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy dữ liệu!']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi khi tìm kiếm: ' . $e->getMessage()]);
}
?>
