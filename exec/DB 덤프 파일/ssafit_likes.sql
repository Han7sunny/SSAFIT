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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `likes_id` bigint NOT NULL AUTO_INCREMENT,
  `board_id` bigint DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`likes_id`),
  KEY `FK5cq36196j3ww17d7r95qdm4td` (`board_id`),
  KEY `FKi2wo4dyk4rok7v4kak8sgkwx0` (`user_id`),
  CONSTRAINT `FK5cq36196j3ww17d7r95qdm4td` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `FKi2wo4dyk4rok7v4kak8sgkwx0` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (14,5,'xoa1235'),(15,11,'xoa1235'),(19,19,'xoa1235'),(38,1,'lhjTest'),(43,2,'lhjTest'),(46,2,'xoa1235'),(69,3,'lhjTest'),(74,53,'xoa1235'),(76,53,'admin123'),(77,46,'admin123'),(80,38,'admin123'),(82,3,'dkdlel3'),(84,51,'dkdlel3'),(85,5,'dkdlel4'),(86,3,'kkwtest'),(87,65,'kkwtest'),(88,65,'dkdlel3'),(90,64,'dkdlel3'),(92,51,'dkdlel4'),(93,52,'dkdlel4'),(94,54,'dkdlel4'),(95,57,'dkdlel4'),(96,65,'dkdlel4'),(97,3,'dkdlel4'),(98,62,'dkdlel4'),(99,66,'dkdlel4'),(100,64,'dkdlel4'),(101,67,'dkdlel4'),(102,65,'xoa1235'),(103,67,'xoa1235'),(104,63,'xoa1235'),(105,66,'xoa1235'),(107,65,'david1235'),(108,67,'david1235'),(109,62,'david1235'),(110,68,'david1235'),(111,69,'dkdlel4'),(112,70,'dkdlel4'),(113,68,'dkdlel4'),(115,70,'dkdlel3'),(116,68,'dkdlel3'),(117,70,'kkwtest'),(118,70,'xoa1235'),(119,51,'xoa1235'),(120,52,'xoa1235');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 12:02:16
