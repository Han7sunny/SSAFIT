package com.ssafy.ssafit.app.exercise.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseTypeAreaRespDto {

    private List<String> exerciseAreaList;
}