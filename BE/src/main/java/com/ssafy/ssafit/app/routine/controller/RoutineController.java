package com.ssafy.ssafit.app.routine.controller;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.routine.dto.req.RoutineAddReqDto;
import com.ssafy.ssafit.app.routine.dto.req.RoutineGenerateReqDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineExerciseRespDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineInfoRespDto;
import com.ssafy.ssafit.app.routine.service.RoutineService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/routine")
public class RoutineController {

    private RoutineService routineService;

    @Autowired
    public RoutineController(RoutineService routineService) {
        this.routineService = routineService;
    }

    @PostMapping("/generate-routine")
    public ResponseEntity<?> generateRoutine(@RequestBody RoutineGenerateReqDto routineGenerateReqDto) {
        try {
            routineService.generateRoutine(routineGenerateReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("추가 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete-routine")
    public ResponseEntity<?> deleteRoutine(@RequestParam("userId") String userId, @RequestParam("routineId") Long routineId) {
        try {
            routineService.deleteRoutine(userId, routineId);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("삭제 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/modify-routine")
    public ResponseEntity<?> modifyRoutine(@RequestBody RoutineGenerateReqDto routineGenerateReqDto) {
        try {
            routineService.modifyRoutine(routineGenerateReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("수정 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add-routine")
    public ResponseEntity<?> addUserRoutine(@RequestBody RoutineAddReqDto routineAddReqDto) {
        try {
            if(!routineService.addUserRoutine(routineAddReqDto))
                return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("이미 존재하는 루틴입니다.").build(), HttpStatus.OK);
            else
                return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("추가되었습니다.").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-user-routine/{id}")
    public ResponseEntity<?> getUserRoutine(@PathVariable("id") String userId) {
        try {
            List<RoutineInfoRespDto> routineInfoRespDtoList = routineService.getUserRoutine(userId);
            return new ResponseEntity<List<RoutineInfoRespDto>>(routineInfoRespDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-exercise-info/{id}")
    public ResponseEntity<?> getExerciseInfo(@PathVariable("id") Long routineId) {
        try {
            List<RoutineExerciseRespDto> routineExerciseRespDtoList = routineService.getExerciseInfo(routineId);
            return new ResponseEntity<List<RoutineExerciseRespDto>>(routineExerciseRespDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }
}
