import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Public from './pages/pullic/Public';
import LoginForm from './combonents/LoginForm/LoginForm';
import RegistrationForm from './combonents/RegistrationForm/RegistrationForm';
import Dangxuat from './combonents/Dangxuat/Dangxuat';
import Cart from './combonents/Cart/Cart';
import HoaCategory from './combonents/HoaCategory/HoaCategory';
import Chitietsanpham from './combonents/Chitietsanpham/Chitietsanpham';
import Sanpham from './combonents/Sanpham/Sanpham';
import LayoutSanpham from './pages/LayoutSanpham/LayoutSanpham';
import Danhgia from './combonents/Danhgia/Danhgia'; // Thêm import Danhgia
import Contact from './combonents/Contact/Contact'; // Thêm import Contact
import DH from './combonents/Cart/DatHangCart';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider 
      clientId="1094447299951-2g4b1bvv0mhb8u2qjn3vl6m1qvp3kqe4.apps.googleusercontent.com"
      cookiePolicy="single_host_origin"
    >
      <div className='app'>
        <Routes>
          <Route path='/' element={<Public />}>
            <Route path='' element={<Home />} />
            <Route path='/category/:id_danhmuc' element={<HoaCategory />} />
          </Route>
          <Route path='/' element={<LayoutSanpham/>}>
            <Route path='/Sanpham' element={<Sanpham/>}/>
            <Route path='/Cart' element={<Cart />} />
            <Route path='/thongtincart' element={<DH/>} />
            <Route path="/chitietsanpham/:id_sanpham" element={<Chitietsanpham />} />  
            <Route path='/Danhgia' element={<Danhgia />} /> 
            <Route path='/Lienhe' element={<Contact />} /> 
          </Route>
          <Route path='/LoginForm' element={<LoginForm />} /> 
          <Route path='/RegistrationForm' element={<RegistrationForm />} /> 
          <Route path='/Dangxuat' element={<Dangxuat />} /> 
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
