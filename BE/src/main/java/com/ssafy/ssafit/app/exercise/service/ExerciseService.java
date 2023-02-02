package com.ssafy.ssafit.app.exercise.service;

import com.ssafy.ssafit.app.exercise.dto.resp.ExerciseTypeRespDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExerciseService {
    List<ExerciseTypeRespDto> getExerciseType(String area);
}
