package com.ssafy.ssafit.mirror.dto.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MirrorRecordGenerateReqDto {

    private String userId;

    private Long exerciseTypeId;
}
