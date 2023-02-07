package com.ssafy.ssafit.app.routine.repository;

<<<<<<< HEAD
import com.ssafy.ssafit.app.routine.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

=======
import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.routine.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDate;
>>>>>>> dev_kkw
import java.util.List;

public interface RoutineRepository extends JpaRepository<Routine, Long> {
    @Query(value = "select riu.routine_id from routine_in_user riu where riu.user_id = :userId", nativeQuery = true)
    List<Long> getUserRoutine(@Param("userId") String userId);
<<<<<<< HEAD
=======

    @Transactional
    @Modifying
    @Query(value = "delete from routine_in_user riu where riu.user_id = :userId", nativeQuery = true)
    void deleteAllUserRoutine(@Param("userId") String userId);

>>>>>>> dev_kkw
}
