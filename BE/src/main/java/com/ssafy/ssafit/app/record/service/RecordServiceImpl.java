package com.ssafy.ssafit.app.record.service;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.exercise.repository.ExerciseRepository;
import com.ssafy.ssafit.app.exercise.repository.ExerciseTypeRepository;
import com.ssafy.ssafit.app.group.repository.GroupRepository;
import com.ssafy.ssafit.app.notification.entity.Notification;
import com.ssafy.ssafit.app.notification.repository.NotificationRepository;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordDetailInfoRespDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordExerciseRecordRespDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordScheduleRespDto;
import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.record.entity.RecordDetail;
import com.ssafy.ssafit.app.record.repository.RecordDetailRepository;
import com.ssafy.ssafit.app.record.repository.RecordRepository;
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
import java.time.format.DateTimeFormatter;
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
                    .exercise(exercise)
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
    public RecordDetailInfoRespDto getRecord(Long id) {
        Record record = recordRepository.findById(id).get();
        List<RecordDetail> recordDetailList = record.getRecordDetails();

        List<RecordDetailInfoRespDto.RecordDetailInfo> recordDetailInfoList = new ArrayList<>();

        for(RecordDetail recordDetail : recordDetailList) {
            Exercise exercise = recordDetail.getExercise();
            ExerciseType exerciseType = recordDetail.getExerciseType();

            RecordDetailInfoRespDto.RecordDetailInfo recordDetailInfo = RecordDetailInfoRespDto.RecordDetailInfo.builder()
                    .recordDetailId(recordDetail.getRecordDetailId())
                    .exerciseTypeId(exerciseType.getExerciseTypeId())
                    .exerciseId(exercise.getId())
                    .exerciseTypeName(exerciseType.getExerciseTypeName())
                    .exerciseArea(exerciseType.getExerciseArea())
                    .exerciseSet(exercise.getExerciseSet())
                    .reps(exercise.getReps())
                    .restTimeMinutes(exercise.getRestTime() / 60)
                    .restTimeSeconds(exercise.getRestTime() % 60)
                    .name(exercise.getName())
                    .build();

            recordDetailInfoList.add(recordDetailInfo);
        }

        Routine routine = record.getRoutine();

        RecordDetailInfoRespDto recordInfoRespDto = RecordDetailInfoRespDto.builder()
                .success(true)
                .msg("저장된 레코드의 정보입니다.")
                .recordId(record.getId())
                .routineId(routine.getRoutineId())
                .routineName(routine.getName())
                .recordDetailInfoList(recordDetailInfoList)
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

        Long countAll = 0L;
        Long countRezAll = 0L;

        for(Record record : recordList) {
            List<RecordExerciseRecordRespDto.ExerciseDetail> tmpList = new ArrayList<RecordExerciseRecordRespDto.ExerciseDetail>();

            List<RecordDetail> recordDetailList = record.getRecordDetails();

            for (RecordDetail recordDetail: recordDetailList) {
                String exerciseName = recordDetail.getExerciseType().getExerciseTypeName();
                Long countRez = recordDetail.getCountRez();
                tmpList.add(new RecordExerciseRecordRespDto.ExerciseDetail(exerciseName, recordDetail.getCount(), countRez));
                countAll += recordDetail.getCount();
                countRezAll += countRez;
            }

            exerciseRecordList.add(RecordExerciseRecordRespDto.builder()
                            .routineId(record.getRoutine().getRoutineId())
                            .routineName(record.getRoutine().getName())
                            .achievementRate(record.getAchievementRate())
                            .totalAchievementRate(countAll / countRezAll)
                            .exerciseDetailList(tmpList)
                            .build());
        }

        return exerciseRecordList;
    }
    @Override
    public long getContinuousExercisePeriod(String id) {
        List<String> dateList = recordRepository.findRecordDate(id);

        int idx = 0;
        int sz = dateList.size();

        for (LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul")); idx < sz ; today = today.minusDays(1), idx++) {
            if(today.compareTo(LocalDate.parse(dateList.get(idx), DateTimeFormatter.ISO_DATE)) != 0)
                break;
        }

        return idx;
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
                    .notification_type(5)
                    .build();

            notificationRepository.save(notification);
        }
    }
}
