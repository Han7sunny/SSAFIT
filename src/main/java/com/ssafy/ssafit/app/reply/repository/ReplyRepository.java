package com.ssafy.ssafit.app.reply.repository;

import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.reply.entity.Reply;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply,Long> {
//    List<Reply> findByBoard_Id(long board_id);
    List<Reply> findByBoard_Id(long boardId);

    List<Reply> findByUser_Id(String user_id);

    @Transactional
    @Modifying
    @Query(value = "update reply r set r.user_id = null where r.user_id = :userId", nativeQuery = true)
    void updateUserIdNull(@Param("userId") String userId);
}