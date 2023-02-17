package com.ssafy.ssafit.mirror.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MirrorOutOfRoutineRespDto {
    private long recordDetailId;
    private long recordId;
}
