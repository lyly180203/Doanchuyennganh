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
        $sql="DELETE from thanhtoan where id_thanhtoan='$id_thanhtoan'";
        $stmt=$conn->prepare($sql);
        if($stmt->execute()){
            echo json_encode(['success'=>true]);
        }else{
            echo json_encode(['success'=>false]);
        }
    }
}catch(Exception $e){

}
?>