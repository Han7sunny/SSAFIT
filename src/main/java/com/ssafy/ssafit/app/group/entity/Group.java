package com.ssafy.ssafit.app.group.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Builder
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private long id;

    private String name;

    private String goal;

    private String penalty;

    private double achievement_rate;

//    @Temporal(TemporalType.TIMESTAMP)
    private LocalDate start_date;

//    @Temporal(TemporalType.TIMESTAMP)

    private LocalDate end_date;

    private int period; // ?

    private int maximum_member;

    private int current_member;

}
