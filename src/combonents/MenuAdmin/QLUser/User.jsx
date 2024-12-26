import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import TimKiem from './TimKiem'; // Giữ nguyên việc nhập liệu tìm kiếm
import Them from './Them';
import Xoa from './Xoa';
import Sua from './Sua';
import URL from '../URL';

function User() {
  const [user, setUser] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false); // Thêm state để quản lý việc hiển thị form tìm kiếm
  const url = URL + 'user/get_user.php';

  const fetchUser = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log('Không có dữ liệu:', data.message);
        } else {
          setUser(data);
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSearchResults = (results) => {
    setUser(results);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        {/* Khung hiển thị danh sách user */}
        <div className="col-lg-9 col-md-8 col-12">
          <div className="card">
            <div className="card-header">
              <h5>Danh sách người dùng</h5>
            </div>
            <div className="card-body">
              {/* Nội dung danh sách */}
              <Link to="them" className="btn btn-primary mb-3">
                Thêm người dùng
              </Link>
              <Routes>
                {/* Định nghĩa tuyến đường con */}
                <Route path="them" element={<Them onUpdate={fetchUser} />} />
                <Route path="Sua/:id" element={<Sua onUpdate={fetchUser} />} />
                <Route path="Xoa/:id" element={<Xoa onUpdate={fetchUser} />} />
              </Routes>

              <table className="table table-bordered table-striped mt-3">
                <thead style={{ color: 'blue' }}>
                  <tr>
     
                    <th>Tên</th>
                    {/* Cột Email và Phone sẽ bị ẩn khi kích thước màn hình nhỏ */}
                    {/*d-none dùng để ẩn kích thước khi nhỏ còn d-md-table-cell là hiển thi kích thước khi có cỡ trung bình */}
                    <th className="d-none d-md-table-cell">Email</th>
                    <th className="d-none d-md-table-cell">Phone</th>
                    <th>Trạng thái</th>
                    <th>Quản lý</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((item) => (
                    <tr key={item.id_dangky}>
                      <td>{item.name}</td>
                      {/* Ẩn Email và Phone khi màn hình nhỏ */}
                      <td className="d-none d-md-table-cell">{item.email}</td>
                      <td className="d-none d-md-table-cell">{item.phone}</td>
                      <td>{item.admin_status === 1 ? 'Admin' : 'Người dùng'}</td>
                      <td>
                        <Link to={`Sua/${item.id_dangky}`}>
                          <Button variant="primary">Sửa</Button>
                        </Link>{' '}
                        |{' '}
                        <Link to={`Xoa/${item.id_dangky}`}>
                          <Button variant="danger">Xóa</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Khung tìm kiếm */}
        <div className="col-lg-3 col-md-4 col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>Search</h5>
              {/* Biểu tượng lọc */}
              <Button
                variant="outline-secondary"
                onClick={() => setSearchVisible(!searchVisible)} // Chuyển trạng thái hiển thị form tìm kiếm
              >
                <i className="bi bi-filter"></i> Lọc
              </Button>
            </div>
            <div className={`card-body ${searchVisible ? 'd-block' : 'd-none'}`}>
              <TimKiem tk={handleSearchResults} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
