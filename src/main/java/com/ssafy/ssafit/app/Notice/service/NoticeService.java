package com.ssafy.ssafit.app.Notice.service;

import com.ssafy.ssafit.app.Notice.dto.req.NoticeReqDto;
import com.ssafy.ssafit.app.Notice.dto.resp.NoticeRespDto;

import java.util.List;

public interface NoticeService {
    List<NoticeRespDto> getNoticeList();

    NoticeRespDto view(long boardId);

    void regist(NoticeReqDto notice);

    void modify(NoticeReqDto notice);

    void delete(long boardId);
}
