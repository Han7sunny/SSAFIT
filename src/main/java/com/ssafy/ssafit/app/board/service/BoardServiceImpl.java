package com.ssafy.ssafit.app.board.service;

import com.ssafy.ssafit.app.board.controller.BoardController;
import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.entity.Category;
import com.ssafy.ssafit.app.board.entity.File;
import com.ssafy.ssafit.app.board.entity.Likes;
import com.ssafy.ssafit.app.board.repository.BoardRepository;
import com.ssafy.ssafit.app.board.repository.CategoryRepository;
import com.ssafy.ssafit.app.board.repository.FileRepository;
import com.ssafy.ssafit.app.board.repository.LikesRepository;
import com.ssafy.ssafit.app.group.dto.resp.GroupRecruitRespDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.repository.GroupRepository;
import com.ssafy.ssafit.app.reply.dto.resp.ReplyRespDto;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.repository.ReplyRepository;
import com.ssafy.ssafit.app.routine.entity.Routine;
import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
import com.ssafy.ssafit.app.user.dto.resp.UserInfoResp;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import com.ssafy.ssafit.app.user.service.UserServiceImpl;
import com.ssafy.ssafit.util.SecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService{

    private static final Logger logger = LoggerFactory.getLogger(BoardServiceImpl.class);


    // 커뮤니티
    private static final long QA = 2; // 질문글
    private static final long SHARE_ROUTINE = 3; // 운동 루틴 공유글

    private UserRepository userRepository;

    private BoardRepository boardRepository;

    private CategoryRepository categoryRepository;

    private ReplyRepository replyRepository;

    private RoutineRepository routineRepository;

    private FileRepository fileRepository;

    private LikesRepository likesRepository;

    @Autowired
    public BoardServiceImpl(UserRepository userRepository, BoardRepository boardRepository, CategoryRepository categoryRepository, ReplyRepository replyRepository, RoutineRepository routineRepository, FileRepository fileRepository, LikesRepository likesRepository) {
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
        this.categoryRepository = categoryRepository;
        this.replyRepository = replyRepository;
        this.routineRepository = routineRepository;
        this.fileRepository = fileRepository;
        this.likesRepository = likesRepository;
    }

    // 질문글, 운동 루틴 공유글 작성
    @Override
    public Board regist(BoardReqDto board) {

        Board registBoard = Board.builder().title(board.getTitle()).registeredTime(LocalDateTime.now()).content(board.getContent()).sharePost(board.isSharePost()).build();

        registBoard.setCategory(categoryRepository.findById(board.getCategoryId()).get());
        registBoard.setUser(userRepository.findById(board.getUserId()).get());
        if(board.getCategoryId() == SHARE_ROUTINE) { // 운동 루틴 공유 게시글
            Routine routine = routineRepository.findById(board.getRoutineId()).get();
            registBoard.setRoutine(routine);
        }

        return boardRepository.save(registBoard);
    }

    //  파일 첨부 가능 게시글 : 공지사항, 질문글
    @Override
    public void registFile(Board board, List<String> imgList) { // userId도 함께 넘겨주기 -> 왜?
        for (String imgUrl: imgList) {
            File file = File.builder().board(board).imgUrl(imgUrl).build();
            fileRepository.save(file);
        }
    }

    @Override
    public BoardRespDto view(long boardId) {

        Optional<Board> getBoard = boardRepository.findById(boardId);

        if(getBoard.isEmpty()){
            return BoardRespDto.builder().success(false).msg("해당 게시글을 찾을 수 없습니다.").build();
        }

        Board board = getBoard.get();
        long categoryId = board.getCategory().getId();

        board.setHits(board.getHits() + 1); // 조회수 증가
        boardRepository.save(board); // hits 갱신

        BoardRespDto boardRespDto = new BoardRespDto(board);
        boardRespDto.setSuccess(true);
        boardRespDto.setBoardId(boardId);

        List<Reply> getReplyList = board.getReplyList();
        if(!getReplyList.isEmpty()){
            List<ReplyRespDto> replyRespDtoList = new ArrayList<>();
            for (Reply reply :
                    getReplyList) {
                replyRespDtoList.add(new ReplyRespDto(reply, true));
            }
            boardRespDto.setReplyList(replyRespDtoList);
            boardRespDto.setReplySize(replyRespDtoList.size());
        }

        if(categoryId == QA){
            boardRespDto.setFileList(fileRepository.findAllByBoardId(boardId));
        }

        // 사용자 아이디 가져오기
        UserInfoResp user = SecurityUtil.getCurrentUserId().get(); // userId, userName
        // 해당 게시글 좋아요 눌렀는지 여부
        Likes isClicked = likesRepository.findByUserIdAndBoardId(user.getUserId(), boardId);
        if(isClicked == null)
            boardRespDto.setClickLikes(false);
        else
            boardRespDto.setClickLikes(true);

        return boardRespDto;
    }

    @Override
    public List<BoardRespDto> getBoardList() {

        List<BoardRespDto> boardList = new ArrayList<>();

        List<Board> getBoardList = boardRepository.findByCategoryIdBetweenAndSharePostTrue(QA,SHARE_ROUTINE);
        for (Board board : getBoardList) {
            BoardRespDto boardRespDto = new BoardRespDto(board);
            boardList.add(boardRespDto);
        }

        return boardList;

    }

    @Override
    public List<BoardRespDto> getQAList() {

        List<BoardRespDto> QAList = new ArrayList<>();

        List<Board> boardList = boardRepository.findByCategoryIdAndSharePostTrue(QA);
        for (Board board : boardList) {
            BoardRespDto boardRespDto = new BoardRespDto(board);
            boardRespDto.setReplySize(replyRepository.countByBoard_Id(board.getId()));
            QAList.add(boardRespDto);
        }

        return QAList;
    }

    @Override
    public List<BoardRespDto> getShareRoutineList() {

        List<BoardRespDto> shareRoutineList = new ArrayList<>();

        List<Board> boardList = boardRepository.findByCategoryIdAndSharePostTrue(SHARE_ROUTINE);
        for (Board board : boardList) {
            BoardRespDto boardRespDto = new BoardRespDto(board);
            boardRespDto.setReplySize(replyRepository.countByBoard_Id(board.getId()));
            shareRoutineList.add(boardRespDto);
        }

        return shareRoutineList;
    }

    // 댓글 id에 해당하는 게시글 조회
    @Override
    public BoardRespDto getBoardByReplyId(long replyId) {
        Board board = replyRepository.findById(replyId).get().getBoard();
        return new BoardRespDto(board);
    }

//    @Override
//    public GroupRecruitRespDto getGroupRecruit(long groupId) {
//        LOGGER.info("[Enter] getGroupRecruit ");
//        Optional<Group> getGroup = groupRepository.findById(groupId);
//        if(getGroup.isEmpty()){
//            return GroupRecruitRespDto.builder().success(false).msg("해당 게시글을 찾을 수 없습니다.").build();
//        }
//        Group group = getGroup.get();
//        Board board = boardRepository.findByGroupId(groupId);
//
//        GroupRecruitRespDto groupRecruitRespDto = new GroupRecruitRespDto(group);
//        groupRecruitRespDto.setTitle(board.getTitle());
//        groupRecruitRespDto.setContent(board.getContent());
//        groupRecruitRespDto.setUserId(board.getUser().getId());
//        groupRecruitRespDto.setRegisteredTime(board.getRegistered_time());
//        groupRecruitRespDto.setModifiedTime(board.getModified_time());
//
//        return groupRecruitRespDto;
//    }
//
//    @Override
//    public List<Group> getGroupRecruitList() {
//        LOGGER.info("[Enter] getGroupRecruitList ");
//        //  공개글, 모집 기한이 지나지 않은 그룹 모집글
//        List<Group> getRecruitList = groupRepository.findByEndRecruitDateGreaterThanEqual(LocalDate.now());
////        List<Group> getGroupRecruitList = groupRepository.findByEndRecruitDateGreaterThanEqual(LocalDate.now());
////        List<GroupRecruitRespDto> groupRecruitList = new ArrayList<>();
////        for (Group groupRecruit : getGroupRecruitList) {
////            Board board = boardRepository.findByGroupId(groupRecruit.getId());
////            GroupRecruitRespDto groupRecruitResp = new GroupRecruitRespDto(groupRecruit);
////            groupRecruitResp.setTitle(board.getTitle());
////            groupRecruitResp.setContent(board.getContent());
////            groupRecruitResp.setUserId(board.getUser().getId());
////            groupRecruitResp.setRegisteredTime(board.getRegistered_time());
////            groupRecruitResp.setModifiedTime(board.getModified_time());
////            groupRecruitList.add(groupRecruitResp);
////        }
//        return getRecruitList;
//    }

    @Override
    public void modify(BoardReqDto board) {

        Board getBoard = boardRepository.findById(board.getBoardId()).get();

        getBoard.setTitle(board.getTitle());
        getBoard.setContent(board.getContent());
        getBoard.setRegisteredTime(board.getRegisteredTime());
        getBoard.setModifiedTime(LocalDateTime.now());
        getBoard.setSharePost(board.isSharePost());
        if(board.getCategoryId() == SHARE_ROUTINE) {
            getBoard.setRoutine(routineRepository.findById(board.getRoutineId()).get());
        }

        boardRepository.save(getBoard);
    }

    @Override
    public void delete(long boardId) {
        boardRepository.deleteById(boardId);
    }

    @Override
    public void deleteGroupRecruit(long groupId) {
        Board board = boardRepository.findByGroupId(groupId);
        boardRepository.deleteById(board.getId());
    }

    @Override
    public boolean clickLikes(String userId, long boardId) {

        boolean isClicked;

        Likes getLikes =  likesRepository.findByUserIdAndBoardId(userId, boardId);
        Board board = boardRepository.findById(boardId).get();

        if(getLikes == null) {
            // 좋아요 아직 안 누른 상태
            board.setLikes(board.getLikes() + 1);
            User user = userRepository.findById(userId).get();
            likesRepository.save(Likes.builder().user(user).board(board).build());
            isClicked = true;
        }
        else {
            // 좋아요 이미 누른 상태
            board.setLikes(board.getLikes() - 1);
            likesRepository.deleteById(getLikes.getId());
            isClicked = false;
        }
        boardRepository.save(board);
//        return new BoardRespDto(board);

        return isClicked;
    }

    @Override
    public void hit(long boardId) {
        Board board = boardRepository.findById(boardId).get();
        board.setHits(board.getHits() + 1);
        boardRepository.save(board);
    }

    // 단순 다운로드 수 증가
    @Override
    public BoardRespDto increaseDownload(long boardId) {
        Board board = boardRepository.findById(boardId).get();
        board.setDownloads(board.getDownloads() + 1);
        Board updatedBoard = boardRepository.save(board);
        return new BoardRespDto(updatedBoard);
    }

}
