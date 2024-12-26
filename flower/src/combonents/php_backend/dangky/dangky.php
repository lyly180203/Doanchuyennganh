<?php
include("../config/connectdb.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Lấy dữ liệu từ React gửi lên
    $data = json_decode(file_get_contents('php://input'), true);
    // Kiểm tra dữ liệu có được gửi đến hay không
    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ hoặc không được gửi đến!']);
        exit;
    }
    // Kiểm tra dữ liệu đầu vào
    if (empty($data['nameUser']) || empty($data['email']) || empty($data['password']) || empty($data['phone']) ) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập đầy đủ thông tin!']);
        exit;
    }

    // Lấy dữ liệu từ mảng JSON
    $nameUser = $data['nameUser'];
    $email = $data['email'];
    $password = $data['password'];
    $phone = $data['phone'];
    // Mã hóa mật khẩu bằng MD5
    $hashedPassword = md5($password);

    // Câu lệnh SQL
    $sql = "INSERT INTO dangky (name, email, password, phone, admin_status) 
            VALUES ('$nameUser', '$email', '$hashedPassword', '$phone', 2)";
    // Mặc định dăng ký tình trạng là người dùng (2) muốn cấp quyền thì vào admin
    // Thực thi câu lệnh SQL
    $conn->exec($sql);

    // Phản hồi thành công
    echo json_encode(['success' => true, 'message' => 'Thêm người dùng thành công!']);
} catch (PDOException $e) {
    // Xử lý lỗi và trả phản hồi
    echo json_encode(['success' => false, 'message' => 'Lỗi khi thêm người dùng: ' . $e->getMessage()]);
}
?>
