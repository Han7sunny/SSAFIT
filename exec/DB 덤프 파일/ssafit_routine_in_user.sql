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
-- Table structure for table `routine_in_user`
--

DROP TABLE IF EXISTS `routine_in_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routine_in_user` (
  `routine_id` bigint NOT NULL,
  `user_id` varchar(20) NOT NULL,
  KEY `FKldo14mpkjha1u4dk2csosui82` (`user_id`),
  KEY `FKfjthu9mfp0wekya0r79a9vh8m` (`routine_id`),
  CONSTRAINT `FKfjthu9mfp0wekya0r79a9vh8m` FOREIGN KEY (`routine_id`) REFERENCES `routine` (`routine_id`),
  CONSTRAINT `FKldo14mpkjha1u4dk2csosui82` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routine_in_user`
--

LOCK TABLES `routine_in_user` WRITE;
/*!40000 ALTER TABLE `routine_in_user` DISABLE KEYS */;
INSERT INTO `routine_in_user` VALUES (3,'test22'),(4,'test123'),(2,'test1xoa'),(2,'xoa1235'),(6,'dkdlel1'),(8,'dkdlel2'),(11,'dkdlel3'),(16,'dkdlel3'),(17,'dkdlel3'),(18,'dkdlel3'),(19,'dkdlel3'),(20,'dkdlel3'),(21,'dkdlel4'),(23,'lhjTest'),(24,'admin123'),(26,'admin123'),(27,'admin123'),(28,'admin123'),(30,'admin123'),(31,'admin123'),(32,'admin123'),(33,'admin123'),(35,'admin123'),(36,'admin123'),(38,'admin123'),(34,'admin123'),(34,'dkdlel3'),(41,'dkdlel3'),(42,'dkdlel3'),(43,'dkdlel4'),(44,'dkdlel4'),(45,'kkwtest'),(46,'kkwtest'),(47,'kkwtest'),(48,'dkdlel3'),(1,'test1xoa'),(1,'test123'),(1,'xoa1235'),(1,'admin123'),(1,'dkdlel4'),(1,'dkdlel3'),(1,'kkwtest'),(40,'david1235'),(40,'joinojoin'),(40,'dkdlel4'),(40,'dkdlel3'),(40,'kkwtest'),(40,'xoa1235'),(1,'david1235'),(2,'david1235'),(3,'david1235');
/*!40000 ALTER TABLE `routine_in_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 12:02:15
