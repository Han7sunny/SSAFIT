package com.ssafy.ssafit.mirror.service;

import com.ssafy.ssafit.mirror.dto.req.MirrorUpdateRecordReqDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public interface MirrorService {
    void startExercise(LocalDateTime startTime, Long recordId);

    void updateRecord(MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto);

    void endExercise(LocalDateTime endTime, MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto);
}
