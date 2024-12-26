import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import URL from '../URL';
function Them({ onUpdate }) {
  const [img, setImg] = useState(null);
  const [danhMuc, setDanhMuc] = useState([]);
  const [formData, setFormData] = useState({
    tenSanPham: "",
    gia: "",
    soLuong: "",
    tomTat: "",
    noiDung: "",
    tinhTrang: "1",
    danhMuc: "",
  });

  const imgChange = (e) => {
    setImg(e.target.files[0]); // Lưu file hình ảnh
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchDanhMuc = () => {
    fetch(URL+"/danhmuc/get_danh_muc.php")
      .then((response) => response.json())
      .then((data) => setDanhMuc(data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu danh mục:", error));
  };

  useEffect(() => {
    fetchDanhMuc();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("tenSanPham", formData.tenSanPham);
    data.append("gia", formData.gia);
    data.append("soLuong", formData.soLuong);
    data.append("tomTat", formData.tomTat);
    data.append("noiDung", formData.noiDung);
    data.append("tinhTrang", formData.tinhTrang);
    data.append("danhMuc", formData.danhMuc);
    if (img) data.append("img", img);

    try {
      const response = await fetch(
        URL+"/sanpham/them.php",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      if (result.success) {
        console.log([...data.entries()]);
        alert("Thêm sản phẩm thành công!");
        onUpdate(); // Gọi lại danh sách sản phẩm  
      } else {
        alert(result.message || "Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Label>Tên sản phẩm</Form.Label>
        <Form.Control
          className="form-control"
          name="tenSanPham"
          value={formData.tenSanPham}
          onChange={handleChange}
        />
        <Form.Label>Giá</Form.Label>
        <Form.Control
          className="form-control"
          name="gia"
          value={formData.gia}
          onChange={handleChange}
        />
        <Form.Label>Số lượng</Form.Label>
        <Form.Control
          className="form-control"
          name="soLuong"
          value={formData.soLuong}
          onChange={handleChange}
        />
        <Form.Label>Hình ảnh</Form.Label>
        <input type="file" onChange={imgChange} />
        <br />
        <Form.Label>Tóm tắt</Form.Label>
        <Form.Control
          as="textarea"
          className="form-control"
          rows={5}
          name="tomTat"
          value={formData.tomTat}
          onChange={handleChange}
        />
        <Form.Label>Nội dung</Form.Label>
        <Form.Control
          as="textarea"
          className="form-control"
          rows={5}
          name="noiDung"
          value={formData.noiDung}
          onChange={handleChange}
        />
        <Form.Label>Tình trạng</Form.Label>
        <Form.Select
          name="tinhTrang"
          value={formData.tinhTrang}
          onChange={handleChange}
        >
          <option value="1">Kích hoạt</option>
          <option value="0">Chưa kích hoạt</option>
        </Form.Select>
        <Form.Label>Danh mục</Form.Label>
        <Form.Select name="danhMuc" onChange={handleChange}>
          <option value="">Chọn danh mục</option>
          {danhMuc.map((item) => (
            <option key={item.id_danhmuc} value={item.id_danhmuc}>
              {item.ten_danhmuc}
            </option>
          ))}
        </Form.Select>
        <Button type="submit" variant="primary" className="mt-3" >Thêm</Button>
      </form>
    </div>
  );
}

export default Them;
