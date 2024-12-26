import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate  } from 'react-router-dom';
import URL from '../URL';
function Sua( {onUpdate}) {
    const [suaTen, setsuaTen] = useState('');
    const [IDsuaTen, setIDsuaTen] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const url=URL+'danhmuc/get_danh_muc.php';
    const urlsua=URL+'danhmuc/sua.php';
    useEffect(( ) => {
        fetch(url)
       // fetch('http://lyly.io.vn/php_backend/danhmuc/get_danh_muc.php')
            .then(response => response.json())
            .then(data => {
                // Tìm kiếm danh mục có id trùng với id từ URL
                const danhMucCanSua = data.find(item => item.id_danhmuc == id);
                if (danhMucCanSua) {
                    setsuaTen(danhMucCanSua.ten_danhmuc);
                    setIDsuaTen(danhMucCanSua.id_danhmuc);
                }
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }, [id]);

    const handleSubmit = (e) => {
      e.preventDefault();

      // Gửi yêu cầu sửa đến API
      //fetch('http://lyly.io.vn/php_backend/danhmuc/sua.php'
      fetch(urlsua, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_danhmuc: IDsuaTen, ten_danhmuc: suaTen }),
      })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Cập nhật danh mục thành công!');
                  // Điều hướng về trang danh sách danh mục
                  navigate('/admin/danhmuc');
                  onUpdate();
              } else {
                  alert('Cập nhật danh mục thất bại: ' + data.message);
              }
          })
          .catch(error => console.error('Lỗi khi gửi yêu cầu:', error));
  };

    return (
        <div>
            <h2>Sửa danh mục</h2>
            <form onSubmit={handleSubmit}>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" readOnly value={IDsuaTen || ''} />
                <Form.Label>Tên danh mục</Form.Label>
                <Form.Control
                    type="text"
                    value={suaTen || ''}
                    onChange={(e) => setsuaTen(e.target.value)}
                />
                <Button type="submit" variant="primary" className="mt-3">Sửa</Button>
            </form>
        </div>
    );
}

export default Sua;
