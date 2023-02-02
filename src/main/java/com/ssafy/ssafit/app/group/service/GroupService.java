package com.ssafy.ssafit.app.group.service;

import com.ssafy.ssafit.app.group.dto.resp.GroupRespDto;
import com.ssafy.ssafit.app.group.entity.Group;

public interface GroupService {

    long regist(Group group); // 관련 로직 다 짜고 groupId 필요 없으면 void로 바꾸기

    GroupRespDto view(long groupId);
}
