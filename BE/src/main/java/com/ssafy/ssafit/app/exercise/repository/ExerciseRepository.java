package com.ssafy.ssafit.app.exercise.repository;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}
