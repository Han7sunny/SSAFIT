package com.ssafy.ssafit.mirror.service;

import com.ssafy.ssafit.app.exercise.dto.resp.ExerciseTypeAreaRespDto;
import com.ssafy.ssafit.app.exercise.dto.resp.ExerciseTypeRespDto;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordDetailInfoRespDto;
import com.ssafy.ssafit.mirror.dto.req.MirrorRecordGenerateReqDto;
import com.ssafy.ssafit.mirror.dto.req.MirrorUpdateRecordReqDto;
import com.ssafy.ssafit.mirror.dto.resp.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public interface MirrorService {
    List<ExerciseTypeRespDto> getExerciseType(String area);

    ExerciseTypeAreaRespDto getExerciseTypeArea();

    Long startBasicRoutine(RecordRegisterReqDto recordRegisterReqDto);

    MirrorOutOfRoutineRespDto startOutOfRoutine(MirrorRecordGenerateReqDto mirrorRecordGenerateReqDto);

    void startExercise(LocalDateTime startTime, Long recordId, String userId);

    void updateRecord(MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto);

    void endExercise(LocalDateTime endTime, MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto);

    List<MirrorRoutineRespDto> getSchedule(String id);

    RecordDetailInfoRespDto getRecord(Long id);

    List<MirrorFaceEncodingRespDto> getFaceEncodingList();

    String mirrorLogin(String id);

    MirrorMyPageRespDto getMyPageInfo(String id) throws Exception;

    void updateChallengeTime(String id, long time);

    MirrorChallengeTimeRespDto getChallengeTime(String id);
}
