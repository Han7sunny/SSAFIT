package com.ssafy.ssafit;

import com.ssafy.ssafit.app.exercise.entity.ExerciseType;
import com.ssafy.ssafit.app.exercise.repository.ExerciseTypeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
class SsafitApplicationTests {

	@Autowired
	ExerciseTypeRepository exerciseTypeRepository;
	@Test
	void contextLoads() {
	}

	@Test
	void exerciseType_테이블_값_입력() {
		exerciseTypeRepository.save(ExerciseType.builder().
				exerciseTypeName("스쿼트").
				exerciseArea("다리").
				build());

		Optional<ExerciseType> exerciseType = exerciseTypeRepository.findById(1L);

		System.out.println(exerciseType.get().getExerciseTypeId());
		System.out.println(exerciseType.get().getExerciseTypeName());
		System.out.println(exerciseType.get().getExerciseArea());
	}
}
