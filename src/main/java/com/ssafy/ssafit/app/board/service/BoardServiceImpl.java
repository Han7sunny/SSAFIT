package com.ssafy.ssafit.app.board.service;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.entity.File;
import com.ssafy.ssafit.app.board.repository.BoardRepository;
import com.ssafy.ssafit.app.board.repository.FileRepository;
import com.ssafy.ssafit.app.group.dto.resp.GroupRecruitRespDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.repository.GroupRepository;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.repository.ReplyRepository;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.service.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

    private final Logger LOGGER = LoggerFactory.getLogger(BoardServiceImpl.class);


    private BoardRepository boardRepository;

    private ReplyRepository replyRepository;

    private GroupRepository groupRepository;

    private FileRepository fileRepository;

    @Autowired
    public BoardServiceImpl(BoardRepository boardRepository, ReplyRepository replyRepository, GroupRepository groupRepository, FileRepository fileRepository) {
        this.boardRepository = boardRepository;
        this.replyRepository = replyRepository;
        this.groupRepository = groupRepository;
        this.fileRepository = fileRepository;
    }

    @Override
    public Board regist(BoardReqDto board) {
        Board registBoard = Board.builder().title(board.getTitle()).registered_time(LocalDateTime.now()).content(board.getContent()).share(board.isShare()).build();
        return boardRepository.save(registBoard);
    }

    //  파일 첨부 가능 게시글 : 공지사항, 질문글
    @Override
    public void registFile(Board board, List<String> imgList) { // userId도 함께 넘겨주기
        for (String imgUrl: imgList) {
            File file = File.builder().board(board).imgUrl(imgUrl).build();
            fileRepository.save(file);
        }
    }



    @Override
    public BoardRespDto view(long boardId, long category_id) {
        LOGGER.info("[view] boardId : {}", boardId);
        Optional<Board> getBoard = boardRepository.findById(boardId);

        if(getBoard.isEmpty()){
            return BoardRespDto.builder().success(false).msg("해당 게시글을 찾을 수 없습니다.").build();
        }

        Board board = getBoard.get();

//        if(!board.isShare() && (board.getUser().getId() != 현재로그인계정)){
//            return BoardRespDto.builder().success(false).msg("비공개 게시글입니다.").build();
//        }


        board.setHits(board.getHits() + 1); // 조회수 증가

//        List<Reply> replyList = replyRepository.findByBoard_Id(boardId);

        boardRepository.save(board); // hits 갱신

//        카테고리에 따라 다르게 ... ?
//        if(board.getCategoryId() == ){
//        }

        BoardRespDto boardRespDto = new BoardRespDto(board);
        boardRespDto.setBoardId(boardId);
        boardRespDto.setReplyList(board.getReplyList());

        return boardRespDto;
    }

    @Override
    public GroupRecruitRespDto getGroupRecruit(long groupId) {
        LOGGER.info("[Enter] getGroupRecruit ");
        Optional<Group> getGroup = groupRepository.findById(groupId);
        if(getGroup.isEmpty()){
            return GroupRecruitRespDto.builder().success(false).msg("해당 게시글을 찾을 수 없습니다.").build();
        }
        Group group = getGroup.get();
        Board board = boardRepository.findByGroupId(groupId);

        GroupRecruitRespDto groupRecruitRespDto = new GroupRecruitRespDto(group);
        groupRecruitRespDto.setTitle(board.getTitle());
        groupRecruitRespDto.setContent(board.getContent());
        groupRecruitRespDto.setUserId(board.getUser().getId());
        groupRecruitRespDto.setRegisteredTime(board.getRegistered_time());
        groupRecruitRespDto.setModifiedTime(board.getModified_time());

        return groupRecruitRespDto;
    }

    @Override
    public List<GroupRecruitRespDto> getGroupRecruitList() {
        LOGGER.info("[Enter] getGroupRecruitList ");
        List<Board> getGroupRecruitList = boardRepository.findByGroupIdNotNullAndShareTrue();
        List<GroupRecruitRespDto> groupRecruitList = new ArrayList<>();
        for (Board board : getGroupRecruitList) {
            Group group = board.getGroup();
            GroupRecruitRespDto groupRecruitResp = new GroupRecruitRespDto(group);
            groupRecruitResp.setTitle(board.getTitle());
            groupRecruitResp.setContent(board.getContent());
            groupRecruitResp.setUserId(board.getUser().getId());
            groupRecruitResp.setRegisteredTime(board.getRegistered_time());
            groupRecruitResp.setModifiedTime(board.getModified_time());
            groupRecruitList.add(groupRecruitResp);
        }
        return  groupRecruitList;
    }


    @Override
    public void modify(BoardReqDto board) {
        LOGGER.info("[Enter] modify ");

        Board getBoard = boardRepository.findById(board.getBoardId()).get();

        getBoard.setTitle(board.getTitle());
        getBoard.setContent(board.getContent());
        getBoard.setModified_time(LocalDateTime.now());
        getBoard.setShare(board.isShare());

        boardRepository.save(getBoard);
    }

    @Override
    public void delete(long boardId) {
        boardRepository.deleteById(boardId);
    }

    @Override
    public BoardRespDto increaseLike(long boardId) {
        Board board = boardRepository.findById(boardId).get();
        board.setLikes(board.getLikes() + 1);
        boardRepository.save(board);
        return new BoardRespDto(board);
    }

    @Override
    public void hit(long boardId) {
        Board board = boardRepository.findById(boardId).get();
        board.setHits(board.getHits() + 1);
        boardRepository.save(board);
    }
}
