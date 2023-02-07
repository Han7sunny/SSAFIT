package com.ssafy.ssafit.app.reply.controller;

<<<<<<< HEAD
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReplyController {
=======
import com.ssafy.ssafit.app.reply.dto.req.ReplyReqDto;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.service.ReplyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reply")
@Api("Reply Controller API v1")
public class ReplyController {

    private static final Logger logger = LoggerFactory.getLogger(ReplyController.class);
    private ReplyService replyService;

    @Autowired
    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @GetMapping("/user/{userId}")
    @ApiOperation(value = "사용자가 작성한 댓글 목록 조회", notes = "입력한 사용자 ID(userId)에 해당하는 모든 댓글(Reply)을 조회한다.", response = List.class)
//    public ResponseEntity<List<Reply>> getReplyListByUserId(@PathVariable("userId") String userId) throws Exception {
    public ResponseEntity<List<Reply>> getReplyListByUserId(@PathVariable("userId") @ApiParam(value = "사용자 ID", required = true) String userId) throws Exception {
        logger.info("Called getReplyListByUserId. userId: {}", userId);
        return new ResponseEntity<List<Reply>>(replyService.getReplyListByUserId(userId), HttpStatus.OK);
    }

    @PostMapping("/regist")
    @ApiOperation(value = "댓글 작성", notes = "입력한 정보로 새로운 댓글을 생성한다.")
    public ResponseEntity<Boolean> postReply(@RequestBody @ApiParam(value = "새로운 댓글", required = true) ReplyReqDto reply) throws Exception {
        logger.info("Called postReply. reply: {}", reply);
        replyService.regist(reply);
        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

    @PutMapping("/{replyId}")
    @ApiOperation(value = "댓글 수정", notes = "입력한 정보로 기존 댓글을 수정한다.")
    public ResponseEntity<Boolean> modifyReply(@RequestBody @ApiParam(value = "수정 댓글", required = true) ReplyReqDto reply) throws Exception {
        logger.info("Called modifyReply. reply: {}", reply);
        replyService.modify(reply);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @DeleteMapping("/{replyId}")
    @ApiOperation(value = "댓글 삭제", notes = "입력한 댓글 ID(replyId)에 해당하는 댓글을 삭제한다.")
    public ResponseEntity<Boolean> deleteReply(@PathVariable("replyId") @ApiParam(value = "댓글 ID", required = true) long replyId) throws Exception {
        logger.info("Called deleteReply. replyId: {}", replyId);
        replyService.delete(replyId);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

>>>>>>> dev_kkw
}
