package com.ssafy.ssafit.app.user.dto.resp;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserInfoResp {
    private String userId;
    private String userName;
}
