package com.ssafy.ssafit.app.routine.controller;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.routine.dto.req.RoutineGenerateReqDto;
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
            System.out.println(routineGenerateReqDto.getRoutineName());
            System.out.println(routineGenerateReqDto.getExerciseList().size());
            routineService.generateRoutine(routineGenerateReqDto);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("추가 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }
}
