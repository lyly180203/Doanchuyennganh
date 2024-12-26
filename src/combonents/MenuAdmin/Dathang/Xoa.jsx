import React,{useState,useEffect} from 'react'
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import URL from '../URL';
import { useNavigate,useParams } from 'react-router-dom';
function Xoa({onUpdate}) {
  const [ID,setID]=useState('');
  const [Name,setName]=useState('');
  const [Code,setCode]=useState('');
  const [TT,setTT]=useState('');
  const {id} =useParams();
  const navigate=useNavigate();
  const url=URL+'cart/get_cart.php';
  useEffect(()=>{
    fetch(url)
    .then(item=>item.json())
    .then(data=>{
      const find=data.find(a=>a.id_thanhtoan==id);
      if(find){
        setID(find.id_thanhtoan);
        setName(find.name);
        setCode(find.code_thanhtoan);
        setTT(find.thanhtoan_status);
      }
    })
  },[id]);
  const handleSubmit =(e)=>{
    e.preventDefault();
    fetch(URL+'cart/xoa.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_thanhtoan: ID
      })
    })
    .then(item=>item.json())
    .then(data=>{
      if(data.success){
        alert('Xóa đơn hàng thanh công');
        navigate('/admin/dondat');
        onUpdate();
      }else{
        alert('Hú lala');
      }
    })
  }
  return (
    <div>
       <h2 style={{textAlign: "center"}}>Bạn thực sự muốn xóa?</h2>
      <form onSubmit={handleSubmit}>
      
        <Form.Label>Tên khách hàng</Form.Label>
        <Form.Control value={Name||''} readOnly></Form.Control>
        <Form.Label>Code</Form.Label>
        <Form.Control value={Code || ''} readOnly></Form.Control>
        <Form.Label>Tình trạng: {TT==1?"Đã xử lý":"Chưa xử lý" || ''}</Form.Label>
        <br></br>
        <Button variant="danger" type='submit' className='mt-3'>Xóa</Button>
      </form>
    </div>
  )
}

export default Xoa
