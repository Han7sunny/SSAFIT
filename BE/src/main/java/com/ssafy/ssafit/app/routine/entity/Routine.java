package com.ssafy.ssafit.app.routine.entity;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class Routine {

    @Id
    @Column(name = "routine_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routineId;

    @Column(length = 45, nullable = false)
    private String name;

    @ManyToMany
    @JoinTable(name = "routine_in_user",
            joinColumns = @JoinColumn(name = "routine_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> user = new ArrayList<User>();

    @OneToMany(mappedBy = "routine")
    private List<Exercise> exercise;

    @OneToMany(mappedBy = "routine")
    private List<Record> record;
    @Builder
    public Routine(Long routineId, String name) {
        this.routineId = routineId;
        this.name = name;
    }
}
