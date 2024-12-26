import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';
import URL from '../consts/url';
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''  
  });

  const navigate = useNavigate();

  // Định nghĩa hàm handleChange để xử lý sự thay đổi của các trường input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
  
    if (formData.password.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }

    try {
      const response = await fetch(URL+'/dangky.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      console.log(result); // Kiểm tra kết quả trả về từ server
      if (result.success) {
        alert('Đăng ký thành công!');
        navigate('/LoginForm');
      } else {
        alert(`Đăng ký thất bại. Lỗi: ${result.error}`);
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ và tên:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            type="tel"
            name="phone"  
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Xác nhận mật khẩu:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button className='btndangky' type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
