package com.ssafy.ssafit.app.record.service;

import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordExerciseRecordRespDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordScheduleRespDto;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface RecordService {
    Long registerExercise(RecordRegisterReqDto recordRegisterReqDto, LocalDate startDate);

    List<RecordScheduleRespDto> getSchedule(LocalDate time, String userId);

    void removeSchedule(Long recordId);

    List<RecordExerciseRecordRespDto> getExerciseRecord(LocalDate time, String userId);
}
