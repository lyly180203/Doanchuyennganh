<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include(__DIR__ . "/../php_backend/config/connectdb.php");

$data = json_decode(file_get_contents('php://input'), true);
$fullName = $data['fullName'];
$email = $data['email'];
$password = $data['password'];
$phone = $data['phone'];

// Kiểm tra độ dài mật khẩu
if (strlen($password) < 8) {
    $response = array('success' => false, 'error' => 'Mật khẩu phải có ít nhất 8 ký tự.');
    echo json_encode($response);
    return;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Kiểm tra email trùng lặp
$sql = "SELECT * FROM dangky WHERE email = :email";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':email', $email);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $response = array('success' => false, 'error' => 'Email đã tồn tại.');
    echo json_encode($response);
    return;
}

$sql = "INSERT INTO dangky (name, email, password, phone, admin_status) VALUES (:name, :email, :password, :phone, 0)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':name', $fullName);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $hashedPassword);
$stmt->bindParam(':phone', $phone);

$response = array();

try {
    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Đăng ký thành công!';
    } else {
        $response['success'] = false;
        $response['error'] = $stmt->errorInfo();
    }
} catch (PDOException $e) {
    $response['success'] = false;
    $response['error'] = $e->getMessage();
}

$conn = null;
echo json_encode($response);
?>
