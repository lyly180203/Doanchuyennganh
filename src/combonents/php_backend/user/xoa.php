<?php 
include("../config/connectdb.php");
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
// Lấy dữ liệu từ reactjs khi bấm vào xóa
$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['id_dangky'])){
    // Gán ID
    $id_dangky=$data['id_dangky'];
    $sqlxoa="DELETE from dangky  where id_dangky='".$id_dangky."'";
    $stmt=$conn->prepare($sqlxoa);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Xóa danh mục thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không thể xóa danh mục']);
    }
} 
else{
    echo json_encode(['success' => false, 'message' => 'Không thể xóa danh mục']);
}
?>