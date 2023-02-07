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

    private boolean acceptInvitation;

}
