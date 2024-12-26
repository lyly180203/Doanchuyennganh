import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Thêm useNavigate và Link để sử dụng hàm chuyển hướng và liên kết
import './HoaCategory.css';
import { Pagination } from 'react-bootstrap';
import URL from '../consts/url';
import IMG from '../consts/img';

const HoaCategory = () => {
  const { id_danhmuc } = useParams();
  const categoryId = id_danhmuc.toString();
  const [hoa, setHoa] = useState([]);
  const [tieude, setTieude] = useState('');
  const [noidung, setNoidung] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();


  const getBannerImage = () => {
    switch (categoryId) {
      case '1':
        return `/${IMG}/bannersinhnhat.jpg`; 
      case '9':
        return `/${IMG}/bannerhoachiabuon.jpg`;
      case '10':
        return `/${IMG}/bannerhoale.jpg`;
      case '105':
        return `/${IMG}/hoachucmung.jpg`;
      default:
        return ''; 
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/get_hoa.php?id_danhmuc=${id_danhmuc}&searchTerm=${searchTerm}&sortOrder=${sortOrder}`);
        const data = await response.json();

        console.log('Data:', data); // Thêm câu lệnh debug để xem dữ liệu nhận được

        if (data.sanpham && data.sanpham[0].message) {
          console.log("Không có dữ liệu:", data.sanpham[0].message);
          setHoa([]);
        } else {
          setHoa(data.sanpham.filter(item => item.id_sanpham !== 0));
        }

        if (data.danhmuc && data.danhmuc.message) {
          console.log("Không có mô tả:", data.danhmuc.message);
          setTieude('');
          setNoidung('');
        } else {
          setTieude(data.danhmuc.tieude);
          setNoidung(data.danhmuc.noidung);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      }
    };

    fetchData();
  }, [id_danhmuc, searchTerm, sortOrder]);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hoa.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <section className="banner" style={{ backgroundImage: `url(${getBannerImage()})` }}></section>

      <div className="product-container">
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={sortOrder} onChange={handleSort}>
            <option value="">Lọc theo giá</option>
            <option value="low-to-high">Giá từ thấp đến cao</option>
            <option value="high-to-low">Giá từ cao đến thấp</option>
          </select>
        </div>
        <div className="product-list">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div className="product" key={item.id_sanpham}>
                <Link to={`/chitietsanpham/${item.id_sanpham}`}>
                  <img src={`${IMG}/${item.hinhanh_sanpham}`} alt={item.ten_sanpham} />
                </Link>
                <div className="product-info">
                  <h3>{item.ten_sanpham}</h3>
                  <p>{item.gia_sanpham.toLocaleString()}đ</p>
                  <button onClick={() => addToCart(item)}>Giỏ hàng</button>
                </div>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm này!!!</p>
          )}
        </div>
        <Pagination>
          {[...Array(Math.ceil(hoa.length / itemsPerPage)).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      
      <div className="bordered-content">
        <h2>{tieude}</h2>
        <div dangerouslySetInnerHTML={{ __html: noidung }}></div>
      </div>
    </div>
  );
};

export default HoaCategory;
