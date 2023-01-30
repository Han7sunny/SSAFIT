package com.ssafy.ssafit.app.routine.repository;

import com.ssafy.ssafit.app.routine.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoutineRepository extends JpaRepository<Routine, Long> {
}
