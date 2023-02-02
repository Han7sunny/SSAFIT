package com.ssafy.ssafit.app.group.service;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.entity.GroupMember;
import com.ssafy.ssafit.app.group.repository.GroupMemberRepository;
import com.ssafy.ssafit.app.group.repository.GroupRepository;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import com.ssafy.ssafit.app.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupMemberServiceImpl implements GroupMemberService{

    private GroupMemberRepository groupMemberRepository;

    private GroupRepository groupRepository;

    private UserRepository userRepository;

    @Autowired
    public GroupMemberServiceImpl(GroupMemberRepository groupMemberRepository, GroupRepository groupRepository, UserRepository userRepository) {
        this.groupMemberRepository = groupMemberRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    @Override
    public boolean findGroupMember(long groupId, String userId) {
        GroupMember groupMember = groupMemberRepository.findByGroupIdAndUserId(groupId, userId);
        return groupMember != null;
    }

    @Override
    public void addGroupMembers(Group group, List<String> userIdList) {
        for (String userId : userIdList) {
            User user = userRepository.findById(userId).get();
            groupMemberRepository.save(GroupMember.builder().group(group).user(user).build());
        }
    }

    @Override
    public void addGroupMember(GroupMemberReqDto groupMember) {
        User user = userRepository.findById(groupMember.getUserId()).get();
        Group group = groupRepository.findById(groupMember.getGroupId()).get();
        groupMemberRepository.save(GroupMember.builder().user(user).group(group).accept_invitation(groupMember.isAcceptInvitation()).build());
    }

    // 그룹 초대 요청에 거절할 경우 GroupMember에서 삭제 / 그룹에서 그룹원 제외
    @Override
    public void deleteGroupMember(GroupMemberReqDto groupMember) {
        long groupMemberId = groupMemberRepository.findByGroupIdAndUserId(groupMember.getGroupId(), groupMember.getUserId()).getId();
        groupMemberRepository.deleteById(groupMemberId);
//        deleteByGroupIdAndUserId ?
    }



}
