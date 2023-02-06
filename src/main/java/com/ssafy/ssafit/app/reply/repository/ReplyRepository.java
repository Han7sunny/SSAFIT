package com.ssafy.ssafit.app.reply.repository;

import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.reply.entity.Reply;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply,Long> {
//    List<Reply> findByBoard_Id(long board_id);
    List<Reply> findByBoard_Id(long boardId);

    List<Reply> findByUser_Id(String user_id);

    long countByBoard_Id(long boardId);
}