package com.ssafy.ssafit.app.board.service;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.group.dto.resp.GroupRecruitRespDto;
import com.ssafy.ssafit.app.group.entity.Group;

import java.util.List;

public interface BoardService {

    Board regist(BoardReqDto board);

//    void registGroupRecruit(Group group, BoardReqDto board);

    void registFile(Board board, List<String> imgList);
//    List<BoardRespDto> search(BoardSearchCriteria criteria);
    BoardRespDto view(long boardId);

    List<BoardRespDto> getBoardList();

    List<BoardRespDto> getQAList();

    List<BoardRespDto> getShareRoutineList();

    BoardRespDto getBoardByReplyId(long replyId);

//    GroupRecruitRespDto getGroupRecruit(long groupId);

//    List<Group> getGroupRecruitList();

    void modify(BoardReqDto board);

    void delete(long boardId);

    void deleteGroupRecruit(long groupId);

    boolean clickLikes(String userId, long boardId);

    void hit(long boardId);

    BoardRespDto increaseDownload(long boardId);
}
