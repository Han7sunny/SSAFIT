package com.ssafy.ssafit.mirror.dto.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MirrorRecordGenerateReqDto {

    private String userId;

    private Long exerciseTypeId;
}
