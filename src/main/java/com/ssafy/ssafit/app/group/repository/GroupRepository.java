package com.ssafy.ssafit.app.group.repository;

import com.ssafy.ssafit.app.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface GroupRepository extends JpaRepository<Group,Long> {
    List<Group> findByStartDate(LocalDate now);

    List<Group> findByEndDate(LocalDate now);
    List<Group> findAllByEndRecruitDateGreaterThanEqual(LocalDate now);

    List<Group> findAllByStartDate(LocalDate start_date);
}
