package com.ssafy.ssafit.app.group.repository;

import com.ssafy.ssafit.app.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

public interface GroupRepository extends JpaRepository<Group,Long> {
    List<Group> findByStartDate(LocalDate now);

    List<Group> findByEndDate(LocalDate now);
    List<Group> findAllByEndRecruitDateGreaterThanEqual(LocalDate now);

    List<Group> findAllByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate now1, LocalDate now2);

    List<Group> findAllByStartDate(LocalDate start_date);

    @Transactional
    @Modifying
    @Query(value = "update group g set g.achievement_rate = :achievementRate where g.group_id = :groupId", nativeQuery = true)
    void updateGroupAchievementRate(@Param("achievementRate") double groupAchievementRate, @Param("groupId") long id);
}
