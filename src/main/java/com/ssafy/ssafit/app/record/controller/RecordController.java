package com.ssafy.ssafit.app.record.controller;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordExerciseRecordRespDto;
import com.ssafy.ssafit.app.record.dto.resp.RecordScheduleRespDto;
import com.ssafy.ssafit.app.record.service.RecordService;
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
    public ResponseEntity<?> registerExercise(@RequestBody RecordRegisterReqDto recordRegisterReqDto) {
        try {
            recordService.registerExercise(recordRegisterReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("추가 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-schedule/{id}")
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
    public ResponseEntity<?> removeSchedule(@RequestParam Long recordId) {
        try {
            recordService.removeSchedule(recordId);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("삭제 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-exercise-record/{id}")
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
