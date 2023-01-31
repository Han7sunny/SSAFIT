package com.ssafy.ssafit.app.record.service;

import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordScheduleRespDto;
import com.ssafy.ssafit.app.record.entity.Record;
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
    @Autowired
    public RecordServiceImpl(RecordRepository recordRepository, RecordDetailRepository recordDetailRepository, RoutineRepository routineRepository, UserRepository userRepository) {
        this.recordRepository = recordRepository;
        this.recordDetailRepository = recordDetailRepository;
        this.routineRepository = routineRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void registerExercise(RecordRegisterReqDto recordRegisterReqDto) {
        Record record = Record.builder()
                .routine(routineRepository.findById(recordRegisterReqDto.getRoutineId()).get())
                .user(userRepository.findById(recordRegisterReqDto.getUserId()).get())
                .startDate(recordRegisterReqDto.getStartDate())
                .build();

        recordRepository.save(record);
    }

    @Override
    public List<RecordScheduleRespDto> getSchedule(LocalDate time) {
        List<Record> recordList = recordRepository.findByStartDate(time);

        List<RecordScheduleRespDto> recordScheduleRespDtoList = new ArrayList<RecordScheduleRespDto>();
        for(Record record : recordList) {
            Routine routine = routineRepository.findById(record.getRoutine().getRoutineId()).get();

            recordScheduleRespDtoList.add(RecordScheduleRespDto.builder()
                            .routine_id(routine.getRoutineId())
                            .name(routine.getName())
                            .build());
        }

        return recordScheduleRespDtoList;
    }
}
