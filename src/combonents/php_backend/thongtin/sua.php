<?php
include("../config/connectdb.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data || empty($data['name']) || empty($data['email']) || empty($data['phone'])) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ thông tin!']);
        exit;
    }

    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $password = $data['password']; // Mật khẩu cũ

    // Kiểm tra mật khẩu cũ
    $checkPasswordSQL = "SELECT password FROM dangky WHERE email = '$email'";
    $result = $conn->query($checkPasswordSQL);
    $row = $result->fetch(PDO::FETCH_ASSOC);

    if (!$row || md5($password) !== $row['password']) {
        echo json_encode(['success' => false, 'message' => 'Mật khẩu cũ không chính xác!']);
        exit;
    }

    // Xử lý mật khẩu mới (nếu có)
    if($data['newPassword']=='' || $data['confirmPassword']==''){
        $sql = "UPDATE dangky 
        SET name = '$name', 
            email = '$email', 
            phone = '$phone'
        WHERE email = '$email'";
    }else{

    }
    if (!empty($data['newPassword']) && !empty($data['confirmPassword'])) {
        $newPassword = $data['newPassword'];
        $confirmPassword = $data['confirmPassword'];

        if ($newPassword !== $confirmPassword) {
            echo json_encode(['success' => false, 'message' => 'Mật khẩu mới và xác nhận không khớp!']);
            exit;
        }

        $hashedPassword = md5($newPassword);
        $sql = "UPDATE dangky 
                SET name = '$name', 
                    email = '$email', 
                    phone = '$phone', 
                    password = '$hashedPassword'
                WHERE email = '$email'";
    }

    $result = $conn->query($sql);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Cập nhật thông tin thành công!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không thể cập nhật thông tin!']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi xử lý: ' . $e->getMessage()]);
}
?>
