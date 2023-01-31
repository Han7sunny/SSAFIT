package com.ssafy.ssafit.app.record.repository;

import com.ssafy.ssafit.app.record.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    List<Record> findByStartDate(LocalDate time);
}
