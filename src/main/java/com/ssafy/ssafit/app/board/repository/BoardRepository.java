package com.ssafy.ssafit.app.board.repository;

import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;


public interface BoardRepository extends JpaRepository<Board,Long> {
//    List<Board> findByCategoryIdShareTrue(long category_id);

    List<Board> findByCategoryIdBetweenAndSharePostTrue(long startId, long endId);
    //  공개글 조회
    List<Board> findByCategoryIdAndSharePostTrueOrderByRegisteredTimeDesc(long categoryId);

//    //  그룹 모집글 중 공개글 목록 조회
//    List<Board> findByGroupIdNotNullAndShareTrue();

    Board findByGroupId(long group_id);

    List<Board> findByUser_id(long user_id);

    List<Board> findByUser_Id(String userId);

    @Transactional
    @Modifying
    @Query(value = "update board b set b.user_id = null where b.user_id = :userId", nativeQuery = true)
    void updateUserIdNull(@Param("userId") String userId);
}
