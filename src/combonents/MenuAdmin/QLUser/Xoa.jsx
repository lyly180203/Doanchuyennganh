import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import URL from '../URL';
function Xoa({ onUpdate }) {
    const [xoaTen, setxoaTen] = useState('');
    const [IDxoaTen, setIDxoaTen] = useState('');
    const [gmail, setgmail] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const url=URL+"user/get_user.php";
    const urlxoa=URL+"user/xoa.php";
    useEffect(() => {
        // Lấy dữ liệu danh mục từ API
        //fetch('http://lyly.io.vn/php_backend/danhmuc/get_danh_muc.php')
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const danhMucCanSua = data.find(item => item.id_dangky == id);
                if (danhMucCanSua) {
                    setxoaTen(danhMucCanSua.name);
                    setIDxoaTen(danhMucCanSua.id_dangky);
                    setgmail(danhMucCanSua.email);
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
            body: JSON.stringify({ id_dangky: IDxoaTen }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Xóa tài khoản thành công!');
                    navigate('/admin/profile');
                    onUpdate(); // Cập nhật danh sách danh mục
                } else {
                    

                    alert('Xóa tài khoản thất bại: ' + data.message);
                }
            })
            .catch();
    };

    return (
        <div>
            <h2>Xóa tài khoản</h2>
            <h3>Bạn có chắc chắn muốn xóa loại tài khoản này?</h3>
            <form onSubmit={handleSubmit}>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" readOnly value={IDxoaTen || ''} />
                <Form.Label>Tên tài khoản</Form.Label>
                <Form.Control type="text" readOnly value={xoaTen || ''} />
                <Form.Label>Gmail</Form.Label>
                <Form.Control type="text" readOnly value={gmail || ''} />
                <Button type="submit" variant="danger" className="mt-3">Xóa</Button>

            </form>
        </div>
    );
}

export default Xoa;
