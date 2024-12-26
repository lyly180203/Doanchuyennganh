<?php 
include "../config/connectdb.php";
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
try{
    $data=json_decode(file_get_contents('php://input'),true);
    if(isset($data['id_thanhtoan'])){
        $id_thanhtoan=$data['id_thanhtoan'];
        $phone=$data['phone'];
        $hinhthuc_thanhtoan=$data['hinhthuc_thanhtoan'];
        $diadiem=$data['diadiem'];
        $thanhtoan_status=$data['thanhtoan_status'];
        $sql="UPDATE dangky JOIN thanhtoan on thanhtoan.id_dangky=dangky.id_dangky set phone='$phone', diadiem='$diadiem',hinhthuc_thanhtoan='$hinhthuc_thanhtoan', thanhtoan_status='$thanhtoan_status' where id_thanhtoan='$id_thanhtoan'";
        $stmt=$conn->prepare($sql);
        if($stmt->execute()){
            echo json_encode([
                'success'=>true
            ]);
        }else{
            echo json_encode(['success'=>false]);
        }
    }
}catch(Exception $e){

}
?>