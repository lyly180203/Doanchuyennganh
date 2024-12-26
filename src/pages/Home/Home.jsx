import React from 'react';
import './home.css';

import About from '../../combonents/About/About';
import Pay from '../../combonents/Pay/Pay';
import Product from '../../combonents/Product/Product';
import KhuyenMai from '../../combonents/KhuyenMai/KhuyenMai';
import Header from '../../combonents/Header/Header';

const Home = () => {
 

  return (
    <div>
      <Header/>
      <Pay/>
      <About/>
      <Product/>
      <KhuyenMai/>
      
    </div>
  );
}

export default Home;
