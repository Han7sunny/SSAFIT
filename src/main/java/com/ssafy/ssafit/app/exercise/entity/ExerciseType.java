package com.ssafy.ssafit.app.exercise.entity;

<<<<<<< HEAD
=======
import com.ssafy.ssafit.app.record.entity.RecordDetail;
>>>>>>> dev_kkw
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "exercise_type")
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class ExerciseType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_type_id")
    private Long exerciseTypeId;

    @Column(name = "exercise_type_name", length = 45, nullable = false)
    private String exerciseTypeName;

    @Column(name = "exercise_area", length = 45)
    private String exerciseArea;
    @OneToMany(mappedBy = "exerciseType")
    private List<Exercise> exercise;

<<<<<<< HEAD
=======
    @OneToMany(mappedBy = "exerciseType")
    private List<RecordDetail> recordDetailList;

>>>>>>> dev_kkw
    @Builder
    public ExerciseType(Long exerciseTypeId, String exerciseTypeName, String exerciseArea) {
        this.exerciseTypeId = exerciseTypeId;
        this.exerciseTypeName = exerciseTypeName;
        this.exerciseArea = exerciseArea;
    }
}
