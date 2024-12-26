<?php 

include("../config/connectdb.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

try {
    // Nhận dữ liệu từ FormData
    $danhMuc = $_POST['danhMuc'];
    $tenSanPham = $_POST['tenSanPham'];
    $gia = $_POST['gia'];
    $soLuong = $_POST['soLuong'];
    $tomTat = $_POST['tomTat'];
    $noiDung = $_POST['noiDung'];
    $tinhTrang = $_POST['tinhTrang'];

    // Xử lý file upload
    $upload_directory = '../../../assets/';
    if (!file_exists($upload_directory)) {
        mkdir($upload_directory, 0777, true); // Tạo thư mục nếu chưa tồn tại
    }

    $imgName = null; // Đặt mặc định là null
    if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
        $file_name_array = explode(".", $_FILES['img']['name']);
        $file_name = time() . '.' . end($file_name_array); // Đặt tên file theo timestamp
        $upload_file = $upload_directory . $file_name;
        if (move_uploaded_file($_FILES['img']['tmp_name'], $upload_file)) {
            $imgName = $file_name; // Lưu tên file vào cơ sở dữ liệu
            
        } else {
            echo json_encode(['success' => false, 'message' => 'Không thể di chuyển file.']);
            exit;
        }
    }

    // Chèn dữ liệu vào database
    $conn->query("SET foreign_key_checks = 0;");
    $sql = "INSERT INTO sanpham (ten_sanpham, gia_sanpham, soluong_sanpham, hinhanh_sanpham, tomtat_sanpham, noidung_sanpham, tinhtrang_sanpham, id_danhmuc)
            VALUES ('$tenSanPham', '$gia', '$soLuong', '$imgName', '$tomTat', '$noiDung', '$tinhTrang', '$danhMuc')";
    $conn->exec($sql);
    $conn->query("SET foreign_key_checks = 1;");

    echo json_encode(['success' => true, 'message' => 'Thêm sản phẩm thành công']);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
}

?>
