package com.ssafy.ssafit.app.record.controller;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordDetailInfoRespDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordExerciseRecordRespDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordScheduleRespDto;
import com.ssafy.ssafit.app.record.service.RecordService;
import com.ssafy.ssafit.app.user.dto.CustomUserDetails;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/record")
public class RecordController {

    private final Logger LOGGER = LoggerFactory.getLogger(RecordController.class);

    RecordService recordService;

    @Autowired
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @PostMapping("/record-registration")
    @ApiOperation(value = "운동 루틴 예약 기능",
            notes = "원하는 날짜에 수행할 운동 루틴을 등록한다.\n" +
                    "routineId : 등록하고자 하는 루틴의 아이디 (PK)\n" +
                    "startDay : 등록하고자 하는 날의 일\n" +
                    "startMonth : 등록하고자 하는 날의 월\n" +
                    "startYear : 등록하고자 하는 날의 년\n",
            response = CommonResp.class)
    public ResponseEntity<?> registerExercise(@AuthenticationPrincipal CustomUserDetails user, @RequestBody RecordRegisterReqDto recordRegisterReqDto) {
        LOGGER.info("[Enter] registerExcercise");
        try {
            RecordRegisterReqDto data = RecordRegisterReqDto.builder().routineId(recordRegisterReqDto.getRoutineId()).userId(user.getUser().getId()).build();
            LocalDate startDate = LocalDate.of(recordRegisterReqDto.getStartYear(), recordRegisterReqDto.getStartMonth(), recordRegisterReqDto.getStartDay());
            recordService.registerExercise(data, startDate);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("추가 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-schedule")
    @ApiOperation(value = "예약한 운동 루틴 정보", notes = "특정 날짜에 예약해놓은 운동 루틴 정보를 얻는다.\n" +
            "day : 조회하고 싶은 날의 일\n" +
            "month : 조회하고 싶은 날의 월\n" +
            "year : 조회하고 싶은 날의 년\n",
            response = List.class)
    public ResponseEntity<?> getSchedule(@AuthenticationPrincipal CustomUserDetails user, @RequestParam("year") int year, @RequestParam("month") int month, @RequestParam("day") int day) {
        LOGGER.info("[Enter] getSchedule");
        try {
            LocalDate startDate = LocalDate.of(year, month, day);
            List<RecordScheduleRespDto> recordScheduleRespDtoList = recordService.getSchedule(startDate, user.getUser().getId());
            return new ResponseEntity<List<RecordScheduleRespDto>>(recordScheduleRespDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-record/{id}")
    @ApiOperation(value = "특정 운동 루틴 정보", notes = "예약한 운동 루틴 하나의 정보를 얻어온다.\n" +
            "id : 조회하고 싶은 record의 아이디",
            response = RecordDetailInfoRespDto.class)
    public ResponseEntity<?> getRecord(@PathVariable Long id) {
        LOGGER.info("[Enter] getRecord");
        try {
            RecordDetailInfoRespDto recordDetailInfoRespDto = recordService.getRecord(id);
            return new ResponseEntity<RecordDetailInfoRespDto>(recordDetailInfoRespDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/remove-schedule")
    @ApiOperation(value = "예약한 운동 루틴 제거 기능",
            notes = "예약해놓은 운동 루틴을 제거한다." +
            "recordId : 제거하고 싶은 record의 아이디",
            response = CommonResp.class)
    public ResponseEntity<?> removeSchedule(@RequestParam Long recordId) {
        LOGGER.info("[Enter] removeSchedule");
        try {
            recordService.removeSchedule(recordId);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("삭제 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-exercise-record")
    @ApiOperation(value = "특정 날짜의 운동 기록 가져오는 기능",
            notes = "원하는 날짜에 수행한 운동들의 정보를 가져온다." +
                    "day : 조회하고 싶은 날의 일\n" +
                    "month : 조회하고 싶은 날의 월\n" +
                    "year : 조회하고 싶은 날의 년\n",
            response = List.class)
    public ResponseEntity<?> getExerciseRecord(@RequestParam("year") int year, @RequestParam("month") int month, @RequestParam("day") int day, @AuthenticationPrincipal CustomUserDetails user) {
        LOGGER.info("[Enter] getExerciseRecord");
        try {
            LocalDate time = LocalDate.of(year, month, day);
            List<RecordExerciseRecordRespDto> exerciseRecordList = recordService.getExerciseRecord(time, user.getUser().getId());
            return new ResponseEntity<List<RecordExerciseRecordRespDto>>(exerciseRecordList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }
}
