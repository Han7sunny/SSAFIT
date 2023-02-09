package com.ssafy.ssafit.app.record.service;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.exercise.repository.ExerciseRepository;
import com.ssafy.ssafit.app.exercise.repository.ExerciseTypeRepository;
import com.ssafy.ssafit.app.group.repository.GroupRepository;
import com.ssafy.ssafit.app.notification.entity.Notification;
import com.ssafy.ssafit.app.notification.repository.NotificationRepository;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordExerciseRecordRespDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordInfoRespDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordScheduleRespDto;
import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.record.entity.RecordDetail;
import com.ssafy.ssafit.app.record.repository.RecordDetailRepository;
import com.ssafy.ssafit.app.record.repository.RecordRepository;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineExerciseRespDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineInfoRespDto;
import com.ssafy.ssafit.app.routine.entity.Routine;
import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
import com.ssafy.ssafit.app.routine.service.RoutineService;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
public class RecordServiceImpl implements RecordService{

    private final GroupRepository groupRepository;
    RecordRepository recordRepository;
    RecordDetailRepository recordDetailRepository;
    RoutineRepository routineRepository;
    UserRepository userRepository;
    ExerciseRepository exerciseRepository;
    ExerciseTypeRepository exerciseTypeRepository;
    private final NotificationRepository notificationRepository;

    RoutineService routineService;

    @Autowired
    public RecordServiceImpl(RecordRepository recordRepository, RecordDetailRepository recordDetailRepository, RoutineRepository routineRepository, UserRepository userRepository, ExerciseRepository exerciseRepository,
                             ExerciseTypeRepository exerciseTypeRepository,
                             NotificationRepository notificationRepository,
                             RoutineService routineService, GroupRepository groupRepository) {
        this.recordRepository = recordRepository;
        this.recordDetailRepository = recordDetailRepository;
        this.routineRepository = routineRepository;
        this.userRepository = userRepository;
        this.exerciseRepository = exerciseRepository;
        this.exerciseTypeRepository = exerciseTypeRepository;
        this.notificationRepository = notificationRepository;
        this.routineService = routineService;
        this.groupRepository = groupRepository;
    }

    @Override
    public Long registerExercise(RecordRegisterReqDto recordRegisterReqDto, LocalDate startDate) {
        Routine routine = routineRepository.findById(recordRegisterReqDto.getRoutineId()).get();

        Record record = Record.builder()
                .routine(routine)
                .user(userRepository.findById(recordRegisterReqDto.getUserId()).get())
                .startDate(startDate)
                .achievementRate(0.0)
                .build();

        if(recordRegisterReqDto.getGroupId() != null)
            record.setGroup(groupRepository.findById(recordRegisterReqDto.getGroupId()).get());

        recordRepository.save(record);

        List<Exercise> exerciseList = routine.getExercise();

        for (Exercise exercise: exerciseList) {
            RecordDetail recordDetail = RecordDetail.builder()
                    .record(record)
                    .exerciseType(exercise.getExerciseType())
                    .count(0L)
                    .countRez(exercise.getExerciseSet() * exercise.getReps())
                    .build();

            recordDetailRepository.save(recordDetail);
        }

        return record.getId();
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
    public RecordInfoRespDto getRecord(Long id) {
        Record record = recordRepository.findById(id).get();
        Routine routine = record.getRoutine();
        RoutineExerciseRespDto routineExerciseRespDto = routineService.getExerciseInfo(routine.getRoutineId());

        RecordInfoRespDto recordInfoRespDto = RecordInfoRespDto.builder()
                .success(true)
                .msg("예약한 루틴의 상세정보입니다.")
                .recordId(id)
                .exerciseInfoList(routineExerciseRespDto.getExerciseInfoList())
                .routineName(routineExerciseRespDto.getRoutineName())
                .routineId(routineExerciseRespDto.getRoutineId())
                .build();

        return recordInfoRespDto;
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
                String exerciseName = recordDetail.getExerciseType().getExerciseTypeName();
                Long countRez = recordDetail.getCountRez();
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

    @Scheduled(cron = "0 0 21 1/1 * ?", zone = "Asia/Seoul")
    @Transactional
    public void findUnDoRoutine() {
        List<Record> recordList = recordRepository.findByStartDateAndEndTimeIsNull(LocalDate.now(ZoneId.of("Asia/Seoul")));

        for(Record record : recordList) {
            User user = record.getUser();
            Routine routine = record.getRoutine();

            Notification notification = Notification.builder()
                    .user(user)
                    .record(record)
                    .message("예약한 " + routine.getName() + " 루틴이 아직 완료되지 않았습니다.")
                    .notification_type(2)
                    .build();

            notificationRepository.save(notification);
        }
    }
}
