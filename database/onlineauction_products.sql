-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: onlineauction
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime DEFAULT NULL,
  `expriry_date` datetime DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `initial_price` int(11) DEFAULT NULL,
  `description` text,
  `imme_buy_price` int(11) DEFAULT NULL,
  `step_cost` int(11) DEFAULT '0',
  `auto_extend` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'2019-11-11 07:59:38','2019-11-13 07:59:38','Freshwater Cultured Pearl',1500000,'Freshwater Cultured Pearl, Citrine, Peridot & Amethyst Bracelet, 7.5\"',1500000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',6),(2,'2019-11-11 07:59:38','2019-11-13 07:59:38','Pink Sapphire Sterling Silver',300000,'14 1/2 Carat Created Pink Sapphire Sterling Silver Bracelet w/ Diamond Accents',300000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',6),(3,'2019-11-11 07:59:38','2019-11-13 07:59:38','Torrini KC241',1600000000,'Nhẫn kim cương - vẻ đẹp kiêu sa',1600000000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',6),(4,'2019-11-11 07:59:38','2019-11-13 07:59:38','Torrini KC242',42000000,'tinh xảo và sang trọng',42000000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',6),(5,'2019-11-11 07:59:38','2019-12-12 17:59:38','Nokia 7610',2900000,'Độ phân giải cao, màn hình màu, chụp ảnh xuất sắc.',2900000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',2),(6,'2019-11-11 07:59:38','2019-11-13 07:59:38','Áo thun nữ',180000,'Màu sắc tươi tắn, kiểu dáng trẻ trung',180000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',4),(7,'2019-11-11 07:59:38','2019-12-13 07:59:38','Simen AP75',2800000,'Thiết kế tinh xảo, hiện đại',2800000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',2),(8,'2019-11-11 07:59:38','2019-11-13 07:59:38','Áo bé trai',270000,'Hóm hỉnh dễ thương',270000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',4),(9,'2019-11-11 07:59:38','2019-11-13 07:59:38','Bông tai nạm hạt rubby',2400000,'Trẻ trung và quý phái',2400000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',6),(10,'2019-11-11 07:59:38','2019-11-13 07:59:38','Đầm dạ hội ánh kim',2800000,'Đủ màu sắc - kiểu dáng',2800000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',4),(11,'2019-11-11 07:59:38','2019-11-13 07:59:38','Dây chuyền ánh bạc',250000,'Kiểu dáng mới lạ',250000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',6),(12,'2019-11-11 07:59:38','2019-11-13 07:59:38','Đồ bộ bé gái',120000,'Đủ màu sắc - kiểu dáng',120000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',4),(13,'2019-11-11 07:59:38','2019-11-13 07:59:38','Đầm dạ hội Xinh Xinh',2600000,'Đơn giản nhưng quý phái',2600000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',4),(14,'2019-11-11 07:59:38','2019-11-13 07:59:38','Đầm dạ hội NEM',1200000,'Táo bạo và quyến rũ',1200000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',4),(15,'2019-11-11 07:59:38','2019-11-13 07:59:38','Dây chuyền đá quý',1925000,'Kết hợp vàng trắng và đá quý',1925000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',6),(16,'2019-11-11 07:59:38','2019-12-14 07:59:38','Nokia N72',3200000,'Sành điệu cùng N72',3200000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',2),(17,'2019-11-11 07:59:38','2019-11-13 07:59:38','Mặt dây chuyền Ruby',1820000,'Toả sáng cùng Ruby',1820000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',6),(18,'2019-11-11 07:59:38','2019-11-13 07:59:38','1/2 Carat Pink Sapphire Silver',3400000,'Created Pink Sapphire',3400000,1000,0,'2019-11-13 07:59:38','2019-11-13 07:59:38',6),(19,'2019-11-11 07:59:38','2019-11-13 07:59:38','Netaya',1820000,'Dây chuyền vàng trắng',1820000,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',6),(20,'2019-11-11 07:59:38','2019-11-13 07:59:38','Giày nam GN16',540000,'Êm - đẹp - bề',540000,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',4),(21,'2019-11-11 07:59:38','2019-11-13 07:59:38','G3.370A',300000,'Đen bóng, sang trọng',300000,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',4),(22,'2019-11-11 07:59:38','2019-11-13 07:59:38','Giày nữ GN1',290000,'Kiểu dáng thanh thoát',290000,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',4),(23,'2019-11-11 07:59:38','2019-11-13 07:59:38','NV002',3600000,'Kiểu dáng độc đáo',3600000,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',6),(24,'2019-11-11 07:59:38','2019-11-13 07:59:38','NV009',14900000,'Sáng chói - mới lạ',14900000,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',6),(25,'2019-11-11 07:59:38','2019-11-13 07:59:38','CK010',2147483647,'Độc đáo, sang trọng',2147483647,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',6),(26,'2019-11-11 07:59:38','2019-11-13 07:59:38','CK009',1850000000,'Nữ tính - đầy quí phái',1850000000,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',6),(27,'2019-11-11 07:59:38','2019-11-13 07:59:38','CK007',2147483647,'Sự kết hợp khéo léo, độc đáo',2147483647,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',6),(28,'2019-11-11 07:59:38','2019-11-13 07:59:38','CK005',1800000000,'Tinh xảo - sang trọng',1800000000,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',6),(29,'2019-11-11 07:59:38','2019-11-13 07:59:38','NV01TT',500000000,'Tinh tế đến không ngờ',500000000,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',6),(30,'2019-11-11 07:59:38','2019-12-14 07:59:38','Motorola W377',2400000,'Nữ tính - trẻ trung',2400000,1000,0,'2019-11-11 07:59:38','2019-11-11 07:59:38',2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-12 14:58:58
