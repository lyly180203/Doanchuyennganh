<?php 
include("../config/connectdb.php");
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
// Lấy dữ liệu từ reactjs khi bấm vào xóa
$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['id_sanpham'])){
    // Gán ID
    $id_sanpham=$data['id_sanpham'];
    $sqlxoa="DELETE from sanpham  where id_sanpham='".$id_sanpham."'";
    $stmt=$conn->prepare($sqlxoa);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Xóa sản phẩm thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không thể xóa sản phẩm']);
    }
} 
else{
    echo json_encode(['success' => false, 'message' => 'Không thể xóa sản phẩm']);
}
?>