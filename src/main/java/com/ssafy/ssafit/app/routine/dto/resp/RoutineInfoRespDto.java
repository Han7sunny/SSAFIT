package com.ssafy.ssafit.app.routine.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoutineInfoRespDto {
    private Long routineId;
    private String name;
}
