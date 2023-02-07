package com.ssafy.ssafit.mirror.service;

<<<<<<< HEAD
import com.ssafy.ssafit.mirror.dto.req.MirrorUpdateRecordReqDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public interface MirrorService {
    void startExercise(LocalDateTime startTime, Long recordId);
=======
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordInfoRespDto;
import com.ssafy.ssafit.mirror.dto.req.MirrorRecordGenerateReqDto;
import com.ssafy.ssafit.mirror.dto.req.MirrorUpdateRecordReqDto;
import com.ssafy.ssafit.mirror.dto.resp.MirrorRoutineRespDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public interface MirrorService {
    void startBasicRoutine(RecordRegisterReqDto recordRegisterReqDto);

    Long startOutOfRoutine(MirrorRecordGenerateReqDto mirrorRecordGenerateReqDto);

    void startExercise(LocalDateTime startTime, Long recordId, String userId);
>>>>>>> dev_kkw

    void updateRecord(MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto);

    void endExercise(LocalDateTime endTime, MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto);
<<<<<<< HEAD
=======

    List<MirrorRoutineRespDto> getSchedule(String id);

    RecordInfoRespDto getRecord(Long id);
>>>>>>> dev_kkw
}
