package com.ssafy.ssafit.app.exercise.repository;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
<<<<<<< HEAD
=======
import com.ssafy.ssafit.app.routine.entity.Routine;
>>>>>>> dev_kkw
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
<<<<<<< HEAD
    List<Exercise> findByRoutine_RoutineId(Long routineId);
=======
    List<Exercise> findByRoutine(Routine routine);
>>>>>>> dev_kkw
}
