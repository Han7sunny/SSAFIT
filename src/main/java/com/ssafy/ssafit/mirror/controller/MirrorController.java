package com.ssafy.ssafit.mirror.controller;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.mirror.dto.req.MirrorUpdateRecordReqDto;
import com.ssafy.ssafit.mirror.service.MirrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/mirror")
public class MirrorController {

    MirrorService mirrorService;

    @Autowired
    public MirrorController(MirrorService mirrorService) {
        this.mirrorService = mirrorService;
    }

    @GetMapping("/get-schedule/{id}")


    @PostMapping("/start-exercise")
    public ResponseEntity<?> startExercise(@RequestBody MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto) {
        try {
            String time = mirrorUpdateRecordReqDto.getTime();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime startTime = LocalDateTime.parse(time, formatter).plusHours(9);
            mirrorService.startExercise(startTime, mirrorUpdateRecordReqDto.getRecordId());
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("수정 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update-record")
    public ResponseEntity<?> updateRecord(@RequestBody MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto) {
        try {
            mirrorService.updateRecord(mirrorUpdateRecordReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("수정 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/end-exercise")
    public ResponseEntity<?> endExercise(@RequestBody MirrorUpdateRecordReqDto mirrorUpdateRecordReqDto) {
        try {
            String time = mirrorUpdateRecordReqDto.getTime();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime endTime = LocalDateTime.parse(time, formatter);
            mirrorService.endExercise(endTime, mirrorUpdateRecordReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("수정 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }
}
