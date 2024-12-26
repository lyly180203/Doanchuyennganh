import React from 'react'
import  './Pay.css'
import IMG from '../consts/img';

const Pay = () => {
  return (
    <div className='icons-container'>
         <div className='icons'>
            <img src={`${IMG}/fast.png`} alt="" />
            <div className='info'>
            <h3>Miễn phí vận chuyển</h3>
            <span>cho khách hàng</span>
            </div>
        </div>
        <div className='icons'>
            <img src={`${IMG}/listen.png`} alt="" />
            <div className='info'>
            <h3>Lắng nghe</h3>
            <span>phản hồi của khách hàng</span>
            </div>
        </div>
        <div className='icons'>
            <img src={`${IMG}/pay.png`} alt="" />
            <div className='info'>
            <h3>Thanh toán an toàn</h3>
            <span>được bảo vệ bởi PayPal</span>
            </div>
        </div>

    </div>
  )
}

export default Pay