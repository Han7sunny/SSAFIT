package com.ssafy.ssafit.app.group.repository;

import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    GroupMember findByGroupIdAndUserId(long group_id, String user_id);

    List<GroupMember> findByUser_Id(String userId);

    @Transactional
    @Modifying
    @Query(value = "update group_member gm set gm.user_id = null where gm.user_id = :userId", nativeQuery = true)
    void updateUserIdNull(@Param("userId") String userId);

    List<GroupMember> findByGroup_Id(long id);

    List<GroupMember> findByUser_IdAndAcceptInvitation(String userId, boolean b);
}
