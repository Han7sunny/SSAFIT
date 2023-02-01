package com.ssafy.ssafit.app.group.service;

import com.ssafy.ssafit.app.group.dto.resp.GroupRespDto;
import com.ssafy.ssafit.app.group.entity.Group;

public interface GroupService {

    boolean insertToGroup(String userId);

    boolean deleteFromGroup(String userId);

    void regist(Group group);

    GroupRespDto view(long groupId);
}
