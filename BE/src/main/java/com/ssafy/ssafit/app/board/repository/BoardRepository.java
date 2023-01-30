package com.ssafy.ssafit.app.board.repository;

import com.ssafy.ssafit.app.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface BoardRepository extends JpaRepository<Board,Long> {
//    List<Board> findByCategoryId(long category_id);
    List<Board> findByUser_id(long user_id);
}
