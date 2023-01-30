package com.ssafy.ssafit.app.routine.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RoutineGenerateReqDto {

    public class Exercise {
        private Long exerciseId;
        private Long exerciseSet;
        private Long reps;
        private Long restTimeMinutes;
        private Long restTimeSeconds;
        private String name;

        public Long getExerciseId() {
            return exerciseId;
        }

        public Long getExerciseSet() {
            return exerciseSet;
        }

        public Long getReps() {
            return reps;
        }

        public Long getRestTimeMinutes() {
            return restTimeMinutes;
        }

        public Long getRestTimeSeconds() {
            return restTimeSeconds;
        }

        public String getName() {
            return name;
        }

        public Exercise() {

        }
        public Exercise(Long exerciseId, Long exerciseSet, Long reps, Long restTimeMinutes, Long restTimeSeconds, String name) {
            this.exerciseId = exerciseId;
            this.exerciseSet = exerciseSet;
            this.reps = reps;
            this.restTimeMinutes = restTimeMinutes;
            this.restTimeSeconds = restTimeSeconds;
            this.name = name;
        }
    }

    private String routineName;

    private List<Exercise> exerciseList;

}
