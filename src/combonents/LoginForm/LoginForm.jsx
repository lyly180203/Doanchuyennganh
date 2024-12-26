  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { auth } from '../../firebase';
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import './LoginForm.css';
  import MenuAdmin from '../MenuAdmin/Brand';
  import URL from '../consts/url';
  const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminstatus,setadminstatus]=useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      // Kiểm tra và tạo mới giỏ hàng nếu không tồn tại
      const checkAndResetCart = () => {
        try {
          const cart = localStorage.getItem('cart');
          console.log('Giỏ hàng hiện tại:', cart);
          
          if (!cart || cart === 'null' || cart === 'undefined') {
            localStorage.setItem('cart', JSON.stringify([]));
          }
        } catch (error) {
          console.error('Lỗi khi kiểm tra giỏ hàng:', error);
          localStorage.setItem('cart', JSON.stringify([]));
        }
      };

      checkAndResetCart();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        // Xóa toàn bộ dữ liệu trong localStorage trước
        localStorage.removeItem('userName');
        localStorage.removeItem('id_dangky');
        localStorage.removeItem('cart');
        localStorage.removeItem('admin_status');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('adminPhone');
        localStorage.removeItem('adminPassword');
        const response = await fetch(URL+'/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (result.success) {
          // Khởi tạo giỏ hàng mới với mảng rỗng
          localStorage.setItem('cart', JSON.stringify([]));
          
          // Lưu thông tin người dùng mới
          localStorage.setItem('userName', result.name);
          localStorage.setItem('id_dangky', result.id_dangky);
          // Bo sung tu Long
          localStorage.setItem('admin_status', result.admin_status);
          localStorage.setItem('adminEmail',result.adminEmail);
          localStorage.setItem('adminPhone',result.adminPhone);
          localStorage.setItem('adminPassword',result.adminPassword);
          
          setadminstatus(result.admin_status);
          // Log để kiểm tra
          console.log('Admin status',localStorage.getItem('admin_status'));
          console.log('Giỏ hàng sau khi đăng nhập:', JSON.parse(localStorage.getItem('cart')));
          console.log('Thông tin người dùng:', {
            userName: localStorage.getItem('userName'),
            id_dangky: localStorage.getItem('id_dangky')
          });

          alert(`Chào mừng, ${result.name}! Đã đến với Flower!`);
          
          // Điều hướng về trang chủ
          if(result.admin_status===1){
            navigate('/admin', { replace: true });
          }else{
            navigate('/', { replace: true });
          }
         
        } else {
          alert(`Đăng nhập thất bại. Lỗi: ${result.error}`);
        }
      } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    };

    const handleGoogleLogin = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Gửi thông tin user lên server PHP
        const response = await fetch(URL+'/google_login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: user.displayName,
            google_id: user.uid
          }),
        });

        const data = await response.json();
        if (data.success) {
          localStorage.setItem('cart', JSON.stringify([]));
          localStorage.setItem('userName', data.name);
          localStorage.setItem('id_dangky', data.id_dangky);
          alert(`Chào mừng, ${data.name}!`);
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        alert('Đăng nhập thất bại');
      }
    };

    return (
      <div className="login-form-container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button className="buttons" type="submit">Đăng nhập</button>
        </form>
        <div className="google-login-container">
          <button onClick={handleGoogleLogin} className="google-login-button">
            <img src="https://www.google.com/favicon.ico" alt="Google" />
            Đăng nhập bằng Google
          </button>
        </div>
      </div>
    );
  };

  export default LoginForm;
