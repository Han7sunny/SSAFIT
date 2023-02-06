package com.ssafy.ssafit.app.reply.service;

import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.repository.BoardRepository;
import com.ssafy.ssafit.app.notification.entity.Notification;
import com.ssafy.ssafit.app.notification.repository.NotificationRepository;
import com.ssafy.ssafit.app.reply.dto.req.ReplyReqDto;
import com.ssafy.ssafit.app.reply.dto.resp.ReplyRespDto;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.repository.ReplyRepository;
import com.ssafy.ssafit.app.routine.entity.Routine;
import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReplyServiceImpl implements ReplyService{

    private UserRepository userRepository;

    private BoardRepository boardRepository;

    private ReplyRepository replyRepository;
    private final NotificationRepository notificationRepository;
    private final RoutineRepository routineRepository;

    @Autowired
    public ReplyServiceImpl(UserRepository userRepository, BoardRepository boardRepository, ReplyRepository replyRepository,
                            NotificationRepository notificationRepository,
                            RoutineRepository routineRepository) {
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
        this.replyRepository = replyRepository;
        this.notificationRepository = notificationRepository;
        this.routineRepository = routineRepository;
    }

//    작성한 댓글 조회를 위함
    @Override
    public ReplyRespDto getReply(long replyId) {
//        Optional<Reply> getReply = replyRepository.findById(replyId);
//        if(getReply.isEmpty()){
//            return ReplyRespDto.builder().success(false).msg("해당 댓글을 찾을 수 없습니다.").build();
//        }
//
//        Reply reply = getReply.get();
        return ReplyRespDto.builder().build();
    }


    @Override
    public List<Reply> getReplyListByBoardId(long boardId) {
//        select 2번 실행되는 이유를 찾기 위해 repository에서 boardId로 찾는 것이 아닌 board 객체로 찾도록 수정

        List<Reply> getReplyList = replyRepository.findByBoard_Id(boardId);
//        그룹 모집글이리 경우 , 그룹원 추가 또는 제거 -> groupService에서 처리
//        해당 댓글들은 질문글, 운동 루틴 공유 게시글의 댓글만을 의미함
        return replyRepository.findByBoard_Id(boardId); // 해당 게시글에 댓글 없으면 null 반환 ?
    }

    public List<ReplyRespDto> getReplyListOnGroupRecruitByBoardId(long boardId) {

        List<Reply> getReplyList = replyRepository.findByBoard_Id(boardId);
        List<ReplyRespDto> replyRespDtoList = new ArrayList<>();
//        for (:
//             ) {
//
//        }
//        그룹 모집글이리 경우 , 그룹원 추가 또는 제거 -> groupService에서 처리
        return replyRespDtoList;
    }

    @Override
    @Transactional
    public void regist(ReplyReqDto reply) {
        User user = userRepository.findById(reply.getUser_id()).get();
        Board board = boardRepository.findById(reply.getBoard_id()).get();
        Reply registReply = Reply.builder().user(user).board(board).content(reply.getContent()).registered_time(reply.getRegistered_time()).build();
        replyRepository.save(registReply);

        Notification notification = Notification.builder()
                .board(board)
                .user(board.getUser())
                .message(board.getTitle() + "글에 " + user.getName() + "님이 댓글을 달았습니다.")
                .notification_type(1)
                .build();

        notificationRepository.save(notification);
    }

    @Override
    public void modify(ReplyReqDto reply) {
        Reply getReply = replyRepository.findById(reply.getReply_id()).get();

        getReply.setContent(reply.getContent());
        getReply.setRegistered_time(reply.getRegistered_time());

        replyRepository.save(getReply);
    }

    @Override
    public void delete(long reply_id) {
        replyRepository.deleteById(reply_id);
    }

    @Override
    public List<Reply> getReplyListByUserId(String userId) {
        return replyRepository.findByUser_Id(userId);
    }

}
