package com.ssafy.ssafit.app.record.dto.req;

import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
@Builder
public class RecordRegisterReqDto {

    private String userId;
    private int startYear;
    private int startMonth;
    private int startDay;
    private Long routineId;

    private Long groupId;
}
