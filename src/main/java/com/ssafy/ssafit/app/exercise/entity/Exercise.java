package com.ssafy.ssafit.app.exercise.entity;

import com.ssafy.ssafit.app.record.entity.RecordDetail;
import com.ssafy.ssafit.app.routine.entity.Routine;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="exercise_type_id")
    private ExerciseType exerciseType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="routine_id")
    private Routine routine;

    @Column(length = 45, nullable = false)
    private String name;

    @Column(nullable = false)
    private Long reps;

    @Column(nullable = false)
    private Long exerciseSet;

    @Column(nullable = false)
    private Long restTime;

    @Builder
    public Exercise(Long id, ExerciseType exerciseType, Routine routine, String name, Long reps, Long exerciseSet, Long restTime) {
        this.id = id;
        this.exerciseType = exerciseType;
        this.routine = routine;
        this.name = name;
        this.reps = reps;
        this.exerciseSet = exerciseSet;
        this.restTime = restTime;
    }
}
