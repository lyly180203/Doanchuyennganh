import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import URL from '../consts/url';
import IMG from '../consts/img';
import './Cart.css';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const userName = localStorage.getItem('userName');
    const id_dangky = localStorage.getItem('id_dangky');
    
    if (!userName || !id_dangky) {
      setIsLoggedIn(false);
      setCartItems([]); // Reset giỏ hàng nếu chưa đăng nhập
      return;
    }

    setIsLoggedIn(true);
    
    fetch(`${URL}/lichsudathang?id_dangky=${id_dangky}`)
    .then(response => response.json())
    .then(data=>{
      if(Array.isArray(data)){
        setOrders(data);
      }
      else{
        setOrders([]);
      }
    })
    

    // Lấy giỏ hàng từ server với id_dangky
    fetch(`${URL}/get_cart_items.php?id_dangky=${id_dangky}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCartItems(data);
          console.log('Giỏ hàng của người dùng:', data);
        } else {
          setCartItems([]);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
        setCartItems([]);
        setOrders([]);
      });
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.gia_sanpham * item.soluong_sanpham, 0);
  };

  const handleQuantityChange = (index, value) => {
    const updatedItems = [...cartItems];
    updatedItems[index].soluong_sanpham = value === '' ? 0 : parseInt(value);
    setCartItems(updatedItems);
    updateCartOnServer(updatedItems[index]);
  };

  const handleIncrement = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].soluong_sanpham += 1;
    setCartItems(updatedItems);
    updateCartOnServer(updatedItems[index]);
  };

  const handleDecrement = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].soluong_sanpham > 1) {
      updatedItems[index].soluong_sanpham -= 1;
      setCartItems(updatedItems);
      updateCartOnServer(updatedItems[index]);
    }
  };

  const updateCartOnServer = (item) => {
    fetch(`${URL}/update_cart.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message !== "Sản phẩm đã được cập nhật trong giỏ hàng") {
          console.error('Lỗi khi cập nhật sản phẩm trong giỏ hàng:', data.message);
        }
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật sản phẩm trong giỏ hàng:', error);
      });
  };

  const handleDelete = (id_sanpham) => {
    fetch(`${URL}/delete_cart.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_sanpham })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Sản phẩm đã được xóa khỏi giỏ hàng") {
          setCartItems(cartItems.filter(item => item.id_sanpham !== id_sanpham));
        } else {
          console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', data.message);
        }
      })
      .catch(error => {
        console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
      });
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = async (product) => {
    const id_dangky = localStorage.getItem('id_dangky');
    if (!id_dangky) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      return;
    }

    const newItem = {
      id_sanpham: product.id_sanpham,
      ten_sanpham: product.ten_sanpham,
      gia_sanpham: product.gia_sanpham,
      soluong_sanpham: 1,
      hinhanh_sanpham: product.hinhanh_sanpham,
      id_dangky: id_dangky // Thêm id_dangky vào dữ liệu gửi đi
    };

    try {
      const response = await fetch(`${URL}/add_to_cart.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      const data = await response.json();
      if (data.message === "Sản phẩm đã được thêm vào giỏ hàng") {
        // Cập nhật lại giỏ hàng sau khi thêm thành công
        fetch(`${URL}/get_cart_items.php?id_dangky=${id_dangky}`)
          .then(response => response.json())
          .then(data => {
            if (Array.isArray(data)) {
              setCartItems(data);
            }
          });
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    }
  };

  const handleCheckout = () => {
    // Xử lý logic thanh toán tại đây
    navigate('/thongtincart');
   
  };

  return (
    <div className="cart">
      <h1 className="heading">Giỏ hàng</h1>
      {!isLoggedIn ? (
        <div className="cart-empty">
          <p>Vui lòng đăng nhập để xem giỏ hàng của bạn</p>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Giỏ hàng của bạn đang trống</p>
            </div>
          ) : (
            <>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Hình Ảnh</th>
                    <th>Sản Phẩm</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                    <th>Tổng</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td><img src={`${IMG}/${item.hinhanh_sanpham}`} alt={item.ten_sanpham} /></td>
                      <td>{item.ten_sanpham}</td>
                      <td>{formatPrice(item.gia_sanpham)}</td>
                      <td>
                        <div className="quantity-control">
                          <button onClick={() => handleDecrement(index)}>-</button>
                          <input 
                            type="text" 
                            value={item.soluong_sanpham || 0} 
                            onChange={(e) => handleQuantityChange(index, e.target.value)} 
                          />
                          <button onClick={() => handleIncrement(index)}>+</button>
                        </div>
                      </td>
                      <td>{formatPrice(item.gia_sanpham * (item.soluong_sanpham || 0))}</td>
                      <td className="actions">
                        <button onClick={() => handleDelete(item.id_sanpham)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="cart-total">
                <span className="total-label">Tổng:</span> {formatPrice(calculateTotal())}
              </div>
              <div className="checkout-container">
                <button className="checkout-btn" onClick={handleCheckout}>Đặt hàng</button>
              </div>
            </>
          )}
        <h5>Lịch sử đơn hàng đã đặt</h5>
        <table className="table table-bordered table-striped">
                <thead style={{ color: 'blue' }}>
                  <tr>
                  
                    <th>Tên khách hàng</th>
                    {/* Cột Email và Phone sẽ bị ẩn khi kích thước màn hình nhỏ */}
                    {/*d-none dùng để ẩn kích thước khi nhỏ còn d-md-table-cell là hiển thi kích thước khi có cỡ trung bình */}
                    <th >Code</th>
                    <th>Sản phẩm đã mua</th>
                    <th>Phone</th>
                    <th>Tình trạng</th> 
                    <th style={{textAlign: 'center'}}>Hình thức</th>
                    <th>Thành tiền</th>
                    <th>Địa điểm</th>

                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
          
                      <td>{order.name}</td>
                      <td>{order.code_thanhtoan }</td>
                      <td>{order.ten_sanpham}</td>
                      <td>{order.adminPhone}</td> 

                      {/* <td>{order.phone}</td> */}
                      <td>{order.thanhtoan_status==0?"Chưa xử lý":"Đã xử lý"}</td>
                      <td className="text-center"> {/* Căn giữa nội dung cột */}
                      <td>{order.hinhthuc_thanhtoan}</td>
                      </td>
                      <td>{order.gia_thanhtoan.toLocaleString()}VNĐ</td>
                      <td>{order.diadiem}</td>

                    </tr>
                    
                  ))}
                </tbody>
                 
              </table>


        </div>
      )}
    </div>
  );
};

export default Cart;
