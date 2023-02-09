package com.ssafy.ssafit.mirror.controller;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.exercise.dto.resp.ExerciseTypeAreaRespDto;
import com.ssafy.ssafit.app.exercise.dto.resp.ExerciseTypeRespDto;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordInfoRespDto;
import com.ssafy.ssafit.app.user.dto.CustomUserDetails;
import com.ssafy.ssafit.mirror.dto.req.MirrorRecordGenerateReqDto;
import com.ssafy.ssafit.mirror.dto.req.MirrorUpdateRecordReqDto;
import com.ssafy.ssafit.mirror.dto.resp.MirrorFaceEncodingRespDto;
import com.ssafy.ssafit.mirror.dto.resp.MirrorRoutineRespDto;
import com.ssafy.ssafit.mirror.service.MirrorService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@RestController
@RequestMapping("/api/mirror")
public class MirrorController {

    MirrorService mirrorService;

    @Autowired
    public MirrorController(MirrorService mirrorService) {
        this.mirrorService = mirrorService;
    }

    @GetMapping("/get-exercise-type")
    @ApiOperation(value = "원하는 운동 부위별로 운동 정보 가져오기",
            notes = "유저가 오늘 하기로 예약한 운동 루틴들을 가져온다.",
            response = List.class)
    public ResponseEntity<?> getExerciseType(@RequestParam String area) {
        try {
            List<ExerciseTypeRespDto> exerciseTypeList = mirrorService.getExerciseType(area);
            return new ResponseEntity<List<ExerciseTypeRespDto>>(exerciseTypeList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-exercise-type-area")
    @ApiOperation(value = "운동 부위 종류 가져오기",
            notes = "DB에 저장되어있는 모든 운동 부위 종류를 가져온다..",
            response = List.class)
    public ResponseEntity<?> getExerciseTypeArea() {
        try {
            ExerciseTypeAreaRespDto exerciseTypeList = mirrorService.getExerciseTypeArea();
            return new ResponseEntity<ExerciseTypeAreaRespDto>(exerciseTypeList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-schedule")
    @ApiOperation(value = "오늘 예약한 운동 루틴 목록 가져오기",
            notes = "유저가 오늘 하기로 예약한 운동 루틴들을 가져온다.",
            response = List.class)
    public ResponseEntity<?> getSchedule(@AuthenticationPrincipal CustomUserDetails user) {
        try {
            List<MirrorRoutineRespDto> mirrorRoutineRespDtoList = mirrorService.getSchedule(user.getUser().getId());
            return new ResponseEntity<List<MirrorRoutineRespDto>>(mirrorRoutineRespDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-record-info/{id}")
    @ApiOperation(value = "예약한 운동 루틴 한개의 상세정보 가져오기",
            notes = "실행한 예약된 루틴의 상세 정보를 가져온다.",
            response = List.class)
    public ResponseEntity<?> getRecordInfo(@PathVariable Long id) {
        try {
            RecordInfoRespDto recordInfoRespDto = mirrorService.getRecord(id);
            return new ResponseEntity<RecordInfoRespDto>(recordInfoRespDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/start-basic-routine")
    @ApiOperation(value = "기본 루틴을 실행하는 기능",
            notes = "오늘 예약한 루틴이 없어서 기본 루틴 중에 하나를 선택해서 실행한 경우",
            response = CommonResp.class)
    public ResponseEntity<?> startBasicRoutine(@RequestBody RecordRegisterReqDto recordRegisterReqDto, @AuthenticationPrincipal CustomUserDetails user) {
        try {
            recordRegisterReqDto.setUserId(user.getUser().getId());
            mirrorService.startBasicRoutine(recordRegisterReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("추가 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/start-out-of-routine")
    @ApiOperation(value = "특정 운동 하나만 실행하는 기능",
            notes = "루틴이 아닌 특정 운동 하나만 실행하는 경우\n"
                    + "반환하는 record_detail_id는 운동 종료 후 카운트를 업데이트 할 때 사용",
            response = CommonResp.class)
    public ResponseEntity<?> startOutOfRoutine(@RequestBody MirrorRecordGenerateReqDto mirrorRecordGenerateReqDto, @AuthenticationPrincipal CustomUserDetails user) {
        try {
            mirrorRecordGenerateReqDto.setUserId(user.getUser().getId());
            Long recordDetailId = mirrorService.startOutOfRoutine(mirrorRecordGenerateReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(recordDetailId)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/start-exercise")
    @ApiOperation(value = "운동을 시작할 때 record에 시작 시간 기록 기능",
            notes = "운동 시작 시 record에 시작 시간을 기록합니다.",
            response = CommonResp.class)
    public ResponseEntity<?> startExercise(@RequestBody MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto, @AuthenticationPrincipal CustomUserDetails user) {
        try {
            LocalDateTime startTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
            mirrorService.startExercise(startTime, mirrorUpdateRecordReqDto.getRecordId(), user.getUser().getId());
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("수정 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update-record")
    @ApiOperation(value = "운동 하나 종료 후 count 기록 기능",
            notes = "루틴에 등록된 운동 중 하나를 끝낸 후 해당 운동의 count를 record_detail에 기록합니다.\n" +
                    "특정 운동 하나를 하는 경우에도 끝난 후 이 기능을 실행",
            response = CommonResp.class)
    public ResponseEntity<?> updateRecord(@RequestBody MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto) {
        try {
            mirrorService.updateRecord(mirrorUpdateRecordReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("수정 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/end-exercise")
    @ApiOperation(value = "운동 루틴 종료 후 실행 기능",
            notes = "운동이 완전히 종료된 후 record에 상세 정보를 기록합니다.",
            response = CommonResp.class)
    public ResponseEntity<?> endExercise(@RequestBody MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto, @AuthenticationPrincipal CustomUserDetails user) {
        try {
            mirrorUpdateRecordReqDto.setUserId(user.getUser().getId());
            LocalDateTime endTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
            mirrorService.endExercise(endTime, mirrorUpdateRecordReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("수정 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-face-encoding-list")
    @ApiOperation(value = "face-encoding 리스트 획득",
            notes = "모든 유저의 face-encoding 정보를 얻어옵니다.",
            response = List.class)

    public ResponseEntity<?> getFaceEncodingList() {
        try {
            List<MirrorFaceEncodingRespDto> mirrorFaceEncodingRespDtoList = mirrorService.getFaceEncodingList();
            return new ResponseEntity<List<MirrorFaceEncodingRespDto>>(mirrorFaceEncodingRespDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

}
