import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dangxuat.css';
import URL from '../consts/url';

const Dangxuat = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Xóa dữ liệu localStorage trước
      localStorage.clear();
      
      // Đảm bảo xóa từng item riêng biệt
      localStorage.removeItem('cart');
      localStorage.removeItem('userName');
      localStorage.removeItem('id_dangky');

      // Gọi API đăng xuất
      const response = await fetch(`${URL}/logout.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.status === "success") {
        // Xóa state giỏ hàng nếu component Cart đang được mount
        if (window.cartComponent) {
          window.cartComponent.setCartItems([]);
        }

        alert('Đăng xuất thành công!');
        
        // Điều hướng và reload
        navigate('/', { replace: true });
        
        // Đợi một chút để đảm bảo localStorage đã được xóa
        setTimeout(() => {
          window.location.href = '/';
          window.location.reload(true);
        }, 100);
      }
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      alert('Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại.');
    }
  };

  return (
    <div className="logout-container">
      <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
};

export default Dangxuat;
