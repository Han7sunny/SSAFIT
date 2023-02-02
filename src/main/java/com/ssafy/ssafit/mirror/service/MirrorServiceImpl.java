package com.ssafy.ssafit.mirror.service;

import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.record.entity.RecordDetail;
import com.ssafy.ssafit.app.record.repository.RecordDetailRepository;
import com.ssafy.ssafit.app.record.repository.RecordRepository;
import com.ssafy.ssafit.mirror.dto.req.MirrorUpdateRecordReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MirrorServiceImpl implements MirrorService{

    RecordRepository recordRepository;
    RecordDetailRepository recordDetailRepository;

    @Autowired
    public MirrorServiceImpl(RecordRepository recordRepository, RecordDetailRepository recordDetailRepository) {
        this.recordRepository = recordRepository;
        this.recordDetailRepository = recordDetailRepository;
    }

    @Override
    public void startExercise(LocalDateTime startTime, Long recordId) {
        recordRepository.updateStartTime(startTime, recordId);
    }

    @Override
    public void updateRecord(MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto) {
        recordDetailRepository.updateCount(mirrorUpdateRecordReqDto.getRecordDetailId(), mirrorUpdateRecordReqDto.getCount());
    }

    @Override
    public void endExercise(LocalDateTime endTime, MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto) {
        Record record = recordRepository.findById(mirrorUpdateRecordReqDto.getRecordId()).get();

        List<RecordDetail> recordDetailList = record.getRecordDetails();

        double achievementRate = 0.0;
        for (RecordDetail recordDetail : recordDetailList) {
            long count = recordDetail.getCount();
            long countRez = recordDetail.getExercise().getExerciseSet() * recordDetail.getExercise().getReps();

            achievementRate += (double)count / countRez;
        }
        achievementRate /= recordDetailList.size();

        record = Record.builder()
                .routine(record.getRoutine())
                .mileage(mirrorUpdateRecordReqDto.getMileage())
                .experiencePoint(mirrorUpdateRecordReqDto.getExperiencePoint())
                .user(record.getUser())
                .endTime(endTime)
                .startTime(record.getStartTime())
                .achievementRate(achievementRate)
                .startDate(record.getStartDate())
                .build();

        recordRepository.save(record);
    }
}
