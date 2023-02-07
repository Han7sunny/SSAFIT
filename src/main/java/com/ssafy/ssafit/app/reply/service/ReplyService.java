package com.ssafy.ssafit.app.reply.service;

import com.ssafy.ssafit.app.reply.dto.req.ReplyReqDto;
import com.ssafy.ssafit.app.reply.dto.resp.ReplyRespDto;
import com.ssafy.ssafit.app.reply.entity.Reply;

import java.util.List;

public interface ReplyService {
    void regist(ReplyReqDto reply);

//    ReplyRespDto getReply(long replyId);

    List<ReplyRespDto> getReplyListByUserId(String userId);

    List<ReplyRespDto> getReplyListByBoardId(long boardId);
    //    List<Reply> getListByUserId(String userId);
    void modify(ReplyReqDto reply);
    void delete(long replyId);
}
