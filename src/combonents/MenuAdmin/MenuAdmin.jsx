import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DanhMuc from './QLDanhMuc/Danhmuc';  // Import component
import './MenuAdmin.css';

function MenuAdmin() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/quanlytaikhoan">Quản lý tài khoản</Link></li>
          <li><Link to="/quanlysanpham">Quản lý sản phẩm</Link></li>
          <li><Link to="/quanlydanhmuc">Quản lý danh mục</Link></li>
          <li><Link to="/xinchao">Xin chào</Link></li>
        </ul>

        <Routes>
          <Route path="/quanlydanhmuc/*" element={<DanhMuc />} />

        </Routes>
      </div>
    </Router>
  );
}

export default MenuAdmin;
