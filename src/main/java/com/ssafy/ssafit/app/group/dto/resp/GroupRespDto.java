package com.ssafy.ssafit.app.group.dto.resp;

import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineInfoRespDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class GroupRespDto extends CommonResp {
    private long groupId;

    private String name;

    private double goal;

    private String penalty;

    private double achievement_rate;

    private LocalDate start_date;

    private LocalDate end_date;

    private int period;

    private int maximum_member;

    private int current_member;

    private List<GroupMemberRespDto> groupMemberList; // accept_invitation true일 경우만 .. ?

    private List<RoutineInfoRespDto> routineList;

    private int type;

    public GroupRespDto(Group group){
        this.groupId = group.getId();
        this.name = group.getGroupName();
        this.goal = group.getGoal();
        this.penalty = group.getPenalty();
        this.achievement_rate = group.getAchievementRate();
        this.start_date = group.getStartDate();
        this.end_date = group.getEndDate();
        this.period = group.getPeriod();
        this.maximum_member = group.getMaximumMember();
        this.current_member = group.getCurrentMember();
    }
}