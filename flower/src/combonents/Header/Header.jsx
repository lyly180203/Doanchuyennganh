import React, { useEffect, useState } from 'react';
import './Header.css';
import URL from '../consts/url';
const Header = () => {
  const [banner, setBanner] = useState([]);
  const url = URL+'/banner.php';

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log("Không có dữ liệu:", data.message);
        } else {
          setBanner(data);
          console.log(data);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, []);

  return (
    <div className='header'>
      <div className="header-contents">
        <ul>
          {banner.map((item, index) => (
            <li key={index} className='product-list-items'>
              <strong>{item.tieude}</strong> 
              {item.noidung}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
