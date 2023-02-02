package com.ssafy.ssafit.app.group.repository;

import com.ssafy.ssafit.app.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group,Long> {
}
