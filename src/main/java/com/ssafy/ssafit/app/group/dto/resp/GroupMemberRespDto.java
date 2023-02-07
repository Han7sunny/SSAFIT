package com.ssafy.ssafit.app.group.dto.resp;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class GroupMemberRespDto {

    private String userId;

    private long groupMemberId;

    private long groupId;

    private boolean acceptInvitation;

    private double achievementRate;

    private String userName;

    private boolean on_off;
}