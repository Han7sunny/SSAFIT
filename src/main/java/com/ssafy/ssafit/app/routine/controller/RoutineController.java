package com.ssafy.ssafit.app.routine.controller;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.routine.dto.req.RoutineAddReqDto;
import com.ssafy.ssafit.app.routine.dto.req.RoutineGenerateReqDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineExerciseRespDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineInfoRespDto;
import com.ssafy.ssafit.app.routine.service.RoutineService;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation(value = "루틴을 생성하는 기능",
            notes = "운동 정보 배열, 루틴 이름, 유저의 아이디를 보내섯 루틴을 등록함 (루틴 아이디는 X)",
            response = CommonResp.class)
    public ResponseEntity<?> generateRoutine(@RequestBody RoutineGenerateReqDto routineGenerateReqDto) {
        try {
            routineService.generateRoutine(routineGenerateReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("추가 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete-routine")
    @ApiOperation(value = "특정 루틴을 내 루틴에서 제거하는 기능",
            notes = "루틴의 아이디와 내 아아디를 통해 해당 루틴을 내 루틴에서 제거",
            response = CommonResp.class)
    public ResponseEntity<?> deleteRoutine(@RequestParam("userId") String userId, @RequestParam("routineId") Long routineId) {
        try {
            routineService.deleteRoutine(userId, routineId);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("삭제 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/modify-routine")
    @ApiOperation(value = "루틴을 수정하는 기능",
            notes = "내 루틴에 등록된 루틴 중 하나를 수정하는 기능",
            response = CommonResp.class)
    public ResponseEntity<?> modifyRoutine(@RequestBody RoutineGenerateReqDto routineGenerateReqDto) {
        try {
            routineService.modifyRoutine(routineGenerateReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("수정 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add-routine")
    @ApiOperation(value = "다른 유저의 루틴을 내 루틴으로 추가하는 기능",
            notes = "루틴의 아이디와 내 아이디를 보내 다른 유저의 루틴을 내 루틴으로 추가한다.",
            response = CommonResp.class)
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
    @ApiOperation(value = "특정 유저의 루틴 정보를 가져오는 기능",
            notes = "유저의 아이디를 통해 해당 유저의 루틴 정보를 가져옴",
            response = List.class)
    public ResponseEntity<?> getUserRoutine(@PathVariable("id") String userId) {
        try {
            List<RoutineInfoRespDto> routineInfoRespDtoList = routineService.getUserRoutine(userId);
            return new ResponseEntity<List<RoutineInfoRespDto>>(routineInfoRespDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-exercise-info/{id}")
    @ApiOperation(value = "특정 루틴의 상세정보를 가져오는 기능",
            notes = "루틴의 아이디를 통해 해당 루틴의 상세정보를 가져온다.",
            response = List.class)
    public ResponseEntity<?> getExerciseInfo(@PathVariable("id") Long routineId) {
        try {
            List<RoutineExerciseRespDto> routineExerciseRespDtoList = routineService.getExerciseInfo(routineId);
            return new ResponseEntity<List<RoutineExerciseRespDto>>(routineExerciseRespDtoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }
}
