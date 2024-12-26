import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import URL from '../URL';
function Them({onUpdate }) {
  const [formData, setformData] = useState({
    nameUser: "",
    email: "",
    password: "",
    phone: "",
    admin_status: "0"
  });
  
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonData = {
        nameUser: formData.nameUser,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        admin_status: formData.admin_status,
    };

    const url = URL + "user/them.php";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            alert(result.message || "Thêm người dùng thành công!");
            onUpdate(); // Gọi lại danh sách người dùng
        } else {
            alert(result.message || "Có lỗi xảy ra!");
        }
    } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
        alert("Không thể gửi dữ liệu. Vui lòng kiểm tra lại!");
    }
};


  return (
    <div className='container'>
      <h2>Thêm danh mục</h2>
      { <form onSubmit={handleSubmit}>
        <Form.Label className="mb-3">Tên </Form.Label>
        <Form.Control
            type='text'
            className="form-control"
            name="nameUser"
            value={formData.nameUser}
            onChange={handleChange}
        />
         <Form.Label className="mb-3">Email</Form.Label>
        <Form.Control
          type='email'
          className="form-control"
          placeholder='example@gmail.com'
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete=''
        />
         <Form.Label className="mb-3">Password</Form.Label>
        <Form.Control
          type='password'
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete='current-password'
          
        />
         <Form.Label className="mb-3">Phone</Form.Label>
        <Form.Control
         className="form-control"
         name="phone"
         value={formData.phone}
         onChange={handleChange}
        />
         <Form.Label className="mb-3">Trạng thái</Form.Label>
        <Form.Select
          className="form-control"
          name="admin_status"
          value={formData.admin_status}
          onChange={handleChange}
          >
            <option value="0">Trạng thái</option>  
            <option value="1">Admin</option>
            <option value="2">Người dùng</option>

          </Form.Select>
         
        <Button type="submit" variant="primary" className="mt-3">Thêm</Button>
      </form> }
    </div>
  );
}

export default Them;
