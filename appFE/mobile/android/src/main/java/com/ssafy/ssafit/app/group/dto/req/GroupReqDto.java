package com.ssafy.ssafit.app.group.dto.req;

import lombok.*;

import javax.persistence.Column;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class GroupReqDto {

    private String groupName;

    private String userId;

    // 그룹 모집글 / 그룹 생성
    private long categoryId;

    private List<String> groupMemberId = new ArrayList<>();

    private List<String> groupRoutineId = new ArrayList<>();

    private double goal;

    private String penalty;

    private String title;

    // 모집 인원
    private int maximumMember;

    private int currentMember;

    @Column(length = 2000)
    private String content;

    private LocalDate startRecruitDate;

    private LocalDate endRecruitDate;

    private LocalDate startDate;

    private LocalDate endDate;

    private int period;

    private boolean sharePost;

//    private List<String> routineIdList;

}
