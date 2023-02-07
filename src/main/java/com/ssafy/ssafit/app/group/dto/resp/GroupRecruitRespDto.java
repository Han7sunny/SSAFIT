package com.ssafy.ssafit.app.group.dto.resp;

import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.group.entity.Group;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class GroupRecruitRespDto extends BoardRespDto {

    private long groupId;

    private String groupName;

    private String goal;

    private String penalty;

    private double achievementRate;

    //    @Temporal(TemporalType.TIMESTAMP)
    private LocalDate startDate;

//    @Temporal(TemporalType.TIMESTAMP)

    private LocalDate endDate;

    private int period;

    private int maximumMember;

    private int currentMember;

    public GroupRecruitRespDto(Group group){
        this.groupId = group.getId();
        this.groupName = group.getGroupName();
        this.goal = group.getGoal();
        this.penalty = group.getPenalty();
        this.achievementRate = group.getAchievementRate();
        this.startDate = group.getStartDate();
        this.endDate = group.getEndDate();
        this.maximumMember = group.getMaximumMember();
        this.currentMember = group.getCurrentMember();
    }
}
