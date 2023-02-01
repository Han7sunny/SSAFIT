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

    // 그룹 모집글 / 그룹 생성
    private int registGroupTypeId;

    private List<String> groupMemberId = new ArrayList<>();

    private String goal;

    private String penalty;

    private String title;

    // 모집 인원
    private int maximum_member;

    @Column(length = 2000)
    private String content;

    private LocalDate start_date;

    private LocalDate end_date;
}
