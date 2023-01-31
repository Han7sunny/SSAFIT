package com.ssafy.ssafit.app.record.dto.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RecordRegisterReqDto {

    private String userId;
    private LocalDate startDate;
    private Long routineId;

}
