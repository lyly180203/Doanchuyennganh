import React, { useEffect, useState } from 'react';
import TimKiem from './TimKiem';
import URL from '../URL';

function User() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(URL + 'user/get_user.php');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    }
  };

  const handleSearchResults = (results) => {
    setUsers(results);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Tìm kiếm */}
        <TimKiem onSearchResults={handleSearchResults} />

        {/* Hiển thị danh sách người dùng */}
        <div className="col-lg-8 col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id_dangky}>
                  <td>{user.id_dangky}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.admin_status === 1 ? 'Admin' : 'Người dùng'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
