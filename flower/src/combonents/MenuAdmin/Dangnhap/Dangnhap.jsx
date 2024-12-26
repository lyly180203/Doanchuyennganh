import React , { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import URL from '../URL';
import img from '../imgDKDN';
function Dangnhap() {
    const [formData, setformData] = useState({
        email: "",
        password: "",
        phone: "",
      });
      const navigate = useNavigate();
    const handleChange = (e)=>{
        setformData({...formData,[e.target.name]:e.target.value});
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const jsonData={
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
        }
        const url = URL+"dangnhap/dangnhap.php";
        console.log(url);
        console.log(jsonData)   
        try{
            const rs=await fetch(url,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonData),
            });

            const result=await rs.json();
            if(result.success){
                alert(result.message || "Đăng nhập thành công");
                localStorage.setItem("adminName", result.nameUser); // Lưu tên admin vào localStorage
                localStorage.setItem("adminEmail", result.email); 
                localStorage.setItem("adminPhone",result.phone);
                localStorage.setItem("adminPassword",result.password);
                localStorage.setItem("adminStatus",result.admin_status);
                navigate("/admin");
                window.location.reload();
            }
            else{
                alert(result.message || "Lội đăng nhập");
            }
        }catch(error){
          console.error("Lỗi xảy ra:", error);
          alert("Không thể gửi dữ liệu");
        }
    }
  return (
    <div>
            <div className="col-lg-12 col-xl-11">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng nhập</p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit} >
                        

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Control type="email" className="form-control" autoComplete="" name="email" value={formData.email} onChange={handleChange} />
                            <Form.Label className="form-label"  >Email / Phone</Form.Label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Control type="password"  className="form-control" autoComplete="current-password"  name="password"  value={formData.password} onChange={handleChange}/>
                            <Form.Label className="form-label" >Mật khẩu</Form.Label>
                          </div>
                        </div>

            
                    
                       

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Button type="submit" className="btn btn-primary btn-lg">Đăng nhập</Button>
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
  )
}

export default Dangnhap
