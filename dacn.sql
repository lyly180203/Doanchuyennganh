-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 26, 2024 at 12:25 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dacn`
--

-- --------------------------------------------------------

--
-- Table structure for table `baiviet`
--

DROP TABLE IF EXISTS `baiviet`;
CREATE TABLE IF NOT EXISTS `baiviet` (
  `id_baiviet` int NOT NULL AUTO_INCREMENT,
  `tenbaiviet` varchar(255) NOT NULL,
  `tomtat_baiviet` mediumtext NOT NULL,
  `noidung_baiviet` longtext NOT NULL,
  `id_danhmuc` int NOT NULL,
  `tinhtrang_baiviet` int NOT NULL,
  `hinhanh_baiviet` varchar(255) NOT NULL,
  PRIMARY KEY (`id_baiviet`),
  UNIQUE KEY `danhmuc_id` (`id_danhmuc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
CREATE TABLE IF NOT EXISTS `banner` (
  `tieude` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `noidung` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_banner` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_banner`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`tieude`, `noidung`, `id_banner`) VALUES
('Hoa tươi nhập khẩu, tươi mới mỗi ngày\r\n', 'Hoa tươi nhập khẩu, tươi mới mỗi ngày\r\nHoa tươi mỗi ngày, yêu thương trọn đời. Khám phá thế giới hoa đa dạng, đặt hàng online ngay để gửi tặng những người bạn yêu thương.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id_cart` int NOT NULL AUTO_INCREMENT,
  `id_sanpham` int DEFAULT NULL,
  `ten_sanpham` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gia_sanpham` decimal(10,2) DEFAULT NULL,
  `soluong_sanpham` int DEFAULT NULL,
  `hinhanh_sanpham` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `thanhtien` decimal(10,2) DEFAULT NULL,
  `id_dangky` int DEFAULT NULL,
  PRIMARY KEY (`id_cart`),
  KEY `id_sanpham` (`id_sanpham`),
  KEY `fk_id_dangky` (`id_dangky`)
) ENGINE=InnoDB AUTO_INCREMENT=560 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dangky`
--

DROP TABLE IF EXISTS `dangky`;
CREATE TABLE IF NOT EXISTS `dangky` (
  `id_dangky` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `admin_status` int NOT NULL,
  `google_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_dangky`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dangky`
--

INSERT INTO `dangky` (`id_dangky`, `name`, `email`, `password`, `phone`, `admin_status`, `google_id`) VALUES
(77, 'David', 'longvo04100000@gmail.com', '601f1889667efaebb33b8c12572835da3f027f78', '0364964897', 0, NULL),
(84, 'Long', '123@gmail.com', '123123', '0154', 2, NULL),
(88, 'Dagia', 'longspin0110@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '0364964897', 0, NULL),
(119, 'ha', 'DH52104298@student.stu.edu.vn', '$2y$10$A5Vbg..9AptWg.sPJwV/2uP8/Kz5j2ZcgPJexVRWnN1yHFHTOtfru', '0339519874', 0, NULL),
(120, 'lann', 'lan@gmail.com', '$2y$10$/bkznhVpTr.tROwvo4gfpu4r/IGau8eg/8MbG013Qm/2QO2qC6eQW', '0339519874', 0, NULL),
(121, 'my', 'my123@gmail.com', '$2y$10$RYavbNN86p/e3ZOKR6VxFu35Nb.XDUefqEuhvPR/StbzR4Inpdt3K', '0339519874', 0, NULL),
(122, 'huy', 'huy123@gamil.com', '$2y$10$EwuuZRqCUY5ojYvOibreFuHfrFE9udQqtM2JT/tweLviyySK7lmK6', '0339519874', 0, NULL),
(123, 'minh', 'minh@gmail.com', '$2y$10$ULe6o6obQGlhSK2lrFoxKOiBIWuFM41L76A6W6tRlqtokzKZb2Q.G', '12345678910', 0, NULL),
(126, 'huệ', 'hue@gmail.com', '$2y$10$E8ZhX41AawqkGs0ROq9b9..uIIBrJBf7S3SCqRLIwgcgtOIwpEsOO', '0339519874', 0, NULL),
(131, 'Long Vo', 'longspin01101@gmail.com', '$2y$10$6/.RZ97z37y7Go.5sSc19OuziL24TZaYaImS.DsNg7oHF0w8NAif.', '0364964897', 1, NULL),
(132, 'ConDep', 'longspin01102@gmail.com', '$2y$10$l1AUnM5feXyolX8uxTCT8OlUH6sv43VpE/ryJuxFpToWsJRguUaM.', '012545', 0, NULL),
(133, 'Ly Ly Le Thi', 'lyle180203@gmail.com', '', '', 0, 'gLygu7uhyUc2369zeRD1uwVNX8l2');

-- --------------------------------------------------------

--
-- Table structure for table `danhgia`
--

DROP TABLE IF EXISTS `danhgia`;
CREATE TABLE IF NOT EXISTS `danhgia` (
  `id_danhgia` int NOT NULL AUTO_INCREMENT,
  `ten` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `noidung` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `danhgia` int NOT NULL,
  `hinhanh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_sanpham` int DEFAULT NULL,
  `id_dangky` int DEFAULT NULL,
  PRIMARY KEY (`id_danhgia`),
  KEY `fk_sanpham` (`id_sanpham`),
  KEY `fk_dangky` (`id_dangky`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `danhgia`
--

INSERT INTO `danhgia` (`id_danhgia`, `ten`, `noidung`, `danhgia`, `hinhanh`, `created_at`, `id_sanpham`, `id_dangky`) VALUES
(1, 'Như Quỳnh', 'Đặt hoa tại Flower Shop, hoa tươi lâu, màu sắc rực rỡ, đúng như hình. Giao hàng nhanh chóng và đóng gói cẩn thận. Rất hài lòng với dịch vụ', 5, 'danhgia1.webp', '2024-12-05 04:33:18', NULL, NULL),
(2, 'Ngọc Lan', 'Hoa tươi, đẹp và đúng như mong đợi. Đặc biệt, mình rất ấn tượng với cách đóng gói cẩn thận và giao hàng đúng giờ. Sẽ tiếp tục mua hoa ở đây', 5, 'danhgia2.webp', '2024-12-05 04:33:18', NULL, NULL),
(3, 'Lan Anh', 'Đặt hoa cho sinh nhật bạn trai, hoa tươi, đẹp và rất tinh tế. Dịch vụ giao hàng nhanh chóng và chuyên nghiệp. Cảm ơn Flower Shop rất nhiều', 5, 'danhgia3.webp', '2024-12-05 04:33:18', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `danhmuc`
--

DROP TABLE IF EXISTS `danhmuc`;
CREATE TABLE IF NOT EXISTS `danhmuc` (
  `id_danhmuc` int NOT NULL AUTO_INCREMENT,
  `ten_danhmuc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tieude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `noidung` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_danhmuc`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `danhmuc`
--

INSERT INTO `danhmuc` (`id_danhmuc`, `ten_danhmuc`, `tieude`, `noidung`) VALUES
(1, 'Hoa sinh nhật', 'Hoa Sinh Nhật - Niềm Vui và Hạnh Phúc', '<p style=\"font-size: 18px;\">Hoa sinh nhật là biểu tượng của sự vui vẻ, hạnh phúc và tình cảm chân thành. Những bó hoa tươi tắn này mang đến những lời chúc tốt đẹp nhất cho ngày sinh nhật, giúp tạo nên không khí phấn khởi và vui tươi, đồng thời thể hiện sự trang trọng và tâm huyết của người tặng.</p> <p style=\"font-size: 18px;\">Phục Vụ của Tiệm Bán Hoa<br>Tiệm hoa của chúng tôi cung cấp các dịch vụ chuyên nghiệp để đáp ứng mọi nhu cầu của khách hàng trong dịp sinh nhật:</p> <ul style=\"font-size: 18px;\">   <li><strong>Tư vấn chọn hoa:</strong> Đội ngũ nhân viên giàu kinh nghiệm của chúng tôi sẽ giúp bạn chọn lựa những loại hoa phù hợp nhất để mang đến thông điệp tốt đẹp cho ngày sinh nhật.</li>   <li><strong>Giao hoa tận nơi:</strong> Chúng tôi cung cấp dịch vụ giao hoa tận nơi nhanh chóng và đúng giờ, đảm bảo hoa luôn tươi mới khi đến tay người nhận.</li>   <li><strong>Thiết kế hoa theo yêu cầu:</strong> Chúng tôi nhận thiết kế hoa theo yêu cầu riêng của khách hàng, giúp tạo nên những bó hoa độc đáo và mang đậm dấu ấn cá nhân.</li> </ul> <p style=\"font-size: 18px;\"><strong>Địa Chỉ Bán Hoa</strong><br>Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh.</p>'),
(9, 'Hoa chia buồn', 'Hoa Chia Buồn - Lời Chia Sẻ và An Ủi', '<p style=\"font-size: 18px;\">Hoa chia buồn là cách thể hiện lòng cảm thông và sự chia sẻ sâu sắc đối với gia đình và bạn bè của người đã khuất. Những bó hoa chia buồn không chỉ mang lại sự an ủi mà còn giúp tôn vinh và tưởng nhớ đến người đã ra đi. Các loại hoa thường được sử dụng trong dịp này bao gồm hoa lily, hoa cúc, hoa hồng trắng, và hoa lan trắng, tất cả đều tượng trưng cho sự thanh khiết, yên bình và tưởng nhớ.</p> <p style=\"font-size: 18px;\">Trong những lúc khó khăn nhất, hoa chia buồn trở thành lời nói không cần lời. Những bông hoa được chọn lựa kỹ lưỡng để gửi gắm thông điệp về sự ấm áp, tình yêu thương và lòng kính trọng đối với người đã khuất. Mỗi loài hoa, mỗi màu sắc đều mang một ý nghĩa riêng, cùng hợp lại để tạo nên một thông điệp sâu sắc về sự an ủi và sự đồng cảm.</p> <p style=\"font-size: 18px;\"><strong>Phục Vụ của Tiệm Bán Hoa:</strong><br> Tiệm hoa của chúng tôi luôn cam kết mang đến những dịch vụ tốt nhất để hỗ trợ khách hàng trong những thời khắc khó khăn nhất. Chúng tôi cung cấp các dịch vụ sau:</p> <ul style=\"font-size: 18px;\">   <li><strong>Tư vấn chọn hoa:</strong> Chúng tôi hiểu rằng việc chọn hoa trong dịp này rất quan trọng, do đó chúng tôi luôn sẵn sàng tư vấn để khách hàng chọn được những bó hoa phù hợp nhất.</li>   <li><strong>Giao hoa tận nơi:</strong> Dịch vụ giao hoa tận nơi nhanh chóng và đúng giờ để đảm bảo hoa luôn tươi mới khi đến tay người nhận.</li>   <li><strong>Thiết kế hoa theo yêu cầu:</strong> Chúng tôi cung cấp dịch vụ thiết kế hoa theo yêu cầu riêng của từng khách hàng để gửi gắm thông điệp riêng biệt và chân thành nhất.</li> </ul> <p style=\"font-size: 18px;\"><strong>Địa Chỉ Bán Hoa:</strong><br> Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh.</p>'),
(10, 'Hoa lễ', 'Hoa Lễ - Trang Trọng và Đầy Ý Nghĩa', '<p style=\"font-size: 18px;\">Hoa lễ là biểu tượng của sự trang trọng và ý nghĩa trong các dịp lễ hội. Những bó hoa lễ rực rỡ không chỉ làm đẹp cho không gian mà còn mang những thông điệp đặc biệt và đầy tâm huyết từ người tặng. Các loại hoa thường được sử dụng trong dịp này bao gồm hoa hồng, hoa cúc, hoa lan và hoa đồng tiền, tất cả đều tượng trưng cho sự trang nghiêm và lòng thành kính.</p> <p style=\"font-size: 18px;\">Hoa lễ không chỉ là những bông hoa đẹp mà còn mang những ý nghĩa sâu sắc:</p> <ul style=\"font-size: 18px;\">   <li><strong>Hoa Hồng:</strong> Tượng trưng cho tình yêu và sự tôn trọng, mang đến thông điệp về lòng yêu thương và kính trọng.</li>   <li><strong>Hoa Cúc:</strong> Biểu tượng của sự thanh cao và bền vững, mang đến thông điệp về sự trường tồn và vĩnh cửu.</li>   <li><strong>Hoa Lan:</strong> Đại diện cho sự cao quý và thanh khiết, mang đến thông điệp về sự tinh tế và sang trọng.</li>   <li><strong>Hoa Đồng Tiền:</strong> Biểu tượng của tài lộc và may mắn, mang đến thông điệp về sự phát đạt và thịnh vượng.</li> </ul> <p style=\"font-size: 18px;\"><strong>Phục Vụ của Tiệm Bán Hoa:</strong><br> Tiệm hoa của chúng tôi luôn cam kết mang đến những dịch vụ tốt nhất để hỗ trợ khách hàng trong các dịp lễ trọng đại. Chúng tôi cung cấp các dịch vụ sau:</p> <ul style=\"font-size: 18px;\">   <li><strong>Tư vấn chọn hoa:</strong> Đội ngũ nhân viên giàu kinh nghiệm của chúng tôi sẽ giúp bạn chọn lựa những loại hoa phù hợp nhất để mang đến thông điệp ý nghĩa cho các dịp lễ.</li>   <li><strong>Giao hoa tận nơi:</strong> Dịch vụ giao hoa tận nơi nhanh chóng và đúng giờ để đảm bảo hoa luôn tươi mới khi đến tay người nhận.</li>   <li><strong>Thiết kế hoa theo yêu cầu:</strong> Chúng tôi cung cấp dịch vụ thiết kế hoa theo yêu cầu riêng của từng khách hàng để gửi gắm thông điệp riêng biệt và ý nghĩa nhất.</li> </ul> <p style=\"font-size: 18px;\"><strong>Địa Chỉ Bán Hoa:</strong><br> Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh.</p>'),
(105, 'Hoa khai trương', 'Hoa Khai Trương - Chúc Mừng Thành Công', '<p style=\"font-size: 18px;\">Hoa khai trương là biểu tượng của sự may mắn, phát đạt và thành công trong công việc kinh doanh. Những bó hoa tươi tắn này mang đến những lời chúc tốt đẹp nhất cho ngày khai trương, giúp tạo nên không khí phấn khởi và vui tươi, đồng thời thể hiện sự trang trọng và tâm huyết của người tặng.</p> <p style=\"font-size: 18px;\"><strong>Phục Vụ của Tiệm Bán Hoa</strong><br>Tiệm hoa của chúng tôi cung cấp các dịch vụ chuyên nghiệp để đáp ứng mọi nhu cầu của khách hàng trong dịp khai trương:</p> <ul style=\"font-size: 18px;\">   <li><strong>Tư vấn chọn hoa:</strong> Đội ngũ nhân viên giàu kinh nghiệm của chúng tôi sẽ giúp bạn chọn lựa những loại hoa phù hợp nhất để mang đến thông điệp tốt đẹp cho ngày khai trương.</li>   <li><strong>Giao hoa tận nơi:</strong> Chúng tôi cung cấp dịch vụ giao hoa tận nơi nhanh chóng và đúng giờ, đảm bảo hoa luôn tươi mới khi đến tay người nhận.</li>   <li><strong>Thiết kế hoa theo yêu cầu:</strong> Chúng tôi nhận thiết kế hoa theo yêu cầu riêng của khách hàng, giúp tạo nên những bó hoa độc đáo và mang đậm dấu ấn cá nhân.</li> </ul> <p style=\"font-size: 18px;\"><strong>Địa Chỉ Bán Hoa</strong><br>Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh.</p>');

-- --------------------------------------------------------

--
-- Table structure for table `gioithieu`
--

DROP TABLE IF EXISTS `gioithieu`;
CREATE TABLE IF NOT EXISTS `gioithieu` (
  `id_gioithieu` int NOT NULL AUTO_INCREMENT,
  `tieude` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `noidung` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_gioithieu`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gioithieu`
--

INSERT INTO `gioithieu` (`id_gioithieu`, `tieude`, `noidung`) VALUES
(1, 'Chào Mừng Đến Với Flower.\r\n', 'Chúng tôi tự hào mang đến cho bạn những bông hoa tươi đẹp nhất, được chọn lọc kỹ lưỡng mỗi ngày. Với sự tận tâm và đam mê, đội ngũ thợ cắm hoa chuyên nghiệp của chúng tôi luôn sáng tạo ra những thiết kế hoa độc đáo, phù hợp với mọi dịp đặc biệt của bạn.\n\nChúng tôi cam kết cung cấp hoa tươi đảm bảo chất lượng, dịch vụ cá nhân hóa và giao hàng nhanh chóng. Hãy để chúng tôi mang đến niềm vui và sự rạng rỡ cho mỗi khoảnh khắc của bạn.');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
CREATE TABLE IF NOT EXISTS `sanpham` (
  `id_sanpham` int NOT NULL AUTO_INCREMENT,
  `ten_sanpham` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `gia_sanpham` int NOT NULL,
  `soluong_sanpham` int NOT NULL,
  `hinhanh_sanpham` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tomtat_sanpham` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `noidung_sanpham` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tinhtrang_sanpham` int NOT NULL,
  `id_danhmuc` int NOT NULL,
  PRIMARY KEY (`id_sanpham`),
  KEY `danhmuc_id` (`id_danhmuc`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`id_sanpham`, `ten_sanpham`, `gia_sanpham`, `soluong_sanpham`, `hinhanh_sanpham`, `tomtat_sanpham`, `noidung_sanpham`, `tinhtrang_sanpham`, `id_danhmuc`) VALUES
(30, 'Kệ hoa chia buồn 04', 500000, 7, 'chiabuon4.jpg', 'Kệ hoa chia buồn 04 là một lựa chọn đơn giản nhưng không kém phần ý nghĩa để gửi lời chia buồn đến gia đình người đã khuất. ', 'Sản phẩm \"Kệ hoa chia buồn 04\" được thiết kế với phong cách đơn giản, tập trung vào vẻ đẹp tự nhiên của hoa. Kệ hoa được tạo nên từ những bông hoa tươi tắn, sắp xếp hài hòa tạo nên một vẻ đẹp thanh lịch và tinh tế. Khách hàng có thể đặt mua sản phẩm này với số lượng 1 kệ và sẽ được giao hàng tận nơi nhanh chóng. Ngoài ra, khi mua sản phẩm, khách hàng còn được tặng kèm thiệp chia buồn và được đảm bảo về chất lượng hoa tươi trong vòng 3 ngày. Với những ưu điểm trên, kệ hoa chia buồn 04 xứng đáng là một món quà ý nghĩa để gửi đến người thân đã mất.', 1, 9),
(31, 'Kệ hoa chia buồn 05', 400000, 6, 'chiabuon5.jpg', 'Kệ hoa chia buồn 05 là một lựa chọn đơn giản nhưng không kém phần ý nghĩa để gửi lời chia buồn đến gia đình người đã khuất. ', 'Sản phẩm \"Kệ hoa chia buồn 05\" được thiết kế với phong cách đơn giản, tập trung vào vẻ đẹp tự nhiên của hoa. Kệ hoa được tạo nên từ những bông hoa tươi tắn, sắp xếp hài hòa tạo nên một vẻ đẹp thanh lịch và tinh tế. Khách hàng có thể đặt mua sản phẩm này với số lượng 1 kệ và sẽ được giao hàng tận nơi nhanh chóng. Ngoài ra, khi mua sản phẩm, khách hàng còn được tặng kèm thiệp chia buồn và được đảm bảo về chất lượng hoa tươi trong vòng 3 ngày. Với những ưu điểm trên, kệ hoa chia buồn 04 xứng đáng là một món quà ý nghĩa để gửi đến người thân đã mất.', 1, 9),
(32, 'Kệ hoa chia buồn 06', 300000, 12, 'chiabuon6.jpg', 'Kệ hoa chia buồn 06 là một lựa chọn đơn giản nhưng không kém phần ý nghĩa để gửi lời chia buồn đến gia đình người đã khuất. ', 'Sản phẩm \"Kệ hoa chia buồn 06\" được thiết kế với phong cách đơn giản, tập trung vào vẻ đẹp tự nhiên của hoa. Kệ hoa được tạo nên từ những bông hoa tươi tắn, sắp xếp hài hòa tạo nên một vẻ đẹp thanh lịch và tinh tế. Khách hàng có thể đặt mua sản phẩm này với số lượng 1 kệ và sẽ được giao hàng tận nơi nhanh chóng. Ngoài ra, khi mua sản phẩm, khách hàng còn được tặng kèm thiệp chia buồn và được đảm bảo về chất lượng hoa tươi trong vòng 3 ngày. Với những ưu điểm trên, kệ hoa chia buồn 04 xứng đáng là một món quà ý nghĩa để gửi đến người thân đã mất.', 1, 9),
(33, 'Kệ hoa chia buồn 07', 300000, 15, 'chiabuon7.jpg', 'Kệ hoa chia buồn cổ điển', 'Sản phẩm \"Kệ hoa chia buồn 07\" được thiết kế với phong cách đơn giản, tập trung vào vẻ đẹp tự nhiên của hoa. Kệ hoa được tạo nên từ những bông hoa tươi tắn, sắp xếp hài hòa tạo nên một vẻ đẹp thanh lịch và tinh tế. Khách hàng có thể đặt mua sản phẩm này với số lượng 1 kệ và sẽ được giao hàng tận nơi nhanh chóng. Ngoài ra, khi mua sản phẩm, khách hàng còn được tặng kèm thiệp chia buồn và được đảm bảo về chất lượng hoa tươi trong vòng 3 ngày. Với những ưu điểm trên, kệ hoa chia buồn 04 xứng đáng là một món quà ý nghĩa để gửi đến người thân đã mất.', 1, 9),
(34, 'Kệ hoa chia buồn 08', 400000, 9, 'chiabuon8.jpg', 'Kệ hoa chia buồn 08 là một lựa chọn đơn giản nhưng không kém phần ý nghĩa để gửi lời chia buồn đến gia đình người đã khuất. ', 'ản phẩm \"Kệ hoa chia buồn 08\" được thiết kế với phong cách đơn giản, tập trung vào vẻ đẹp tự nhiên của hoa. Kệ hoa được tạo nên từ những bông hoa tươi tắn, sắp xếp hài hòa tạo nên một vẻ đẹp thanh lịch và tinh tế. Khách hàng có thể đặt mua sản phẩm này với số lượng 1 kệ và sẽ được giao hàng tận nơi nhanh chóng. Ngoài ra, khi mua sản phẩm, khách hàng còn được tặng kèm thiệp chia buồn và được đảm bảo về chất lượng hoa tươi trong vòng 3 ngày. Với những ưu điểm trên, kệ hoa chia buồn 04 xứng đáng là một món quà ý nghĩa để gửi đến người thân đã mất.', 1, 9),
(35, 'Hoa sinh nhật 01', 150000, 10, 'hoa3.jpg', 'Hoa sinh nhật 01 là một bó hồng hồng ngọt ngào, như một lời chúc mừng ấm áp dành cho người thân yêu. Mỗi bông hồng đều toát lên vẻ đẹp dịu dàng, tinh tế, tạo nên một tổng thể hài hòa và lãng mạn.', 'Hoa sinh nhật 01 là một bó hồng hồng ngọt ngào, như một lời chúc mừng ấm áp dành cho người thân yêu của bạn. Mỗi bông hồng đều toát lên vẻ đẹp dịu dàng, tinh tế, tạo nên một tổng thể hài hòa và lãng mạn. Với dịch vụ giao hàng nhanh chóng và miễn phí thiệp chúc mừng, bạn có thể dễ dàng gửi tặng món quà ý nghĩa này đến người mà bạn trân trọng', 1, 1),
(36, 'Hoa sinh nhật 02', 150000, 8, 'hoa5.jpg', 'Hoa hồng đỏ tượng trưng cho tình yêu, đam mê và sự lãng mạn. Bó hoa này là món quà tuyệt vời để gửi đến người thân yêu, bạn bè hoặc đồng nghiệp nhân dịp sinh nhật.', 'Hoa sinh nhật 02\" là một bó hoa hồng đỏ tươi tắn, được thiết kế đẹp mắt và sang trọng. Bó hoa không chỉ mang đến vẻ đẹp rực rỡ mà còn là món quà ý nghĩa để gửi tặng những lời chúc tốt đẹp nhân dịp sinh nhật. Với dịch vụ giao hàng nhanh chóng, miễn phí thiệp chúc mừng và đảm bảo hoa tươi trong 3 ngày, sản phẩm này chắc chắn sẽ làm hài lòng mọi khách hàng.', 1, 1),
(37, 'Hoa sinh nhật 03', 160000, 5, 'hoa9.jpg', 'Hoa sinh nhật 03 là một bó hoa tươi tắn và sang trọng, thích hợp để làm quà tặng sinh nhật cho người thân, bạn bè. ', 'Hoa sinh nhật 03 là một bó hoa nhỏ nhắn nhưng chứa đựng nhiều ý nghĩa. Với thiết kế tinh tế và màu sắc tươi tắn, bó hoa này không chỉ là một món quà đẹp mắt mà còn là lời chúc ngọt ngào, gửi gắm những tình cảm chân thành đến người nhận. Mỗi bông hoa đều mang một thông điệp riêng, cùng nhau tạo nên một bức tranh tuyệt đẹp về tình yêu và sự quan tâm.', 1, 1),
(38, 'Hoa sinh nhật 04', 200000, 7, '1734344150.PNG', 'Hoa sinh nhật thanh lịch.Hoa sinh nhật 04 là một bó hoa tươi tắn và thanh lịch, thích hợp để làm quà tặng sinh nhật cho người thân, bạn bè. ', 'Mỗi bông hoa trong bó hoa sinh nhật 04 đều mang một ý nghĩa riêng, cùng nhau tạo nên một bức tranh tuyệt đẹp về tình yêu và sự quan tâm. Hương thơm dịu nhẹ của hoa sẽ mang đến cảm giác thư giãn và thoải mái cho người nhận. Bó hoa này không chỉ là một món quà mà còn là một kỷ niệm đáng nhớ, giúp lưu giữ những khoảnh khắc đẹp trong cuộc sống.', 1, 1),
(39, 'Hoa sinh nhật 05', 120000, 6, '1734344125.jpg', 'Hoa sinh nhật lịch sự trang nhã để tặng nhân dịp sinh nhật', 'Sản phẩm \"Hoa sinh nhật 05\" được thiết kế tinh tế với những bông hoa tươi thắm, kết hợp hài hòa tạo nên một bó hoa đầy màu sắc và sức sống. Bó hoa này mang đến cảm giác tươi trẻ và tràn đầy năng lượng, phù hợp để tặng cho những người bạn yêu quý. Khách hàng có thể đặt mua sản phẩm này và sẽ được giao hàng tận nơi nhanh chóng. Ngoài ra, khi mua sản phẩm, khách hàng còn được tặng kèm thiệp chúc mừng và được đảm bảo về chất lượng hoa tươi trong vòng 3 ngày. Với những ưu điểm trên, hoa sinh nhật 05 xứng đáng là một món quà ý nghĩa để gửi tặng đến người thân yêu nhân dịp sinh nhật.', 1, 1),
(40, 'Hoa sinh nhật 06', 140000, 12, 'hoa18.webp', 'Hoa tươi luôn mang đến niềm vui và sự tươi mới, giúp người nhận cảm thấy hạnh phúc hơn.', 'Sản phẩm \"Hoa sinh nhật 06\" được thiết kế tinh tế với những bông hoa tươi thắm, kết hợp hài hòa tạo nên một bó hoa đầy màu sắc và sức sống. Bó hoa này mang đến cảm giác tinh tế và thanh lịch, phù hợp để tặng cho những người bạn yêu quý. Khách hàng có thể đặt mua sản phẩm này và sẽ được giao hàng tận nơi nhanh chóng. Ngoài ra, khi mua sản phẩm, khách hàng còn được tặng kèm thiệp chúc mừng và được đảm bảo về chất lượng hoa tươi trong vòng 3 ngày. Với những ưu điểm trên, hoa sinh nhật 06 xứng đáng là một món quà ý nghĩa để gửi tặng đến người thân yêu nhân dịp sinh nhật.', 1, 1),
(41, 'Hoa sinh nhật 07', 170000, 15, 'hoa6.png', 'Bó hoa được thiết kế tỉ mỉ, từng chi tiết đều được chăm chút để tạo nên một tổng thể hài hòa và ấn tượng.', 'Với Hoa sinh nhật 07, chúng tôi đã tạo ra một tác phẩm nghệ thuật thực sự từ những bông hoa tươi thắm. Bó hoa này không chỉ đơn thuần là một món quà, mà còn là một thông điệp yêu thương được gửi gắm qua từng cánh hoa. Sự kết hợp hài hòa giữa các loại hoa tạo nên một bức tranh sống động, mang đến cảm giác tươi mới và tràn đầy sức sống.', 1, 1),
(42, 'Hoa sinh nhật 08', 200000, 9, 'hoaly.jpg', 'Hoa sinh nhật đẹp và sang trọng.Hoa tươi được lựa chọn kỹ càng, đảm bảo chất lượng tốt nhất và độ bền cao.', 'Với Hoa sinh nhật 08, chúng tôi đã tạo nên một tác phẩm nghệ thuật thực sự từ những bông hoa tươi thắm. Bó hoa này không chỉ đơn thuần là một món quà, mà còn là một biểu tượng của sự sang trọng và đẳng cấp. Sự kết hợp hài hòa giữa các loại hoa cao cấp tạo nên một bức tranh sống động, mang đến cảm giác quý phái và tinh tế.', 1, 1),
(43, 'Hoa sinh nhật 09', 80000, 12, 'hoale3.jpg', 'Bó hoa này không chỉ là một món quà, mà còn là một lời nhắn nhủ nhẹ nhàng về tình cảm chân thành. Sự đơn giản nhưng tinh tế của bó hoa sẽ khiến người nhận cảm thấy được trân trọng và yêu thương.', 'Hoa sinh nhật 09 là một bó hoa nhỏ xinh nhưng vô cùng ngọt ngào, mang đến cảm giác tươi mát và trong trẻo. Với giá 80.000 đồng, bạn sẽ sở hữu một bó hoa tinh tế, được giao hàng nhanh chóng trong vòng 2 giờ đối với những đơn hàng trong bán kính 5km. Sản phẩm đi kèm với dịch vụ miễn phí thiệp chúc mừng và đảm bảo hoa tươi trong vòng 3 ngày. Bó hoa này là lựa chọn hoàn hảo để gửi tặng những lời chúc ngọt ngào và ý nghĩa.', 1, 1),
(44, 'Hoa sinh nhật 10', 100000, 10, 'hoale1.jpg', 'Bó hoa được thiết kế theo phong cách tối giản, tập trung vào vẻ đẹp tự nhiên của hoa hồng.', 'Hoa sinh nhật 10 là một bó hồng đỏ thắm, biểu tượng cho tình yêu nồng nàn và sự lãng mạn. Với giá 100.000 đồng, bạn sẽ sở hữu một bó hoa đơn giản nhưng không kém phần sang trọng, được giao hàng nhanh chóng trong vòng 2 giờ đối với những đơn hàng trong bán kính 5km. Sản phẩm đi kèm với dịch vụ miễn phí thiệp chúc mừng và đảm bảo hoa tươi trong vòng 3 ngày. Bó hoa này là lựa chọn hoàn hảo để bày tỏ tình cảm chân thành đến người ấy.', 1, 1),
(45, 'Hoa sinh nhật 11', 130000, 8, 'hoa13.jpg', 'Bó hoa được thiết kế tỉ mỉ, từng bông lily đều được sắp xếp một cách hài hòa và tinh tế.', 'Với Hoa sinh nhật 11, chúng tôi đã tạo ra một tác phẩm nghệ thuật thực sự từ những bông lily trắng tinh khôi. Bó hoa này không chỉ đơn thuần là một món quà, mà còn là một biểu tượng của sự tinh khiết và thuần khiết. Sự sắp xếp hài hòa của những bông lily tạo nên một tổng thể đẹp mắt và thanh lịch.', 1, 1),
(55, 'Hoa lễ 01', 100000, 10, 'hoale1.jpg', 'Bó hoa hồng đỏ tươi thắm \"Hoa lễ 01\" là món quà hoàn hảo để thể hiện tình cảm chân thành. Với thiết kế đơn giản nhưng tinh tế, mỗi bông hồng như một lời nhắn yêu thương', 'Hoa lễ 01 là một bó hoa hồng đỏ tươi thắm, được gói tỉ mỉ trong giấy kraft giản dị nhưng tinh tế. Mỗi bông hồng như một lời nhắn gửi yêu thương, mang đến niềm vui và sự ấm áp cho người nhận. Với số lượng hoa vừa phải, bó hoa này vừa đủ để thể hiện tấm lòng của người tặng mà không quá cầu kỳ. Đặc biệt, dịch vụ giao hàng nhanh chóng và miễn phí trong vòng 5km cùng chính sách bảo hành hoa tươi trong 3 ngày sẽ giúp bạn hoàn toàn yên tâm khi lựa chọn sản phẩm này. Hãy để Hoa lễ 01 trở thành món quà ý nghĩa, tô điểm thêm cho những dịp đặc biệt của bạn.', 1, 10),
(56, 'Hoa lễ 02', 150000, 8, 'hoale2.jpg', 'Bó hoa lễ 02 kết hợp hoa cúc trắng tinh khôi, hoa hồng đỏ rực rỡ và hoa baby tươi tắn. Sản phẩm thích hợp cho các dịp lễ kỷ niệm và tôn vinh', '\"Bó hoa lễ 02 là sự kết hợp hoàn hảo giữa hoa cúc trắng, hoa hồng đỏ và hoa baby. Hoa cúc trắng tượng trưng cho sự thuần khiết và tôn kính, mang đến vẻ đẹp trang nhã và tinh tế. Hoa hồng đỏ biểu tượng của tình yêu và đam mê, tạo nên điểm nhấn nổi bật và cuốn hút. Hoa baby nhỏ nhắn, tươi tắn giúp cân bằng và làm mềm mại toàn bộ bó hoa. \n\nBó hoa lễ 02 không chỉ đẹp mắt mà còn mang ý nghĩa sâu sắc, thích hợp để tặng trong các dịp lễ kỷ niệm, ngày tri ân và các sự kiện tôn vinh. Sản phẩm đi kèm với dịch vụ giao hàng nhanh trong 2 giờ, giúp bạn dễ dàng gửi gắm những lời chúc tốt đẹp nhất đến người nhận. Mỗi bó hoa đều có kèm theo thiệp chúc mừng miễn phí, đảm bảo hoa tươi trong 3 ngày, mang đến sự an tâm và hài lòng cho khách hàng.\n\n\n', 1, 10),
(57, 'Hoa lễ 03', 130000, 5, 'hoale3.jpg', 'Bó hoa lễ 03 gồm hoa cúc trắng và hoa baby tươi tắn. Thích hợp cho các dịp lễ kỷ niệm và tôn vinh.', '\"Bó hoa lễ 03 là sự kết hợp hoàn hảo giữa hoa cúc trắng, hoa lily và hoa baby. Hoa cúc trắng tượng trưng cho sự thuần khiết và tôn kính, mang đến vẻ đẹp trang nhã và tinh tế. Hoa lily với hương thơm dịu nhẹ và vẻ đẹp kiêu sa tạo nên điểm nhấn nổi bật và cuốn hút. Hoa baby nhỏ nhắn, tươi tắn giúp cân bằng và làm mềm mại toàn bộ bó hoa. \n\nBó hoa lễ 03 không chỉ đẹp mắt mà còn mang ý nghĩa sâu sắc, thích hợp để tặng trong các dịp lễ kỷ niệm, ngày tri ân và các sự kiện tôn vinh. Sản phẩm đi kèm với dịch vụ giao hàng nhanh trong 2 giờ, giúp bạn dễ dàng gửi gắm những lời chúc tốt đẹp nhất đến người nhận. Mỗi bó hoa đều có kèm theo thiệp chúc mừng miễn phí, đảm bảo hoa tươi trong 3 ngày, mang đến sự an tâm và hài lòng cho khách hàng.\n\n\n', 1, 10),
(58, 'Hoa lễ 04', 100000, 7, 'hoale4.jpg', 'Mỗi loại hoa trong bó đều mang một ý nghĩa riêng, kết hợp lại tạo nên một thông điệp ý nghĩa về tình yêu, sự trân trọng và lời chúc tốt đẹp.', 'Với Hoa lễ 04, chúng tôi đã tạo ra một tác phẩm nghệ thuật thực sự từ những bông hoa tươi thắm. Bó hoa này không chỉ đơn thuần là một món quà, mà còn là một biểu tượng của sự thanh lịch và tinh tế. Sự kết hợp hài hòa giữa các loại hoa tạo nên một tổng thể đẹp mắt và hài hòa.', 1, 10),
(59, 'Hoa lễ 05', 150000, 6, 'hoale5.jpg', ' Bó hoa được thiết kế tỉ mỉ, từng bông hồng đều được sắp xếp một cách hài hòa và tinh tế.', 'Với Hoa lễ 05, chúng tôi đã tạo ra một tác phẩm nghệ thuật thực sự từ những bông hồng trắng tinh khôi. Bó hoa này không chỉ đơn thuần là một món quà, mà còn là một biểu tượng của sự tinh khiết và thuần khiết. Sự sắp xếp hài hòa của những bông hồng tạo nên một tổng thể đẹp mắt và thanh lịch.', 1, 10),
(60, 'Hoa lễ 06', 200000, 12, 'hoale6.jpg', 'Bó hoa được thiết kế tỉ mỉ, từng bông hoa baby đều được sắp xếp một cách hài hòa và tinh tế.', 'Với Hoa lễ 06, chúng tôi đã tạo ra một tác phẩm nghệ thuật đầy màu sắc từ những bông hoa baby nhỏ xinh. Bó hoa này không chỉ đơn thuần là một món quà, mà còn là một biểu tượng của sự tươi trẻ và tràn đầy năng lượng. Sự kết hợp hài hòa giữa các màu sắc tạo nên một tổng thể đẹp mắt và bắt mắt.\n\n', 1, 10),
(61, 'Hoa lễ 07', 250000, 15, 'hoale7.jpg', 'Bó hoa là một món đồ trang trí tuyệt vời, giúp không gian sống trở nên tươi tắn và sinh động hơn.', 'Với Hoa lễ 07, chúng tôi đã tạo ra một tác phẩm nghệ thuật nhỏ nhắn nhưng đầy màu sắc. Bó hoa baby với những cánh hoa nhỏ li ti, xếp khít nhau tạo nên một khối cầu tròn đầy đặn, được đặt trong một chiếc lọ thủy tinh trong suốt, làm nổi bật vẻ đẹp tinh khôi của hoa. Sự kết hợp hài hòa giữa các màu sắc tạo nên một tổng thể đẹp mắt và bắt mắt.', 1, 10),
(62, 'Hoa lễ 08', 190000, 9, 'hoale8.jpg', 'Bó hoa được thiết kế tỉ mỉ, từng bông cúc đều được sắp xếp một cách hài hòa và tinh tế.', 'Với Hoa lễ 08, chúng tôi đã tạo ra một tác phẩm nghệ thuật đầy sức sống từ những bông cúc vàng tươi tắn. Bó hoa này không chỉ đơn thuần là một món quà, mà còn là một biểu tượng của sự ấm áp, lòng trung thành và sự trân trọng. Màu vàng rực rỡ của hoa cúc mang đến một cảm giác tươi mới và tràn đầy năng lượng.', 1, 10),
(63, 'Hoa khai trương 01', 500000, 10, 'chucmung1.jpg', 'Hoa khai trương 01 là một lựa chọn hoàn hảo để làm quà tặng khai trương. Với thiết kế đẹp mắt, chất lượng tốt và dịch vụ chuyên nghiệp, sản phẩm này chắc chắn sẽ góp phần làm cho ngày khai trương của bạn thêm phần ý nghĩa và thành công.', '\"Hoa khai trương 01\" là một bó hoa tươi tắn, rực rỡ sắc màu, thích hợp làm quà tặng khai trương cửa hàng, văn phòng hoặc các sự kiện quan trọng khác. Bó hoa được thiết kế tỉ mỉ, sang trọng, mang ý nghĩa chúc mừng thành công và thịnh vượng. Với dịch vụ giao hàng nhanh chóng, miễn phí thiệp chúc mừng và đảm bảo hoa tươi trong 3 ngày, sản phẩm này chắc chắn sẽ làm hài lòng mọi khách hàng.', 1, 105),
(64, 'Hoa khai trương 02', 700000, 8, 'chucmung2.jpg', 'Hoa khai trương thường mang ý nghĩa chúc mừng, thành công, thịnh vượng và may mắn. Bó hoa này là món quà ý nghĩa để gửi đến các doanh nghiệp mới khai trương hoặc các sự kiện quan trọng.', '\"Hoa khai trương 02\" là một kiệt tác nghệ thuật từ những bông hoa tươi tắn, rực rỡ sắc màu. Với thiết kế sang trọng và hiện đại, bó hoa là biểu tượng cho sự thành công, thịnh vượng và những khởi đầu mới. Đây là món quà hoàn hảo để chúc mừng khai trương cửa hàng, văn phòng hoặc các sự kiện quan trọng khác.', 1, 105),
(65, 'Hoa khai trương 03', 400000, 5, 'chucmung3.jpg', 'Hoa khai trương thường mang ý nghĩa chúc mừng, thành công, thịnh vượng và may mắn. Bó hoa này là món quà ý nghĩa để gửi đến các doanh nghiệp mới khai trương hoặc các sự kiện quan trọng.', '\"Hoa khai trương 03\" là một tác phẩm nghệ thuật từ những bông hoa tươi tắn, rực rỡ sắc màu. Với thiết kế sang trọng và độc đáo, bó hoa là biểu tượng cho sự thành công, thịnh vượng và những khởi đầu mới. Đây là món quà hoàn hảo để chúc mừng khai trương cửa hàng, văn phòng hoặc các sự kiện quan trọng khác.', 1, 105),
(66, 'Hoa khai trương 04', 500000, 7, 'chucmung4.jpg', 'Bó hoa sẽ tạo ấn tượng tốt cho khách hàng và đối tác khi đến thăm cửa hàng mới khai trương.', 'Với Hoa khai trương 04, chúng tôi đã tạo ra một tác phẩm nghệ thuật đầy màu sắc và ý nghĩa. Bó hoa được thiết kế tỉ mỉ với những bông hoa tươi tắn và rực rỡ, mang đến một không khí tươi mới và tràn đầy năng lượng. Sự kết hợp hài hòa giữa các loại hoa và màu sắc tạo nên một tổng thể đẹp mắt và ấn tượng.', 1, 105),
(67, 'Hoa khai trương 05', 600000, 6, 'chucmung5.jpg', 'Lẵng hoa được thiết kế tinh tế và lãng mạn, phù hợp với không gian khai trương.', 'Với Hoa khai trương 05, chúng tôi đã tạo ra một tác phẩm nghệ thuật đầy lãng mạn và tinh tế. Lẵng hoa được thiết kế tỉ mỉ với những bông hồng hồng tươi tắn, mang đến một không khí ấm áp và ngọt ngào. Sự kết hợp hài hòa giữa các bông hồng và lá xanh tạo nên một tổng thể đẹp mắt và ấn tượng.', 1, 105),
(68, 'Hoa khai trương 06', 300000, 12, 'chucmung6.png', 'Lẵng hoa được thiết kế tinh tế và thanh lịch, phù hợp với nhiều không gian khác nhau.', 'Với Hoa khai trương 06, chúng tôi đã tạo ra một tác phẩm nghệ thuật đầy tinh tế và thanh lịch. Lẵng hoa được thiết kế tỉ mỉ với những bông hoa tươi tắn và màu sắc hài hòa, mang đến một không khí tươi mới và tràn đầy năng lượng. Sự kết hợp giữa các loại hoa như hoa hồng, hoa cúc, hoa baby tạo nên một tổng thể đẹp mắt và ấn tượng.', 1, 105),
(69, 'Hoa khai trương 07', 400000, 15, 'chucmung7.png', 'Lẵng hoa được thiết kế độc đáo và sang trọng, phù hợp với không gian khai trương.', 'Với Hoa khai trương 07, chúng tôi đã tạo ra một tác phẩm nghệ thuật đầy tinh tế và sang trọng. Lẵng hoa được thiết kế tỉ mỉ với những bông hồng và lan tươi tắn, mang đến một không khí tươi mới và tràn đầy năng lượng. Sự kết hợp giữa màu sắc rực rỡ của hoa hồng và vẻ đẹp thanh lịch của hoa lan tạo nên một tổng thể đẹp mắt và ấn tượng.', 1, 105),
(70, 'Hoa khai trương 08', 600000, 9, 'chucmung8.jpg', 'Lẵng hoa được thiết kế với phong cách hiện đại và sang trọng, phù hợp với nhiều không gian khác nhau.', 'Với Hoa lễ 08, chúng tôi đã tạo ra một tác phẩm nghệ thuật đầy sức sống từ những bông cúc vàng tươi tắn. Bó hoa này không chỉ đơn thuần là một món quà, mà còn là một biểu tượng của sự ấm áp, lòng trung thành và sự trân trọng. Màu vàng rực rỡ của hoa cúc mang đến một cảm giác tươi mới và tràn đầy năng lượng.', 1, 105),
(71, 'Hoa khai trương 09', 300000, 10, 'chucmung9.jpg', 'Hoa tươi được nhập khẩu từ các vườn hoa nổi tiếng, đảm bảo chất lượng tốt nhất.', 'Với Hoa khai trương 09, chúng tôi đã tạo ra một tác phẩm nghệ thuật hoa tươi đầy sức sống. Lẵng hoa được thiết kế tỉ mỉ với những bông hoa tươi tắn và màu sắc rực rỡ, lựa chọn kỹ càng để đảm bảo độ tươi và bền. Sự kết hợp hài hòa giữa các loại hoa tạo nên một tổng thể đẹp mắt và tươi trẻ, thể hiện sự tràn đầy năng lượng và niềm vui.', 1, 105),
(75, 'Hoa khai trương 10', 350000, 10, 'chucmung10.png', 'Lẵng hoa tượng trưng cho sự khởi đầu mới, thành công và may mắn.', 'Với Hoa khai trương 10, chúng tôi đã tạo ra một tác phẩm nghệ thuật hoa tươi đầy sức sống. Lẵng hoa được thiết kế tỉ mỉ với những bông hoa tươi tắn và màu sắc rực rỡ, lựa chọn kỹ càng để đảm bảo độ tươi và bền. Sự kết hợp hài hòa giữa các loại hoa tạo nên một tổng thể đẹp mắt và tươi trẻ, thể hiện sự tràn đầy năng lượng và niềm vui.', 1, 105),
(76, 'Hoa khai trương 11', 400000, 8, 'chucmung11.jpg', 'Hoa khai trương 11 là một tuyệt tác hội tụ cả vẻ đẹp và ý nghĩa. Lẵng hoa không chỉ là một món quà trang trí mà còn là lời chúc chân thành, gửi gắm những điều tốt đẹp nhất đến người nhận.', 'Hoa khai trương 11 là một tác phẩm nghệ thuật thực sự, được tạo nên từ những bông hoa tươi thắm và quý phái nhất. Với sự kết hợp hài hòa giữa màu sắc và kiểu dáng, lẵng hoa này mang đến một vẻ đẹp tinh tế, sang trọng, thể hiện sự đẳng cấp và gu thẩm mỹ của người tặng. Món quà này không chỉ là lời chúc mừng khai trương ý nghĩa mà còn là điểm nhấn hoàn hảo cho không gian sự kiện, giúp không gian trở nên tươi tắn và rực rỡ hơn.', 0, 105);

-- --------------------------------------------------------

--
-- Table structure for table `thanhtoan`
--

DROP TABLE IF EXISTS `thanhtoan`;
CREATE TABLE IF NOT EXISTS `thanhtoan` (
  `id_thanhtoan` int NOT NULL AUTO_INCREMENT,
  `id_dangky` int NOT NULL,
  `code_thanhtoan` varchar(10) NOT NULL,
  `thanhtoan_status` int NOT NULL,
  `hinhthuc_thanhtoan` varchar(255) NOT NULL,
  `diadiem` varchar(255) NOT NULL,
  `soluong` int NOT NULL,
  `gia_thanhtoan` int NOT NULL,
  `ten_sanpham` varchar(255) NOT NULL,
  `adminPhone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_thanhtoan`),
  KEY `id_dangky` (`id_dangky`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `thanhtoan`
--

INSERT INTO `thanhtoan` (`id_thanhtoan`, `id_dangky`, `code_thanhtoan`, `thanhtoan_status`, `hinhthuc_thanhtoan`, `diadiem`, `soluong`, `gia_thanhtoan`, `ten_sanpham`, `adminPhone`) VALUES
(68, 133, 'PAY_676cea', 0, 'Tiền mặt', 'hồ chí minh', 2, 310000, 'Hoa lễ 02, số lượng: 1, Hoa sinh nhật 03, số lượng: 1', '0123456789');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `baiviet`
--
ALTER TABLE `baiviet`
  ADD CONSTRAINT `baiviet_ibfk_1` FOREIGN KEY (`id_danhmuc`) REFERENCES `danhmuc` (`id_danhmuc`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_id_dangky` FOREIGN KEY (`id_dangky`) REFERENCES `dangky` (`id_dangky`);

--
-- Constraints for table `danhgia`
--
ALTER TABLE `danhgia`
  ADD CONSTRAINT `fk_dangky` FOREIGN KEY (`id_dangky`) REFERENCES `dangky` (`id_dangky`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_sanpham` FOREIGN KEY (`id_sanpham`) REFERENCES `sanpham` (`id_sanpham`) ON DELETE CASCADE;

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`id_danhmuc`) REFERENCES `danhmuc` (`id_danhmuc`);

--
-- Constraints for table `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD CONSTRAINT `thanhtoan_ibfk_1` FOREIGN KEY (`id_dangky`) REFERENCES `dangky` (`id_dangky`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
