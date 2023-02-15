package com.ssafy.ssafit.mirror.service;

import com.ssafy.ssafit.app.config.JwtTokenProvider;
import com.ssafy.ssafit.app.exercise.dto.resp.ExerciseTypeAreaRespDto;
import com.ssafy.ssafit.app.exercise.dto.resp.ExerciseTypeRespDto;
import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.exercise.repository.ExerciseRepository;
import com.ssafy.ssafit.app.exercise.repository.ExerciseTypeRepository;
import com.ssafy.ssafit.app.exercise.service.ExerciseService;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.entity.GroupMember;
import com.ssafy.ssafit.app.group.repository.GroupMemberRepository;
import com.ssafy.ssafit.app.group.repository.GroupRepository;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordDetailInfoRespDto;
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
import com.ssafy.ssafit.mirror.dto.resp.*;
import com.ssafy.ssafit.util.FileMultipartFileConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class MirrorServiceImpl implements MirrorService{

    private final ExerciseService exerciseService;
    private final JwtTokenProvider jwtTokenProvider;
    RecordRepository recordRepository;
    RecordDetailRepository recordDetailRepository;
    RoutineRepository routineRepository;
    UserRepository userRepository;
    ExerciseRepository exerciseRepository;

    RecordService recordService;
    private final ExerciseTypeRepository exerciseTypeRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final GroupRepository groupRepository;

    @Autowired
    public MirrorServiceImpl(RecordRepository recordRepository, RecordDetailRepository recordDetailRepository, RoutineRepository routineRepository,
                             UserRepository userRepository,
                             ExerciseRepository exerciseRepository, RecordService recordService,
                             ExerciseTypeRepository exerciseTypeRepository,
                             GroupMemberRepository groupMemberRepository,
                             GroupRepository groupRepository, ExerciseService exerciseService, JwtTokenProvider jwtTokenProvider) {
        this.recordRepository = recordRepository;
        this.recordDetailRepository = recordDetailRepository;
        this.routineRepository = routineRepository;
        this.userRepository = userRepository;
        this.exerciseRepository = exerciseRepository;
        this.recordService = recordService;;
        this.exerciseTypeRepository = exerciseTypeRepository;
        this.groupMemberRepository = groupMemberRepository;
        this.groupRepository = groupRepository;
        this.exerciseService = exerciseService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public List<ExerciseTypeRespDto> getExerciseType(String area) {
        return exerciseService.getExerciseType(area);
    }

    @Override
    public ExerciseTypeAreaRespDto getExerciseTypeArea() {
        List<String> exerciseTypeAreaList = exerciseTypeRepository.getExerciseTypeArea();

        List<String> tmpList = new ArrayList<>();
        for (String s: exerciseTypeAreaList) {
            tmpList.add(s);
        }

        return ExerciseTypeAreaRespDto.builder()
                .exerciseAreaList(tmpList)
                .build();
    }

    @Override
    @Transactional
    public Long startBasicRoutine(RecordRegisterReqDto recordRegisterReqDto) {
        Long recordId = recordService.registerExercise(recordRegisterReqDto, LocalDate.now(ZoneId.of("Asia/Seoul")));
        startExercise(LocalDateTime.now(ZoneId.of("Asia/Seoul")), recordId, recordRegisterReqDto.getUserId());
        return recordId;
    }

    @Override
    public MirrorOutOfRoutineRespDto startOutOfRoutine(MirrorRecordGenerateReqDto mirrorRecordGenerateReqDto) {
        Optional<Record> record = recordRepository.findByUser_IdAndRoutine_RoutineIdAndStartDate(mirrorRecordGenerateReqDto.getUserId(), 4L, LocalDate.now(ZoneId.of("Asia/Seoul")));

        if(record.isEmpty()) {
            Record tmpRecord = Record.builder()
                    .startDate(LocalDate.now(ZoneId.of("Asia/Seoul")))
                    .routine(routineRepository.findById(4L).get())
                    .user(userRepository.findById(mirrorRecordGenerateReqDto.getUserId()).get())
                    .endTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
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

        userRepository.updateOnOff(mirrorRecordGenerateReqDto.getUserId(), true);

        MirrorOutOfRoutineRespDto mirrorOutOfRoutineRespDto = MirrorOutOfRoutineRespDto.builder()
                .recordDetailId(recordDetail.get().getRecordDetailId())
                .recordId(record.get().getId())
                .build();

        return mirrorOutOfRoutineRespDto;
    }

    @Override
    public void startExercise(LocalDateTime startTime, Long recordId, String userId) {
        recordRepository.updateStartTime(startTime, recordId);
        userRepository.updateOnOff(userId, true);
    }

    @Override
    public void updateRecord(MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto) {
        recordDetailRepository.updateCount(mirrorUpdateRecordReqDto.getRecordDetailId(), mirrorUpdateRecordReqDto.getCount());
    }

    @Override
    @Transactional
    public void endExercise(LocalDateTime endTime, MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto) {
        Record record = recordRepository.findById(mirrorUpdateRecordReqDto.getRecordId()).get();

        List<RecordDetail> recordDetailList = record.getRecordDetails();

        long allCount = 0;
        long allCountRez = 0;
        for (RecordDetail recordDetail : recordDetailList) {
            allCount += recordDetail.getCount();
            allCountRez += recordDetail.getCountRez();
        }
        double achievementRate = allCountRez == 0 ? 0.0 : (double) allCount / allCountRez;

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
                .group(record.getGroup())
                .build();

        recordRepository.save(record);

        if(record.getGroup() != null) {
            User user = userRepository.findById(mirrorUpdateRecordReqDto.getUserId()).get();
            Group group = record.getGroup();

            GroupMember groupMember = groupMemberRepository.findByUserAndGroup(user, group);

            double oldAchievementRate = groupMember.getAchievementRate();
            double newAchievementRate = (groupMember.getAchievementRate() * group.getPeriod() + achievementRate) / group.getPeriod();
            groupMemberRepository.updateGroupMemberAchievementRate(newAchievementRate, mirrorUpdateRecordReqDto.getUserId(), group.getId());

            double groupAchievementRate = (group.getAchievementRate() * group.getCurrentMember() - oldAchievementRate + newAchievementRate) / group.getCurrentMember();
            groupRepository.updateGroupAchievementRate(groupAchievementRate, group.getId());

        }

        userRepository.updateMileage(record.getUser().getId(), record.getUser().getMileage(), mirrorUpdateRecordReqDto.getMileage());

        userRepository.updateOnOff(record.getUser().getId(), false);
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

    @Override
    public RecordDetailInfoRespDto getRecord(Long id) {
        return recordService.getRecord(id);
    }

    @Override
    public List<MirrorFaceEncodingRespDto> getFaceEncodingList() {
        List<User> userList = userRepository.findAll();
        List<MirrorFaceEncodingRespDto> mirrorFaceEncodingRespDtoList = new ArrayList<>();

        for(User user : userList) {
            if(user.getPhotoEncoding() != null) {
                MirrorFaceEncodingRespDto mirrorFaceEncodingRespDto = MirrorFaceEncodingRespDto.builder()
                        .userId(user.getId())
                        .userName(user.getName())
                        .faceEncode(user.getPhotoEncoding())
                        .build();
                mirrorFaceEncodingRespDtoList.add(mirrorFaceEncodingRespDto);
            }
        }
        return mirrorFaceEncodingRespDtoList;
    }

    @Override
    public String mirrorLogin(String id) {
        User user = userRepository.findById(id).get();
        return jwtTokenProvider.createToken(user.getId(), user.getRoles());
    }

    @Override
    public MirrorMyPageRespDto getMyPageInfo(String id) throws Exception {
        User user = userRepository.findById(id).get();

        MultipartFile image = FileMultipartFileConverter.FiletoMultipartFile(user.getPhoto());

        String myImage = null;
        if(image != null) {
            Base64.Encoder encoder = Base64.getEncoder();
            byte[] photoEncode = encoder.encode(image.getBytes());
            myImage = new String(photoEncode, "UTF-8");
        }

        Long mileage = user.getMileage();

        List<String> dateList = recordRepository.findRecordDate(id);

        int idx = 0;
        int sz = dateList.size();


        for (LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul")); idx < sz ; today = today.minusDays(1), idx++) {
            if(today.compareTo(LocalDate.parse(dateList.get(idx), DateTimeFormatter.ISO_DATE)) != 0)
                break;
        }

        System.out.println("여기까지");
        
        List<Record> recordList = recordRepository.findByUserAndEndTimeIsNotNull(user);

        Map<Long, Long> exerciseMap = new HashMap<>();

        for (Record rec : recordList) {
            List<RecordDetail> recordDetailList = rec.getRecordDetails();

            for(RecordDetail recd : recordDetailList) {
                if(recd.getCount() == 0) continue;

                ExerciseType exerciseType = recd.getExerciseType();
                if(exerciseMap.containsKey(exerciseType.getExerciseTypeId())) {
                    exerciseMap.replace(exerciseType.getExerciseTypeId(), recd.getCount() + exerciseMap.get(exerciseType.getExerciseTypeId()));
                } else {
                    exerciseMap.put(exerciseType.getExerciseTypeId(), recd.getCount());
                }
            }
        }

        List<MirrorMyPageRespDto.ExerciseInfo> list = new ArrayList<>();
        for (Long key : exerciseMap.keySet()) {
           MirrorMyPageRespDto.ExerciseInfo tmp = MirrorMyPageRespDto.ExerciseInfo.builder()
                                                                                    .exerciseTypeId(key)
                                                                                    .exerciseTypeName(exerciseTypeRepository.findById(key).get().getExerciseTypeName())
                                                                                    .exerciseTypeCount(exerciseMap.get(key))
                                                                                    .build();
           list.add(tmp);
        }

        MirrorMyPageRespDto mirrorMyPageRespDto = MirrorMyPageRespDto.builder()
                .photo(myImage)
                .mileage(mileage)
                .continuousExercisePeriod(idx)
                .exerciseInfoList(list)
                .build();

        return mirrorMyPageRespDto;
    }

    @Override
    public void updateChallengeTime(String id, long time) {
        User user = userRepository.findById(id).get();
        if(user.getChallengeRecordTime() == null || user.getChallengeRecordTime() > time) {

            userRepository.updateChallengeTime(id, time);
        }
    }

    @Override
    public MirrorChallengeTimeRespDto getChallengeTime(String id) {
        List<User> userList = userRepository.findAll(Sort.by(Sort.Direction.ASC, "challengeRecordTime"));

        List<MirrorChallengeTimeRespDto.RankInfo> rankInfoList = new ArrayList<>();
        for (User user : userList) {
            if(user.getChallengeRecordTime() != null) {
                MirrorChallengeTimeRespDto.RankInfo rankInfo = MirrorChallengeTimeRespDto.RankInfo.builder()
                        .userName(user.getName())
                        .recordTime(user.getChallengeRecordTime())
                        .build();

                rankInfoList.add(rankInfo);
            }
        }

        User user = userRepository.findById(id).get();

        MirrorChallengeTimeRespDto mirrorChallengeTimeRespDto = MirrorChallengeTimeRespDto.builder()
                .myRecordTime(user.getChallengeRecordTime())
                .rankInfoList(rankInfoList)
                .build();

        return mirrorChallengeTimeRespDto;
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
