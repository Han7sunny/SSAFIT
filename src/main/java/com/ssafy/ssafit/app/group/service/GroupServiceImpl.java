package com.ssafy.ssafit.app.group.service;

import com.ssafy.ssafit.app.group.dto.resp.GroupRespDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroupServiceImpl implements GroupService{

    private GroupRepository groupRepository;

    @Autowired
    public GroupServiceImpl(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @Override
    public long regist(Group group) {
        return groupRepository.save(group).getId();
    }

    @Override
    public GroupRespDto view(long groupId) {
        Optional<Group> getGroup = groupRepository.findById(groupId);
        if(getGroup.isEmpty()) {
            return GroupRespDto.builder().success(false).msg("해당 그룹을 찾을 수 없습니다.").build();
        }
        return new GroupRespDto(getGroup.get());
    }
}
