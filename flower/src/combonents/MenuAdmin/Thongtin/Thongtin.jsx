{/*fix password */}
{/*Thêm hình */}
import React, { useEffect, useState } from "react";
import URL from "../URL";

function Thongtin() {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminStatus, setAdminStatus] = useState("");
  const [adminNewPassword,setadminNewPassword]=useState("");
  const [adminNewcPassword,setadminNewcPassword]=useState("");
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("adminEmail");
    const phone = localStorage.getItem("adminPhone");
    const password = localStorage.getItem("adminPassword");
    const admin_status = localStorage.getItem("admin_status ");
    if (name) {
      setAdminName(name);
      setAdminEmail(email);
      setAdminPhone(phone);
      setAdminPassword(password);
      setAdminStatus(admin_status);
    }
  }, []);

  // Xử lý lưu thông tin
  const handleSave = () => {
    if(adminNewPassword!==adminNewcPassword){
        alert("Mật khẩu mới không khớp");
        return;
    }
    // Gửi request API để cập nhật thông tin (giả sử có endpoint URL+"updateAdmin.php")
    const updatedData = {
      name: adminName,
      email: adminEmail,
      phone: adminPhone,
      password: adminPassword,
      newPassword: adminNewPassword,
      confirmPassword: adminNewcPassword,
    };
    const url=URL+"thongtin/sua.php";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Thông tin đã được cập nhật thành công!");
          localStorage.setItem("adminName", adminName);
          localStorage.setItem("adminEmail", adminEmail);
          localStorage.setItem("adminPhone", adminPhone);
          localStorage.setItem("adminPassword", adminPassword);
          setIsEditing(false); // Thoát chế độ chỉnh sửa
          window.location.reload();
        } else {
          alert(data.message || "Có lỗi xảy ra!");
        }
      })
      .catch((error) => alert("Không thể cập nhật thông tin!"));
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">{adminName || "Guest"}</h5>
                <p className="text-muted mb-1">Full Stack Developer</p>
                <div className="d-flex justify-content-center mb-2">
    
               
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Hủy" : "Sửa thông tin"}
                  </button>
             
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">{adminName || "Guest"}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-control"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">{adminEmail || "example@gmail.com"}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">{adminPhone || "0123456789"}</p>
                    )}
                  </div>
                </div>
                <hr />
                {isEditing ?(
                    <>
                      <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Old Pass</p>
                            </div>
                            <div className="col-sm-9">
                                <input
                                        type="password"
                                        className="form-control"
                                       
                                        onChange={(e) => setAdminPassword(e.target.value)}
                                    />
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">New Pass</p>
                            </div>
                            <div className="col-sm-9">
                                <input
                                        type="password"
                                        className="form-control"
                                     
                                        onChange={(e) => setadminNewPassword(e.target.value)}
                                    />
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Confirm Pass</p>
                            </div>
                            <div className="col-sm-9">
                                <input
                                        type="password"
                                        className="form-control"
                                      
                                        onChange={(e) => setadminNewcPassword(e.target.value)}
                                    />
                            </div>
                        </div>
                    </>

                ):(
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Password</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">***********</p>
                        </div>
                    </div>
                )}
                <hr/>  
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Trạng thái</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {adminStatus == 1 ? "Admin" : "Người dùng"}
                    </p>
                  </div>
                </div>
                <hr/>
                {isEditing && (
                    <button
                      type="button"
                      className="btn btn-primary ms-1"
                      onClick={handleSave}
                    >
                      Lưu thông tin
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thongtin;
