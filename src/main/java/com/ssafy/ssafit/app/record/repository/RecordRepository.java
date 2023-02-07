package com.ssafy.ssafit.app.record.repository;

import com.ssafy.ssafit.app.record.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
}
