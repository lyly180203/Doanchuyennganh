<?php 
include("../config/connectdb.php");
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
try{
$data = json_decode($_POST['data'], true);    
    if(isset($data['id_sanpham']) ){
        $id_sanpham=$data['id_sanpham'];
        $id_danhmuc=isset($data['id_danhmuc'])?$data['id_danhmuc']:null;
        $ten_sanpham=$data['ten_sanpham'];
        $gia_sanpham=$data['gia_sanpham'];
        $soluong_sanpham=$data['soluong_sanpham'];
        $tomtat_sanpham=$data['tomtat_sanpham'];
        $tinhtrang_sanpham=$data['tinhtrang_sanpham'];
        $noidung_sanpham=$data['noidung_sanpham'];
        $upload_directory='../../../assets/';
        $imgName=null;
        if (isset($_FILES['hinhanh_sanpham']) && $_FILES['hinhanh_sanpham']['error'] === UPLOAD_ERR_OK) {
            $file_name_array = explode(".", $_FILES['hinhanh_sanpham']['name']);
            $file_name = time() . '.' . end($file_name_array);
            $upload = $upload_directory . $file_name;
            if (move_uploaded_file($_FILES['hinhanh_sanpham']['tmp_name'], $upload)) {
                $imgName = $file_name;
                $sql = "SELECT * FROM sanpham WHERE id_sanpham='$id_sanpham' LIMIT 1";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    unlink($upload_directory . $row['hinhanh_sanpham']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Không thể di chuyển file']);
                exit;
            }
        }
        if ($imgName != null) {
            $sql = "UPDATE sanpham SET ten_sanpham='$ten_sanpham', 
                    gia_sanpham='$gia_sanpham', soluong_sanpham='$soluong_sanpham',tinhtrang_sanpham='$tinhtrang_sanpham',id_danhmuc='$id_danhmuc', 
                    tomtat_sanpham='$tomtat_sanpham', noidung_sanpham='$noidung_sanpham', hinhanh_sanpham='$imgName'
                    WHERE id_sanpham='$id_sanpham'";
        } else {
            $sql = "UPDATE sanpham SET ten_sanpham='$ten_sanpham', 
                    gia_sanpham='$gia_sanpham', soluong_sanpham='$soluong_sanpham', tinhtrang_sanpham='$tinhtrang_sanpham',id_danhmuc='$id_danhmuc',
                    tomtat_sanpham='$tomtat_sanpham', noidung_sanpham='$noidung_sanpham'
                    WHERE id_sanpham='$id_sanpham'";
        }
        $stmt=$conn->prepare($sql);
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'updatesanpham' => [
                    'id_sanpham' => $id_sanpham,
                    'ten_sanpham' => $ten_sanpham,
                    'gia_sanpham' => $gia_sanpham,
                    'soluong_sanpham' => $soluong_sanpham,
                    'tomtat_sanpham' => $tomtat_sanpham,
                    'noidung_sanpham' => $noidung_sanpham
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Không thể cập nhật sản phẩm']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi thiếu ID']);
    }
} catch (PDOException $e) {
   
}
?>