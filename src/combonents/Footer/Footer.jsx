import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import IMG from '../consts/img';

const Footer = () => {
  return (
    <section className="footer">
      <div className="box-containerr">
        <div className="boxx">
          <h3>Flower <i className="fas fa-shopping-basket"></i></h3>
          <p>Địa chỉ: 180 Cao Lỗ Phường 4 Quận 8 Tp.HCM</p>
          <div className="share">
            <Link to="#" className="fab fa-facebook"></Link>
            <Link to="#" className="fab fa-twitter"></Link>
            <Link to="#" className="fab fa-instagram"></Link>
            <Link to="#" className="fab fa-linkedin-in"></Link>
          </div>
        </div>

        <div className="boxx">
          <h3>Thông tin liên lạc</h3>
          <Link to="#" className="links"><i className="fas fa-phone"></i> +123-456-789</Link>
          <Link to="#" className="links"><i className="fas fa-phone"></i> +111-432-789</Link>
          <Link to="#" className="links"><i className="fas fa-envelope"></i> flower@gmail.com</Link>
        </div>

        <div className="boxx">
          <h3>Đường dẫn nhanh</h3>
          <Link to="/" className="links"><i className="fas fa-arrow-right"></i> Trang chủ</Link>
          <Link to="/Sanpham" className="links"><i className="fas fa-arrow-right"></i> Sản phẩm</Link>
          <Link to="/Danhgia" className="links"><i className="fas fa-arrow-right"></i> Đánh giá</Link>
          <Link to="/Lienhe" className="links"><i className="fas fa-arrow-right"></i> Liên hệ</Link>
        </div>

        <div className="boxx">
          <h3>Bản tin</h3>
          <p>Hoa tươi. Mở nguyên tuần 8:00 AM - 10:00 PM. Đặt hàng online 24/7.</p>
          <img src={`${IMG}/payment.png`} className="payment-img" alt="Payment Methods" />
        </div>
      </div>
    </section>
  );
}

export default Footer;
