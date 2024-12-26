<?php
include("../config/connectdb.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Lấy dữ liệu từ React gửi lên
    $data = json_decode(file_get_contents('php://input'), true);

    // Kiểm tra dữ liệu đầu vào
    if (!$data || empty($data['email']) || empty($data['password'])) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập đầy đủ thông tin!']);
        exit;
    }

    // Lấy dữ liệu từ mảng JSON
    $email = $data['email'];
    $password1 = md5($data['password']);

    // Truy vấn SQL kiểm tra thông tin đăng nhập
    $sql = "SELECT * FROM dangky WHERE email = '$email' AND password = '$password1'";
    $result = $conn->query($sql);
    $user = $result->fetch(PDO::FETCH_ASSOC);

    // Nếu tìm thấy user
    if ($user) {
        echo json_encode(['success' => true, 'message' => 'Đăng nhập thành công!', 'nameUser' => $user['name'], 'email' => $user['email'], 'phone' => $user['phone'],'password' => $user['password'],'admin_status' => $user['admin_status']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Email hoặc mật khẩu không đúng!']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi khi xử lý: ' . $e->getMessage()]);
}
?>
