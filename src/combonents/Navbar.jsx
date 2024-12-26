import React, { useState, useEffect } from 'react';
import './Navbar.css';
import IMG from './consts/img'; 
import URL from './consts/url';


import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menu, setMenu] = useState("Trang chu");
    const [userName, setUserName] = useState('');
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Lấy tên người dùng từ localStorage
        const storedUserName = localStorage.getItem('userName');
        const id_dangky = localStorage.getItem('id_dangky');
        
        if (storedUserName) {
            setUserName(storedUserName);
            
            // Lấy số lượng sản phẩm trong giỏ hàng
            if (id_dangky) {
                fetch(`${URL}/get_cart_items.php?id_dangky=${id_dangky}`)
                    .then(response => response.json())
                    .then(data => {
                        if (Array.isArray(data)) {
                            // Tính tổng số lượng sản phẩm
                            const totalItems = data.reduce((sum, item) => sum + parseInt(item.soluong_sanpham), 0);
                            setCartCount(totalItems);
                        }
                    })
                    .catch(error => {
                        console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
                    });
            }
        }
    }, []);

    return (
        <div className="navbar">
            <img src={`${IMG}/logo.png`} alt="Logo" className="logo" />
            <ul className="navbar-menu">
                <li onClick={() => setMenu("Trangchu")} className={menu === "Trang chu" ? "active" : ""}>
                    <Link to="/">Trang chủ</Link>
                </li>
                <li onClick={() => setMenu("Sanpham")} className={menu === "San pham" ? "active" : ""}>
                    <Link to="/Sanpham">Sản phẩm</Link>
                </li>
                <li onClick={() => setMenu("Danhgia")} className={menu === "Danh gia" ? "active" : ""}>
                    <Link to="/Danhgia">Đánh giá</Link>
                </li>
                <li onClick={() => setMenu("Lienhe")} className={menu === "Lien he" ? "active" : ""}>
                    <Link to="/Lienhe">Liên hệ</Link>
                </li>
            </ul>
            <div className="navbar-right">
                <Link to="/Cart" className="navbar-search-icon">
                    <img src={`${IMG}/basket_icon.png`} alt="Giỏ hàng" />
                    {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
                </Link>
                <div className="account-link">
                    <Link className="user" to="#"><i className="fa fa-user"></i> {userName ?  `${userName}` : 'Tài khoản'}</Link>
                    <div className="account-dropdown">
                        {userName ? (
                            <Link to="/Dangxuat">Đăng xuất</Link>  
                        ) : (
                            <>
                                <Link to="/LoginForm">Đăng nhập</Link>
                                <Link to="/RegistrationForm">Đăng ký</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
