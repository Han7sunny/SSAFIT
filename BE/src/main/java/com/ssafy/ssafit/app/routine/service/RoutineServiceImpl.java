package com.ssafy.ssafit.app.routine.service;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.exercise.repository.ExerciseRepository;
import com.ssafy.ssafit.app.exercise.repository.ExerciseTypeRepository;
import com.ssafy.ssafit.app.group.controller.GroupController;
import com.ssafy.ssafit.app.routine.dto.req.RoutineAddReqDto;
import com.ssafy.ssafit.app.routine.dto.req.RoutineGenerateReqDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineExerciseRespDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineInfoRespDto;
import com.ssafy.ssafit.app.routine.entity.Routine;
import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import com.ssafy.ssafit.util.SecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoutineServiceImpl implements RoutineService {

    private RoutineRepository routineRepository;
    private ExerciseRepository exerciseRepository;
    private ExerciseTypeRepository exerciseTypeRepository;
    private UserRepository userRepository;

    @Autowired
    public RoutineServiceImpl(RoutineRepository routineRepository, ExerciseRepository exerciseRepository, ExerciseTypeRepository exerciseTypeRepository, UserRepository userRepository) {
        this.routineRepository = routineRepository;
        this.exerciseRepository = exerciseRepository;
        this.exerciseTypeRepository = exerciseTypeRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public long generateRoutine(RoutineGenerateReqDto routineGenerateReqDto) {
        Routine routine = Routine.builder()
                .name(routineGenerateReqDto.getRoutineName())
                .build();

        routine.getUser().add(userRepository.findById(SecurityUtil.getCurrentUserId().get().getUserId()).get());
        routineRepository.save(routine);

        int sz = routineGenerateReqDto.getExerciseList().size();

        if(sz == 0) return -1;

        for(int i = 0; i < sz; i++) {
            RoutineGenerateReqDto.Exercise tmp_exercise = routineGenerateReqDto.getExerciseList().get(i);

            Exercise exercise = Exercise.builder()
                    .exerciseSet(tmp_exercise.getExerciseSet())
                    .routine(routine)
                    .name(tmp_exercise.getName())
                    .reps(tmp_exercise.getReps())
                    .restTime(tmp_exercise.getRestTimeMinutes() * 60 + tmp_exercise.getRestTimeSeconds())
                    .exerciseType(exerciseTypeRepository.findById(tmp_exercise.getExerciseId()).get())
                    .build();

            exerciseRepository.save(exercise);
        }

        return routine.getRoutineId();
    }

    @Override
    public void deleteRoutine(Long routineId) {
        Routine routine = routineRepository.findById(routineId).get();
        routine.getUser().remove(userRepository.findById(SecurityUtil.getCurrentUserId().get().getUserId()).get());
        routineRepository.save(routine);
    }

    @Override
    @Transactional
    public void modifyRoutine(RoutineGenerateReqDto routineGenerateReqDto) {
        deleteRoutine(routineGenerateReqDto.getRoutineId());
        generateRoutine(routineGenerateReqDto);
    }

    @Override
    public boolean addUserRoutine(RoutineAddReqDto routineAddReqDto) {
        Routine routine = routineRepository.findById(routineAddReqDto.getRoutineId()).get();
        User user = userRepository.findById(SecurityUtil.getCurrentUserId().get().getUserId()).get();
        if(routine.getUser().contains(user))
            return false;
        else {
            routine.getUser().add(user);
            routineRepository.save(routine);
            return true;
        }
    }

    @Override
    public RoutineExerciseRespDto getExerciseInfo(Long routineId) {

        Routine routine = routineRepository.findById(routineId).get();

        List<Exercise> exerciseList = exerciseRepository.findByRoutine(routine);

        List<RoutineExerciseRespDto.ExerciseInfo> exerciseInfoList = new ArrayList<RoutineExerciseRespDto.ExerciseInfo>();

        int sz = exerciseList.size();
        for(int i = 0; i < sz; i++) {
            Exercise tmp_exercise = exerciseList.get(i);
            ExerciseType exerciseType = exerciseTypeRepository.findById(tmp_exercise.getExerciseType().getExerciseTypeId()).get();

            exerciseInfoList.add(RoutineExerciseRespDto.ExerciseInfo.builder()
                            .exerciseId(tmp_exercise.getId())
                            .exerciseTypeId(exerciseType.getExerciseTypeId())
                            .exerciseTypeName(exerciseType.getExerciseTypeName())
                            .exerciseArea(exerciseType.getExerciseArea())
                            .exerciseSet(tmp_exercise.getExerciseSet())
                            .reps(tmp_exercise.getReps())
                            .restTimeMinutes(tmp_exercise.getRestTime() / 60)
                            .restTimeSeconds(tmp_exercise.getRestTime() % 60)
                            .name(tmp_exercise.getName())
                            .build());
        }

        RoutineExerciseRespDto routineExerciseRespDto = RoutineExerciseRespDto.builder()
                                                        .success(true)
                                                        .msg("루틴의 상세정보입니다.")
                                                        .exerciseInfoList(exerciseInfoList)
                                                        .routineId(routineId)
                                                        .routineName(routine.getName())
                                                        .build();

        return  routineExerciseRespDto;
    }
    private final Logger LOGGER = LoggerFactory.getLogger(RoutineServiceImpl.class);

    @Override
    public List<RoutineInfoRespDto> getUserRoutine(String userId) {
        List<Long> routineList = routineRepository.getUserRoutine(userId);
        List<RoutineInfoRespDto> routineInfoRespDtoList = new ArrayList<RoutineInfoRespDto>();

        for(Long tmp : routineList) {
            LOGGER.info("routineId {}", tmp);
            Routine routine = routineRepository.findById(tmp).get();

            routineInfoRespDtoList.add(RoutineInfoRespDto.builder()
                            .routineId(routine.getRoutineId())
                            .name(routine.getName())
                            .build());
        }

        return routineInfoRespDtoList;
    }
}
