import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../combonents/Footer/Footer'
import Danhmuc from '../../combonents/Danhmuc/Danhmuc.jsx'
import Narbar from '../../combonents/Navbar.jsx'

const Public = () => {
  return (
    <div>
        
        <Narbar/>
        <Danhmuc/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Public