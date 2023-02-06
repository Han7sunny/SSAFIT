package com.ssafy.ssafit.app.group.repository;

import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    GroupMember findByGroupIdAndUserId(long group_id, String user_id);

    List<GroupMember> findByGroupId(long group_id);

    List<GroupMember> findByUserIdAndAcceptInvitationFalse(String user_id);
}
