package com.ssafy.ssafit.app.group.service;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.entity.GroupMember;

import java.util.List;

public interface GroupMemberService {

    List<GroupMember> getGroupRecruitRequest(String userId);

    boolean findGroupMember(long groupId, String userId);

    void addGroupMembers(Group group, List<String> userIdList);

    void addGroupMember(GroupMemberReqDto groupMember);

    void deleteGroupMember(GroupMemberReqDto groupMember);
}
