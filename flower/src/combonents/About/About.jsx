import React, { useEffect, useState } from 'react';
import './About.css';
// import { assets } from '../../assets/assets';
import IMG from '../consts/img';
import URL from '../consts/url';
const About = () => {
  const [gioithieu, setGioithieu] = useState([]);
  const url = URL+'/gioithieu.php';

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log("Không có dữ liệu:", data.message);
        } else {
          setGioithieu(data);
          console.log(data);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, []);

  return (
    <div className='about'>
        <h1 className='heading'><span>Giới </span>thiệu</h1>
        <div className='row'>
            <div className='video-container'>
                <video src={`${IMG}/video.mp4`} controls></video>
                <h3>Hoa bán chạy nhất</h3>
                {/* <img src={`${IMG}/your_image_name.jpg`} alt="Mô tả hình ảnh" /> */}
            </div>
            <div className='content'>
              <ul>
                {gioithieu.map((item, index) => (
                  <li key={index} className='product-list-items'>
                    <strong>{item.tieude}:</strong> {item.noidung}
                  </li>
                ))}
              </ul>
            </div>
        </div>
    </div>
  );
}

export default About;
