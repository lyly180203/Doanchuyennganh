<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include(__DIR__ . "/../php_backend/config/connectdb.php");

$data = json_decode(file_get_contents('php://input'), true);

try {
    $stmt = $conn->prepare("SELECT * FROM dangky WHERE email = :email");
    $stmt->bindParam(':email', $data['email']);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Người dùng đã tồn tại
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $response = [
            'success' => true,
            'name' => $user['name'],
            'id_dangky' => $user['id_dangky']
        ];
    } else {
        // Tạo người dùng mới
        $stmt = $conn->prepare("INSERT INTO dangky (name, email, google_id) VALUES (:name, :email, :google_id)");
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':google_id', $data['google_id']);
        $stmt->execute();

        $response = [
            'success' => true,
            'name' => $data['name'],
            'id_dangky' => $conn->lastInsertId()
        ];
    }
} catch(PDOException $e) {
    $response = [
        'success' => false,
        'error' => $e->getMessage()
    ];
}

echo json_encode($response);
?>