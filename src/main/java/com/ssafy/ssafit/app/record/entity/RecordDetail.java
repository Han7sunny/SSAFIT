package com.ssafy.ssafit.app.record.entity;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "record_detail")

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class RecordDetail {
    @Id
    @Column(name = "record_detail_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="record_id")
    private Record record;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="exercise_id")
    private Exercise exercise;

    @Column(nullable = false)
    private Long count;

    @Builder
    public RecordDetail(Long recordDetailId, Record record, Exercise exercise, Long count) {
        this.recordDetailId = recordDetailId;
        this.record = record;
        this.exercise = exercise;
        this.count = count;
    }
}
