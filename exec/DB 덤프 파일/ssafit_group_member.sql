-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: i8a204.p.ssafy.io    Database: ssafit
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `group_member`
--

DROP TABLE IF EXISTS `group_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_member` (
  `group_member_id` bigint NOT NULL AUTO_INCREMENT,
  `accept_invitation` bit(1) NOT NULL,
  `achievement_rate` double NOT NULL,
  `group_id` bigint DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`group_member_id`),
  KEY `FKq7wk4bcqhihj61ff5b2oub3r7` (`group_id`),
  KEY `FKpy45r2qx8a2vqafo7rste49c` (`user_id`),
  CONSTRAINT `FKpy45r2qx8a2vqafo7rste49c` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKq7wk4bcqhihj61ff5b2oub3r7` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_member`
--

LOCK TABLES `group_member` WRITE;
/*!40000 ALTER TABLE `group_member` DISABLE KEYS */;
INSERT INTO `group_member` VALUES (2,_binary '\0',0,1,'test123'),(7,_binary '\0',0,3,'test123'),(8,_binary '\0',0,3,'test456'),(9,_binary '\0',0,3,'test22'),(26,_binary '\0',0,2,'test123'),(27,_binary '\0',0,2,'test22'),(28,_binary '\0',0,2,'test456'),(33,_binary '',0,5,'test456'),(36,_binary '',0,6,'test123'),(37,_binary '',0,6,'test1xoa'),(38,_binary '',0,7,'test123'),(41,_binary '',0,7,'test1xoa'),(42,_binary '',0,8,'test123'),(45,_binary '',0,8,'test1xoa'),(46,_binary '',0,9,'test123'),(47,_binary '',0,10,'xoa1235'),(48,_binary '\0',0,10,'test123'),(49,_binary '\0',0,10,'david1235'),(51,_binary '',0,12,'lhjTest'),(52,_binary '',0,13,'lhjTest'),(54,_binary '',0,1,'test456'),(61,_binary '',0,2,'lhjTest'),(69,_binary '',0,14,'admin123'),(70,_binary '\0',0,14,'admintest'),(71,_binary '\0',0,14,'test123'),(72,_binary '',0,14,'lhjTest'),(75,_binary '',0,16,'admin123'),(76,_binary '\0',0,16,'lhjTest'),(77,_binary '',0,17,'admin123'),(78,_binary '\0',0,17,'lhjTest'),(79,_binary '',0,18,'admin123'),(80,_binary '\0',0,18,'lhjTest'),(81,_binary '',0,19,'admin123'),(82,_binary '',0,19,'lhjTest'),(87,_binary '',0,21,'lhjTest'),(88,_binary '\0',0,21,'aaaaaaa'),(89,_binary '',0,22,'lhjTest'),(90,_binary '',0,23,'lhjTest'),(94,_binary '',0,24,'lhjTest'),(95,_binary '',0,25,'admin123'),(96,_binary '\0',0,25,'lhjTest'),(97,_binary '',0,26,'admin123'),(98,_binary '',0,27,'admin123'),(99,_binary '',0,4,'admin123'),(100,_binary '',0,28,'dkdlel3'),(101,_binary '',0,29,'kkwtest'),(102,_binary '',0,30,'kkwtest'),(103,_binary '',0,31,'dkdlel4'),(104,_binary '\0',0,31,'dkdlel'),(105,_binary '',0,30,'dkdlel3');
/*!40000 ALTER TABLE `group_member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 12:02:13
