<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

session_start();

// Xóa tất cả dữ liệu session
$_SESSION = array();

// Xóa cookie phiên làm việc nếu có
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time()-3600, '/');
}

// Hủy phiên
session_destroy();

// Gửi phản hồi JSON
$response = array(
    "status" => "success", 
    "message" => "Đăng xuất thành công và tất cả dữ liệu đã được xóa"
);
echo json_encode($response);
?>
