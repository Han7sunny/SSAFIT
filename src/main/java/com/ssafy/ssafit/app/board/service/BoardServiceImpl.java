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
    public void regist(BoardReqDto board) {
        Board registBoard = Board.builder().title(board.getTitle()).registered_time(board.getRegistered_time()).modified_time(board.getModified_time()).content(board.getContent()).share(board.isShare()).build();
        boardRepository.save(registBoard);
    }

    @Override
    public void registWithImg(BoardReqDto board, List<String> imgList) { // userId도 함께 넘겨주기
        //        그룹 모집글 작성과 동시에 그룹 생성
        Board registBoard = Board.builder().title(board.getTitle()).registered_time(board.getRegistered_time()).modified_time(board.getModified_time()).content(board.getContent()).share(board.isShare()).build();



        //        그룹 모집글
//        if(board.getCategory_id() == GROUP_RECRUIT){ //  || board.getCategory_id() == GROUP_STATUS
//        Group newGroup =
//            groupRepository.save(newGroup);
//        }

        Board getBoard = boardRepository.save(registBoard);

        for (String imgUrl: imgList) {
            File file = File.builder().board(getBoard).imgUrl(imgUrl).build();
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

//        그룹 모집글일 경우


        return BoardRespDto.builder().board_id(boardId).title(board.getTitle()).content(board.getContent())
                .registered_time(board.getRegistered_time()).modified_time(board.getModified_time())
                .hits(board.getHits()).likes(board.getLikes()).downloads(board.getDownloads()).share(board.isShare())
//                .user_id(board.getUser_id())
//                .category_id(board.getCategory_id())
                .replyList(board.getReplyList())
                .build();
    }

    @Override
    public GroupRecruitRespDto getGroupRecruit(long groupId) {
        Optional<Group> getGroup = groupRepository.findById(groupId);
        if(getGroup.isEmpty()){
            return GroupRecruitRespDto.builder().success(false).msg("해당 게시글을 찾을 수 없습니다.").build();
        }
        Group group = getGroup.get();
        Board board = boardRepository.findByGroupId(groupId);
        return GroupRecruitRespDto.builder()
                .title(board.getTitle()).content(board.getContent()).registered_time(board.getRegistered_time()).modified_time(board.getModified_time()).user_id(board.getUser().getId())
                .groupName(group.getName()).goal(group.getGoal()).penalty(group.getPenalty())
                .start_date(group.getStart_date()).end_date(group.getEnd_date()).period(group.getPeriod())
                .maximum_member(group.getMaximum_member()).current_member(group.getCurrent_member())
                .build();
    }

    @Override
    public List<GroupRecruitRespDto> getGroupRecruitList() {
        LOGGER.info("[Enter] getGroupRecruitList ");
        List<Board> getGroupRecruitList = boardRepository.findByGroupIdNotNullShareTrue();
        List<GroupRecruitRespDto> groupRecruitList = new ArrayList<>();
        for (Board board : getGroupRecruitList) {
            Group group = board.getGroup();
            GroupRecruitRespDto groupRecruitResp = GroupRecruitRespDto.builder()
                    .title(board.getTitle()).content(board.getContent()).registered_time(board.getRegistered_time()).modified_time(board.getModified_time()).user_id(board.getUser().getId())
                    .groupName(group.getName()).goal(group.getGoal()).penalty(group.getPenalty())
                    .start_date(group.getStart_date()).end_date(group.getEnd_date()).period(group.getPeriod())
                    .maximum_member(group.getMaximum_member()).current_member(group.getCurrent_member())
                    .build();
            groupRecruitList.add(groupRecruitResp);
        }
        return  groupRecruitList;
    }


    @Override
    public void modify(BoardReqDto board) {

        Board getBoard = boardRepository.findById(board.getBoard_id()).get();
//        if(getBoard.isEmpty()){
//            // 해당 게시글 존재하지 않음
//        }

        getBoard.setTitle(board.getTitle());
        getBoard.setContent(board.getContent());
        getBoard.setModified_time(board.getModified_time());
        getBoard.setShare(board.isShare());
//      변경되는 사항만 넣어주기 .. modify -> save하면 id(pk) 확인해서 새로운 값을 저절로 갱신해주는?

//        Board modifyBoard = Board.builder().title(board.getTitle()).registered_time(board.getRegistered_time()).modified_time(board.getModified_time()).content(board.getContent()).share(board.isShare()).build();
//         pk 값 넣어줘야하나?
        boardRepository.save(getBoard);

    }

    @Override
    public void delete(long boardId) {
        boardRepository.deleteById(boardId);
    }

    @Override
    public BoardRespDto increaseLike(long boardId) {
        Board board = boardRepository.findById(boardId).get();
        board.setLikes(board.getLikes()+1);
        boardRepository.save(board);
        return BoardRespDto.builder().board_id(boardId).
                user_id(board.getUser().getId()).title(board.getTitle()).content(board.getContent()).registered_time(board.getRegistered_time()).modified_time(board.getModified_time())
                .hits(board.getHits()).likes(board.getLikes()).downloads(board.getDownloads()).share(board.isShare())
                .replyList(board.getReplyList())
                .build();
    }

    @Override
    public void hit(long boardId) {
        Board board = boardRepository.findById(boardId).get();
        board.setHits(board.getHits()+1);
        boardRepository.save(board);
    }
}
