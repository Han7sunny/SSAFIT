package com.ssafy.ssafit.app.routine.repository;

import com.ssafy.ssafit.app.routine.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoutineRepository extends JpaRepository<Routine, Long> {
    @Query(value = "select riu.routine_id from routine_in_user riu where riu.user_id = :userId", nativeQuery = true)
    List<Long> getUserRoutine(@Param("userId") String userId);
}
