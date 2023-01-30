package com.ssafy.ssafit.app.routine.service;

import com.ssafy.ssafit.app.routine.dto.req.RoutineGenerateReqDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineExerciseRespDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoutineService {
    void generateRoutine(RoutineGenerateReqDto routineGenerateReqDto);

    List<RoutineExerciseRespDto> getExerciseInfo(Long routineId);
}
