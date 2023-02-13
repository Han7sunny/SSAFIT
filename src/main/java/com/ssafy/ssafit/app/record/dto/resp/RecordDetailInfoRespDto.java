package com.ssafy.ssafit.app.record.dto.resp;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineExerciseRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RecordDetailInfoRespDto extends CommonResp {

    private Long recordId;
    private Long routineId;
    private String routineName;
    private List<RecordDetailInfoRespDto.RecordDetailInfo> recordDetailInfoList;

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RecordDetailInfo {
        private long recordDetailId;
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
}
