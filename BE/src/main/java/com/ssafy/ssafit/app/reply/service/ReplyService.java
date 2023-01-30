package com.ssafy.ssafit.app.reply.service;

import com.ssafy.ssafit.app.reply.entity.Reply;

import java.util.List;

public interface ReplyService {
    void regist(Reply reply);
    List<Reply> getListByBoardId(long boardId);
    //    List<Reply> getListByUserId(String userId);
    void modify(Reply reply);
    void delete(long replyId);
    void deleteByBoardId(long boardId);
}
