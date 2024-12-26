import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/form';
import URL from '../consts/url';
import {  useNavigate } from 'react-router-dom';


const DatHangCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate=useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userName: '',
    adminEmail: '',
    adminPhone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState(''); // Hình thức thanh toán
  const [deliveryAddress, setDeliveryAddress] = useState(''); // Địa điểm

  useEffect(() => {
    const id_dangky = localStorage.getItem('id_dangky');
    const userName = localStorage.getItem('userName');
    const adminEmail = localStorage.getItem('adminEmail');
    const adminPhone = localStorage.getItem('adminPhone');
    setUserInfo({
      userName: userName || '',
      adminEmail: adminEmail || '',
      adminPhone: adminPhone || '',
    });
    if (!id_dangky) {
      alert('Vui lòng đăng nhập để đặt hàng!');
      return;
    }

    // Lấy thông tin giỏ hàng
    fetch(`${URL}/get_cart_items.php?id_dangky=${id_dangky}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCartItems(data);
          const total = data.reduce((sum, item) => sum + item.gia_sanpham * item.soluong_sanpham, 0);
          setTotalPrice(total);
          
        }
      })
      .catch((error) => console.error('Lỗi khi lấy giỏ hàng:', error));
  }, []);

  const handleCheckout = () => {
    const id_dangky = localStorage.getItem('id_dangky');
    if (!id_dangky) {
      alert('Vui lòng đăng nhập để thanh toán!');
      return;
    }
  
    setIsProcessing(true);
  
    const checkoutData = {
      id_dangky,
      total_price: totalPrice,
      payment_status: 'Processing',
      hinhthuc_thanhtoan: paymentMethod,
      diadiem: deliveryAddress,
      cart_items: cartItems.map((item) => ({
        ten_sanpham: item.ten_sanpham,
        soluong_sanpham: item.soluong_sanpham,
        gia_sanpham: item.gia_sanpham,
      })),
    };
  
    fetch(`${URL}/process_checkout.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Đặt hàng thành công! Đơn hàng đang được xử lý.');
          setCartItems([]);
          navigate('/');
        } else {
          alert('Có lỗi xảy ra. Vui lòng thử lại!');
        }
        setIsProcessing(false);
      })
      .catch((error) => {
        console.error('Lỗi khi đặt hàng:', error);
        setIsProcessing(false);
      });
  };
  

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Thông tin đặt hàng</h1>

      <div className="card p-3 mb-4">
        <h5>Thông tin khách hàng</h5>
        <p><strong>Họ và tên:</strong> {userInfo.userName}</p>
        <p><strong>Email:</strong> {userInfo.adminEmail}</p>
        <p><strong>Số điện thoại:</strong> {userInfo.adminPhone}</p>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.ten_sanpham}</td>
                <td>{item.gia_sanpham.toLocaleString('vi-VN')} VND</td>
                <td>{item.soluong_sanpham}</td>
                <td>{(item.gia_sanpham * item.soluong_sanpham).toLocaleString('vi-VN')} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-3">
        <h5 className="font-weight-bold">Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VND</h5>
        <h5>Địa điểm:</h5>
        <Form.Control
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className='form-control'
        />
        <Form.Select 
          className='mt-3' 
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Hình thức</option>
          <option value="VIETQR">VietQR</option>
          <option value="Tiền mặt">Tiền mặt</option>
        </Form.Select>
        <h5 className="font-weight-bold">Vận chuyển: {totalPrice <= 100000 ? "50.000VNĐ" : "Miễn phí"}</h5>

        <button
          className="btn btn-primary mt-2"
          onClick={handleCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? 'Đang xử lý...' : 'Thanh toán'}
        </button>
      </div>
    </div>
  );
};

export default DatHangCart;
