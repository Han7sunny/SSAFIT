package com.ssafy.ssafit;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.repository.BoardRepository;
import com.ssafy.ssafit.app.board.service.BoardService;
import com.ssafy.ssafit.app.reply.controller.ReplyController;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.repository.ReplyRepository;
import com.ssafy.ssafit.app.reply.service.ReplyService;
import com.ssafy.ssafit.app.user.dto.Role;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.aspectj.lang.annotation.Before;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@SpringBootTest
public class BoardTest {

    private static final Logger logger = LoggerFactory.getLogger(BoardTest.class);

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    ReplyRepository replyRepository;

    @Autowired
    private BoardService boardService;

    @Autowired
    private ReplyService replyService;

    @BeforeEach
    @Test
    void init(){
        logger.info("[init] init data for BoardTest");
        User user1 = User.builder()
                .id("test11").password(passwordEncoder.encode("test1pw")).email("test1@test1.com")
                .onOff(false).photo("photo1").photoEncoding("photo_encoding1")
                .name("testName1").role(Role.USER).roles(Collections.singletonList("ROLE_USER"))
                .build();
        User user2 = User.builder()
                .id("test2").password(passwordEncoder.encode("test22pw")).email("test2@test1.com")
                .onOff(false).photo("photo2").photoEncoding("photo_encoding2")
                .name("testName2").role(Role.USER).roles(Collections.singletonList("ROLE_USER"))
                .build();
        User user3 = User.builder()
                .id("test3").password(passwordEncoder.encode("test3pw")).email("test3@test.com")
                .onOff(false).photo("photo3").photoEncoding("photo_encoding3")
                .name("testName3").role(Role.USER).roles(Collections.singletonList("ROLE_USER"))
                .build();
        logger.info("[User] join user");
        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);

        //        게시글 작성
        Board registBoard1 = Board.builder().user(user1).title("test게시글제목").content("testContent").hits(0).likes(0).downloads(10).sharePost(false).build();
        Board registBoard2 = Board.builder().user(user2).title("test게시글제목2").content("testContent2").hits(2).likes(0).downloads(10).sharePost(false).build();
        logger.info("[Board] regist board");
        boardRepository.save(registBoard1);
        boardRepository.save(registBoard2);

        //        게시글에 해당하는 댓글 작성
        //        본인 게시글에 본인도 댓글 달 수 있음
        Reply reply1 = Reply.builder()
                .user(user1)
                .board(registBoard1)
                .content("reply1_content").build();
        Reply reply2 = Reply.builder()
                .user(user3)
                .board(registBoard1)
                .content("reply2_content").build();
        Reply reply3 = Reply.builder()
                .user(user2)
                .board(registBoard2)
                .content("reply1_content by user2").build();

        logger.info("[Reply] regist reply");
        replyRepository.save(reply1);
        replyRepository.save(reply2);
        replyRepository.save(reply3);

    }

//    @Test
//    void viewBoard(){
//        logger.info("[View] viewBoard()");
//        //        게시글 조회
//        long boardId = 1;
//        BoardRespDto getBoard = boardService.view(boardId);
//        logger.info("[View] Board _ replyList length : {}", getBoard.getReplyList().size());
//        Assertions.assertThat(getBoard.getReplyList().size()).isEqualTo(2);
//    }
//
//    @Test
//    void deleteBoard(){
//        long boardId = 1;
//        boardService.delete(boardId);
//        Assertions.assertThat(boardRepository.findById(boardId)).isEmpty();
//    }
//
//    @Test
//    void modifyBoard(){
//        logger.info("[modify] modifyBoard");
//
//        long boardId = 1;
//        BoardReqDto boardReqDto = BoardReqDto.builder().board_id(boardId).user_id("test11").title("modify_title").content("modity_content").share(true).build();
//        boardService.modify(boardReqDto);
//
//        logger.info("[view] view");
//        BoardRespDto getBoard = boardService.view(boardId);
//
//        Assertions.assertThat(getBoard.getTitle()).isEqualTo(boardReqDto.getTitle());
//        Assertions.assertThat(getBoard.getContent()).isEqualTo(boardReqDto.getContent());
//        Assertions.assertThat(getBoard.isShare()).isEqualTo(boardReqDto.isShare());
//
//    }
//
//    @Test
//    void clickLikes(){
//        logger.info("[Enter] clickLikes()");
//        logger.info("[View] view board");
//        long boardId = 1;
//        BoardRespDto board = boardService.view(boardId);
//        logger.info("[likes] click likes");
//        BoardRespDto afterClickLikes = boardService.increaseLike(boardId);
//        Assertions.assertThat(afterClickLikes.getLikes()).isEqualTo(board.getLikes() + 1);
//
//    }
}
