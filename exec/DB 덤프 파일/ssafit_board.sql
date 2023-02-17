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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `downloads` int NOT NULL,
  `hits` int NOT NULL,
  `likes` int NOT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `registered_time` datetime(6) DEFAULT NULL,
  `share_post` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `group_id` bigint DEFAULT NULL,
  `routine_id` bigint DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FK60jn05fpinj6cjhqcmtkacu2g` (`category_id`),
  KEY `FKq2ioutxq82ktk1edm7j5iedpu` (`group_id`),
  KEY `FK69i8awoludnuh39fema7kgd13` (`routine_id`),
  KEY `FKfyf1fchnby6hndhlfaidier1r` (`user_id`),
  CONSTRAINT `FK60jn05fpinj6cjhqcmtkacu2g` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FK69i8awoludnuh39fema7kgd13` FOREIGN KEY (`routine_id`) REFERENCES `routine` (`routine_id`),
  CONSTRAINT `FKfyf1fchnby6hndhlfaidier1r` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKq2ioutxq82ktk1edm7j5iedpu` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'내용 바꿈ㅋㅋ',0,178,1,'2023-02-06 02:21:30.166614','2023-02-06 00:38:04.421357',_binary '','제목도 바꿔부러',4,1,NULL,'test1xoa'),(2,'aaaaaaasssss',0,171,2,'2023-02-06 07:35:08.285979','2023-02-06 01:31:05.979258',_binary '','string',4,2,NULL,'test456'),(3,'더이상은 안되겠습니다. 혼자 운동하면 자꾸 운동하기 귀찮아서 누워있어요 ㅜ ',0,190,4,'2023-02-14 10:40:11.959803','2023-02-06 02:19:42.375739',_binary '','운동 같이 하실 분ㅜ',4,4,1,'test22'),(5,'몸 좋다는 사람들 루틴은 너무 투머치인 느낌이더라구요.... 이거 저거 다 해봤는데 역시 정석대로 꾸준히 하면...원하는 몸 만드실 수 있습니다... 우리 모두 득근...^^!',2,111,2,NULL,'2023-02-06 04:33:31.200280',_binary '','정석 루틴 공유합니다',3,NULL,1,'test1xoa'),(11,'야 333 routine',1,5,1,NULL,'2023-02-06 05:08:13.865596',_binary '','ㅋㅋ',3,NULL,2,'test22'),(19,'질문 내용 어쩌저쩌',0,25,1,NULL,'2023-02-07 06:10:02.665238',_binary '','제목임당',2,NULL,NULL,'xoa1235'),(22,'string',0,46,0,NULL,'2023-02-08 08:54:22.609460',_binary '','string',1,NULL,NULL,'admin123'),(23,'test',0,3,0,NULL,'2023-02-08 08:55:13.848579',_binary '','test',1,NULL,NULL,'admin123'),(24,'ttttt',0,4,0,NULL,'2023-02-09 01:04:50.751642',_binary '','tttt',1,NULL,NULL,'admin123'),(25,'qwer',0,10,0,NULL,'2023-02-09 01:33:50.704110',_binary '','qwer',1,NULL,NULL,'admin123'),(26,'rwqerqwer',0,2,0,NULL,'2023-02-09 01:35:18.192911',_binary '','qwerqwerqwe',1,NULL,NULL,'admin123'),(27,'dfasdfasfd',0,15,0,NULL,'2023-02-09 01:36:16.864880',_binary '','asdfasdfas',1,NULL,NULL,'admin123'),(28,'gsdfgdsgfgdsf',0,2,0,NULL,'2023-02-09 01:37:42.836059',_binary '','sdfgsdsdf',1,NULL,NULL,'admin123'),(29,'sdfgsdfgdjfkzlakdidiskwkslzosowkwk',0,46,0,'2023-02-13 01:09:02.895828','2023-02-09 01:39:26.305016',_binary '','fgdsfg',1,NULL,NULL,'admin123'),(38,'내용 ❤ <- 하트',0,24,1,NULL,'2023-02-10 00:23:25.988528',_binary '','이모지 테스트',2,NULL,NULL,'xoa1235'),(46,'qwefqwefqwefsdfhsdfg315214234523',0,65,1,'2023-02-14 03:35:01.886201','2023-02-13 14:35:20.932389',_binary '','treasdf12341234',2,NULL,NULL,'admin123'),(51,'각자 운동하고 친해지면 소모임도...ㅎㅎ',0,15,3,NULL,'2023-02-14 00:44:48.604004',_binary '','혹시 강남 근처에 사시는 분들 계신가요?',4,22,NULL,'lhjTest'),(52,'홈트에 미친 1인입니다. 끈기가 없어가지고 매번 일주일을 못 넘겨요...같이 하실 분 ㅜ',0,27,2,NULL,'2023-02-14 02:05:18.925504',_binary '','홈트광공 있나요?',4,25,NULL,'admin123'),(53,'어깨 운동할 때 어깨에서 자꾸 뚝둑거리는 소리가 나는데 왜 그러는거죠...? 뭔가 운동을 잘못하고 있는 거 같은데 정확히 모르겠어서요ㅜ',0,64,2,NULL,'2023-02-14 04:08:34.809570',_binary '','어깨 운동 관련해서 질문할ㄱㅔ 있는데요',2,NULL,NULL,'xoa1235'),(54,'aaaaaaasssss',0,9,1,NULL,'2023-02-14 07:12:14.626893',_binary '','string1',4,26,NULL,'admin123'),(57,'aaaaaaasssss',0,4,1,NULL,'2023-02-14 07:20:35.766913',_binary '','string2',4,27,NULL,'admin123'),(58,'부위별 운동이 업데이트 되었습니다. ',0,14,0,NULL,'2023-02-15 03:57:42.842786',_binary '','[공지사항] 부위별 운동 업데이트',1,NULL,NULL,'admin123'),(60,'진행한지 4주째인데 눈바디 결과 대만족입니다ㅜ 가벼운 루틴이니까 한 번 따라해보세요:D',0,0,0,NULL,'2023-02-15 16:30:27.246833',_binary '\0','루틴 공유합니다.',3,NULL,16,'dkdlel3'),(61,'운동시작 어떻게 하는게 좋을까요??',0,11,0,NULL,'2023-02-16 11:15:48.301398',_binary '','운동시작...',2,NULL,NULL,'lhjTest'),(62,'운동 처음해보는데 어떻게 시작하면 좋을까요? 참고할 루틴 있으면 공유해주세요!',0,39,2,NULL,'2023-02-16 11:16:49.683388',_binary '',' 운동 처음 시작하는데요..',2,NULL,NULL,'dkdlel3'),(63,'그룹 들어가려고 해도 걱정돼서... 아시는 분 있나요?',0,22,1,NULL,'2023-02-16 11:55:21.735266',_binary '','그룹 목표 달성 못하면 어떻게돼요?',2,NULL,NULL,'dkdlel4'),(64,'초보지만 루틴 공유해봅니다^^',0,11,2,NULL,'2023-02-16 12:19:38.095990',_binary '','운동 초보 루틴 공유 해봅니다 ^^',3,NULL,43,'dkdlel4'),(65,'함께 운동 습관 길러보실 분들은 다 컴온!! 댓글 남겨주세요',0,20,5,NULL,'2023-02-16 12:42:41.433908',_binary '','의지박약들 모이세요',4,30,NULL,'kkwtest'),(66,'어깨 루틴 공유합니다!',0,8,2,NULL,'2023-02-16 13:00:29.414600',_binary '',' 예쁜 어깨 만드세요^^',3,NULL,48,'dkdlel3'),(67,'건강한 운동습관을 기를 분들 모집합니다. ',0,16,3,NULL,'2023-02-16 13:39:51.688007',_binary '','건강한 운동습관 기를 사람',4,31,NULL,'dkdlel4'),(68,'이대로 시작하시면 됩니다 ㅎㅎ',0,21,3,NULL,'2023-02-16 13:56:11.932330',_binary '','초보자분들 들어오세요!',3,NULL,1,'xoa1235'),(69,'제품 추천할 거 있으면 추천좀여',0,20,1,NULL,'2023-02-16 13:57:11.814283',_binary '','다들 보조제 드세요?',2,NULL,NULL,'xoa1235'),(70,'이렇게 하면 너도 김종국 될 수 있어!!',0,16,4,NULL,'2023-02-16 14:02:52.980081',_binary '','저의 오늘의 루틴 공개합니다',3,NULL,40,'david1235'),(71,'오늘의 운동으로 지정하면 알아서 연동되서 미러에 뜨는건가요?',0,6,0,NULL,'2023-02-16 14:10:02.457688',_binary '','오늘의 운동 지정 질문',2,NULL,NULL,'kkwtest');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
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
