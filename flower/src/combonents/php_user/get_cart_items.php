<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . "/../php_backend/config/connectdb.php");

if (isset($_GET['id_dangky'])) {
    $id_dangky = $_GET['id_dangky'];
    
    // Lấy giỏ hàng theo id_dangky
    $sql = "SELECT * FROM cart WHERE id_dangky = :id_dangky";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_dangky', $id_dangky);
    $stmt->execute();
    
    $cartItems = array();
    if ($stmt->rowCount() > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $cartItems[] = $row;
        }
    }
    
    echo json_encode($cartItems);
} else {
    echo json_encode(array());
}

$conn = null;
?>
