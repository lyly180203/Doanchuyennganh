import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import URL from '../URL';
function Xoa({ onUpdate }) {
    const [xoaTen, setxoaTen] = useState('');
    const [IDxoaTen, setIDxoaTen] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy dữ liệu danh mục từ API
        //fetch('http://lyly.io.vn/php_backend/danhmuc/get_danh_muc.php')
        fetch(URL+'/sanpham/get_san_pham.php')
            .then(response => response.json())
            .then(data => {
                const setsp = data.find(item => item.id_sanpham == id);
                if (setsp) {
                    setxoaTen(setsp.ten_sanpham);
                    setIDxoaTen(setsp.id_sanpham);
                }
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Gửi yêu cầu xóa đến API
        //fetch('http://lyly.io.vn/php_backend/danhmuc/xoa.php'
        fetch(URL+'/sanpham/xoa.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_sanpham: IDxoaTen }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Xóa sản phẩm thành công!');
                    navigate('/admin/sanpham');
                    onUpdate(); // Cập nhật danh sách sản phẩm
                } else {
                    

                    alert('Xóa sản phẩm thất bại: ' + data.message);
                }
            })
            .catch();
    };

    return (
        <div>
            <h2>Xóa danh mục</h2>
            <h3>Bạn có chắc chắn muốn xóa loại sản phẩm này?</h3>
            <form onSubmit={handleSubmit}>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" readOnly value={IDxoaTen || ''} />
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control type="text" readOnly value={xoaTen || ''} />
                <Button type="submit" variant="danger" className="mt-3">Xóa</Button>

            </form>
        </div>
    );
}

export default Xoa;
