package com.ssafy.ssafit.app.record.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RecordScheduleRespDto {
    private Long routine_id;

    private String name;
}
