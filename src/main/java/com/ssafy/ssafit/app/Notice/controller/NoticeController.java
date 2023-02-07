package com.ssafy.ssafit.app.Notice.controller;

import com.ssafy.ssafit.app.Notice.dto.req.NoticeReqDto;
import com.ssafy.ssafit.app.Notice.dto.resp.NoticeRespDto;
import com.ssafy.ssafit.app.Notice.service.NoticeService;
import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.group.controller.GroupController;
import com.ssafy.ssafit.app.reply.dto.req.ReplyReqDto;
import com.ssafy.ssafit.app.reply.service.ReplyService;
import com.ssafy.ssafit.app.user.dto.CustomUserDetails;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notice")
@Api("Notice Controller API v1")
public class NoticeController {
    private final Logger LOGGER = LoggerFactory.getLogger(NoticeController.class);

    private NoticeService noticeService;
    private ReplyService replyService;

    @Autowired
    public NoticeController(NoticeService noticeService, ReplyService replyService) {
        this.noticeService = noticeService;
        this.replyService = replyService;
    }

    @GetMapping("/")
    @ApiOperation(value = "공지사항 목록 ", notes = "공지사항 목록을 조회한다.", response = List.class)
    public ResponseEntity<List<NoticeRespDto>> getNoticeList() throws Exception {
        LOGGER.info("Called getNoticeList.");
        List<NoticeRespDto> noticeList = noticeService.getNoticeList();
        HttpStatus status = HttpStatus.NO_CONTENT;
        if(!noticeList.isEmpty())
            status = HttpStatus.OK;
        return new ResponseEntity<List<NoticeRespDto>>(noticeList, status);
    }

    @GetMapping("/{boardId}")
    @ApiOperation(value = "공지사항 조회 ", notes = "입력한 게시글 ID에 해당하는 공지사항을 조회한다.", response = NoticeRespDto.class)
    public ResponseEntity<NoticeRespDto> getNotice(@PathVariable("boardId") @ApiParam(value = "게시판 ID", required = true) long boardId) throws Exception {
        LOGGER.info("Called getNotice.");
        NoticeRespDto notice = noticeService.view(boardId);
        HttpStatus status = HttpStatus.NO_CONTENT;
        if(notice.isSuccess())
            status = HttpStatus.OK;
        return new ResponseEntity<NoticeRespDto>(notice, status);
    }

    @PostMapping("/regist")
    @ApiOperation(value = "공지사항 작성 ", notes = "입력한 정보로 공지사항을 생성한다.", response = Boolean.class)
    public ResponseEntity<Boolean> registNotice(@ApiParam(value = "공지사항 정보", required = true) @RequestBody NoticeReqDto notice, @AuthenticationPrincipal CustomUserDetails user ) throws Exception {
        LOGGER.info("Called getNotice.");
        notice.setUserId(user.getUsername());
        noticeService.regist(notice);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PutMapping("/{boardId}")
    @ApiOperation(value = "공지사항 수정", notes = "입력한 정보로 기존 게시글을 수정한다.")
    public ResponseEntity<Boolean> modifyNotice(@RequestBody @ApiParam(value = "공지사항 정보", required = true) NoticeReqDto notice) throws Exception {
        LOGGER.info("Called modifyNotice. notice: {}", notice);
//        notice.setUser_id(user.getUsername());
        noticeService.modify(notice);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}")
    @ApiOperation(value = "게시글 삭제", notes = "입력한 게시글 ID에 해당하는 공지사항을 삭제한다.공지사항에 대해 작성된 모든 댓글도 함께 삭제된다.")
    public ResponseEntity<Boolean> deleteNotice(@PathVariable("boardId") @ApiParam(value = "게시판 ID", required = true) long boardId) throws Exception {
        LOGGER.info("Called deleteNotice. boardId: {}", boardId);
        noticeService.delete(boardId);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PostMapping("/{boardId}/regist")
    @ApiOperation(value = "댓글 작성", notes = "입력한 정보로 새로운 댓글을 생성한다.")
    public ResponseEntity<Boolean> postReply(@RequestBody @ApiParam(value = "새로운 댓글", required = true) ReplyReqDto reply,@AuthenticationPrincipal CustomUserDetails user) throws Exception {
        LOGGER.info("Called postReply. reply: {}", reply);
        reply.setUser_id(user.getUsername());
        replyService.regist(reply);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PutMapping("/{boardId}/{replyId}")
    @ApiOperation(value = "댓글 수정", notes = "입력한 정보로 기존 댓글을 수정한다.")
    public ResponseEntity<Boolean> modifyReply(@RequestBody @ApiParam(value = "수정 댓글", required = true) ReplyReqDto reply) throws Exception {
        LOGGER.info("Called modifyReply. reply: {}", reply);
//        reply.setUser_id(user.getUsername());
        replyService.modify(reply);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}/{replyId}")
    @ApiOperation(value = "댓글 삭제", notes = "입력한 댓글 ID(replyId)에 해당하는 댓글을 삭제한다.")
    public ResponseEntity<Boolean> deleteReply(@PathVariable("replyId") @ApiParam(value = "댓글 ID", required = true) long replyId) throws Exception {
        LOGGER.info("Called deleteReply. replyId: {}", replyId);
        replyService.delete(replyId);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}
