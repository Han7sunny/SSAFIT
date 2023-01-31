package com.ssafy.ssafit.app.routine.service;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.exercise.repository.ExerciseRepository;
import com.ssafy.ssafit.app.exercise.repository.ExerciseTypeRepository;
import com.ssafy.ssafit.app.routine.dto.req.RoutineAddReqDto;
import com.ssafy.ssafit.app.routine.dto.req.RoutineGenerateReqDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineExerciseRespDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineInfoRespDto;
import com.ssafy.ssafit.app.routine.entity.Routine;
import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
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
    public void generateRoutine(RoutineGenerateReqDto routineGenerateReqDto) {
        Routine routine = Routine.builder()
                .name(routineGenerateReqDto.getRoutineName())
                .build();

        routine.getUser().add(userRepository.findById(routineGenerateReqDto.getUserId()).get());
        routineRepository.save(routine);

        int sz = routineGenerateReqDto.getExerciseList().size();
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
    }

    @Override
    public void deleteRoutine(String userId, Long routineId) {
        Routine routine = routineRepository.findById(routineId).get();
        routine.getUser().remove(userRepository.findById(userId).get());
        routineRepository.save(routine);
    }

    @Override
    @Transactional
    public void modifyRoutine(RoutineGenerateReqDto routineGenerateReqDto) {
        deleteRoutine(routineGenerateReqDto.getUserId(), routineGenerateReqDto.getRoutineId());
        generateRoutine(routineGenerateReqDto);
    }

    @Override
    public boolean addUserRoutine(RoutineAddReqDto routineAddReqDto) {
        Routine routine = routineRepository.findById(routineAddReqDto.getRoutineId()).get();
        User user = userRepository.findById(routineAddReqDto.getUserId()).get();
        if(routine.getUser().contains(user))
            return false;
        else {
            routine.getUser().add(user);
            routineRepository.save(routine);
            return true;
        }
    }

    @Override
    public List<RoutineExerciseRespDto> getExerciseInfo(Long routineId) {
        List<Exercise> exerciseList = exerciseRepository.findByRoutine_RoutineId(routineId);

        List<RoutineExerciseRespDto> routineExerciseRespDtoList = new ArrayList<RoutineExerciseRespDto>();

        int sz = exerciseList.size();
        for(int i = 0; i < sz; i++) {
            Exercise tmp_exercise = exerciseList.get(i);
            ExerciseType exerciseType = exerciseTypeRepository.findById(tmp_exercise.getExerciseType().getExerciseTypeId()).get();

            routineExerciseRespDtoList.add(RoutineExerciseRespDto.builder()
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

        return  routineExerciseRespDtoList;
    }

    @Override
    public List<RoutineInfoRespDto> getUserRoutine(String userId) {
        List<Long> routineList = routineRepository.getUserRoutine(userId);
        List<RoutineInfoRespDto> routineInfoRespDtoList = new ArrayList<RoutineInfoRespDto>();

        for(Long tmp : routineList) {
            Routine routine = routineRepository.findById(tmp).get();

            routineInfoRespDtoList.add(RoutineInfoRespDto.builder()
                            .routineId(routine.getRoutineId())
                            .name(routine.getName())
                            .build());
        }

        return routineInfoRespDtoList;
    }
}
