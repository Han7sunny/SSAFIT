package com.ssafy.ssafit.app.exercise.controller;

import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.exercise.dto.resp.ExerciseTypeRespDto;
import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.exercise.service.ExerciseService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {

    private ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping("/get-exercise-type")
    @ApiOperation(value = "원하는 운동 부위별로 운동 정보 가져오기",
            notes = "입력한 운동 부위에 해당하는 운동들의 정보를 가져온다.\n"
                    + "area : 원하는 운동 부위 (빈 문자열로 보낼 경우 모든 운동 정보 반환)"
            , response = List.class)
    public ResponseEntity<?> getExerciseType(@RequestParam String area) {
        try {
            List<ExerciseTypeRespDto> exerciseTypeList = exerciseService.getExerciseType(area);
            return new ResponseEntity<List<ExerciseTypeRespDto>>(exerciseTypeList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }
}
