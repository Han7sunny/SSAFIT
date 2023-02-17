package com.ssafy.ssafit.app.board.repository;

import com.ssafy.ssafit.app.board.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
