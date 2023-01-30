package com.ssafy.ssafit.app.routine.service;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.exercise.repository.ExerciseRepository;
import com.ssafy.ssafit.app.exercise.repository.ExerciseTypeRepository;
import com.ssafy.ssafit.app.routine.dto.req.RoutineGenerateReqDto;
import com.ssafy.ssafit.app.routine.entity.Routine;
import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoutineServiceImpl implements RoutineService{

    private RoutineRepository routineRepository;
    private ExerciseRepository exerciseRepository;
    private ExerciseTypeRepository exerciseTypeRepository;

    @Autowired
    public RoutineServiceImpl(RoutineRepository routineRepository, ExerciseRepository exerciseRepository, ExerciseTypeRepository exerciseTypeRepository) {
        this.routineRepository = routineRepository;
        this.exerciseRepository = exerciseRepository;
        this.exerciseTypeRepository = exerciseTypeRepository;
    }

    @Override
    public void generateRoutine(RoutineGenerateReqDto routineGenerateReqDto) {
        Routine routine = Routine.builder()
                .name(routineGenerateReqDto.getRoutineName())
                .build();

        routineRepository.save(routine);


        int sz = routineGenerateReqDto.getExerciseList().size();
        for(int i = 0; i < sz; i++) {
            RoutineGenerateReqDto.Exercise tmp_exercise = routineGenerateReqDto.getExerciseList().get(i);

            Exercise exercise = Exercise.builder()
                    .exerciseSet(tmp_exercise.getExerciseSet())
                    .routine(routine)
                    .name(routineGenerateReqDto.getRoutineName())
                    .reps(tmp_exercise.getReps())
                    .restTime(tmp_exercise.getRestTimeMinutes() * 60 + tmp_exercise.getRestTimeSeconds())
                    .exerciseType(exerciseTypeRepository.findById(tmp_exercise.getExerciseId()).get())
                    .build();

            exerciseRepository.save(exercise);
        }
    }
}
