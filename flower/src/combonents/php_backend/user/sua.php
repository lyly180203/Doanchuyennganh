<?php 
include("../config/connectdb.php");
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
try{
    $data=json_decode(file_get_contents('php://input'),true);
    if(isset($data['id_dangky'])){
        $id_dangky=$data['id_dangky'];
        $name=$data['name'];
        $phone=$data['phone'];
        $email=$data['email'];
        $adminstatus=$data['adminstatus'];
        $sql="UPDATE dangky SET name= '$name', email='$email', phone='$phone', admin_status='$adminstatus' WHERE id_dangky='$id_dangky'";
        $stmt =$conn->prepare($sql);
        if($stmt->execute()){
            echo json_encode([
                'success' =>true,
                'updateuser'=> [
                    'id_dangky' => $id_dangky,
                    'name' => $name,
                    'phone'=>$phone,
                    'email'=>$email,
                    'adminstatus'=>$adminstatus
                ]
                ]);
        }else{
            echo json_encode(['success'=>false,'message'=>'Không thể cập nhật người dùng']);
        }
    }else{
        echo json_encode(['success'=>false,'message'=>'Dữ liệu thiếu do ID user']);
    }
}catch(Exception $e){

}
?>