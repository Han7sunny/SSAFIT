package com.ssafy.ssafit;


import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.repository.BoardRepository;
import com.ssafy.ssafit.app.reply.dto.req.ReplyReqDto;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.repository.ReplyRepository;
import com.ssafy.ssafit.app.reply.service.ReplyService;
import com.ssafy.ssafit.app.user.dto.Role;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.List;

@SpringBootTest
public class ReplyTest {


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
    ReplyService replyService;
//
//    @BeforeEach
//    @Test
//    void init(){
//        logger.info("[init] init data for BoardTest");
//        User user1 = User.builder()
//                .id("test11").password(passwordEncoder.encode("test1pw")).email("test1@test1.com")
//                .on_off(false).photo("photo1").photo_encoding("photo_encoding1")
//                .name("testName1").role(Role.USER).roles(Collections.singletonList("ROLE_USER"))
//                .build();
//        User user2 = User.builder()
//                .id("test2").password(passwordEncoder.encode("test22pw")).email("test2@test1.com")
//                .on_off(false).photo("photo2").photo_encoding("photo_encoding2")
//                .name("testName2").role(Role.USER).roles(Collections.singletonList("ROLE_USER"))
//                .build();
//        User user3 = User.builder()
//                .id("test3").password(passwordEncoder.encode("test3pw")).email("test3@test.com")
//                .on_off(false).photo("photo3").photo_encoding("photo_encoding3")
//                .name("testName3").role(Role.USER).roles(Collections.singletonList("ROLE_USER"))
//                .build();
//        logger.info("[User] join user");
//        userRepository.save(user1);
//        userRepository.save(user2);
//        userRepository.save(user3);
//
//        //        게시글 작성
//        Board registBoard1 = Board.builder().user(user1).title("test게시글제목").content("testContent").hits(0).likes(0).downloads(10).sharePost(false).build();
//        Board registBoard2 = Board.builder().user(user2).title("test게시글제목2").content("testContent2").hits(2).likes(0).downloads(10).sharePost()hare(false).build();
//        logger.info("[Board] regist board");
//        boardRepository.save(registBoard1);
//        boardRepository.save(registBoard2);
//
//        //        게시글에 해당하는 댓글 작성
//        //        본인 게시글에 본인도 댓글 달 수 있음
//        Reply reply1 = Reply.builder()
//                .user(user1)
//                .board(registBoard1)
//                .content("reply1_content").build();
//        Reply reply2 = Reply.builder()
//                .user(user3)
//                .board(registBoard1)
//                .content("reply2_content").build();
//        Reply reply3 = Reply.builder()
//                .user(user2)
//                .board(registBoard2)
//                .content("reply1_content by user2").build();
//
//        logger.info("[Reply] regist reply");
//        replyRepository.save(reply1);
//        replyRepository.save(reply2);
//        replyRepository.save(reply3);
//
//    }
//
//    @Test
//    void regist(){
//        logger.info("[Enter] regist() ");
//
//        long boardId = 1;
//        int beforeReplySize = replyService.getReplyListByBoardId(boardId).size();
//        logger.info("[check] check reply size before regist reply : {} ", beforeReplySize);
//
//
//        logger.info("[regist] regist reply");
//        ReplyReqDto reply = ReplyReqDto.builder().board_id(boardId).user_id("test1").content("regist_reply_test").build();
//        replyService.regist(reply);
//
//        logger.info("[view] get reply");
//        List<Reply> after = replyService.getReplyListByBoardId(boardId);
//        Assertions.assertThat(after.size()).isEqualTo(beforeReplySize + 1);
//    }
//
//    @Test
//    void delete(){
//        logger.info("[Enter] delete()");
//
//        long boardId = 1;
//        int beforeReplySize = replyService.getReplyListByBoardId(boardId).size();
//
//        logger.info("[delete] delete reply");
//        long replyId = 2;
//        replyService.delete(replyId);
//
//        Assertions.assertThat(replyService.getReplyListByBoardId(boardId).size()).isEqualTo(beforeReplySize - 1);
//    }
//
//    @Test
//    void modify(){
//        logger.info("[Enter] modify()");
//
//
//    }

}
