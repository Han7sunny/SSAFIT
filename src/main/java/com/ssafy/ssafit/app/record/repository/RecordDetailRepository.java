package com.ssafy.ssafit.app.record.repository;

import com.ssafy.ssafit.app.record.entity.RecordDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
<<<<<<< HEAD
=======
import java.util.Optional;
>>>>>>> dev_kkw

public interface RecordDetailRepository extends JpaRepository<RecordDetail, Long> {
    @Transactional
    @Modifying
<<<<<<< HEAD
    @Query(value = "update record_detail rd set rd.count = :count where rd.record_detail_id = :id", nativeQuery = true)
    void updateCount(@Param("id") Long id, @Param("count") Long count);
=======
    @Query(value = "update record_detail rd set rd.count = rd.count + :count where rd.record_detail_id = :id", nativeQuery = true)
    void updateCount(@Param("id") Long id, @Param("count") Long count);

    Optional<RecordDetail> findByRecord_IdAndExerciseType_ExerciseTypeId(Long id, Long exerciseTypeId);
>>>>>>> dev_kkw
}
