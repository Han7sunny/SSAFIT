package com.ssafy.ssafit.app.user.dto.resp;

//import com.ssafy.ssafit.app.user.entity.Authority;
import com.ssafy.ssafit.app.common.CommonResp;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class LoginResponseDto extends CommonResp {
    private String id;

    private String name;

    private String token;
}
