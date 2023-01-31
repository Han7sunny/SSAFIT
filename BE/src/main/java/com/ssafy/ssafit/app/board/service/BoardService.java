package com.ssafy.ssafit.app.board.service;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;

import java.util.List;

public interface BoardService {
    void regist(BoardReqDto board);
//    List<BoardRespDto> search(BoardSearchCriteria criteria);
    BoardRespDto view(long boardId, long category_id);
    void modify(BoardReqDto board);
    void delete(long boardId);

    BoardRespDto increaseLike(long boardId);

    void hit(long boardId);
}
