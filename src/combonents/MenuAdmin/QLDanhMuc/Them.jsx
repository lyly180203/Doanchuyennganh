import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import URL from '../URL';
function Them({ onAddSuccess,onUpdate }) {
  const [tenDanhMuc, setTenDanhMuc] = useState('');
  const url=URL+'danhmuc/them.php';
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tenDanhMuc.trim()) {  // Kiểm tra xem tên danh mục có bị trống không
      alert('Vui lòng nhập tên danh mục!');
      return;
    }
    console.log('tenDanhMuc:', tenDanhMuc); 
    //fetch('http://lyly.io.vn/php_backend/danhmuc/them.php'
    fetch(url  , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ten_danhmuc: tenDanhMuc }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
       
        setTenDanhMuc('');
        onUpdate();
        alert('Thêm danh mục thành công');
      } else {
        alert('Thêm danh mục thất bại!');
      }
    })
    .catch(error => {
      console.error('Lỗi:', error);
    });
  };

  return (
    <div className='container'>
      <h2>Thêm danh mục</h2>
      <form onSubmit={handleSubmit}>
        <Form.Label className="mb-3">Tên danh mục</Form.Label>
        <Form.Control
          type="text"
          className="form-control"
          value={tenDanhMuc}
          onChange={(e) => setTenDanhMuc(e.target.value)}
        />
        <Button type="submit" variant="primary" className="mt-3">Thêm</Button>
      </form>
    </div>
  );
}

export default Them;
