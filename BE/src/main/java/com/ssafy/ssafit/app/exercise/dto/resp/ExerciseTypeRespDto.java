package com.ssafy.ssafit.app.exercise.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseTypeRespDto {

    private Long exerciseTypeId;
    private String exerciseTypeName;
    private String exerciseArea;
}
