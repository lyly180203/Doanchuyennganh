import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Chitietssanpham.css';
import URL from '../consts/url';
import IMG from '../consts/img';

const Chitietsanpham = () => {
  const { id_sanpham } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  useEffect(() => {
    // Lấy thông tin chi tiết sản phẩm
    fetch(`${URL}/get_product_detail.php?id_sanpham=${id_sanpham}`)
      .then(response => response.json())
      .then(data => setProductDetails(data))
      .catch(error => console.error('Lỗi khi lấy thông tin chi tiết sản phẩm:', error));
  }, [id_sanpham]);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    const id_dangky = localStorage.getItem('id_dangky');
    console.log('id_dangky from localStorage:', id_dangky);

    if (!id_dangky) {
      alert('Không có thông tin người dùng.');
      return;
    }

    fetch(`${URL}/add_to_cart.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_sanpham: productDetails.id_sanpham,
        ten_sanpham: productDetails.ten_sanpham,
        gia_sanpham: productDetails.gia_sanpham,
        soluong_sanpham: quantity,
        hinhanh_sanpham: productDetails.hinhanh_sanpham,
        id_dangky: id_dangky
      })
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
        navigate('/Cart'); // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
      }
    })
    .catch(error => {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
      alert('Có lỗi khi thêm sản phẩm vào giỏ hàng!');
    });
  };

  if (!productDetails) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <div className="productx">
        <div className="main-image">
          <img src={`${IMG}/${productDetails.hinhanh_sanpham}`} alt={productDetails.ten_sanpham} />
        </div>
        <div className="product-infoo">
          <h2>{productDetails.ten_sanpham}</h2>
          <p>{productDetails.tomtat_sanpham}</p>
          <div className="quantity">
            <label htmlFor="quantity">Số lượng:</label>
            <button className="decrease" onClick={handleDecrease}>-</button>
            <input type="number" id="quantity" value={quantity} min="1" readOnly />
            <button className="increase" onClick={handleIncrease}>+</button>
          </div>
          <p>Giá bán: <span className="price">{productDetails.gia_sanpham} đ</span></p>
          <button className="buy" onClick={addToCart}>Mua ngay</button>
          <button className="add-to-cart" onClick={addToCart}>Thêm vào giỏ</button>

          <div className="product-benefits">
            <ul>
              <li><i className="fa-solid fa-truck"></i> Giao hàng nhanh 2 giờ trong 5km</li>
              <li><i className="fas fa-gift"></i> Miễn phí thiệp chúc mừng</li>
              <li><i className="fa-brands fa-pagelines"></i> Đảm bảo hoa tươi trong 3 ngày</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="containerx">
        <h1 className="hoa">Mô tả sản phẩm </h1>
        <div className="no-indentt">
          <p>{productDetails.noidung_sanpham}</p>
        </div>
      </div>
    </div>
  );
};

export default Chitietsanpham;
