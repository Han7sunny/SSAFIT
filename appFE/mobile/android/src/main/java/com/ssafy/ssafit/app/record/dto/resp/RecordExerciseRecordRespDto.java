package com.ssafy.ssafit.app.record.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RecordExerciseRecordRespDto {

    private double totalAchievementRate; // 최근값 .. 오늘의 달성률

    private Long routineId;

    private String routineName;

    private Double achievementRate; //

    private List<ExerciseDetail> exerciseDetailList;

    static public class ExerciseDetail {
        private String exerciseName;
        private Long count;
        private Long countRez;

        public String getExerciseName() {
            return exerciseName;
        }

        public Long getCount() {
            return count;
        }

        public Long getCountRez() {
            return countRez;
        }

        public ExerciseDetail(String exerciseName, Long count, Long countRez) {
            this.exerciseName = exerciseName;
            this.count = count;
            this.countRez = countRez;
        }
    }
}
