<?php
header("Access-Control-Allow-Origin: *"); // Cho phép tất cả các nguồn truy cập tài nguyên này (CORS).
header("Content-Type: application/json; charset=UTF-8"); // Đặt kiểu nội dung của phản hồi là JSON.

include(__DIR__ . "/../php_backend/config/connectdb.php");

// Truy vấn dữ liệu từ bảng sanpham và loại trừ các sản phẩm thuộc danh mục Hoa chia buồn (id_danhmuc = 9)
$sql = "SELECT * FROM sanpham WHERE id_danhmuc != 9"; 
$result = $conn->query($sql); // Thực hiện truy vấn SQL và lấy kết quả.

$sanpham = array(); // Tạo mảng rỗng để lưu trữ dữ liệu sản phẩm.

if ($result->rowCount() > 0) { // Kiểm tra nếu có ít nhất một dòng kết quả.
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) { // Duyệt qua từng dòng kết quả.
        $sanpham[] = $row; // Thêm dòng kết quả vào mảng sản phẩm.
    }
} else { // Nếu không có dòng kết quả nào.
    echo json_encode(array("message" => "Không có dữ liệu")); // Trả về thông báo JSON không có dữ liệu.
    exit; 
}

echo json_encode($sanpham); // Chuyển đổi mảng sản phẩm thành JSON và trả về.
$conn = null; // Đóng kết nối cơ sở dữ liệu.
?>
