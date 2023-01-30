package com.ssafy.ssafit.app.board.service;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.repository.BoardRepository;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.repository.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService{


    // 공지사항
    private static final long NOTICE = 1; // 공지사항

    // 커뮤니티
    private static final long QA = 2; // 질문글
    private static final long SHARE_ROUTINE = 3; // 운동 루틴 공유글

    // 그룹 페이지
    private static final long GROUP_RECRUIT = 4; // 그룹 모집글
    private static final long GROUP_STATUS = 5; // 그룹 현황


    private BoardRepository boardRepository;
    private ReplyRepository replyRepository;

    @Autowired
    public BoardServiceImpl(BoardRepository boardRepository, ReplyRepository replyRepository) {
        this.boardRepository = boardRepository;
        this.replyRepository = replyRepository;
    }

    @Override
    public void regist(BoardReqDto board) { // userId도 함께 넘겨주기


        //        그룹 모집글 작성과 동시에 그룹 생성
        Board registBoard = Board.builder().title(board.getTitle()).registered_time(board.getRegistered_time()).modified_time(board.getModified_time()).content(board.getContent()).share(board.isShare()).build();

        //        그룹 모집글
//        if(board.getCategory_id() == GROUP_RECRUIT){ //  || board.getCategory_id() == GROUP_STATUS
//        Group newGroup =
//            groupRepository.save(newGroup);
//        }

        boardRepository.save(registBoard);



    }

    @Override
    public BoardRespDto view(long boardId) {
        Optional<Board> getBoard = boardRepository.findById(boardId);

        if(getBoard.isEmpty()){
//            return 에러 반환 _ 해당 게시글 찾을 수 없음 (UserRespDto 참고 : error code 입력)
        }

        Board board = getBoard.get();
        // 해당하는 댓글 list 포함 -> findById하면 List<Reply> .. 양방향 설정했으면 저절로 insert?
        board.setHits(board.getHits()+1);

        List<Reply> replyList = replyRepository.findByBoard_Id(boardId);

        boardRepository.save(board); // hits 갱신

//        if(board.getCategoryId())


        return BoardRespDto.builder().board_id(boardId).title(board.getTitle()).content(board.getContent()).registered_time(board.getRegistered_time()).modified_time(board.getModified_time()).hits(board.getHits()).likes(board.getLikes()).downloads(board.getDownloads()).share(board.isShare())
//                .user_id(board.getUser_id())
//                .category_id(board.getCategory_id())
                .replyList(replyList)
                .build();
    }

    @Override
    public void modify(BoardReqDto board) {
//        Optional<Board> originBoard = boardRepository.findById(board.getBoard_id());
//        if(originBoard.isEmpty()){
//            // 해당 게시글 존재하지 않음
//        }

//      변경되는 사항만 넣어주기 .. modify -> save하면 id(pk) 확인해서 새로운 값을 저절로 갱신해주는?

        Board modifyBoard = Board.builder().title(board.getTitle()).registered_time(board.getRegistered_time()).modified_time(board.getModified_time()).content(board.getContent()).share(board.isShare()).build();
        boardRepository.save(modifyBoard);
    }

    @Override
    public void delete(long boardId) {
        boardRepository.deleteById(boardId);
    }

    @Override
    public void hit(long boardId) {
        Board board = boardRepository.findById(boardId).get();
        board.setHits(board.getHits()+1);
        boardRepository.save(board);
    }
}
