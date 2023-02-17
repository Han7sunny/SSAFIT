package com.ssafy.ssafit.app.routine.service;

import com.ssafy.ssafit.app.routine.dto.req.RoutineAddReqDto;
import com.ssafy.ssafit.app.routine.dto.req.RoutineGenerateReqDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineExerciseRespDto;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineInfoRespDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoutineService {
    long generateRoutine(RoutineGenerateReqDto routineGenerateReqDto);

    void deleteRoutine(Long routineId);

    void modifyRoutine(RoutineGenerateReqDto routineGenerateReqDto);

    boolean addUserRoutine(RoutineAddReqDto routineAddReqDto);

    RoutineExerciseRespDto getExerciseInfo(Long routineId);

    List<RoutineInfoRespDto> getUserRoutine(String userId);
}
