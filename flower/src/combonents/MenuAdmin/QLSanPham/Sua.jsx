import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate  } from 'react-router-dom';
import URL from '../URL';
import IMG from '../img';
import { Textarea } from 'react-bootstrap-icons';
function Sua({onUpdate}) {
    const [ID,setID]=useState('');
    const [TenSP,setTenSP]=useState('');
    const [Gia,setGia]=useState('');
    const [Soluong,setSoluong]=useState('');
    const [Img,setImg]=useState('');
    const [PreviewImg, setPreviewImg] = useState('');
    const [Tomtat,setTomtat]=useState('');
    const [Noidung,setNoidung]=useState('');
    const [Tinhtrang,setTinhtrang]=useState('');
    const [ID_danhmuc,setID_danhmuc]=useState('');
    const [Danhmuc,setDanhmuc]=useState([]);
    const {id}=useParams();
    const navigate=useNavigate();
    const url=URL+'sanpham/get_san_pham.php';
    
    useEffect(()=>{
        fetch(url)
        .then(item=>item.json())
        .then(data=>{
            const find=data.find(a=>a.id_sanpham==id);
            
            if(find){
                setTenSP(find.ten_sanpham);
                setID(find.id_sanpham);   
                setGia(find.gia_sanpham);
                setSoluong(find.soluong_sanpham); 
                setImg(find.hinhanh_sanpham);
                setTomtat(find.tomtat_sanpham);
                setNoidung(find.noidung_sanpham);
                setTinhtrang(find.tinhtrang_sanpham);
                setID_danhmuc(find.id_danhmuc);
                
            }
        })
        fetch(URL+"danhmuc/get_danh_muc.php")
        .then(itemdm=>itemdm.json())
        .then(data =>{
            setDanhmuc(data)
        })
        .catch (error => console.error('Lỗi khi lấy dữ liệu',error));
    }, [id]);
    const tenDanhMuc =Danhmuc.find((dm)=>dm.id_danhmuc==ID_danhmuc)?.ten_danhmuc;
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
            const reader = new FileReader();
            reader.onload = () => {
            setPreviewImg(reader.result); // Gán URL của ảnh vào trạng thái
          };
          reader.readAsDataURL(file);
        }
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id_sanpham: ID,
            ten_sanpham: TenSP,
            gia_sanpham: Gia,
            soluong_sanpham: Soluong,
            tomtat_sanpham: Tomtat,
            noidung_sanpham: Noidung,
            tinhtrang_sanpham: Tinhtrang,
            id_danhmuc: ID_danhmuc,
        };
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (Img) {
            formData.append('hinhanh_sanpham', Img);
        }
        fetch(URL + 'sanpham/sua.php', {
            method: 'POST',
            body: formData,
        })
        .then(item => item.json())
        .then(data => {
            if (data.success) {
                alert("Cập nhật sản phẩm thành công");
                navigate('/admin/sanpham');
                onUpdate();
            } else {
                alert("Cập nhật thất bại" + data.message);
            }
        })
        .catch(error => console.error('Lỗi khi gửi', error));
    };
  return (
    <div>
      <h2>Sửa sản phẩm</h2>
      <form onSubmit={handleSubmit} >
        <Form.Label>ID</Form.Label>
        <Form.Control  readOnly value={ID ||''}></Form.Control>
        <Form.Label>Tên sản phẩm</Form.Label>
        <Form.Control  value={TenSP || ''} onChange={(e)=> setTenSP(e.target.value)}></Form.Control>
        <Form.Label>Giá</Form.Label>
        <Form.Control value={Gia || ''} onChange={(e)=> setGia(e.target.value)}></Form.Control>
        <Form.Label>Số lượng</Form.Label>
        <Form.Control  value={Soluong || ''} onChange={(e)=> setSoluong(e.target.value)}></Form.Control>
        <Form.Label>Hình ảnh</Form.Label>
        <br></br>
        <img src={PreviewImg||`${IMG}/${Img}`} width={80}/>
        <input type="file" onChange={handleImageChange} />
        <Form.Label>Tóm Tắt</Form.Label>
        <Form.Control as="textarea"  value={Tomtat || ''} onChange={(e) =>setTomtat(e.target.value)}></Form.Control>
        <Form.Label>Nội dung</Form.Label>
        <Form.Control as="textarea" rows={5} value={Noidung || ''} onChange={(e) =>setNoidung(e.target.value)} ></Form.Control>
        <Form.Label>Kích hoạt: {Tinhtrang==1?"Đã kích hoạt":"Chưa kích hoạt" }</Form.Label>
        <Form.Select onChange={(e)=> setTinhtrang(e.target.value)}>
            <option value="">Lựa chọn</option>
            <option value="1">Kích hoạt</option>
            <option value="0">Chưa kích hoạt</option>
        </Form.Select>
        <Form.Label>Danh mục: {tenDanhMuc|| ''}</Form.Label>
        <Form.Select className='form-select' onChange={(e)=>setID_danhmuc(e.target.value)}>
            <option>Chọn danh mục</option>
           {Danhmuc.map((item) =>(
            <option key={item.id_danhmuc} value={item.id_danhmuc}>{item.ten_danhmuc}</option>
           ))}
        </Form.Select>
        <Button type='submit' variant='primary' className='mt-3'>Lưu</Button>
      </form>
    </div>
  )
}

export default Sua
