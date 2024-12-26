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
    const url=URL+"danhmuc/get_danh_muc.php";
    const urlxoa=URL+"danhmuc/xoa.php";
    useEffect(() => {
        // Lấy dữ liệu danh mục từ API
        //fetch('http://lyly.io.vn/php_backend/danhmuc/get_danh_muc.php')
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const danhMucCanSua = data.find(item => item.id_danhmuc == id);
                if (danhMucCanSua) {
                    setxoaTen(danhMucCanSua.ten_danhmuc);
                    setIDxoaTen(danhMucCanSua.id_danhmuc);
                }
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Gửi yêu cầu xóa đến API
        //fetch('http://lyly.io.vn/php_backend/danhmuc/xoa.php'
        fetch(urlxoa, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_danhmuc: IDxoaTen }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Xóa danh mục thành công!');
                    navigate('/admin/danhmuc');
                    onUpdate(); // Cập nhật danh sách danh mục
                } else {
                    

                    alert('Xóa danh mục thất bại: ' + data.message);
                }
            })
            .catch();
    };

    return (
        <div>
            <h2>Xóa danh mục</h2>
            <h3>Bạn có chắc chắn muốn xóa loại danh mục này?</h3>
            <form onSubmit={handleSubmit}>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" readOnly value={IDxoaTen || ''} />
                <Form.Label>Tên danh mục</Form.Label>
                <Form.Control type="text" readOnly value={xoaTen || ''} />
                <Button type="submit" variant="danger" className="mt-3">Xóa</Button>

            </form>
        </div>
    );
}

export default Xoa;
