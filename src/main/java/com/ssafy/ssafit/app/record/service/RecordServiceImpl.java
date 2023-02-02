package com.ssafy.ssafit.app.record.service;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.exercise.repository.ExerciseRepository;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordExerciseRecordRespDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordScheduleRespDto;
import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.record.entity.RecordDetail;
import com.ssafy.ssafit.app.record.repository.RecordDetailRepository;
import com.ssafy.ssafit.app.record.repository.RecordRepository;
import com.ssafy.ssafit.app.routine.entity.Routine;
import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RecordServiceImpl implements RecordService{

    RecordRepository recordRepository;
    RecordDetailRepository recordDetailRepository;
    RoutineRepository routineRepository;
    UserRepository userRepository;
    ExerciseRepository exerciseRepository;
    @Autowired
    public RecordServiceImpl(RecordRepository recordRepository, RecordDetailRepository recordDetailRepository, RoutineRepository routineRepository, UserRepository userRepository, ExerciseRepository exerciseRepository) {
        this.recordRepository = recordRepository;
        this.recordDetailRepository = recordDetailRepository;
        this.routineRepository = routineRepository;
        this.userRepository = userRepository;
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public void registerExercise(RecordRegisterReqDto recordRegisterReqDto) {
        LocalDate startDate = LocalDate.of(recordRegisterReqDto.getStartYear(), recordRegisterReqDto.getStartMonth(), recordRegisterReqDto.getStartDay());

        Routine routine = routineRepository.findById(recordRegisterReqDto.getRoutineId()).get();

        Record record = Record.builder()
                .routine(routine)
                .user(userRepository.findById(recordRegisterReqDto.getUserId()).get())
                .startDate(startDate)
                .achievementRate(0.0)
                .build();

        recordRepository.save(record);

        List<Exercise> exerciseList = routine.getExercise();

        for (Exercise exercise: exerciseList) {
            RecordDetail recordDetail = RecordDetail.builder()
                    .record(record)
                    .exercise(exerciseRepository.findById(exercise.getId()).get())
                    .count(0L)
                    .build();

            recordDetailRepository.save(recordDetail);
        }
    }

    @Override
    public List<RecordScheduleRespDto> getSchedule(LocalDate time, String userId) {
        List<Record> recordList = recordRepository.findByStartDateAndEndTimeAndUserId(time, null, userId);

        List<RecordScheduleRespDto> recordScheduleRespDtoList = new ArrayList<RecordScheduleRespDto>();

        for(Record record : recordList) {
            Routine routine = routineRepository.findById(record.getRoutine().getRoutineId()).get();

            recordScheduleRespDtoList.add(RecordScheduleRespDto.builder()
                            .recordId(record.getId())
                            .routineId(routine.getRoutineId())
                            .name(routine.getName())
                            .build());
        }

        return recordScheduleRespDtoList;
    }

    @Override
    public void removeSchedule(Long recordId) {
        recordRepository.deleteById(recordId);
    }

    @Override
    public List<RecordExerciseRecordRespDto> getExerciseRecord(LocalDate time, String userId) {
        List<Record> recordList = recordRepository.findByStartDateAndUserId(time, userId);

        List<RecordExerciseRecordRespDto> exerciseRecordList = new ArrayList<RecordExerciseRecordRespDto>();

        for(Record record : recordList) {
            List<RecordExerciseRecordRespDto.ExerciseDetail> tmpList = new ArrayList<RecordExerciseRecordRespDto.ExerciseDetail>();

            List<RecordDetail> recordDetailList = record.getRecordDetails();

            for (RecordDetail recordDetail: recordDetailList) {
                String exerciseName = recordDetail.getExercise().getExerciseType().getExerciseTypeName();
                Long countRez = recordDetail.getExercise().getExerciseSet() * recordDetail.getExercise().getReps();
                tmpList.add(new RecordExerciseRecordRespDto.ExerciseDetail(exerciseName, recordDetail.getCount(), countRez));
            }

            exerciseRecordList.add(RecordExerciseRecordRespDto.builder()
                            .routineId(record.getRoutine().getRoutineId())
                            .routineName(record.getRoutine().getName())
                            .achievementRate(record.getAchievementRate())
                            .exerciseDetailList(tmpList)
                            .build());
        }

        return exerciseRecordList;
    }
}
