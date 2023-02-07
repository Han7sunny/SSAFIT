package com.ssafy.ssafit.app.board.repository;

import com.ssafy.ssafit.app.board.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    Likes findByUserIdAndBoardId(String userId, long boardId);
    List<Likes> findByUserId(String userId);
    List<Likes> findByBoardId(long boardId);

}
