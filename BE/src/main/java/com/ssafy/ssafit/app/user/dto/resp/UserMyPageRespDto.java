package com.ssafy.ssafit.app.user.dto.resp;

import com.ssafy.ssafit.app.common.CommonResp;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserMyPageRespDto extends CommonResp {

    private String name;

    private List<GroupInvitation> groupInvitationList;

    private List<Notification> notificationList;

    private String myImage;


    @SuperBuilder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GroupInvitation {
        private Long groupId;
        private String groupName;

        private String notificationMessage;
    }


    @SuperBuilder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Notification {
        private Long notificationId;
        private String notificationMessage;
        private int notification_type;

        private Long groupId;

        private Long boardId;

        private Long recordId;
    }
}

