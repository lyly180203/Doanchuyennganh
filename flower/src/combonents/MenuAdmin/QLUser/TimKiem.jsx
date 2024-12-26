import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import URL from '../URL';

function TimKiem({ tk }) {
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    email: '',
    status: '',
  });

  const handleChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL + 'user/timkiem.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchCriteria),
      });
      const result = await response.json();
      if (result.success) {
        tk(result.data); // Truyền kết quả lên component cha
      } else {
        alert(result.message || 'Không tìm thấy dữ liệu!');
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
    }
  };

  return (
    <Form onSubmit={handleSearch}>
      <div className="mb-3">
        <Form.Label htmlFor="name">Tên:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter name"
          value={searchCriteria.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <Form.Label htmlFor="email">E-Mail:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={searchCriteria.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <Form.Label htmlFor="status">Trạng thái:</Form.Label>
        <Form.Select
          name="status"
          value={searchCriteria.status}
          onChange={handleChange}
        >
          <option value="0">Trạng thái</option>
          <option value="1">Admin</option>
          <option value="2">Người dùng</option>
        </Form.Select>
      </div>

      <Button type="submit" className="btn btn-primary w-100">
        Lọc
      </Button>
    </Form>
  );
}

export default TimKiem;
