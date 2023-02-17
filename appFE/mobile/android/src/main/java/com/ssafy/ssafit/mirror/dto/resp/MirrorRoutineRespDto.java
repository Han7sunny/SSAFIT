package com.ssafy.ssafit.mirror.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MirrorRoutineRespDto {

    private Long recordId;
    private Long routineId;

    private String routineName;

    private List<String> exerciseName;

}
