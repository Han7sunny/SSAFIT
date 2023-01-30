package com.ssafy.ssafit.app.routine.service;

import com.ssafy.ssafit.app.routine.dto.req.RoutineGenerateReqDto;
import org.springframework.stereotype.Service;

@Service
public interface RoutineService {
    void generateRoutine(RoutineGenerateReqDto routineGenerateReqDto);
}
