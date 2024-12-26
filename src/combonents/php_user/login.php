<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

include(__DIR__ . "/../php_backend/config/connectdb.php");

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM dangky WHERE email = :email";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':email', $email);
$stmt->execute();

$response = array();

if ($stmt->rowCount() > 0) {
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    error_log("Fetched User: " . json_encode($user)); // Kiểm tra giá trị trả về từ cơ sở dữ liệu
    if (password_verify($password, $user['password'])) {
        $response['success'] = true;
        $response['message'] = "Đăng nhập thành công!";
        $response['name'] = $user['name'];
        $response['id_dangky'] = $user['id_dangky'];
        //Admin
        $response['admin_status']=$user['admin_status'];
        $response['adminEmail']=$user['email'];
        $response['adminPhone']=$user['phone'];
        $response['adminPassword']=$user['password'];
        
    } else {
        $response['success'] = false;
        $response['error'] = "Mật khẩu không đúng.";
    }

} else {
    $response['success'] = false;
    $response['error'] = "Email không tồn tại.";
}

$conn = null;
echo json_encode($response);
?>
