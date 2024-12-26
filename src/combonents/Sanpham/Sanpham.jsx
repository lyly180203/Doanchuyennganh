import React, { useEffect, useState } from 'react';
import './Sanpham.css';
import URL from '../consts/url';
import IMG from '../consts/img';
import Pagination from 'react-bootstrap/Pagination';
import { Link, useNavigate } from 'react-router-dom';

const Sanpham = () => {
  const [sanpham, setSanpham] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${URL}/sanpham.php`)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log("Không có dữ liệu:", data.message);
        } else {
          setSanpham(data);
          console.log(data);
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

    fetch(`${URL}/add_to_cart.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_sanpham: item.id_sanpham,
        ten_sanpham: item.ten_sanpham,
        gia_sanpham: item.gia_sanpham,
        soluong_sanpham: 1,
        hinhanh_sanpham: item.hinhanh_sanpham,
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
      return response.json(); // Parse JSON từ phản hồi
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = sanpham.slice(offset, offset + itemsPerPage);
  const totalPages = Math.ceil(sanpham.length / itemsPerPage);

  return (
    <div className="sanphammm">
      <h1 className="headinggg">Tất cả sản phẩm</h1>
      <div className="box-containerrr">
        {currentItems.map((item, index) => (
          <div key={index} className="boxxx">
            {item.discount && <span className="discounttt">-{item.discount}%</span>}
            <div className="imageee">
              <Link to={`/chitietsanpham/${item.id_sanpham}`}>
                <img src={`${IMG}/${item.hinhanh_sanpham}`} alt={item.ten_sanpham} />
              </Link>
              <div className="iconsss">
                <button onClick={() => addToCart(item)} className="cart-btnnn">Giỏ hàng</button>
              </div>
            </div>
            <div className="contenttt">
              <h3>{item.ten_sanpham}</h3>
              <div className="priceee">
                {formatPrice(item.gia_sanpham)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export default Sanpham;
