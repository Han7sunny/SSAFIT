package com.ssafy.ssafit.app.Notice.service;

import com.ssafy.ssafit.app.Notice.dto.req.NoticeReqDto;
import com.ssafy.ssafit.app.Notice.dto.resp.NoticeRespDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.entity.Category;
import com.ssafy.ssafit.app.board.entity.Likes;
import com.ssafy.ssafit.app.board.repository.BoardRepository;
import com.ssafy.ssafit.app.board.repository.CategoryRepository;
import com.ssafy.ssafit.app.board.repository.LikesRepository;
import com.ssafy.ssafit.app.reply.dto.resp.ReplyRespDto;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.repository.ReplyRepository;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NoticeServiceImpl implements NoticeService{

    private static final long NOTICE = 1; // 공지사항

    private BoardRepository boardRepository;

    private ReplyRepository replyRepository;

    private UserRepository userRepository;

    private CategoryRepository categoryRepository;

    private LikesRepository likesRepository;

    @Autowired
    public NoticeServiceImpl(BoardRepository boardRepository, ReplyRepository replyRepository, UserRepository userRepository, CategoryRepository categoryRepository, LikesRepository likesRepository) {
        this.boardRepository = boardRepository;
        this.replyRepository = replyRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.likesRepository = likesRepository;
    }

    @Override
    public List<NoticeRespDto> getNoticeList() {

        List<NoticeRespDto> noticeList = new ArrayList<>();

        List<Board> boardList = boardRepository.findByCategoryIdAndSharePostTrue(NOTICE);
        for (Board board : boardList) {
            NoticeRespDto notice = new NoticeRespDto(board);
            notice.setReplySize(replyRepository.countByBoard_Id(board.getId()));
            noticeList.add(notice);
        }

        return noticeList;

    }

    @Override
    public NoticeRespDto view(long boardId) {

        Optional<Board> getBoard = boardRepository.findById(boardId);

        if(getBoard.isEmpty()){
            return NoticeRespDto.builder().success(false).msg("해당 게시글을 찾을 수 없습니다.").build();
        }

        Board board = getBoard.get();
        board.setHits(board.getHits() + 1); // 조회수 증가
        boardRepository.save(board); // hits 갱신

        NoticeRespDto notice = new NoticeRespDto(board);
        notice.setSuccess(true);
        notice.setBoardId(boardId);

        List<Reply> getReplyList = board.getReplyList();
        if(!getReplyList.isEmpty()){
            List<ReplyRespDto> replyRespDtoList = new ArrayList<>();
            for (Reply reply :
                    getReplyList) {
                replyRespDtoList.add(new ReplyRespDto(reply, true));
            }
            notice.setReplyList(replyRespDtoList);
            notice.setReplySize(replyRespDtoList.size());
        }

        // 사용자 아이디 가져오기
        String userId = "";
        // 해당 게시글 좋아요 눌렀는지 여부
        Likes isClicked = likesRepository.findByUserIdAndBoardId(userId, boardId);
        if(isClicked == null)
            notice.setClickLikes(false);
        else
            notice.setClickLikes(true);

        return notice;

    }

    @Override
    public void regist(NoticeReqDto notice) {

        User user = userRepository.findById(notice.getUserId()).get();
        Category category = categoryRepository.findById(notice.getCategoryId()).get();

        Board noticeBoard = Board.builder().title(notice.getTitle()).content(notice.getContent()).registeredTime(LocalDateTime.now()).sharePost(notice.isSharePost()).category(category).user(user).build();
        boardRepository.save(noticeBoard);

    }

    @Override
    public void modify(NoticeReqDto notice) {

        Board getNotice = boardRepository.findById(notice.getBoardId()).get();

        getNotice.setTitle(notice.getTitle());
        getNotice.setContent(notice.getContent());
//        getNotice.setRegisteredTime(notice.getRegisteredTime());
        getNotice.setModifiedTime(LocalDateTime.now());
        getNotice.setSharePost(notice.isSharePost());

        boardRepository.save(getNotice);

    }

    @Override
    public void delete(long boardId) {
        boardRepository.deleteById(boardId);
    }
}
