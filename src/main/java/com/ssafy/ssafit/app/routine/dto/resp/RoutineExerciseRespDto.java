package com.ssafy.ssafit.app.routine.dto.resp;

import com.ssafy.ssafit.app.common.CommonResp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoutineExerciseRespDto {
    private Long exerciseId;
    private Long exerciseTypeId;
    private String exerciseTypeName;
    private String exerciseArea;
    private Long exerciseSet;
    private Long reps;
    private Long restTimeMinutes;
    private Long restTimeSeconds;
    private String name;
}
