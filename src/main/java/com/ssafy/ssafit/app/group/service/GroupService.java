package com.ssafy.ssafit.app.group.service;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.group.dto.req.GroupReqDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupRecruitRespDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupRespDto;
import com.ssafy.ssafit.app.group.entity.Group;

import java.time.LocalDateTime;
import java.util.List;

public interface GroupService {

    Group regist(Group group, List<String> routineList);

    void registGroupRecruit(Group group, BoardReqDto board);

    GroupRespDto view(long groupId);

    void modifyGroupRecruit(GroupReqDto group, long groupId);

    void startGroupConfirm();

    boolean clickLikesGroupRecruit(String userId,long groupId);

    GroupRecruitRespDto getGroupRecruit(long groupId);

    List<GroupRecruitRespDto> getGroupRecruitList();

//    List<> getMyGroupList(String userId);
}
