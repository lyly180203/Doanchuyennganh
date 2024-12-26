import React, {useState,useEffect} from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import URL from '../URL';
import { useNavigate, useParams } from 'react-router-dom';


function Sua({onUpdate}) {
    const[ID,setID]=useState('');
    const [Name,setName]=useState('');
    const [Phone,setPhone]=useState('');
    const [Hinhthuc,setHinhthuc]=useState('');
    const [Tsp,setTsp]=useState('');
    const [Soluong,setSoluong]=useState('');
    const [Diadiem,setDiadiem]=useState('');
    const [TT,setTT]=useState('');
    const {id}=useParams();
    const navigate=useNavigate();
    const url=URL +'cart/get_cart.php';
    useEffect(() =>{
        fetch(url)
        .then(item=>item.json())
        .then(data=>{
            const find =data.find(a=>a.id_thanhtoan==id);
            if(find){
                setID(find.id_thanhtoan);
                setName(find.name);
                setPhone(find.phone);
                setHinhthuc(find.hinhthuc_thanhtoan);
                setTsp(find.ten_sanpham);
                setSoluong(find.soluong);
                setDiadiem(find.diadiem);
                setTT(find.thanhtoan_status);
            }
        })
    },[id]);
    const handleSubmit =(e)=> {
        e.preventDefault();
        fetch(URL +'cart/sua.php',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_thanhtoan: ID,
                phone: Phone,
                hinhthuc_thanhtoan: Hinhthuc,
                diadiem: Diadiem,
                thanhtoan_status: TT
            })
        })
        .then(item=>item.json())
        .then(data=>{
            if(data.success){
                alert('Cập nhật đơn hàng thành công')
                navigate('/admin/dondat');
                onUpdate(); 
            }else{
                alert('Hú lala');
            }
        })
        .catch(error=>console.error('Lỗi gửi',error));
    }
  return (
    <Container className="mt-5">
    <h2 className="mb-4 text-center">Thông Tin Đơn Hàng</h2>
    <Form onSubmit={handleSubmit}>
      {/* Khách hàng và Số điện thoại */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Khách hàng</Form.Label>
          <Form.Control value={Name || ''} readOnly />
        </Col>
        <Col md={6}>
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            value={Phone || ''}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Col>
      </Row>

      {/* Thông tin sản phẩm và số lượng */}
      <Row className="mb-3">
        <Col>
          <Form.Label>Thông tin sản phẩm đã đặt:</Form.Label>
          <Form.Label> {Tsp || ''}</Form.Label>
        </Col>
        <Col>
          <Form.Label>Tổng số lượng</Form.Label>
          <Form.Control value={Soluong || ''} readOnly />
        </Col>
      </Row>

      {/* Hình thức thanh toán */}
      <Row className="mb-3">
        <Col>
          <Form.Label>Hình thức: {Hinhthuc}</Form.Label>
          <Form.Select onChange={(e) => setHinhthuc(e.target.value)}>
            <option value={'Tiền mặt'}>Tiền mặt</option>
            <option value={'VIETQR'}>VIETQR</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Địa điểm */}
      <Row className="mb-3">
        <Col>
          <Form.Label>Địa điểm</Form.Label>
          <Form.Control
            value={Diadiem || ''}
            onChange={(e) => setDiadiem(e.target.value)}
          />
        </Col>
      </Row>

      {/* Tình trạng xử lý */}
      <Row className="mb-3">
        <Col>
          <Form.Label>
            Tình trạng: {TT == 0 ? 'Chưa xử lý' : 'Đã xử lý'}
          </Form.Label>
          <Form.Select
            value={TT || ''}
            onChange={(e) => setTT(e.target.value)}
          >
            <option value="">Lựa chọn</option>
            <option value="0">Chưa xử lý</option>
            <option value="1">Đã xử lý</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Submit Button */}
      <Row>
        <Col className="text-center">
          <Button type="submit" variant="primary" className="mt-3 px-4">
            Lưu
          </Button>
        </Col>
      </Row>
    </Form>
  </Container>
);
};

export default Sua
