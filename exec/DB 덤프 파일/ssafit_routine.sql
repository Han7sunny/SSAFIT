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
-- Table structure for table `routine`
--

DROP TABLE IF EXISTS `routine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routine` (
  `routine_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`routine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routine`
--

LOCK TABLES `routine` WRITE;
/*!40000 ALTER TABLE `routine` DISABLE KEYS */;
INSERT INTO `routine` VALUES (1,'기본 루틴 1'),(2,'기본 루틴 2'),(3,'기본 루틴 3'),(4,'자유 운동'),(6,'routine name2'),(8,'routine11111'),(11,'routineroutine'),(16,'fnxlsfnxls'),(17,'fnxlsfnxlsldld'),(18,'routine name1'),(19,'Greate Routine Ever'),(20,'Routine Routine~~~'),(21,'routineroutine'),(23,'test'),(24,'test'),(26,'test'),(27,'tttt'),(28,'tttt123'),(30,'1234125125t'),(31,'ttterwtwertwe'),(32,'ttterwtwertwe'),(33,'ttterwtwertwe2345'),(34,'ttterwtwertwe23452345'),(35,'1234'),(36,'wertwert'),(38,'changeTest'),(40,'오늘의 루틴'),(41,'건강한 하체 만들기'),(42,'코어 멋쟁이 되기'),(43,'궁극의 루틴'),(44,'궁극의 루틴'),(45,'의지 박약을 위한 루틴'),(46,'다이어트'),(47,'다이어트'),(48,'예쁜 어깨 만들기');
/*!40000 ALTER TABLE `routine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 12:02:12
