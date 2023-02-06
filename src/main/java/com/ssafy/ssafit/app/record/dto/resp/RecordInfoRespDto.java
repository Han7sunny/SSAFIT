package com.ssafy.ssafit.app.record.dto.resp;

import com.ssafy.ssafit.app.routine.dto.resp.RoutineExerciseRespDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RecordInfoRespDto extends RoutineExerciseRespDto {

    private Long recordId;
}
