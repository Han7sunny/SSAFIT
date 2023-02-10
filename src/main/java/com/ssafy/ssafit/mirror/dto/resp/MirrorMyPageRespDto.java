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
public class MirrorMyPageRespDto {

    private long continuousExercisePeriod;

    private long mileage;

    private String photo;

    private List<ExerciseInfo> exerciseInfoList;

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ExerciseInfo {
        private long exerciseTypeId;
        private String exerciseTypeName;
        private long exerciseTypeCount;
    }
}
