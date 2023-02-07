package com.ssafy.ssafit.mirror.dto.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MirrorUpdateRecordReqDto {
    private String userId;
    
    private Long recordId;

    private Long experiencePoint;

    private Long mileage;

    private Long recordDetailId;
    private Long count;
}
