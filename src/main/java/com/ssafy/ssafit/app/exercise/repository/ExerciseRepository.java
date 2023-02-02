package com.ssafy.ssafit.app.exercise.repository;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByRoutine_RoutineId(Long routineId);
}
