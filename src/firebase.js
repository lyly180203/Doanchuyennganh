import { initializeApp } from 'firebase/app';//khởi tạo ứng dụng Firebase với cấu hình cụ thể.
import { getAuth } from 'firebase/auth';//khởi tạo và lấy đối tượng xác thực (Authentication) từ Firebase.

// Cấu hình Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyBs8mvWYhjKJudzOBsVGWxe6Ik2aE-DADE",
  authDomain: "flower-shop-461c4.firebaseapp.com",
  projectId: "flower-shop-461c4",
  storageBucket: "flower-shop-461c4.firebasestorage.app",
  messagingSenderId: "378885265344",
  appId: "1:378885265344:web:96659b5dcc4f865690da25"
};

// Khởi tạo ứng dụng Firebase với cấu hình đã định nghĩa ở phần trên.
const app = initializeApp(firebaseConfig);

// Khởi tạo dịch vụ xác thực của Firebase, dùng để quản lý đăng nhập, đăng ký, và xác thực người dùng.
const auth = getAuth(app);

export { auth };