package com.ssafy.ssafit.mirror.service;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.exercise.repository.ExerciseRepository;
import com.ssafy.ssafit.app.exercise.repository.ExerciseTypeRepository;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.record.entity.RecordDetail;
import com.ssafy.ssafit.app.record.repository.RecordDetailRepository;
import com.ssafy.ssafit.app.record.repository.RecordRepository;
import com.ssafy.ssafit.app.record.service.RecordService;
import com.ssafy.ssafit.app.routine.entity.Routine;
import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import com.ssafy.ssafit.mirror.dto.req.MirrorRecordGenerateReqDto;
import com.ssafy.ssafit.mirror.dto.req.MirrorUpdateRecordReqDto;
import com.ssafy.ssafit.mirror.dto.resp.MirrorRoutineRespDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MirrorServiceImpl implements MirrorService{

    RecordRepository recordRepository;
    RecordDetailRepository recordDetailRepository;
    RoutineRepository routineRepository;
    UserRepository userRepository;
    ExerciseRepository exerciseRepository;

    RecordService recordService;
    private final ExerciseTypeRepository exerciseTypeRepository;

    @Autowired
    public MirrorServiceImpl(RecordRepository recordRepository, RecordDetailRepository recordDetailRepository, RoutineRepository routineRepository,
                             UserRepository userRepository,
                             ExerciseRepository exerciseRepository, RecordService recordService,
                             ExerciseTypeRepository exerciseTypeRepository) {
        this.recordRepository = recordRepository;
        this.recordDetailRepository = recordDetailRepository;
        this.routineRepository = routineRepository;
        this.userRepository = userRepository;
        this.exerciseRepository = exerciseRepository;
        this.recordService = recordService;;
        this.exerciseTypeRepository = exerciseTypeRepository;
    }

    @Override
    @Transactional
    public void startBasicRoutine(RecordRegisterReqDto recordRegisterReqDto) {
        Long recordId = recordService.registerExercise(recordRegisterReqDto, LocalDate.now(ZoneId.of("Asia/Seoul")));
        startExercise(LocalDateTime.now().plusHours(9), recordId);
    }

    @Override
    public Long startOutOfRoutine(MirrorRecordGenerateReqDto mirrorRecordGenerateReqDto) {
        Optional<Record> record = recordRepository.findByUser_IdAndRoutine_RoutineIdAndStartDate(mirrorRecordGenerateReqDto.getUserId(), 4L, LocalDate.now(ZoneId.of("Asia/Seoul")));

        if(record.isEmpty()) {
            Record tmpRecord = Record.builder()
                    .startDate(LocalDate.now(ZoneId.of("Asia/Seoul")))
                    .routine(routineRepository.findById(4L).get())
                    .user(userRepository.findById(mirrorRecordGenerateReqDto.getUserId()).get())
                    .endTime(LocalDateTime.now().plusHours(9))
                    .build();
            recordRepository.save(tmpRecord);

            record = Optional.ofNullable(tmpRecord);
        }

        Optional<RecordDetail> recordDetail = recordDetailRepository.findByRecord_IdAndExerciseType_ExerciseTypeId(record.get().getId(), mirrorRecordGenerateReqDto.getExerciseTypeId());

        if(recordDetail.isEmpty()) {
            RecordDetail tmpRecordDetail = RecordDetail.builder()
                    .record(record.get())
                    .countRez(Long.MAX_VALUE)
                    .count(0L)
                    .exerciseType(exerciseTypeRepository.findById(mirrorRecordGenerateReqDto.getExerciseTypeId()).get())
                    .build();

            recordDetailRepository.save(tmpRecordDetail);

            recordDetail = Optional.ofNullable(tmpRecordDetail);
        }

        return recordDetail.get().getRecordDetailId();
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
            long countRez = recordDetail.getCountRez();

            achievementRate += (double)count / countRez;
        }
        achievementRate /= recordDetailList.size();

        record = Record.builder()
                .id(record.getId())
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

        userRepository.updateMileage(record.getUser().getId(), record.getUser().getMileage(), mirrorUpdateRecordReqDto.getMileage());
    }

    @Override
    public List<MirrorRoutineRespDto> getSchedule(String id) {
        List<MirrorRoutineRespDto> mirrorRoutineRespDtoList = new ArrayList<>();
        List<Record> recordList = recordRepository.findByStartDateAndEndTimeAndUserId(LocalDate.now(ZoneId.of("Asia/Seoul")), null, id);

        if(recordList.isEmpty()) {
            for (long i = 1; i <= 3; i++)
                mirrorRoutineRespDtoList.add(generateRoutineRespDto(i * -1, routineRepository.findById(i).get()));
        }

        else {
            for(Record record : recordList) {
                mirrorRoutineRespDtoList.add(generateRoutineRespDto(record.getId(), record.getRoutine()));
            }
        }

        return mirrorRoutineRespDtoList;
    }
    private MirrorRoutineRespDto generateRoutineRespDto(Long recordId, Routine routine) {
        List<Exercise> exerciseList = routine.getExercise();
        List<String> nameList = new ArrayList<String>();

        for (Exercise exercise : exerciseList)
            nameList.add(exercise.getExerciseType().getExerciseTypeName());

        MirrorRoutineRespDto mirrorRoutineRespDto = MirrorRoutineRespDto.builder()
                .recordId(recordId)
                .routineId(routine.getRoutineId())
                .routineName(routine.getName())
                .exerciseName(nameList)
                .build();

        return mirrorRoutineRespDto;
    }

}
