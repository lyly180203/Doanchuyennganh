import React , { useState } from "react";
import img from "../imgDKDN";
import { FaPhone } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import URL from '../URL';
function Dangky() {
    const [formData, setformData] = useState({
        nameUser: "",
        email: "",
        password: "",
        confirmpass: "",
        phone: "",
      });
      
      const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const jsonData = {
            nameUser: formData.nameUser,
            email: formData.email,
            password: formData.password,
            confirmpass: formData.confirmpass,
            phone: formData.phone,
        };
        const url = URL + "dangky/dangky.php";
          try {
        const rs= await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData), 
        });
        const result =await rs.json();
        if(result.success){
          alert(result.message || "Đăng ký thành công");
        }else{
          alert(result.message || "Lỗi đăng ký");
        }
    }catch(Exception){
      alert("không thể gửi dữ liệu");
    }
    };
   
  return (
    <div>
            <div className="col-lg-12 col-xl-11">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Control type="text" className="form-control" name="nameUser" value={formData.nameUser} onChange={handleChange} />
                            <Form.Label className="form-label">Họ và tên</Form.Label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Control type="email" className="form-control" placeholder="example@gmail.com" autoComplete="" name="email" value={formData.email} onChange={handleChange}/>
                            <Form.Label className="form-label"  >Email</Form.Label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Control type="password"  className="form-control" autoComplete="current-password"  name="password" value={formData.password} onChange={handleChange}/>
                            <Form.Label className="form-label" >Mật khẩu</Form.Label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Control type="password"  className="form-control" autoComplete="current-password" name="confirmpass" value={formData.confirmpass} onChange={handleChange} />
                            <Form.Label className="form-label" >Nhập lại mật khẩu</Form.Label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className=" fa-lg me-3 fa-fw"><FaPhone /></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Control type="text"  className="form-control"  name="phone" value={formData.phone} onChange={handleChange}/>
                            <Form.Label className="form-label" >Điện thoại</Form.Label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <Form.Control className="form-check-input me-2" type="checkbox" value=""  />
                          <Form.Label className="form-check-label" >
                            Tôi đồng ý các <a href="#!">Điều khoản</a>
                          </Form.Label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Button type="submit" className="btn btn-primary btn-lg">Đăng ký</Button>
                        </div>
                      </form>
                    </div>

                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src={img}
                        className="img-fluid"
                        alt="Registration illustration"
                      />
                    </div>
                  </div>
                </div>
            </div>
    </div>
  );
}

export default Dangky;
