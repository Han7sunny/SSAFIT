package com.ssafy.ssafit.app.record.service;

import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordExerciseRecordRespDto;
<<<<<<< HEAD
=======
import com.ssafy.ssafit.app.record.dto.resp.RecordInfoRespDto;
>>>>>>> dev_kkw
import com.ssafy.ssafit.app.record.dto.resp.RecordScheduleRespDto;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface RecordService {
<<<<<<< HEAD
    void registerExercise(RecordRegisterReqDto recordRegisterReqDto);

    List<RecordScheduleRespDto> getSchedule(LocalDate time, String userId);

=======
    Long registerExercise(RecordRegisterReqDto recordRegisterReqDto, LocalDate startDate);

    List<RecordScheduleRespDto> getSchedule(LocalDate time, String userId);

    RecordInfoRespDto getRecord(Long id);

>>>>>>> dev_kkw
    void removeSchedule(Long recordId);

    List<RecordExerciseRecordRespDto> getExerciseRecord(LocalDate time, String userId);
}
