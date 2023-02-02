package com.ssafy.ssafit.app.record.entity;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.routine.entity.Routine;
import com.ssafy.ssafit.app.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Long id;

    @Column(length = 45)
    private String photo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "achievement_rate")
    private Double achievementRate;

    private Long mileage;

    @Column(name = "experience_point")
    private Long experiencePoint;

    @Column(name = "start_time")
    private LocalDateTime startTime;
    @Column(name = "end_time")
    private LocalDateTime endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id")
    private Routine routine;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @OneToMany(mappedBy = "record", cascade = {CascadeType.ALL})
    private List<RecordDetail> recordDetails;

    @Builder
    public Record(Long id, String photo, User user, Double achievementRate, Long mileage, Long experiencePoint, LocalDateTime startTime, LocalDateTime endTime, Routine routine, LocalDate startDate) {
        this.id = id;
        this.photo = photo;
        this.user = user;
        this.achievementRate = achievementRate;
        this.mileage = mileage;
        this.experiencePoint = experiencePoint;
        this.startTime = startTime;
        this.endTime = endTime;
        this.routine = routine;
        this.startDate = startDate;
    }
}