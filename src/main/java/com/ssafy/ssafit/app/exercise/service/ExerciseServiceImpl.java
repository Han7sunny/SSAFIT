package com.ssafy.ssafit.app.exercise.service;

import com.ssafy.ssafit.app.exercise.dto.resp.ExerciseTypeRespDto;
import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.exercise.repository.ExerciseRepository;
import com.ssafy.ssafit.app.exercise.repository.ExerciseTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExerciseServiceImpl implements ExerciseService{

    private ExerciseTypeRepository exerciseTypeRepository;
    private ExerciseRepository exerciseRepository;

    @Autowired
    public ExerciseServiceImpl(ExerciseTypeRepository exerciseTypeRepository, ExerciseRepository exerciseRepository) {
        this.exerciseTypeRepository = exerciseTypeRepository;
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public List<ExerciseTypeRespDto> getExerciseType(String area) {

        List<ExerciseType> exerciseTypeList;

        if(area.isEmpty())
            exerciseTypeList = exerciseTypeRepository.findAll();
        else
            exerciseTypeList = exerciseTypeRepository.findByExerciseArea(area);

        List<ExerciseTypeRespDto> exerciseTypeRespDtoList = new ArrayList<ExerciseTypeRespDto>();

        for (ExerciseType et : exerciseTypeList) {
            exerciseTypeRespDtoList.add(ExerciseTypeRespDto.builder()
                    .exerciseTypeId(et.getExerciseTypeId())
                    .exerciseTypeName(et.getExerciseTypeName())
                    .exerciseArea(et.getExerciseArea())
                    .build());
        }

        return exerciseTypeRespDtoList;
    }
}
