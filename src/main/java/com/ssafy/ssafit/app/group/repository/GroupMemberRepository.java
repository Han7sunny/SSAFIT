package com.ssafy.ssafit.app.group.repository;

import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    GroupMember findByGroupIdAndUserId(long group_id, String user_id);

}
