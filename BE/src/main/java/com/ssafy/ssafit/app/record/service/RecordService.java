package com.ssafy.ssafit.app.record.service;

import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordScheduleRespDto;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface RecordService {
    void registerExercise(RecordRegisterReqDto recordRegisterReqDto);

    List<RecordScheduleRespDto> getSchedule(LocalDate time);
}
