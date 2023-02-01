package com.ssafy.ssafit.app.board.service;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupRecruitRespDto;

import java.util.List;

public interface BoardService {

    void regist(BoardReqDto board);
    void registWithImg(BoardReqDto board, List<String> imgList);
//    List<BoardRespDto> search(BoardSearchCriteria criteria);
    BoardRespDto view(long boardId, long categoryId);

    GroupRecruitRespDto getGroupRecruit(long groupId);

    List<GroupRecruitRespDto> getGroupRecruitList();

    void modify(BoardReqDto board);

    void delete(long boardId);

    BoardRespDto increaseLike(long boardId);

    void hit(long boardId);
}
