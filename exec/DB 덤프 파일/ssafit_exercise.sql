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
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise` (
  `exercise_id` bigint NOT NULL AUTO_INCREMENT,
  `exercise_set` bigint NOT NULL,
  `name` varchar(45) NOT NULL,
  `reps` bigint NOT NULL,
  `rest_time` bigint NOT NULL,
  `exercise_type_id` bigint DEFAULT NULL,
  `routine_id` bigint DEFAULT NULL,
  PRIMARY KEY (`exercise_id`),
  KEY `FKnw91ts622h271oq286bdtng66` (`exercise_type_id`),
  KEY `FK4w60c4715la2mn7ycp54j03vi` (`routine_id`),
  CONSTRAINT `FK4w60c4715la2mn7ycp54j03vi` FOREIGN KEY (`routine_id`) REFERENCES `routine` (`routine_id`),
  CONSTRAINT `FKnw91ts622h271oq286bdtng66` FOREIGN KEY (`exercise_type_id`) REFERENCES `exercise_type` (`exercise_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES (1,5,'플랭크',60,90,4,3),(2,10,'버피테스트',30,60,23,2),(3,2,'팔벌려높이뛰기',15,30,24,1),(4,3,'팔굽혀펴기',15,45,3,2),(5,3,'파이크 푸쉬업',10,45,8,2),(6,5,'덤벨로우',15,50,18,2),(9,5,'팔벌려높이뛰기',30,40,24,3),(10,10,'버피테스트',30,60,23,3),(11,2,'exercise',1,70,4,28),(12,3,'exercise',15,45,3,28),(13,5,'바이시클 크런치',15,60,16,3),(14,5,'',15,40,4,30),(15,3,'팔굽혀펴기',12,20,3,1),(16,2,'사이드 플랭크',10,30,15,1),(17,3,'런지',12,20,2,1),(18,1,'다리 스트레칭',1,10,26,1),(19,3,'스쿼트',15,5,1,40),(20,3,'팔굽혀펴기',15,5,3,40),(21,3,'팔벌려높이뛰기',15,5,24,40),(22,3,'버피테스트',15,5,23,40),(23,3,'exercise',20,40,1,41),(24,3,'exercise',20,40,16,42),(25,2,'exercise',20,40,14,43),(26,2,'exercise',20,40,14,44),(27,3,'exercise',30,45,11,45),(28,1,'exercise',1000,0,21,46),(29,2,'exercise',20,50,10,48);
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 12:02:14
