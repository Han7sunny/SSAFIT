package com.ssafy.ssafit.app.group.dto.req;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class GroupMemberReqDto {
    private long groupId;

    private String userId;

    private boolean acceptInvitation; // 그룹원에 추가 또는 그룹 초대 수락 : true, 그룹원에서 제외 또는 그룹 초대 거절 : false

}
