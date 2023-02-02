package com.ssafy.ssafit.app.record.controller;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordExerciseRecordRespDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordScheduleRespDto;
import com.ssafy.ssafit.app.record.service.RecordService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/record")
public class RecordController {
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
    public ResponseEntity<?> registerExercise(@RequestBody RecordRegisterReqDto recordRegisterReqDto) {
        try {
            recordService.registerExercise(recordRegisterReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("추가 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-schedule/{id}")
    @ApiOperation(value = "예약한 운동 루틴 정보", notes = "특정 날짜에 예약해놓은 운동 루틴 정보를 얻는다.\n" +
            "day : 조회하고 싶은 날의 일\n",
            response = List.class)
    public ResponseEntity<?> getSchedule(@RequestParam("year") int year, @RequestParam("month") int month, @RequestParam("day") int day, @PathVariable String id) {
        try {
            LocalDate startDate = LocalDate.of(year, month, day);
            List<RecordScheduleRespDto> recordScheduleRespDtoList = recordService.getSchedule(startDate, id);
            return new ResponseEntity<List<RecordScheduleRespDto>>(recordScheduleRespDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/remove-schedule")
    @ApiOperation(value = "예약한 운동 루틴 제거 기능", notes = "예약해놓은 운동 루틴을 제거한다.", response = CommonResp.class)
    public ResponseEntity<?> removeSchedule(@RequestParam Long recordId) {
        try {
            recordService.removeSchedule(recordId);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("삭제 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-exercise-record/{id}")
    @ApiOperation(value = "특정 날짜의 운동 기록 가져오는 기능", notes = "원하는 날짜에 수행한 운동들의 정보를 가져온다.", response = CommonResp.class)
    public ResponseEntity<?> getExerciseRecord(@RequestParam("year") int year, @RequestParam("month") int month, @RequestParam("day") int day, @PathVariable String id) {
        try {
            LocalDate time = LocalDate.of(year, month, day);
            List<RecordExerciseRecordRespDto> exerciseRecordList = recordService.getExerciseRecord(time, id);
            return new ResponseEntity<List<RecordExerciseRecordRespDto>>(exerciseRecordList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }
}
