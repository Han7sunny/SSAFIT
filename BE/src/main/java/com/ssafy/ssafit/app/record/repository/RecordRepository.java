package com.ssafy.ssafit.app.record.repository;

import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record, Long> {

    List<Record> findByStartDate(LocalDate time);

    List<Record> findByStartDateAndEndTimeAndUserId(LocalDate time, LocalDateTime endTime, String userId);

    List<Record> findByStartDateAndUserId(LocalDate time, String userId);

    @Transactional
    @Modifying
    @Query(value = "update record r set r.start_time = :startTime where r.record_id = :id", nativeQuery = true)
    void updateStartTime(@Param("startTime") LocalDateTime startTime, @Param("id") Long recordId);

    Optional<Record> findByUser_IdAndRoutine_RoutineIdAndStartDate(String userId, long l, LocalDate now);

    List<Record> findByStartDateAndEndTimeIsNull(LocalDate now);


    @Query(value = "select distinct start_date from record where user_id = :userId and end_time is not null order by start_date desc", nativeQuery = true)
    List<String> findRecordDate(@Param("userId") String id);

    List<Record> findByUser(User user);

    List<Record> findByUserAndEndTimeIsNotNull(User user);
}
