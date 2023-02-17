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
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` bigint NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `notification_type` int NOT NULL,
  `board_id` bigint DEFAULT NULL,
  `group_id` bigint DEFAULT NULL,
  `record_id` bigint DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `FKlov3gio05yp7qi3rj73m8p33d` (`board_id`),
  KEY `FKnijmdh0ic3drn84yvw2xru5ol` (`group_id`),
  KEY `FKc094v0evnirnii4x5a1r6hcdx` (`record_id`),
  KEY `FKb0yvoep4h4k92ipon31wmdf7e` (`user_id`),
  CONSTRAINT `FKb0yvoep4h4k92ipon31wmdf7e` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKc094v0evnirnii4x5a1r6hcdx` FOREIGN KEY (`record_id`) REFERENCES `record` (`record_id`),
  CONSTRAINT `FKlov3gio05yp7qi3rj73m8p33d` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `FKnijmdh0ic3drn84yvw2xru5ol` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (115,'(그룹 모집) test123글에 관리자님이 댓글을 달았습니다.',3,52,25,NULL,'admin123'),(116,'(그룹 모집) test123글에 lhj님이 댓글을 달았습니다.',3,52,25,NULL,'admin123'),(117,'(질문글) treasdf글에 관리자님이 댓글을 달았습니다.',1,46,NULL,NULL,'admin123'),(118,'(질문글) 어깨 운동 관련해서 질문할ㄱㅔ 있는데요글에 관리자님이 댓글을 달았습니다.',1,53,NULL,NULL,'xoa1235'),(119,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,128,'lhjTest'),(120,'예약한 루틴 1 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,148,'yhjtest'),(121,'예약한 루틴 1 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,149,'kkwtest'),(122,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,128,'lhjTest'),(123,'예약한 루틴 1 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,148,'yhjtest'),(124,'예약한 루틴 1 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,149,'kkwtest'),(125,'test2 그룹이 시작되었습니다.',0,NULL,12,NULL,'lhjTest'),(126,'test2 그룹이 시작되었습니다.',0,NULL,12,NULL,'lhjTest'),(127,'test2 그룹이 시작되었습니다.',0,NULL,12,NULL,'lhjTest'),(129,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,129,'lhjTest'),(130,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,144,'lhjTest'),(131,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,151,'lhjTest'),(132,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,166,'lhjTest'),(133,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,177,'lhjTest'),(134,'예약한 루틴 1 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,195,'kkwtest'),(135,'예약한 루틴 1 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,196,'yhjtest'),(137,'(질문글) 어깨 운동 관련해서 질문할ㄱㅔ 있는데요글에 관리자님이 댓글을 달았습니다.',1,53,NULL,NULL,'xoa1235'),(138,'(질문글) 어깨 운동 관련해서 질문할ㄱㅔ 있는데요글에 관리자님이 댓글을 달았습니다.',1,53,NULL,NULL,'xoa1235'),(139,'(질문글) 어깨 운동 관련해서 질문할ㄱㅔ 있는데요글에 싸피김종국님이 댓글을 달았습니다.',1,53,NULL,NULL,'xoa1235'),(140,'(공지글) asdfasdfas글에 관리자님이 댓글을 달았습니다.',4,27,NULL,NULL,'admin123'),(141,'(질문글) 어깨 운동 관련해서 질문할ㄱㅔ 있는데요글에 gogogoo님이 댓글을 달았습니다.',1,53,NULL,NULL,'xoa1235'),(142,'(루틴 공유) 정석 루틴 공유합니다글에 gogogoo님이 댓글을 달았습니다.',2,5,NULL,NULL,'test1xoa'),(143,'(질문글) 운동시작...글에 gogogoo님이 댓글을 달았습니다.',1,61,NULL,NULL,'lhjTest'),(144,'(질문글)  운동 처음 시작하는데요..글에 useruser님이 댓글을 달았습니다.',1,62,NULL,NULL,'dkdlel3'),(145,'(루틴 공유) 정석 루틴 공유합니다글에 useruser님이 댓글을 달았습니다.',2,5,NULL,NULL,'test1xoa'),(146,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,130,'lhjTest'),(147,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,152,'lhjTest'),(148,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,167,'lhjTest'),(149,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,178,'lhjTest'),(150,'예약한 tttt123 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,194,'admin123'),(151,'예약한 Greate Routine Ever 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,199,'dkdlel3'),(152,'예약한 오늘의 루틴 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,208,'joinojoin'),(153,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,130,'lhjTest'),(154,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,152,'lhjTest'),(155,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,167,'lhjTest'),(156,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,178,'lhjTest'),(157,'예약한 tttt123 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,194,'admin123'),(158,'예약한 Greate Routine Ever 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,199,'dkdlel3'),(159,'예약한 오늘의 루틴 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,208,'joinojoin'),(160,'(질문글) 그룹 목표 달성 못하면 어떻게돼요?글에 강권우님이 댓글을 달았습니다.',1,63,NULL,NULL,'dkdlel4'),(161,'(질문글)  운동 처음 시작하는데요..글에 강권우님이 댓글을 달았습니다.',1,62,NULL,NULL,'dkdlel3'),(162,'(질문글) 운동시작...글에 강권우님이 댓글을 달았습니다.',1,61,NULL,NULL,'lhjTest'),(163,'(그룹 모집) 의지박약들 모이세요글에 gogogoo님이 댓글을 달았습니다.',3,65,30,NULL,'kkwtest'),(164,'(루틴 공유) 운동 초보 루틴 공유 해봅니다 ^^글에 gogogoo님이 댓글을 달았습니다.',2,64,NULL,NULL,'dkdlel4'),(165,'(질문글) 그룹 목표 달성 못하면 어떻게돼요?글에 gogogoo님이 댓글을 달았습니다.',1,63,NULL,NULL,'dkdlel4'),(166,'(그룹 모집) 의지박약들 모이세요글에 useruser님이 댓글을 달았습니다.',3,65,30,NULL,'kkwtest'),(167,'(루틴 공유)  예쁜 어깨 만드세요^^글에 useruser님이 댓글을 달았습니다.',2,66,NULL,NULL,'dkdlel3'),(168,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,130,'lhjTest'),(169,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,152,'lhjTest'),(170,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,167,'lhjTest'),(171,'예약한 test 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,178,'lhjTest'),(172,'예약한 tttt123 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,194,'admin123'),(173,'예약한 Greate Routine Ever 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,199,'dkdlel3'),(174,'예약한 오늘의 루틴 루틴이 아직 완료되지 않았습니다.',5,NULL,NULL,209,'joinojoin'),(175,'(그룹 모집) 건강한 운동습관 기를 사람글에 서니사라ㅇ님이 댓글을 달았습니다.',3,67,31,NULL,'dkdlel4'),(176,'(질문글) 그룹 목표 달성 못하면 어떻게돼요?글에 서니사라ㅇ님이 댓글을 달았습니다.',1,63,NULL,NULL,'dkdlel4'),(177,'(질문글)  운동 처음 시작하는데요..글에 서니사라ㅇ님이 댓글을 달았습니다.',1,62,NULL,NULL,'dkdlel3'),(178,'(루틴 공유)  예쁜 어깨 만드세요^^글에 서니사라ㅇ님이 댓글을 달았습니다.',2,66,NULL,NULL,'dkdlel3'),(179,'(질문글) 다들 보조제 드세요?글에 싸피김종국님이 댓글을 달았습니다.',1,69,NULL,NULL,'xoa1235'),(180,'(그룹 모집) 의지박약들 모이세요글에 싸피김종국님이 댓글을 달았습니다.',3,65,30,NULL,'kkwtest'),(181,'(그룹 모집) 건강한 운동습관 기를 사람글에 싸피김종국님이 댓글을 달았습니다.',3,67,31,NULL,'dkdlel4'),(182,'(그룹 모집) 건강한 운동습관 기를 사람글에 싸피김종국님이 댓글을 달았습니다.',3,67,31,NULL,'dkdlel4'),(183,'(질문글) 그룹 목표 달성 못하면 어떻게돼요?글에 싸피김종국님이 댓글을 달았습니다.',1,63,NULL,NULL,'dkdlel4'),(184,'(질문글)  운동 처음 시작하는데요..글에 싸피김종국님이 댓글을 달았습니다.',1,62,NULL,NULL,'dkdlel3'),(185,'(루틴 공유) 초보자분들 들어오세요!글에 싸피김종국님이 댓글을 달았습니다.',2,68,NULL,NULL,'xoa1235'),(186,'(루틴 공유) 운동 초보 루틴 공유 해봅니다 ^^글에 싸피김종국님이 댓글을 달았습니다.',2,64,NULL,NULL,'dkdlel4'),(187,'(질문글) 다들 보조제 드세요?글에 useruser님이 댓글을 달았습니다.',1,69,NULL,NULL,'xoa1235'),(188,'(루틴 공유) 저의 오늘의 루틴 공개합니다글에 useruser님이 댓글을 달았습니다.',2,70,NULL,NULL,'david1235'),(189,'(루틴 공유) 초보자분들 들어오세요!글에 useruser님이 댓글을 달았습니다.',2,68,NULL,NULL,'xoa1235'),(190,'(질문글) 다들 보조제 드세요?글에 gogogoo님이 댓글을 달았습니다.',1,69,NULL,NULL,'xoa1235'),(191,'(질문글) 다들 보조제 드세요?글에 강권우님이 댓글을 달았습니다.',1,69,NULL,NULL,'xoa1235'),(192,'(루틴 공유) 저의 오늘의 루틴 공개합니다글에 강권우님이 댓글을 달았습니다.',2,70,NULL,NULL,'david1235'),(193,'(루틴 공유) 초보자분들 들어오세요!글에 강권우님이 댓글을 달았습니다.',2,68,NULL,NULL,'xoa1235'),(194,'(질문글) 오늘의 운동 지정 질문글에 서니사라ㅇ님이 댓글을 달았습니다.',1,71,NULL,NULL,'kkwtest'),(195,'(루틴 공유) 저의 오늘의 루틴 공개합니다글에 서니사라ㅇ님이 댓글을 달았습니다.',2,70,NULL,NULL,'david1235');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
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
