package com.ssafy.ssafit.app.board.repository;

import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface BoardRepository extends JpaRepository<Board,Long> {
//    List<Board> findByCategoryIdShareTrue(long category_id);

    List<Board> findByCategoryIdBetweenAndSharePostTrue(long startId, long endId);
    //  공개글 조회
    List<Board> findByCategoryIdAndSharePostTrue(long categoryId);

//    //  그룹 모집글 중 공개글 목록 조회
//    List<Board> findByGroupIdNotNullAndShareTrue();

    Board findByGroupId(long group_id);

    List<Board> findByUser_id(long user_id);
}
