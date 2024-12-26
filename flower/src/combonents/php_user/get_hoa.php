<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include(__DIR__ . "/../php_backend/config/connectdb.php");
$id_danhmuc = isset($_GET['id_danhmuc']) ? $_GET['id_danhmuc'] : '';

$searchTerm = isset($_GET['searchTerm']) ? $_GET['searchTerm'] : '';
$sortOrder = isset($_GET['sortOrder']) ? $_GET['sortOrder'] : '';

// Lấy dữ liệu sản phẩm
$sql = "SELECT * FROM sanpham WHERE id_danhmuc = :id_danhmuc AND ten_sanpham LIKE :searchTerm";

if ($sortOrder == 'low-to-high') {
  $sql .= " ORDER BY gia_sanpham ASC";
} elseif ($sortOrder == 'high-to-low') {
  $sql .= " ORDER BY gia_sanpham DESC";
}

$stmt = $conn->prepare($sql);
$stmt->bindValue(':id_danhmuc', $id_danhmuc, PDO::PARAM_INT);
$stmt->bindValue(':searchTerm', "%$searchTerm%", PDO::PARAM_STR);
$stmt->execute();

$hoa = array();
if ($stmt->rowCount() > 0) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $hoa[] = $row;
    }
} else {
    $hoa[] = array("message" => "Không có dữ liệu");
}

// Lấy dữ liệu danh mục
$sqlDanhMuc = "SELECT tieude, noidung FROM danhmuc WHERE id_danhmuc = :id_danhmuc";
$stmtDanhMuc = $conn->prepare($sqlDanhMuc);
$stmtDanhMuc->bindValue(':id_danhmuc', $id_danhmuc, PDO::PARAM_INT);
$stmtDanhMuc->execute();

$danhMuc = array();
if ($stmtDanhMuc->rowCount() > 0) {
    $danhMuc = $stmtDanhMuc->fetch(PDO::FETCH_ASSOC);
} else {
    $danhMuc = array("message" => "Không có mô tả");
}

$response = array(
    "sanpham" => $hoa,
    "danhmuc" => $danhMuc
);

echo json_encode($response);
$conn = null;
?>
