import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../combonents/Footer/Footer'
import Navbar from '../../combonents/Navbar.jsx';

const LayoutSanpham = () => {
  return (
    <div>
        <Navbar />
        <Outlet/>
        <Footer />
    </div>
  );
}

export default LayoutSanpham;
