package com.ssafy.ssafit.app.common;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class CommonResp {

    private boolean success;
    private String msg;
}
