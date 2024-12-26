import React from 'react'
import './KhuyenMai.css'
import IMG from '../consts/img'

const KhuyenMai = () => {
  return (
    <div className="banner-container">
    <div className="banner-item">
      <img src={`${IMG}/hoaly.png`} alt="Hoa ly"/>
    </div>
    <div className="banner-item">
      <img src={`${IMG}/hoa15.png`} alt="Hoa hướng dương"/>
    </div>
  </div>
  )
}

export default KhuyenMai