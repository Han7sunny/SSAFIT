package com.ssafy.ssafit.app.board.repository;

import com.ssafy.ssafit.app.board.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {
    List<File> findAllByBoardId(long board_id);
}
