package com.ssafy.ssafit.app.board.service;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;

import java.util.List;

public interface BoardService {
    void regist(BoardReqDto board);
//    List<BoardRespDto> search(BoardSearchCriteria criteria);
    BoardRespDto view(long boardId);
    void modify(BoardReqDto board);
    void delete(long boardId);
    void hit(long boardId);
}
