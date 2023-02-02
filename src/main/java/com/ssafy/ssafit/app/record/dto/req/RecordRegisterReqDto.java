package com.ssafy.ssafit.app.record.dto.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class RecordRegisterReqDto {

    private String userId;
    private int startYear;
    private int startMonth;
    private int startDay;
    private Long routineId;

}
