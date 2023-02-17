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
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply` (
  `reply_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `registered_time` datetime(6) DEFAULT NULL,
  `board_id` bigint DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`reply_id`),
  KEY `FKcs9hiip0bv9xxfrgoj0lwv2dt` (`board_id`),
  KEY `FKapyyxlgntertu5okpkr685ir9` (`user_id`),
  CONSTRAINT `FKapyyxlgntertu5okpkr685ir9` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKcs9hiip0bv9xxfrgoj0lwv2dt` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` VALUES (1,'저를 받아주십시오.asdvasdv','2023-02-09 08:49:02.285059',1,'test456'),(3,'루틴 퍼가요~','2023-02-06 04:46:52.581000',5,'test123'),(7,'sdfgsdfg','2023-02-07 02:01:16.776000',3,'test123'),(9,'댓글갈겨','2023-02-06 14:05:10.705000',1,'xoa1235'),(18,'string','2023-02-09 01:15:29.143790',22,'admin123'),(19,'string','2023-02-09 01:16:30.611024',22,'admin123'),(23,'asdfasdfasdfas','2023-02-09 08:54:02.582112',1,'admin123'),(25,'test','2023-02-11 01:04:34.282757',22,'admin123'),(27,'test','2023-02-11 01:14:16.390479',22,'lhjTest'),(29,'wergwergwergwer','2023-02-11 04:39:10.456285',2,'lhjTest'),(30,'test','2023-02-11 05:09:11.848657',3,'admin123'),(38,'sdfvsdfvsdfv','2023-02-12 12:44:22.945490',5,'admin123'),(49,'fjdkzkfkfjxkzk','2023-02-13 08:14:16.372230',3,'admin123'),(52,'test123','2023-02-14 02:07:25.424151',52,'admin123'),(53,'test','2023-02-14 02:08:08.525406',52,'lhjTest'),(54,'sadvasd','2023-02-14 02:59:09.656533',46,'admin123'),(60,'어깨에서 소리 날 때 하신 운동 자세는 잘못된겁니다. 그러다가 연골 나가고 염증 생겨요;;;;;;;;','2023-02-16 04:33:52.091473',53,'david1235'),(61,'sdfgsdfgsd','2023-02-16 07:14:25.569478',27,'admin123'),(62,'운동할 때 자세가 잘못된 것 같은데요? ','2023-02-16 11:17:48.154089',53,'dkdlel3'),(63,'와 운동 초보인데 따라해봐야겠어요. 감사합니다!','2023-02-16 11:18:26.411793',5,'dkdlel3'),(64,'다른 유저들의 루틴을 살펴보고 따라해보세요!','2023-02-16 11:22:28.648290',61,'dkdlel3'),(65,'서니님꺼 봐보세요!','2023-02-16 11:51:08.004738',62,'dkdlel4'),(66,'대박이네요 ㄷㄷ','2023-02-16 11:56:07.317294',5,'dkdlel4'),(67,'그룹 패널티를 보고 들어가세요','2023-02-16 12:22:50.091437',63,'kkwtest'),(68,'루틴 공유 게시판가서 보고 골라봐요','2023-02-16 12:23:43.376288',62,'kkwtest'),(69,'운동루틴 게시판 ㄱㄱㄱ','2023-02-16 12:23:57.830702',61,'kkwtest'),(70,'헐 저 들어가고 싶습니닷','2023-02-16 12:44:28.701106',65,'dkdlel3'),(71,'코어 운동 중요하죠 ㅎ ㅎ!!','2023-02-16 12:45:59.586951',64,'dkdlel3'),(72,'패널티가 걱정되면 목표를 달성하면 됩니다!!!','2023-02-16 13:14:54.810776',63,'dkdlel3'),(73,'나를 위한 그룹;; 필참합니다.','2023-02-16 13:16:17.167446',65,'dkdlel4'),(74,'미쳤다! 따라해서 예쁜 어깨 만들어봅니다 캬캬','2023-02-16 13:16:50.027511',66,'dkdlel4'),(75,'  저 참여하고 싶어요','2023-02-16 13:54:29.040414',67,'xoa1235'),(76,'패널티 적혀있는대로 패널티 받는거예요 ㅋㅋㅋ','2023-02-16 13:54:47.373175',63,'xoa1235'),(77,'제 루틴 참고하세요!!','2023-02-16 13:54:59.332556',62,'xoa1235'),(78,'정말 최고예요!!','2023-02-16 13:55:33.434774',66,'xoa1235'),(79,'s사에서 나온거 진짜 좋아요 추천','2023-02-16 13:58:41.845246',69,'david1235'),(80,'ㅋㅋㅋㅋㅋㅋㅋ 꾸준히 하는게 중요하죠','2023-02-16 13:59:05.279896',65,'david1235'),(82,'루틴을 좀 더 추가하면 좋을 것 같은데...','2023-02-16 13:59:59.332321',67,'david1235'),(83,'꿀밤 맞는 그룹도 있던데요?','2023-02-16 14:00:29.609762',63,'david1235'),(84,'그 미러에서 아바타 보고 따라해도 좋아요','2023-02-16 14:01:06.011427',62,'david1235'),(85,'오우 루틴 정말 좋네요 초보자분들이 하기 좋겠어요','2023-02-16 14:01:40.019765',68,'david1235'),(86,'여기서 더 늘려가면 좋을거에요','2023-02-16 14:02:08.460632',64,'david1235'),(87,'보조제는 잘 알아보고 드셔야해요 ㅠㅠ','2023-02-16 14:04:04.160234',69,'dkdlel4'),(88,'이렇게 하면 나도 김종국? 퍼갑니다^^','2023-02-16 14:04:55.573159',70,'dkdlel4'),(89,'와 마무리 스트레칭까지! 루틴 퍼가요!!','2023-02-16 14:05:23.671257',68,'dkdlel4'),(90,'저는 n사 추천이요!','2023-02-16 14:06:51.761927',69,'dkdlel3'),(91,'n사 222222','2023-02-16 14:08:23.108152',69,'kkwtest'),(92,'이렇게 해야 싸피 김종국이 되는거군요','2023-02-16 14:08:52.061929',70,'kkwtest'),(93,'이걸로 시작해보겠습니다!','2023-02-16 14:09:17.801863',68,'kkwtest'),(94,'~ 네! 자동으로 얼굴 인식되고, 제스쳐로 실행시키면 됩니다!','2023-02-16 14:11:25.038039',71,'xoa1235'),(95,'와 이것도 좋네요? 저도 퍼갑니다^^','2023-02-16 14:11:53.023156',70,'xoa1235');
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 12:02:11
