package com.ssafy.ssafit.app.group.dto.resp;

import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.reply.dto.resp.ReplyRespDto;
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
public class GroupRecruitRespDto extends BoardRespDto {

    private long groupId;

    private String groupName;

    private double goal;

    private String penalty;

    private double achievementRate;

    private LocalDate startRecruitDate;

    private LocalDate endRecruitDate;

    //    @Temporal(TemporalType.TIMESTAMP)
    private LocalDate startDate;

//    @Temporal(TemporalType.TIMESTAMP)

    private LocalDate endDate;

    private int period;

    private int maximumMember;

    private int currentMember;

    private boolean isLiked;

    private List<GroupMemberRespDto> groupMemberList; // accept_invitation true일 경우만 .. ?

    private List<RoutineInfoRespDto> routineList;

    private List<ReplyRespDto> groupRecruitReplyList;

    public GroupRecruitRespDto(Group group){
        this.groupId = group.getId();
        this.groupName = group.getGroupName();
        this.goal = group.getGoal();
        this.penalty = group.getPenalty();
        this.achievementRate = group.getAchievementRate();
        this.startDate = group.getStartDate();
        this.endDate = group.getEndDate();
        this.period = group.getPeriod();
        this.maximumMember = group.getMaximumMember();
        this.currentMember = group.getCurrentMember();
    }

}
