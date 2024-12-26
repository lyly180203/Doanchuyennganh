import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Them from './Them';
import Xoa from './Xoa';
import Sua from './Sua';
import URL from '../URL';
import IMG from '../img';
function SanPham() {
    const [sanPham,setsanPham] = useState([]);
    const [danhMuc,setdanhMuc] = useState([]);
    const navigate = useNavigate();
    const urlsp=URL+'sanpham/get_san_pham.php';
    const urldm=URL+'danhmuc/get_danh_muc.php';
    const fetchSanPham = () => {
        //fetch('http://lyly.io.vn/php_backend/sanpham/get_san_pham.php')
        fetch(urlsp)
    
          .then(response => response.json())
          .then(data => {
            if (data.message) {
              console.log("Không có dữ liệu:", data.message);
            } else {
                setsanPham(data);
            }
          })
          .catch(error => {
            console.error('Lỗi khi lấy dữ liệu từ API:', error);
          });
      };
      const fetchDanhMuc = () => {
        //  fetch('http://lyly.io.vn/php_backend/danhmuc/get_danh_muc.php')
        fetch(urldm)
          .then(response => response.json())
          .then(data => {
            if (data.message) {
              console.log("Không có dữ liệu:", data.message);
            } else {
              setdanhMuc(data);
            }
          })
          .catch(error => {
            console.error('Lỗi khi lấy dữ liệu từ API:', error);
          });
      };
      useEffect(() => {
        fetchSanPham();
        fetchDanhMuc();
      }, []);
  return (
    <div className='container'>
      <Link to="them" className='btn btn-primary'>Thêm sản phẩm</Link>
      <Routes>
        {/* Định nghĩa tuyến đường con */}
        {<Route path="Them" element={<Them onUpdate={fetchSanPham} />} />}
        {<Route path="Sua/:id" element={<Sua onUpdate={fetchSanPham} />} />}
        {<Route path="Xoa/:id" element={<Xoa onUpdate={fetchSanPham} />} />}
      </Routes>
      <h2>Quản lý sản phẩm</h2>
      <table style={{ borderSpacing: "10px", textAlign: 'center', width: '100%' }}>
        <thead>
          <tr>
            <th className="d-none d-md-table-cell">ID</th>
            <th>Tên sản phẩm</th>
            <th className="d-none d-md-table-cell">Giá </th>
            <th className="d-none d-md-table-cell">Số lượng</th>
            <th>Hình ảnh</th> 
            <th className="d-none d-md-table-cell">Tóm tắt</th>
         
            <th >Tình trạng</th>
            <th>Danh mục</th>
            <th>Quản lý</th>
          </tr>
        </thead>
        <tbody>
          {sanPham.map((item) => {
            const timid=danhMuc.find(a=>a.id_danhmuc ==item.id_danhmuc);
            return (
              <tr key={item.id_sanpham}>
                <td className="d-none d-md-table-cell">{item.id_sanpham}</td>
                <td>{item.ten_sanpham}</td>
                <td className="d-none d-md-table-cell">{item.gia_sanpham}</td>
                <td className="d-none d-md-table-cell">{item.soluong_sanpham}</td>
                <td><img src={`${IMG}/${item.hinhanh_sanpham}`} height={50} width={90} /></td>
                <td className="d-none d-md-table-cell">{ item.tomtat_sanpham.substring(0,20)+"..."}</td>
               
                <td>{item.tinhtrang_sanpham==1?"Kích hoạt":"Chưa kích hoạt"}</td>
                <td>{timid ? timid.ten_danhmuc : "Error"}</td> 
                <td>
                  <Link to={`Sua/${item.id_sanpham}`}>
                    <Button  variant="primary">Sửa</Button>|  
                  </Link>
                <Link to={`Xoa/${item.id_sanpham}`}>
                <Button  variant="danger">Xóa</Button>
                </Link>
                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SanPham
