package com.ssafy.ssafit.app.user.dto.req;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class LoginRequestDto {
    String id;
    String password;
}
