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
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `group_id` bigint NOT NULL AUTO_INCREMENT,
  `achievement_rate` double NOT NULL,
  `current_member` int NOT NULL,
  `end_date` date DEFAULT NULL,
  `end_recruit_date` date DEFAULT NULL,
  `goal` double NOT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `group_routine` varchar(255) DEFAULT NULL,
  `maximum_member` int NOT NULL,
  `penalty` varchar(255) DEFAULT NULL,
  `period` int NOT NULL,
  `start_date` date DEFAULT NULL,
  `start_recruit_date` date DEFAULT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,0,2,'2023-03-07','2023-02-10',89.24,'공주들','3',5,'대가리 박박 밀기',5,'2023-03-03','2023-02-01'),(2,0,3,'2023-03-10','2023-02-11',82,'무야호팀','1,2',8,'하이디라오에서 홍탕만 먹기',8,'2023-03-03','2023-02-01'),(3,0,3,'2023-04-09','2023-02-19',63,'string','3',4,'우짤',5,'2023-04-01','2023-02-01'),(4,0,3,'2023-04-09','2023-02-19',63,'string','',4,'우짤',9,'2023-04-01','2023-02-01'),(5,0,1,'2023-02-10','2023-02-01',82.3,'그룹명 어쩔','1,2',5,'하수도 체험',5,'2023-02-06','2023-01-01'),(6,0,2,'2023-02-12','2023-01-11',93.2,'그룹명 울랄라','1,2',5,'벅벅벅',6,'2023-02-06','2023-01-09'),(7,0,2,'2023-02-11','2023-01-11',93.2,'그룹명_그게중요헌가요','1,2',5,'20층까지 계단타고 올라가기',6,'2023-02-06','2023-01-09'),(8,0,2,'2023-02-12','2023-01-11',93.2,'그룹명..?','3,4',5,'알아서하쇼 ',7,'2023-02-06','2023-01-09'),(9,0,0,'2023-02-07',NULL,50,'test','1',0,'test',0,'2023-02-03',NULL),(10,0,2,'2023-03-09','2023-02-08',79.2,'[그룹명]','1',9,'zzzzzzZZZZ',3,'2023-03-07','2023-02-01'),(11,0,0,'2023-02-24',NULL,0,'test','1',0,'test',0,'2023-02-08',NULL),(12,0,1,'2023-02-25',NULL,0,'test2','1',0,'test2',0,'2023-02-15',NULL),(13,0,0,'2023-02-10',NULL,40,'test2','1',0,'test2',0,'2023-02-08',NULL),(14,0,3,'2023-02-28',NULL,30,'test','24,26',0,'test',19,'2023-02-10',NULL),(15,0,1,'2023-02-28',NULL,80,'test1','23',0,'qwgtfsad',16,'2023-02-13',NULL),(16,0,1,'2023-02-24',NULL,80,'cvsadcasdc','',0,'asdvasdc',3,'2023-02-22',NULL),(17,0,1,'2023-02-28',NULL,80,'123445','28',0,'asdfvgsad',6,'2023-02-23',NULL),(18,0,1,'2023-03-16','2023-02-28',80,'test123','35,34',5,'test',17,'2023-02-28','2023-02-16'),(19,0,1,'2023-02-24','2023-02-17',80,'test','32',5,'test',5,'2023-02-20','2023-02-13'),(20,0,1,'2023-02-28',NULL,80,'test','33,34',0,'test',16,'2023-02-13',NULL),(21,0,1,'2023-03-15','2023-02-28',70,'test1243','23',5,'test',16,'2023-02-28','2023-02-14'),(22,0,1,'2023-02-28','2023-02-18',60,'1325441321234231','23',5,'sadgasdfasdf',15,'2023-02-14','2023-02-14'),(23,0,1,'2023-02-24',NULL,80,'qwe rwq','23',0,'rwtew',11,'2023-02-14',NULL),(24,0,1,'2023-02-24',NULL,80,'EWQFWQEFEWFRWEDFWERdfrwd','23',0,'asdf',11,'2023-02-14',NULL),(25,0,1,'2023-02-28','2023-02-28',50,'test123','1',5,'test',5,'2023-02-24','2023-02-14'),(26,0,0,'2023-04-09','2023-02-15',63,'string','',4,'우짤',9,'2023-04-01','2023-02-01'),(27,0,0,'2023-04-09','2023-02-15',63,'string','',4,'우짤',9,'2023-04-01','2023-02-01'),(28,0,1,'2023-03-31',NULL,0,'거지 체력 탈출팟','42,41',0,'마일리지 나눠주기',16,'2023-02-16',NULL),(29,0,1,'2023-02-28',NULL,0,'의지박약 모임','45',0,'200',10,'2023-02-19',NULL),(30,0,1,'2023-03-11','2023-02-23',97.7,'의지박약자들','45',6,'꿀밤 맞기',16,'2023-02-24','2023-02-17'),(31,78.42,2,'2023-03-14','2023-02-20',89,'운동습관기르기','43',5,'커피기프티콘쏘기',22,'2023-02-21','2023-02-17');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
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
