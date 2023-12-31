package com.ssafy.ssafit.app.group.entity;

import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.dto.req.GroupReqDto;
import com.ssafy.ssafit.app.notification.entity.Notification;
import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.record.entity.RecordDetail;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@SuperBuilder
@Table(name = "`group`")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`group_id`")
    private long id;

    private String groupName;

    private double goal;

    private String penalty;

    private double achievementRate;

//    @Temporal(TemporalType.TIMESTAMP)

    private LocalDate startRecruitDate;

    private LocalDate endRecruitDate;

//    @Temporal(TemporalType.TIMESTAMP)
//@Column(name = "`start_date`")
    private LocalDate startDate;

//    @Temporal(TemporalType.TIMESTAMP)

    private LocalDate endDate;

    private int period; // ?

    private int maximumMember;

    private int currentMember;

    private String groupRoutine;

//    private boolean confirm; // 그룹 확정 여부

    @OneToMany(mappedBy = "group")
    private List<Record> recordList;

    @OneToMany(mappedBy = "group", fetch = FetchType.EAGER)
    private List<GroupMember> groupMember;

    @OneToMany(mappedBy = "group", cascade = {CascadeType.ALL})
    private List<Notification> notification;

    public Group(GroupReqDto groupReqDto){
        this.groupName = groupReqDto.getGroupName();
        this.goal = groupReqDto.getGoal();
        this.penalty = groupReqDto.getPenalty();
        this.startRecruitDate = groupReqDto.getStartRecruitDate();
        this.endRecruitDate = groupReqDto.getEndRecruitDate();
        this.startDate = groupReqDto.getStartDate();
        this.endDate = groupReqDto.getEndDate();
        this.period = groupReqDto.getPeriod();
        this.maximumMember = groupReqDto.getMaximumMember();
        this.currentMember = groupReqDto.getCurrentMember();
    
    }

    

}
