import React, {useEffect,useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DanhMuc from './QLDanhMuc/Danhmuc'; // Example component for category
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SanPham from './QLSanPham/SanPham';
import User from './QLUser/User';
import Dangky from './Dangky/Dangky';
import Dangnhap from './Dangnhap/Dangnhap';
import Thongtin from './Thongtin/Thongtin';
import Menu from './Dathang/Dathang';
import Dashboard  from './Dashboard/Dashboard';
import DH from '../Cart/DatHangCart';
import { GrDashboard } from 'react-icons/gr';
function Brand() {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setadminEmail] = useState("");
  const [adminPhone, setadminPhone] = useState("");
  const [adminpassword,setadminpassword]=useState("");
  const [adminstatus,setadminstatus]=useState("");
  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
        setAdminName(name);
    }
}, []);
const handleLogout = () => {
  localStorage.removeItem("userName"); // Xóa thông tin người dùng
  setAdminName(""); // Đặt lại state
  alert("Đăng xuất thành công");
  
};
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bg-dark col-auto col-md-2 min-vh-100">
          <nav className="navbar navbar-dark bg-dark flex-column align-items-start">
            <a className="navbar-brand text-white" href="#">
              <i className="fs-4 bi bi-android"></i> <span className="ms-1 fs-4">Hello  {adminName || "Guest"} </span>
            </a>
            <ul className="navbar-nav flex-column mt-4 w-100 ">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white bi bi-list"> Trang chủ</Link>
              </li>
              <li className='nav-item'>
                <Link to="/admin/dashboard" className='nav-link text-white bi bi-clock-history'> Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/danhmuc/" className="nav-link text-white bi bi-flower2"> Danh mục</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/sanpham/" className="nav-link text-white bi bi-hand-index-thumb "> Sản phẩm</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/profile" className="nav-link text-white bi bi-person-check"> Profile</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/dangky" className="nav-link text-white bi bi-person-add"> Đăng ký</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/login" className="nav-link text-white bi bi-person-add"> Đăng nhập</Link>
              </li>
              <li className='nav-item'>
                <Link to="/admin/login" className='nav-link text-white bi bi-person-dash-fill'   onClick={handleLogout}> Đăng xuất</Link>
              </li>
              <li className='nav-item'>
                <Link to="/admin/thongtin" className='nav-link text-white bi bi-person-dash-fill'> Thông tin</Link>
              </li>
              <li className='nav-item'>
                <Link to="/admin/dondat" className='nav-link text-white bi bi-clock-history'>  Đặt hàng</Link>
              </li>

              {/* Add more links as needed */}
            </ul>
          </nav>
        </div>

        {/* Content Area */}
        <div className="col p-4">
          <Routes>
            <Route path="/" element={<h2>Chào bạn {adminName || "Người dùng"}  </h2>} />
            <Route path="/dashboard/*" element={<Dashboard/>} />
            <Route path="/danhmuc/*" element={<DanhMuc />} />
            <Route path="/sanpham/*" element={<SanPham />} />
            <Route path="/profile/*" element={<User/>} />
            <Route path="/dangky/*" element={<Dangky/>} />
            <Route path="/login/*" element={<Dangnhap/>} />
          
            <Route path="/thongtin/*" element={<Thongtin/>} />  
            <Route path="/dondat/*" element={<Menu/>} />  
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Brand;
