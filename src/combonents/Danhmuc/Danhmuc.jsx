import React, { useEffect, useState } from 'react';
import './Danhmuc.css';
import { Link, useNavigate } from 'react-router-dom';
import URL from '../MenuAdmin/URL';
const Danhmuc = () => {
  const [danhMuc, setDanhMuc] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const url = URL+'/danhmuc/get_danh_muc.php';
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log("Không có dữ liệu:", data.message);
        } else {
          setDanhMuc(data);
          console.log(data);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, []);

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleSearch = () => {
    if (searchTerm.toLowerCase().includes('hoa sinh nhật')) {
      navigate('/category/1'); // Điều hướng đến trang Hoa Sinh Nhật
    } else if (searchTerm.toLowerCase().includes('hoa chia buồn')) {
      navigate('/category/9'); // Điều hướng đến trang Hoa Chia Buồn
    } else if (searchTerm.toLowerCase().includes('hoa lễ')) {
      navigate('/category/10'); // Điều hướng đến trang Hoa Lễ
    } else if (searchTerm.toLowerCase().includes('hoa khai trương')) {
      navigate('/category/105'); // Điều hướng đến trang Hoa Khai Trương
    } else {
      alert('Không tìm thấy kết quả phù hợp'); // Thông báo nếu không tìm thấy kết quả
    }
  };

  return (
    <header>
      <nav>
        <ul className='productlist'>
          <li className='product-list-title'><i className="fa-solid fa-bars"></i>DANH MỤC SẢN PHẨM</li>
          {danhMuc.map((item) => (
            <li key={item.id_danhmuc} className='product-list-item'>
              <Link to={`/category/${item.id_danhmuc}`}>{item.ten_danhmuc}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="search">
        <input 
          type="text" 
          placeholder="Bạn đang tìm gì?" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button> {/* Sử dụng hàm handleSearch */}
      </div>
      <div className="contactt">
        <i className="fa-solid fa-phone"></i>
        <div>
          <p>0656.789.456</p>
          <p>Hỗ trợ 24/7</p>
        </div>
      </div>
    </header>
  );
}

export default Danhmuc;
