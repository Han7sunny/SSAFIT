package com.ssafy.ssafit.mirror.service;

import com.ssafy.ssafit.app.exercise.dto.resp.ExerciseTypeAreaRespDto;
import com.ssafy.ssafit.app.exercise.dto.resp.ExerciseTypeRespDto;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordInfoRespDto;
import com.ssafy.ssafit.mirror.dto.req.MirrorRecordGenerateReqDto;
import com.ssafy.ssafit.mirror.dto.req.MirrorUpdateRecordReqDto;
import com.ssafy.ssafit.mirror.dto.resp.MirrorFaceEncodingRespDto;
import com.ssafy.ssafit.mirror.dto.resp.MirrorRoutineRespDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public interface MirrorService {
    List<ExerciseTypeRespDto> getExerciseType(String area);

    ExerciseTypeAreaRespDto getExerciseTypeArea();

    void startBasicRoutine(RecordRegisterReqDto recordRegisterReqDto);

    Long startOutOfRoutine(MirrorRecordGenerateReqDto mirrorRecordGenerateReqDto);

    void startExercise(LocalDateTime startTime, Long recordId, String userId);

    void updateRecord(MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto);

    void endExercise(LocalDateTime endTime, MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto);

    List<MirrorRoutineRespDto> getSchedule(String id);

    RecordInfoRespDto getRecord(Long id);

    List<MirrorFaceEncodingRespDto> getFaceEncodingList();

    String mirrorLogin(String id);
}
