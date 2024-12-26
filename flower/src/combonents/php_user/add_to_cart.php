<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include(__DIR__ . "/../php_backend/config/connectdb.php");

// Xử lý GET request để lấy giỏ hàng theo id_dangky
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id_dangky'])) {
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
    exit;
}

// Xử lý POST request để thêm sản phẩm vào giỏ hàng
$data = json_decode(file_get_contents("php://input"), true);

// Ghi dữ liệu vào log để kiểm tra
error_log(print_r($data, true));

// Kiểm tra xem dữ liệu có đầy đủ không
if(isset($data['id_sanpham'], $data['ten_sanpham'], $data['gia_sanpham'], $data['soluong_sanpham'], $data['hinhanh_sanpham'], $data['id_dangky'])) {
    $id_sanpham = $data['id_sanpham'];
    $ten_sanpham = $data['ten_sanpham'];
    $gia_sanpham = $data['gia_sanpham'];
    $soluong_sanpham = $data['soluong_sanpham'];
    $hinhanh_sanpham = $data['hinhanh_sanpham'];
    $id_dangky = $data['id_dangky'];
    $thanhtien = $gia_sanpham * $soluong_sanpham;

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    $sql_check = "SELECT * FROM cart WHERE id_sanpham = :id_sanpham AND id_dangky = :id_dangky";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bindParam(':id_sanpham', $id_sanpham);
    $stmt_check->bindParam(':id_dangky', $id_dangky);
    $stmt_check->execute();

    if($stmt_check->rowCount() > 0) {
        // Cập nhật số lượng sản phẩm nếu đã tồn tại
        $sql_update = "UPDATE cart SET soluong_sanpham = soluong_sanpham + :soluong_sanpham, thanhtien = gia_sanpham * soluong_sanpham WHERE id_sanpham = :id_sanpham AND id_dangky = :id_dangky";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bindParam(':soluong_sanpham', $soluong_sanpham);
        $stmt_update->bindParam(':id_sanpham', $id_sanpham);
        $stmt_update->bindParam(':id_dangky', $id_dangky);

        if($stmt_update->execute()) {
            echo json_encode(array("message" => "Sản phẩm đã được cập nhật trong giỏ hàng"));
        } else {
            echo json_encode(array("message" => "Không thể cập nhật sản phẩm trong giỏ hàng"));
        }
    } else {
        // Thêm sản phẩm vào giỏ hàng nếu chưa tồn tại
        $sql = "INSERT INTO cart (id_sanpham, ten_sanpham, gia_sanpham, soluong_sanpham, hinhanh_sanpham, thanhtien, id_dangky) 
                VALUES (:id_sanpham, :ten_sanpham, :gia_sanpham, :soluong_sanpham, :hinhanh_sanpham, :thanhtien, :id_dangky)";
        $stmt = $conn->prepare($sql);

        // Gán giá trị cho các tham số
        $stmt->bindParam(':id_sanpham', $id_sanpham);
        $stmt->bindParam(':ten_sanpham', $ten_sanpham);
        $stmt->bindParam(':gia_sanpham', $gia_sanpham);
        $stmt->bindParam(':soluong_sanpham', $soluong_sanpham);
        $stmt->bindParam(':hinhanh_sanpham', $hinhanh_sanpham);
        $stmt->bindParam(':thanhtien', $thanhtien);
        $stmt->bindParam(':id_dangky', $id_dangky);

        if($stmt->execute()) {
            echo json_encode(array("message" => "Sản phẩm đã được thêm vào giỏ hàng"));
        } else {
            echo json_encode(array("message" => "Không thể thêm sản phẩm vào giỏ hàng"));
        }
    }
} else {
    error_log("Dữ liệu gửi lên thiếu tham số cần thiết.");
    echo json_encode(array("message" => "Dữ liệu không hợp lệ"));
}

$conn = null;
?>
