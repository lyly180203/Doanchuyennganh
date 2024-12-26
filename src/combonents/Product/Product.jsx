import React, { useEffect, useState } from 'react';
import './Product.css';
import { Link, useNavigate } from 'react-router-dom';
import URL from '../consts/url';
import IMG from '../consts/img';

const Product = () => {
  const [sanpham, setSanpham] = useState([]);
  const url = `${URL}/sanpham.php`;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log("Không có dữ liệu:", data.message);
        } else {
          // Lấy một vài sản phẩm từ các danh mục mong muốn
          const hoaLe = data.filter(item => item.id_danhmuc === 10).slice(0, 3);
          const hoaSinhNhat = data.filter(item => item.id_danhmuc === 1).slice(0, 3);
          const hoaKhaiTruong = data.filter(item => item.id_danhmuc === 105).slice(0, 3);
          
          // Kết hợp các sản phẩm vào một mảng
          const selectedProducts = [...hoaLe, ...hoaSinhNhat, ...hoaKhaiTruong];
          setSanpham(selectedProducts);
          console.log(selectedProducts);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, []);

  const addToCart = (item) => {
    const id_dangky = localStorage.getItem('id_dangky');
    console.log('id_dangky from localStorage:', id_dangky);

    if (!id_dangky) {
      alert('Không có thông tin người dùng.');
      return;
    }

    const cartData = {
      id_sanpham: item.id_sanpham,
      ten_sanpham: item.ten_sanpham,
      gia_sanpham: item.gia_sanpham,
      soluong_sanpham: 1,
      hinhanh_sanpham: item.hinhanh_sanpham,
      id_dangky: id_dangky
    };
    console.log('Dữ liệu gửi lên server:', cartData);

    fetch(`${URL}/add_to_cart.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartData)
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          console.error('Lỗi từ server:', text);
          throw new Error('Lỗi phản hồi từ server');
        });
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        alert("Có lỗi xảy ra: " + data.message);
      } else {
        alert(data.message);
        // navigate('/Cart');
      }
    })
    .catch(error => {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
      alert('Có lỗi khi thêm sản phẩm vào giỏ hàng!');
    });
  };

  return (
    <div className="productt">
      <h1 className="heading">Sản phẩm <span>mới nhất</span></h1>
      <div className="box-container">
        {sanpham.map((item, index) => (
          <div key={index} className="box">
            {item.discount && <span className="discount">-{item.discount}%</span>}
            <div className="image">
              <Link to={`/chitietsanpham/${item.id_sanpham}`}>
                <img src={`${IMG}/${item.hinhanh_sanpham}`} alt={item.ten_sanpham} /> 
              </Link>
              <div className="icons">
                <button onClick={() => addToCart(item)} className="cart-btn">Giỏ hàng</button>
              </div>
            </div>
            <div className="content">
              <h3>{item.ten_sanpham}</h3>
              <div className="price">
                {item.gia_sanpham}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
