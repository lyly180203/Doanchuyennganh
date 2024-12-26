import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import './Danhmuc.css';
import Them from './Them';
import Sua from './Sua';
import Xoa from './Xoa';
import URL from '../URL';
function DanhMuc() {
  const [danhMuc, setDanhMuc] = useState([]);
  const navigate = useNavigate();
  const url=URL+"danhmuc/get_danh_muc.php";
  const fetchDanhMuc = () => {
     fetch(url)
    //fetch('http://lyly.io.vn/php_backend/danhmuc/get_danh_muc.php')
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log("Không có dữ liệu:", data.message);
        } else {
          setDanhMuc(data);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  };

  useEffect(() => {
    fetchDanhMuc();
  }, []);
  return (
    <div className='container'>
      <Link to="them" className='btn btn-primary'>Thêm danh mục</Link>
      <Routes>
        {/* Định nghĩa tuyến đường con */}
        <Route path="them" element={<Them onUpdate={fetchDanhMuc} />} />
       
        <Route path="Sua/:id" element={<Sua onUpdate={fetchDanhMuc}/>}></Route>
        <Route path="Xoa/:id" element={<Xoa onUpdate={fetchDanhMuc}/>}></Route>
      </Routes>
      
      <h2>Quản lý danh mục</h2>
      <table style={{ borderSpacing: "10px", textAlign: 'center', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Quản lý</th>
          </tr>
        </thead>
        <tbody>
          {danhMuc.map((item) => (
            <tr key={item.id_danhmuc}>
              <td>{item.id_danhmuc}</td>
              <td>{item.ten_danhmuc}</td>
              <td>
                <Link to={`Sua/${item.id_danhmuc}`}>
                  <Button  variant="primary">Sửa</Button>|  
                </Link>
               <Link to={`Xoa/${item.id_danhmuc}`}>
               <Button  variant="danger">Xóa</Button>
               </Link>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DanhMuc;
