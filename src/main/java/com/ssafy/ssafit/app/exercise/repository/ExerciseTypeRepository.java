package com.ssafy.ssafit.app.exercise.repository;

import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExerciseTypeRepository extends JpaRepository<ExerciseType, Long> {
    List<ExerciseType> findByExerciseArea(String area);

    @Query(value = "select distinct exercise_area from exercise_type;", nativeQuery = true)
    List<String> getExerciseTypeArea();
}
