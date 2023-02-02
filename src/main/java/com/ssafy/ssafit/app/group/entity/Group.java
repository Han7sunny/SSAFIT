package com.ssafy.ssafit.app.group.entity;

import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.dto.req.GroupReqDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Builder
@Table(name = "`group`")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`group_id`")
    private long id;

    private String groupName;

    private String goal;

    private String penalty;

    private double achievement_rate;

//    @Temporal(TemporalType.TIMESTAMP)
    private LocalDate start_date;

//    @Temporal(TemporalType.TIMESTAMP)

    private LocalDate end_date;

//    private int period; // ?

    private int maximum_member;

    private int current_member;

    public Group(GroupReqDto groupReqDto){
        this.groupName = groupReqDto.getGroupName();
        this.goal = groupReqDto.getGoal();
        this.penalty = groupReqDto.getPenalty();
        this.start_date = groupReqDto.getStartDate();
        this.end_date = groupReqDto.getEndDate();
        this.maximum_member = groupReqDto.getMaximumMember();

    }

    @OneToMany(mappedBy = "group", fetch = FetchType.EAGER)
    private List<GroupMember> groupMember;

}
