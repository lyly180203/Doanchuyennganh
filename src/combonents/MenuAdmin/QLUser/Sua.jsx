import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate  } from 'react-router-dom';
import URL from '../URL';
import IMG from '../img';
function Sua({onUpdate}) {
    const [ID,setID]=useState('');
    const [Ten,setTen]=useState('');
    const [Email,setEmail]=useState('');
    const [Phone,setPhone]=useState('');
    const [AdminStatus,setAdminStatus]=useState('');
    const navigate=useNavigate();
    const{id} =useParams();
    const url=URL+'user/get_user.php';
    useEffect(()=>{
        fetch(url)
        .then(item=>item.json())
        .then(data=>{
            const find=data.find(a=>a.id_dangky==id);
            if(find){
                setID(find.id_dangky);
                setTen(find.name);
                setEmail(find.email);
                setPhone(find.phone);
                setAdminStatus(find.admin_status);
            }
        })
        .catch(error =>console.error('Lỗi khi lấy dữ liệu',error));
    },[id]);
    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch(URL+'user/sua.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_dangky: ID,
                name: Ten,
                email: Email,
                phone: Phone,
                adminstatus: AdminStatus
            })
        })
        .then(item=>item.json())
        .then(data=>{
            if(data.success){
                alert('Cập nhật người dùng thành công');
                navigate('/admin/profile');
                onUpdate();
            }else{
                alert('Cập nhật danh mục thất bại');
            }
        })
        .catch(error =>console.error('Lỗi khi gửi',error));
    }
  return (
    <div>
      <h2>Sửa tài khoản</h2>
      <form onSubmit={handleSubmit}> 
        <Form.Label>Tên </Form.Label>
        <Form.Control value={Ten|| ''} onChange={(e) =>setTen(e.target.value)}></Form.Control>
        <Form.Label>Email</Form.Label>
        <Form.Control value={Email || ''} onChange={(e) =>setEmail(e.target.value)}></Form.Control>
        <Form.Label>Phone</Form.Label>
        <Form.Control value={Phone|| ''} onChange={(e)=> setPhone(e.target.value)}></Form.Control>
        <Form.Label>Trạng thái: {AdminStatus==1?"Admin":"Người dùng" || ''}</Form.Label>
        <Form.Select onChange={(e)=>setAdminStatus(e.target.value)}>
            <option>Trạng thái</option>
            <option value="1">Admin</option>
            <option value="2">Người dùng</option>
        </Form.Select>
        <Button type='submit' variant='primary' className='mt-3'> Lưu</Button>
      </form>
    </div>
  )
}

export default Sua
