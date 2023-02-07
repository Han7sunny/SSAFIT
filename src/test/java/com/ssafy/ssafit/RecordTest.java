<<<<<<< HEAD
package com.ssafy.ssafit;

import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.exercise.repository.ExerciseRepository;
import com.ssafy.ssafit.app.exercise.repository.ExerciseTypeRepository;
import com.ssafy.ssafit.app.routine.dto.req.RoutineAddReqDto;
import com.ssafy.ssafit.app.routine.dto.req.RoutineGenerateReqDto;
import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
import com.ssafy.ssafit.app.routine.service.RoutineService;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import com.ssafy.ssafit.util.Sha256;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class RecordTest {

    private static final Logger logger = LoggerFactory.getLogger(RecordTest.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    ExerciseTypeRepository exerciseTypeRepository;

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    RoutineRepository routineRepository;

    @Autowired
    private RoutineService routineService;

    @BeforeEach
    @Test
    void init() {
        logger.info("[init] init data for BoardTest");
        User user1 = User.builder()
                .id("test11").password(Sha256.encrypt("test1pw")).email("test1@test1.com")
                .on_off(false).photo("photo1").photo_encoding("photo_encoding1")
                .name("testName1")
                .build();
        User user2 = User.builder()
                .id("test2").password(Sha256.encrypt("test22pw")).email("test2@test1.com")
                .on_off(false).photo("photo2").photo_encoding("photo_encoding2")
                .name("testName2")
                .build();
        User user3 = User.builder()
                .id("test3").password(Sha256.encrypt("test3pw")).email("test3@test.com")
                .on_off(false).photo("photo3").photo_encoding("photo_encoding3")
                .name("testName3")
                .build();
        logger.info("[User] join user");
        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);

        //        게시글 작성
        ExerciseType exerciseType1 = ExerciseType.builder()
                .exerciseTypeName("스쿼트").exerciseArea("하체").build();
        ExerciseType exerciseType2 = ExerciseType.builder()
                .exerciseTypeName("런지").exerciseArea("하체").build();
        ExerciseType exerciseType3 = ExerciseType.builder()
                .exerciseTypeName("푸쉬업").exerciseArea("상체").build();
        ExerciseType exerciseType4 = ExerciseType.builder()
                .exerciseTypeName("플랭크").exerciseArea("배").build();

        logger.info("[ExerciseType] ExerciseType regist");
        exerciseTypeRepository.save(exerciseType1);
        exerciseTypeRepository.save(exerciseType2);
        exerciseTypeRepository.save(exerciseType3);
        exerciseTypeRepository.save(exerciseType4);
    }

    @Test
    void 루틴_등록() {
        logger.info("루틴 등록 테스트");
        List<RoutineGenerateReqDto.Exercise> tmpList = new ArrayList<>();
        tmpList.add(new RoutineGenerateReqDto.Exercise(1L, 2L, 15L, 2L, 30L, "1번 운동"));
        tmpList.add(new RoutineGenerateReqDto.Exercise(2L, 3L, 20L, 1L, 20L, "2번 운동"));
        tmpList.add(new RoutineGenerateReqDto.Exercise(3L, 5L, 50L, 0L, 50L, "3번 운동"));
        tmpList.add(new RoutineGenerateReqDto.Exercise(4L, 15L, 3L, 10L, 30L, "4번 운동"));

        RoutineGenerateReqDto routineGenerateReqDto = new RoutineGenerateReqDto(0L, "오늘의루틴", "test11", tmpList);

        routineService.generateRoutine(routineGenerateReqDto);
    }

    @Test
    void 루틴_수정() {
        logger.info("루틴 수정 테스트");

        List<RoutineGenerateReqDto.Exercise> tmpList = new ArrayList<>();
        tmpList.add(new RoutineGenerateReqDto.Exercise(1L, 2L, 15L, 2L, 30L, "1번 운동"));
        tmpList.add(new RoutineGenerateReqDto.Exercise(2L, 3L, 20L, 1L, 20L, "2번 운동"));
        tmpList.add(new RoutineGenerateReqDto.Exercise(3L, 5L, 50L, 0L, 50L, "3번 운동"));
        tmpList.add(new RoutineGenerateReqDto.Exercise(4L, 15L, 3L, 10L, 30L, "4번 운동"));

        RoutineGenerateReqDto routineGenerateReqDto = new RoutineGenerateReqDto(0L, "오늘의루틴", "test11", tmpList);

        routineService.generateRoutine(routineGenerateReqDto);
        Assertions.assertThat(routineRepository.findAll().size()).isEqualTo(1);

        RoutineGenerateReqDto routineGenerateReqDto2 = new RoutineGenerateReqDto(1L, "내일의루틴", "test11", tmpList);
        routineService.modifyRoutine(routineGenerateReqDto2);

        Assertions.assertThat(routineRepository.findAll().size()).isEqualTo(2);
    }

    @Test
    @Transactional
    void 루틴_추가() {
        logger.info("루틴 추가 테스트");

        List<RoutineGenerateReqDto.Exercise> tmpList = new ArrayList<>();
        tmpList.add(new RoutineGenerateReqDto.Exercise(1L, 2L, 15L, 2L, 30L, "1번 운동"));
        tmpList.add(new RoutineGenerateReqDto.Exercise(2L, 3L, 20L, 1L, 20L, "2번 운동"));
        tmpList.add(new RoutineGenerateReqDto.Exercise(3L, 5L, 50L, 0L, 50L, "3번 운동"));
        tmpList.add(new RoutineGenerateReqDto.Exercise(4L, 15L, 3L, 10L, 30L, "4번 운동"));

        RoutineGenerateReqDto routineGenerateReqDto = new RoutineGenerateReqDto(0L, "오늘의루틴", "test11", tmpList);
        routineService.generateRoutine(routineGenerateReqDto);

        RoutineAddReqDto routineAddReqDto = new RoutineAddReqDto(1L, "test2");
        Assertions.assertThat(routineService.addUserRoutine(routineAddReqDto)).isEqualTo(true);
    }
}
=======
///*
//package com.ssafy.ssafit;
//
//import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
//import com.ssafy.ssafit.app.exercise.repository.ExerciseRepository;
//import com.ssafy.ssafit.app.exercise.repository.ExerciseTypeRepository;
//import com.ssafy.ssafit.app.routine.dto.req.RoutineAddReqDto;
//import com.ssafy.ssafit.app.routine.dto.req.RoutineGenerateReqDto;
//import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
//import com.ssafy.ssafit.app.routine.service.RoutineService;
//import com.ssafy.ssafit.app.user.entity.User;
//import com.ssafy.ssafit.app.user.repository.UserRepository;
//import com.ssafy.ssafit.util.Sha256;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import javax.transaction.Transactional;
//import java.util.ArrayList;
//import java.util.List;
//
//@SpringBootTest
//public class RecordTest {
//
//    private static final Logger logger = LoggerFactory.getLogger(RecordTest.class);
//
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    ExerciseTypeRepository exerciseTypeRepository;
//
//    @Autowired
//    ExerciseRepository exerciseRepository;
//
//    @Autowired
//    RoutineRepository routineRepository;
//
//    @Autowired
//    private RoutineService routineService;
//
//    @BeforeEach
//    @Test
//    void init() {
//        logger.info("[init] init data for BoardTest");
//        User user1 = User.builder()
//                .id("test11").password(Sha256.encrypt("test1pw")).email("test1@test1.com")
//                .on_off(false).photo("photo1").photo_encoding("photo_encoding1")
//                .name("testName1")
//                .build();
//        User user2 = User.builder()
//                .id("test2").password(Sha256.encrypt("test22pw")).email("test2@test1.com")
//                .on_off(false).photo("photo2").photo_encoding("photo_encoding2")
//                .name("testName2")
//                .build();
//        User user3 = User.builder()
//                .id("test3").password(Sha256.encrypt("test3pw")).email("test3@test.com")
//                .on_off(false).photo("photo3").photo_encoding("photo_encoding3")
//                .name("testName3")
//                .build();
//        logger.info("[User] join user");
//        userRepository.save(user1);
//        userRepository.save(user2);
//        userRepository.save(user3);
//
//        //        게시글 작성
//        ExerciseType exerciseType1 = ExerciseType.builder()
//                .exerciseTypeName("스쿼트").exerciseArea("하체").build();
//        ExerciseType exerciseType2 = ExerciseType.builder()
//                .exerciseTypeName("런지").exerciseArea("하체").build();
//        ExerciseType exerciseType3 = ExerciseType.builder()
//                .exerciseTypeName("푸쉬업").exerciseArea("상체").build();
//        ExerciseType exerciseType4 = ExerciseType.builder()
//                .exerciseTypeName("플랭크").exerciseArea("배").build();
//
//        logger.info("[ExerciseType] ExerciseType regist");
//        exerciseTypeRepository.save(exerciseType1);
//        exerciseTypeRepository.save(exerciseType2);
//        exerciseTypeRepository.save(exerciseType3);
//        exerciseTypeRepository.save(exerciseType4);
//    }
//
//    @Test
//    void 루틴_등록() {
//        logger.info("루틴 등록 테스트");
//        List<RoutineGenerateReqDto.Exercise> tmpList = new ArrayList<>();
//        tmpList.add(new RoutineGenerateReqDto.Exercise(1L, 2L, 15L, 2L, 30L, "1번 운동"));
//        tmpList.add(new RoutineGenerateReqDto.Exercise(2L, 3L, 20L, 1L, 20L, "2번 운동"));
//        tmpList.add(new RoutineGenerateReqDto.Exercise(3L, 5L, 50L, 0L, 50L, "3번 운동"));
//        tmpList.add(new RoutineGenerateReqDto.Exercise(4L, 15L, 3L, 10L, 30L, "4번 운동"));
//
//        RoutineGenerateReqDto routineGenerateReqDto = new RoutineGenerateReqDto(0L, "오늘의루틴", "test11", tmpList);
//
//        routineService.generateRoutine(routineGenerateReqDto);
//    }
//
//    @Test
//    void 루틴_수정() {
//        logger.info("루틴 수정 테스트");
//
//        List<RoutineGenerateReqDto.Exercise> tmpList = new ArrayList<>();
//        tmpList.add(new RoutineGenerateReqDto.Exercise(1L, 2L, 15L, 2L, 30L, "1번 운동"));
//        tmpList.add(new RoutineGenerateReqDto.Exercise(2L, 3L, 20L, 1L, 20L, "2번 운동"));
//        tmpList.add(new RoutineGenerateReqDto.Exercise(3L, 5L, 50L, 0L, 50L, "3번 운동"));
//        tmpList.add(new RoutineGenerateReqDto.Exercise(4L, 15L, 3L, 10L, 30L, "4번 운동"));
//
//        RoutineGenerateReqDto routineGenerateReqDto = new RoutineGenerateReqDto(0L, "오늘의루틴", "test11", tmpList);
//
//        routineService.generateRoutine(routineGenerateReqDto);
//        Assertions.assertThat(routineRepository.findAll().size()).isEqualTo(1);
//
//        RoutineGenerateReqDto routineGenerateReqDto2 = new RoutineGenerateReqDto(1L, "내일의루틴", "test11", tmpList);
//        routineService.modifyRoutine(routineGenerateReqDto2);
//
//        Assertions.assertThat(routineRepository.findAll().size()).isEqualTo(2);
//    }
//
//    @Test
//    @Transactional
//    void 루틴_추가() {
//        logger.info("루틴 추가 테스트");
//
//        List<RoutineGenerateReqDto.Exercise> tmpList = new ArrayList<>();
//        tmpList.add(new RoutineGenerateReqDto.Exercise(1L, 2L, 15L, 2L, 30L, "1번 운동"));
//        tmpList.add(new RoutineGenerateReqDto.Exercise(2L, 3L, 20L, 1L, 20L, "2번 운동"));
//        tmpList.add(new RoutineGenerateReqDto.Exercise(3L, 5L, 50L, 0L, 50L, "3번 운동"));
//        tmpList.add(new RoutineGenerateReqDto.Exercise(4L, 15L, 3L, 10L, 30L, "4번 운동"));
//
//        RoutineGenerateReqDto routineGenerateReqDto = new RoutineGenerateReqDto(0L, "오늘의루틴", "test11", tmpList);
//        routineService.generateRoutine(routineGenerateReqDto);
//
//        RoutineAddReqDto routineAddReqDto = new RoutineAddReqDto(1L, "test2");
//        Assertions.assertThat(routineService.addUserRoutine(routineAddReqDto)).isEqualTo(true);
//    }
//}
//*/
>>>>>>> dev_kkw
