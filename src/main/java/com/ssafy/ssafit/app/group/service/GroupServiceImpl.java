package com.ssafy.ssafit.app.group.service;

import com.ssafy.ssafit.app.group.dto.resp.GroupRespDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroupServiceImpl implements GroupService{

    private GroupRepository groupRepository;



    @Override
    public boolean insertToGroup(String userId) {
        return false;
    }

    @Override
    public boolean deleteFromGroup(String userId) {
        return false;
    }

    @Override
    public void regist(Group group) {
        groupRepository.save(group);
    }

    @Override
    public GroupRespDto view(long groupId) {
        Optional<Group> getGroup = groupRepository.findById(groupId);
        if(getGroup.isEmpty()) {
            return GroupRespDto.builder().success(false).msg("해당 그룹을 찾을 수 없습니다.").build();
        }
        Group group = getGroup.get();
        return new GroupRespDto(getGroup.get());
    }
}
