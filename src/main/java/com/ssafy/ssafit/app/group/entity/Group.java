package com.ssafy.ssafit.app.group.entity;

import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.dto.req.GroupReqDto;
import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.record.entity.RecordDetail;
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

    private double achievementRate;

//    @Temporal(TemporalType.TIMESTAMP)
    private LocalDate startDate;

//    @Temporal(TemporalType.TIMESTAMP)

    private LocalDate endDate;

//    private int period; // ?

    private int maximumMember;

    private int currentMember;

    public Group(GroupReqDto groupReqDto){
        this.groupName = groupReqDto.getGroupName();
        this.goal = groupReqDto.getGoal();
        this.penalty = groupReqDto.getPenalty();
        this.startDate = groupReqDto.getStartDate();
        this.endDate = groupReqDto.getEndDate();
        this.maximumMember = groupReqDto.getMaximumMember();

    }

    @OneToMany(mappedBy = "group")
    private List<Record> recordList;

    @OneToMany(mappedBy = "group", fetch = FetchType.EAGER)
    private List<GroupMember> groupMember;

}
