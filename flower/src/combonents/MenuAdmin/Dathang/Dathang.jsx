import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import URL from '../URL';
import Sua from './Sua';
import Xoa from './Xoa';
function Dathang() {
  const [user, setUser] = useState([]);
  const url = URL+'user/get_user.php';
  const orderUrl = URL +'cart/get_cart.php';
  const [orders, setOrders] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false); // Thêm state để quản lý việc hiển thị form tìm kiếm
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
  const fetchOrders = () => {
    fetch(orderUrl)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log('Không có dữ liệu:', data.message);
        } else {
          setOrders(data);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  };
  

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);
  

  const handleSearchResults = (results) => {
    setUser(results);
  };

  return (
    
    <div className="container mt-4">
    
      <div className="row">
        {/* Khung hiển thị danh sách user */}
        <div className="col-lg-12 col-md-8 col-12">
          <div className="card">
            <div className="card-header">
              
              <h5>Danh sách đơn đặt hàng</h5>
            </div>
            <div className="card-body">
            <Routes>
              <Route path="Sua/:id" element={<Sua onUpdate={fetchOrders}/>}></Route>
              <Route path="Xoa/:id" element={<Xoa onUpdate={fetchOrders}/>}></Route>
            </Routes>
              <table className="table table-bordered table-striped">
                <thead style={{ color: 'blue' }}>
                  <tr>
                  
                    <th>Tên khách hàng</th>
                    {/* Cột Email và Phone sẽ bị ẩn khi kích thước màn hình nhỏ */}
                    {/*d-none dùng để ẩn kích thước khi nhỏ còn d-md-table-cell là hiển thi kích thước khi có cỡ trung bình */}
                    <th >Code</th>
 
                    <th>Phone</th>
                    <th>Tình trạng</th> 
                    <th style={{textAlign: 'center'}}>Tác vụ</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
          
                      <td>{order.name}</td>
                      <td>{order.code_thanhtoan }</td>

                      <td>{order.phone}</td>
                      <td>{order.thanhtoan_status==0?"Chưa xử lý":"Đã xử lý"}</td>
                      <td className="text-center"> {/* Căn giữa nội dung cột */}
                      <div className="d-flex justify-content-center gap-2"> {/* Flexbox với khoảng cách giữa các nút */}
                       <Link to={`Sua/${order.id_thanhtoan}`}>
                       <Button className='btn btn-primary'>Thông tin/Sửa</Button>
                       </Link>
                      <Link to={`Xoa/${order.id_thanhtoan}`}>
                        <Button variant=''>Xóa</Button>
                      </Link>
                      </div>
                      </td>
                    </tr>
                    
                  ))}
                </tbody>
                 
              </table>


            </div>
          </div>
        </div>

        {/* Khung tìm kiếm */}
       
      </div>
    </div>
  );
}

export default Dathang;
