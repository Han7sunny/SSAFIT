package com.ssafy.ssafit.mirror.dto.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MirrorUpdateRecordReqDto {
<<<<<<< HEAD
    private Long recordId;
    private String time;
=======
    private String userId;
    
    private Long recordId;
>>>>>>> dev_kkw

    private Long experiencePoint;

    private Long mileage;

    private Long recordDetailId;
    private Long count;
}
