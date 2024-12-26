import React, { useEffect, useState } from 'react';
import './Danhgia.css';
import URL from '../consts/url';
import IMG  from '../consts/img'; // Giữ nguyên đoạn này

const Danhgia = () => {
  const [danhGia, setDanhGia] = useState([]);
  const url = `${URL}/danhgia.php`;

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log("Không có dữ liệu:", data.message);
        } else {
          setDanhGia(data);
          console.log(data);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, []);

  return (
    <section className="review" id="review">
      <h1 className="heading">Đánh giá khách hàng</h1>
      <div className="box-container">
        {danhGia.map((item, index) => (
          <div className="box" key={index}>
            <div className="stars">
              {[...Array(item.danhgia)].map((_, i) => (
                <i className="fas fa-star" key={i}></i>
              ))}
            </div>
            <p>{item.noidung}</p>
            <div className="user">
              {/* Đảm bảo hình ảnh được lấy đúng đường dẫn */}
              <img src={`${IMG}/${item.hinhanh}`} alt={item.ten} />
              <div className="user-info">
                <h3>{item.ten}</h3>
                <span>khách hàng khen</span>
              </div>
            </div>
            <span className="fas fa-quote-right"></span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Danhgia;
