package com.ssafy.ssafit.app.routine.dto.resp;

import com.ssafy.ssafit.app.common.CommonResp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

<<<<<<< HEAD
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
=======
import java.util.List;

@SuperBuilder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoutineExerciseRespDto extends CommonResp{

    private Long routineId;
    private String routineName;

    private List<ExerciseInfo> exerciseInfoList;

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor

    public static class ExerciseInfo {
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
>>>>>>> dev_kkw
}
